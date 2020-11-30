//Para validar los formularios
import * as yup from 'yup';

export const LISTAR_MANTENIMIENTOS = 'mantenimiento_listar_mantenimientos';
export const CARGANDO = 'mantenimiento_cargando';
export const ERROR = 'mantenimiento_error';

//valores iniciales
export const NuevoMantenimiento = {
    ContactoCliente: 1,
    n_cotizacion: '',
    numeroOT: '',
    descripcionTrabajoRealizar: '',
    Equipo: '',
    operacion: '',
    Placa: '',
    spinnerUbicacion: '',
    estado_cotizacion: '1',
    fechaIngreso: '',
    horaIngreso: '',
    fechaSalida: '',
    horaSalida: '',
    Horometro: '',
    Kilometraje: '',
    Observaciones: '',
    forma_de_pago: '30 Dias',
    vigencia: '',
    tiempo_lugar: '',
    att: '',
    spinnerMixer: 0,
    spinnerCargador: 0,
    spinnerAutobomba: 0,
    spinnerPlanta: 0,
    spinnerBombaEstacionaria: 0,
};

//validaciones con yup
export const validaciones = yup.object().shape({
    numeroOT: yup.number().required('El numero de OT es obligatorio!'),
    descripcionTrabajoRealizar: yup
        .string()
        .required('La descripcion es obligatoria!'),
    spinnerUbicacion: yup.string().required('La ubicacion es obligatoria!'),
    Equipo: yup.string().required('El equipo es obligatorio!'),
    Placa: yup.string().required('La placa es obligatoria!'),
    Horometro: yup.string().required('El Horometro es obligatorio!'),
    Kilometraje: yup.string().required('El kilometraje es obligatorio!'),
    Observaciones: yup.string().required('Las observaciones son obligatorias!'),
    n_cotizacion: yup.string().required('El numero de cotizacón es obligatoria!'),
    vigencia: yup.string().required('La vigencia es obligatoria!'),
    tiempo_lugar: yup.string().required('El tiempo de entrega es obligatorio!'),
    att: yup.string().required('Por parte de quien?'),
});
