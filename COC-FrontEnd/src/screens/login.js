'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableOpacity

} from 'react-native';
import {Toast, Root} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginStyle from '@styles/LoginStyle';
//Para hacer formularios mas sencillo
import {Formik} from 'formik';
//Para validar los formularios
import * as yup from 'yup';
import Axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from "react-redux";
import {token, SaveToken, datosUsuario, cargando} from "../actions/Auth/authActions";
import {ActualizarEstado, VerificandoConexion} from "../actions/Conection/connectionActions";


const Url = 'http://192.168.1.55:3000/api/usuarios/login'


class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            loading: false
        };
        this._login = this._login.bind(this)

    }

    componentDidMount(): void {
        this.props.verificar()
    }

    componentWillUnmount(): void {
        this.props.actualizar()
    }

    render() {
        const {conexionDisponible} = this.props
        return (
            <Root>
                <Formik initialValues={{identificacion: '', password: '',}}
                        onSubmit={values => this._login(values)}
                        validationSchema={yup.object().shape({

                            identificacion: yup.number().required('La identificación es obligatoria!').min(10, 'La Identificación es de 10 caracteres!'),
                            password: yup.string().required('La contraseña es obligatoria! ').min(7, 'La contraseña debe tener minimo de 7 caracteres!'),

                        })}>
                    {({values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
                        <ImageBackground source={require('@assets/fotos/tic-tac-toe.png')} style={LoginStyle.image}>
                            <KeyboardAvoidingView style={LoginStyle.container}>

                                <View style={LoginStyle.loginContainer}>

                                    <View style={{justifyContent: 'center'}}>
                                        <Image source={require('@assets/fotos/logoEmpresa.png')}
                                               style={LoginStyle.logo}/>
                                    </View>

                                    {conexionDisponible === true ? (
                                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                            < Text style={LoginStyle.title}> Iniciar Sesión</Text>
                                            <View>
                                                <Icon name={'user'} size={20} color={'#1a86bf'}
                                                      style={LoginStyle.IconsStyle}/>
                                                <TextInput onChangeText={handleChange('identificacion')}
                                                           underlineColorAndroid={'transparent'}
                                                           onBlur={() => setFieldTouched('identificacion')}
                                                           placeholderTextColor={'black'} placeholder={'Cedula'}
                                                           keyboardType={'number-pad'} value={values.identificacion}
                                                           returnKeyType="next" style={LoginStyle.Input}/>
                                            </View>
                                            {touched.identificacion && errors.identificacion &&
                                            <View style={LoginStyle.dangerMessage}>
                                                <Text style={{fontSize: 15, color: 'white'}}>
                                                    <Icon name={'exclamation-circle'}
                                                          size={20}/> {errors.identificacion}
                                                </Text>
                                            </View>
                                            }


                                            <View>
                                                <Icon name={'lock'} style={LoginStyle.IconsStyle}
                                                      size={20} color={'#1a86bf'}/>
                                                <TextInput onChangeText={handleChange('password')}
                                                           onBlur={() => setFieldTouched('password')}
                                                           placeholderTextColor={'black'} value={values.password}
                                                           placeholder={'Contraseña'} secureTextEntry
                                                           keyboardType={'default'} returnKeyType={'go'}
                                                           style={LoginStyle.Input}/>

                                            </View>
                                            {touched.password && errors.password &&
                                            <View style={LoginStyle.dangerMessage}>
                                                <Text style={{fontSize: 15, color: 'white'}}>
                                                    <Icon name={'exclamation-circle'} size={20}/> {errors.password}
                                                </Text>
                                            </View>
                                            }


                                            <TouchableOpacity onPress={handleSubmit} style={LoginStyle.ButtonLogin}>
                                                <Text style={LoginStyle.textButton}>Ingresar</Text>
                                            </TouchableOpacity>

                                        </View>

                                    ) : (
                                        <View>
                                            <Text style={LoginStyle.title}>Modo Offline</Text>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('MantenimientoNuevo')}
                                                style={[LoginStyle.ButtonLogin, {height: 60}]}>
                                                <Text style={LoginStyle.textButton}>Registrar
                                                    Mantenimiento</Text>
                                            </TouchableOpacity>
                                        </View>

                                    )}


                                </View>

                            </KeyboardAvoidingView>
                        </ImageBackground>
                    )}
                </Formik>
            </Root>
        );
    }

    _login = (values) => {


        Axios.post(`${Url}`, values).then((res) => {
            if (res.data) {

                this.props.loader(true);
                this.props.SaveToken('token', res.data.token)
                this.props.actualizarVariable(res.data.token)
                this.props.datos_Usuario(res.data)

            } else {
                alert('Error de autenticación')
            }

        }).catch((e) => {
            this.props.loader(false);

            if (e.response.data) {
                Toast.show({
                    text: `${e.response.data}`,
                    buttonText: "❗",
                    type: "danger",
                    position: "top",
                    duration: 5000
                })
            }
            console.log(e)


        })

    };
}

const mapStateToProps = state => {
    return {
        token: state.AuthReducer.token,
        conexionDisponible: state.connectionReducer.conexionDisponible,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actualizarVariable: estado => dispatch(token(estado)),
        SaveToken: (key, value) => dispatch(SaveToken(key, value)),
        datos_Usuario: persona => dispatch(datosUsuario(persona)),
        loader: load => dispatch(cargando(load)),
        verificar: () => dispatch(VerificandoConexion()),
        actualizar: () => dispatch(ActualizarEstado())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
