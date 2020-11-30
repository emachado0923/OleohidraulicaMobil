import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {GET_USERS, CARGANDO, ERROR} from '../../Constants/UserConstants';

//dev
//const Url = 'http://192.168.1.55:3000/api';
//deployed
const Url = 'https://cocmovil.herokuapp.com/api';

export const obtenerUsuarios = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const GetUsers = await axios.get(`${Url}/sistema`);
    dispatch({
      type: GET_USERS,
      payload: await AsyncStorage.setItem(
        'Users',
        JSON.stringify(GetUsers.data[8]),
      ),
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: ERROR,
      payload: 'Información no disponible!',
    });
  }
};
