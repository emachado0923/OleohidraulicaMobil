'use strict';
//Perfil
import React from 'react';

import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import style from '../styles/profileStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {token, DeleteToken, getToken} from '../actions/Auth/authActions';
import {Col, Grid} from 'react-native-easy-grid';
import Axios from 'axios';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      URIServer: '',
    };
  }

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ): void {
    this.props.getToken();
  }




  async CerrarSession() {
    this.props.actualizarVariable(false);
    this.props.Logout();
    return this.props.navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  }

  render(): React.ReactNode {
    const rol = this.props.usuario.user.rol;
    let Rol;
    if (rol === 1) {
      Rol = <Text style={style.text}>Súper Usuario</Text>;
    } else if (rol === 2) {
      Rol = <Text style={style.text}>Administrador de servicios</Text>;
    } else if (rol === 3) {
      Rol = <Text style={style.text}>Administrador de servicios</Text>;
    } else if (rol === 4) {
      Rol = <Text style={style.text}>Mecanico</Text>;
    } else if (rol === 5) {
      Rol = <Text style={style.text}>Tecnico</Text>;
    }

    return (
      <ScrollView style={style.container}>
        <View style={style.headerBackgroundImage}>
          {this.props.usuario.user.foto === null ? (
            <Image
              source={require('../assets/fotos/no-image.png')}
              style={style.profileImage}
            />
          ) : (
            <Image
              source={{
                uri: `${this.props.usuario.user.foto}`
              }}
              style={style.profileImage}
            />
          )}
          <Text style={style.name}>{this.props.usuario.user.name}</Text>
        </View>

        <View style={style.infoProfile}>
          <View style={{flex: 1, alignItems: 'center', padding: '10%'}}>
            <View style={style.card}>
              <Image
                source={require('../assets/iconos/email.png')}
                style={style.IconItem}
              />
              <View
                style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Email</Text>
                <Text style={style.text}>{this.props.usuario.user.email}</Text>
              </View>
            </View>
            <View style={style.card}>
              <Image
                source={require('../assets/iconos/accreditation.png')}
                style={style.IconItem}
              />

              <View
                style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Identificación</Text>
                <Text style={style.text}>
                  {this.props.usuario.user.identificacion}
                </Text>
              </View>
            </View>

            <View style={style.card}>
              <Image
                source={require('../assets/iconos/monitoring.png')}
                style={style.IconItem}
              />
              <View
                style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Rol</Text>
                <Text style={style.text}>{Rol}</Text>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                left: '10%',
                margin: 10,
              }}>
              <Grid>
                <Col>
                  <TouchableOpacity
                    style={style.buttonBack}
                    onPress={() => this.CerrarSession()}>
                    <Text style={[style.text, {color: 'white'}]}>
                      Salir&nbsp;
                      <Icon
                        name={'sign-out-alt'}
                        style={[style.IconItem, {color: 'white'}]}
                        color={'white'}
                        size={12}
                      />
                    </Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    style={style.buttonEdit}
                    onPress={() =>
                      this.props.navigation.navigate('ModificarPerfil')
                    }>
                    <Text style={[style.text, {color: 'white'}]}>
                      Editar&nbsp;
                      <Icon
                        name={'edit'}
                        style={[style.IconItem, {color: 'white'}]}
                        color={'white'}
                        size={12}
                      />
                    </Text>
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
