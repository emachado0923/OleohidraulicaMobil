import axios from 'axios';
import {
  LISTAR_COMPONENTES,
  CARGANDO,
  ERROR,
  ALMACENAR,
} from '../../Constants/ItemsConstants';
import AsyncStorage from '@react-native-community/async-storage';

//dev
//const Url = 'http://192.168.1.55:3000/api';
//deployed
const Url = 'https://cocmovil.herokuapp.com/api';

export const ListarComponentes = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const Componentes = await axios.get(`${Url}/objetos/recursos`);
    const Clientes = await axios.get(`${Url}/clientes`);
    dispatch({
      type: LISTAR_COMPONENTES,
      payload: [
        //autobomba
        await AsyncStorage.setItem(
          'autobomba',
          JSON.stringify(Componentes.data[0]),
        ),
        //mixer
        await AsyncStorage.setItem(
          'mixer',
          JSON.stringify(Componentes.data[1]),
        ),
        //cargador
        await AsyncStorage.setItem(
          'cargador',
          JSON.stringify(Componentes.data[2]),
        ),
        //bomba estacionaria
        await AsyncStorage.setItem(
          'bomba',
          JSON.stringify(Componentes.data[3]),
        ),
        //planta
        await AsyncStorage.setItem(
          'planta',
          JSON.stringify(Componentes.data[4]),
        ),
        //especialidad
        await AsyncStorage.setItem(
          'especialidad',
          JSON.stringify(Componentes.data[5]),
        ),
        //clientes
        await AsyncStorage.setItem('clientes', JSON.stringify(Clientes.data)),
      ],
    });
    console.log('datos guardados correctamente');
  } catch (e) {
    console.log('error ' + e);
    dispatch({
      type: ERROR,
      payload: 'Información no disponible!',
    });
  }
};
