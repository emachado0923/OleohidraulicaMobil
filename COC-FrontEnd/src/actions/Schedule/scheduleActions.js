import axios from 'axios';

import {
  LISTAR_CRONOGRAMA,
  CARGANDO,
  ERROR,
} from '../../Constants/ScheduleConstants';

//dev
//const Url = 'http://192.168.1.55:3000/api';
//deployed
const Url = 'https://cocmovil.herokuapp.com/api';

export const ListarCronograma = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const Schedule = await axios.get(`${Url}/objetos/cronograma`);
    dispatch({
      type: LISTAR_CRONOGRAMA,
      payload: Schedule.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: ERROR,
      payload: 'Información no disponible',
    });
  }
};
