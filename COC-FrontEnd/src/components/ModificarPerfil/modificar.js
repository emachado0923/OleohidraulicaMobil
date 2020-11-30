'use strict';
import React from 'react';
import {Text, Image, View} from 'react-native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import style from '../../styles/profileStyle';

import {
  Container,
  Header,
  Content,
  Item,
  Card,
  CardItem,
  Input,
  Label,
  Button,
  Body,
  Text as TxT,
  Root,
  Toast,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios';
import {DeleteToken, getToken, token} from '../../actions/Auth/authActions';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';

//dev
//const Url = 'http://192.168.1.55:3000/api';
//deployed
const Url = 'https://cocmovil.herokuapp.com/api';

const options = {
  title: 'Seleccionar',
  takePhotoButtonTitle: '📷 Tomar foto',
  chooseFromLibraryButtonTitle: '🖼️ Seleccionar de la galería',
  cancelButtonTitle: 'Cancelar',
  quality: 1,
};

class ModificarPerfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nuevaFoto: [
        {
          path: '',
          filename: '',
          uri: '',
        },
      ],
      nuevoNombre: this.props.usuario.user.name,
    };
  }

  //dev
  //URL = 'http://192.168.1.55:3000/api/usuarios/modificar';
  //deployed
  URL = 'https://cocmovil.herokuapp.com/api/usuarios/modificar';

  componentDidMount() {
    this.validarUrl();
  }

  validarUrl = () => {
    let UriLaravel = `http://oleohidraulica.aplicaciones-csge.com/uploads/perfil/${this.props.usuario.user.foto}`;
    let UriNode = `https://cocmovil.herokuapp.com/Pictures/${this.props.usuario.user.foto}`;

    Axios.get(UriNode)
      .then((res) => {
        this.setState({
          nuevaFoto: [{uri: res.config.url}],
        });
      })
      .catch((error) => {
        this.setState({
          nuevaFoto: [{uri: UriLaravel}],
        });
      });
  };

  ActualizarContraseña = (values) => {
    const id = this.props.usuario.user.id;

    Axios.put(`${this.URL}/${id}`, values)
      .then((res) => {
        Toast.show({
          text: `${res.data}`,
          buttonText: '✔',
          type: 'success',
          position: 'top',
          duration: 5000,
        });
        this.props.actualizarVariable(false);
        this.props.Logout();
        return this.props.navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      })
      .catch((err) => {
        Toast.show({
          text: `${err.response.data}`,
          buttonText: '❗',
          type: 'danger',
          position: 'top',
          duration: 5000,
        });
      });
  };

  ActualizarOtros = () => {
    const id = this.props.usuario.user.id;
    const {nuevaFoto, nuevoNombre} = this.state;

    if (nuevoNombre !== '') {
      RNFetchBlob.fetch(
        'PUT',
        `${this.URL}Perfil/${id}`,
        {
          Authorization: `Bearer ${this.props.token}`,
          otherHeader: 'foo',
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'nuevaFoto',
            type: 'image/jpg',
            filename: `${nuevaFoto[0].filename}`,
            data: RNFetchBlob.wrap(nuevaFoto[0].path),
          },
          {
            name: 'nuevoNombre',
            data: nuevoNombre,
          },
        ],
      )
        .then((res) => {
          Toast.show({
            text: `${res.data}`,
            buttonText: '✔',
            type: 'success',
            position: 'top',
            duration: 5000,
          });
          return this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Perfil'}],
          });
        })
        .catch((err) => {
          Toast.show({
            text: `${err.response.data}`,
            buttonText: '❗',
            type: 'danger',
            position: 'top',
            duration: 5000,
          });
        });
    } else {
      Toast.show({
        text: 'Nombre vacio!',
        buttonText: 'Ok',
        type: 'danger',
        position: 'top',
        duration: 5000,
      });
    }
  };

  seleccionarFoto = async () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('Image picker cancelado');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          nuevaFoto: [
            {
              path: response.path,
              filename: response.fileName,
              uri: response.uri,
            },
          ],
        });
      }
    });
  };

  render() {
    const {nuevaFoto, nuevoNombre} = this.state;
    return (
      <Root>
        <Formik
          initialValues={{
            antiguaContraseña: '',
            nuevaContraseña: '',
            confirmacion: '',
          }}
          validationSchema={yup.object().shape({
            antiguaContraseña: yup
              .string()
              .required('Ingrese su contraseña actual')
              .min(7, 'Su contraseña debe tener minimo de 7 caracteres!'),
            nuevaContraseña: yup
              .string()
              .required('Ingrese la nueva contraseña')
              .min(7, 'La nueva contraseña debe tener minimo de 7 caracteres!'),
            confirmacion: yup
              .string()
              .required('Ingrese  de nuevo la contraseña')
              .min(7, 'La confirmación debe tener minimo de 7 caracteres!'),
          })}
          onSubmit={(values) => this.ActualizarContraseña(values)}>
          {({
            values,
            handleChange,
            errors,
            handleBlur,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <Container>
              <Header style={{backgroundColor: 'white', alignItems: 'stretch'}}>
                <Body style={{alignItems: 'stretch'}}>
                  <Text style={style.Titulo}>Modificar perfil</Text>
                </Body>
              </Header>
              <Content>
                <Card>
                  <CardItem header>
                    <Text style={style.Titulo}>Información de perfil</Text>
                  </CardItem>
                  <Body>
                    <Label>Foto</Label>

                    {nuevaFoto.map((item) => (
                      <View>
                        <Image
                          source={{uri: item.uri}}
                          style={style.profileImage}
                        />
                      </View>
                    ))}
                    <Button onPress={this.seleccionarFoto} rounded info>
                      <TxT>
                        <Icon name={'edit'} size={18} />
                      </TxT>
                    </Button>
                    <CardItem>
                      <Item floatingLabel>
                        <Label>Nombre</Label>
                        <Input
                          value={nuevoNombre}
                          onChangeText={(nuevoNombre) =>
                            this.setState({nuevoNombre})
                          }
                        />
                      </Item>
                    </CardItem>
                  </Body>
                  <CardItem
                    footer
                    bordered
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Button onPress={this.ActualizarOtros}>
                      <TxT>Guardar</TxT>
                    </Button>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem header>
                    <Text style={style.Titulo}>Cambiar credenciales</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Item floatingLabel>
                        <Label>Ingrese su contraseña</Label>
                        <Input
                          onChangeText={handleChange('antiguaContraseña')}
                          onBlur={handleBlur('antiguaContraseña')}
                          value={values.antiguaContraseña}
                          secureTextEntry
                        />
                      </Item>
                      {touched.antiguaContraseña && errors.antiguaContraseña && (
                        <TxT
                          style={{
                            fontSize: 15,
                            color: 'red',
                            fontWeight: 'bold',
                          }}>
                          <Icon name={'exclamation-circle'} size={15} />{' '}
                          {errors.antiguaContraseña}
                        </TxT>
                      )}
                      <Item floatingLabel>
                        <Label>Ingrese la nueva contraseña</Label>
                        <Input
                          onChangeText={handleChange('nuevaContraseña')}
                          onBlur={handleBlur('nuevaContraseña')}
                          value={values.nuevaContraseña}
                          secureTextEntry
                        />
                      </Item>
                      {touched.nuevaContraseña && errors.nuevaContraseña && (
                        <TxT
                          style={{
                            fontSize: 15,
                            color: 'red',
                            fontWeight: 'bold',
                          }}>
                          <Icon name={'exclamation-circle'} size={15} />{' '}
                          {errors.nuevaContraseña}
                        </TxT>
                      )}
                      <Item floatingLabel>
                        <Label>Confirme la nueva contraseña</Label>
                        <Input
                          onChangeText={handleChange('confirmacion')}
                          onBlur={handleBlur('confirmacion')}
                          value={values.confirmacion}
                          secureTextEntry
                        />
                      </Item>
                      {touched.confirmacion && errors.confirmacion && (
                        <TxT
                          style={{
                            fontSize: 15,
                            color: 'red',
                            fontWeight: 'bold',
                          }}>
                          <Icon name={'exclamation-circle'} size={15} />{' '}
                          {errors.confirmacion}
                        </TxT>
                      )}
                    </Body>
                  </CardItem>
                  <CardItem
                    footer
                    bordered
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Button onPress={handleSubmit}>
                      <TxT>Cambiar Contraseña</TxT>
                    </Button>
                  </CardItem>
                </Card>
              </Content>
            </Container>
          )}
        </Formik>
      </Root>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.AuthReducer.token,
    usuario: state.AuthReducer.usuario,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actualizarVariable: (estado) => dispatch(token(estado)),
    Logout: () => dispatch(DeleteToken()),
    getToken: () => dispatch(getToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModificarPerfil);
