import {
  VERIFICANDO_CONEXION,
  CONEXION_DISPONIBLE,
  SIN_CONEXION,
} from '../../Constants/ConnectionConstants';
import NetInfo from '@react-native-community/netinfo';

export const ConexionDisponible = (conexionDisponible) => ({
  type: CONEXION_DISPONIBLE,
  conexionDisponible,
});

export const verificando_Conexion = (verificacion) => ({
  type: VERIFICANDO_CONEXION,
  verificacion,
});

export const sinConexion = (sinConexion) => ({
  type: SIN_CONEXION,
  sinConexion,
});

export const VerificandoConexion = () => (dispatch) => {
  dispatch({
    type: VERIFICANDO_CONEXION,
  });

  NetInfo.fetch().then((state) => {
    if (state.isConnected === true) {
      dispatch(ConexionDisponible(state.isConnected));
      console.log('conectado ' + state.isConnected);
    } else {
      dispatch(sinConexion(state.isConnected));
      console.log('conectado ' + state.isConnected);
    }
  });
};

export const ActualizarEstado = () => (dispatch) => {
  dispatch({
    type: VERIFICANDO_CONEXION,
  });
  NetInfo.addEventListener((state) => {
    if (state.isConnected === true) {
      dispatch(ConexionDisponible(state.isConnected));
      console.log('conectado ' + state.isConnected);
    } else {
      dispatch(sinConexion(state.isConnected));
      console.log('no conectado ' + state.isConnected);
    }
  });
};
