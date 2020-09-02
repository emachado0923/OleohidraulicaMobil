'use strict';
//Formulario de MantenimientoLocal
import React from 'react';
import {ScrollView, Text, Dimensions, TextInput, TouchableOpacity, Picker, Image, View} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import style from '../../styles/ScheduleStyle';


//Datepicker
import DateTimePicker from "react-native-modal-datetime-picker";
//Para hacer formularios mas sencillo
import {Formik} from 'formik';
//Constantes
import {NuevoMantenimiento, validaciones} from '../../Constants/MaintenanceConstants';
//ImagePicker
import ImagePicker from "react-native-image-picker";
//native base
import {Textarea, Root, Toast, Text as TxT, Button} from "native-base";
import {Col, Grid} from "react-native-easy-grid";
//moment
import moment from 'moment';

import RNFetchBlob from "rn-fetch-blob";


export default class MaintenanceForm extends React.Component {

    constructor(props) {
        super(props);
        //cada arreglo es para almacenar datos externos del servidor
        this.state = {

            clientesArray: [],
            autobombaArray: [],
            mixerArray: [],
            cargadorArray: [],
            bombaArray: [],
            plantaArray: [],

            //viaticos
            ViaticosArray: [],
            especialidadArray: [],
            total1: 0,
            fecha: '',


            //Mano de obra
            ManoObraArray: [],
            especialidad2Array: [],
            personal1: 0,
            diurno: 0,
            nocturno: 0,
            festivo: 0,
            horasTrabajadas: 0,
            fecha2: '',
            total2: 0,

            //Repuestos
            RepuestosArray: [],
            DescripcionRepo: '',
            Cantidad: '',
            ValorUni: '',
            AIU: '',
            total3: 0,

            //TrabajosExternos
            TrabajosExternos: [],
            trabajoDescripcion: '',
            costoTrabajo: '',
            aiuTrabajo: '',
            total4: 0,


            //total sin el iva
            grandSubTotal: 0,
            IVA: 19,
            grandTotal: 0,


            //estado de cotizacion
            radioGroupCotizacionEstado: '',
            //foto evidencias
            foto: null,
            album: [],


            fechaIngreso: '',
            horaIngreso: '',
            fechaSalida: '',
            horaSalida: '',
            fecha_cotizacion: '',

            Mantenimiento: []

        }
    }


    componentDidMount(): void {
        this._getItems()
    }


    //Datos para los picker
    _getItems = () => {

        AsyncStorage.getItem('clientes', (err, res) => {
            this.setState({clientesArray: JSON.parse(res)})
        });

        AsyncStorage.getItem('autobomba', (err, res) => {
            this.setState({autobombaArray: JSON.parse(res)})
        });
        AsyncStorage.getItem('mixer', (err, res) => {
            this.setState({mixerArray: JSON.parse(res)})
        });
        AsyncStorage.getItem('cargador', (err, res) => {
            this.setState({cargadorArray: JSON.parse(res)})
        });
        AsyncStorage.getItem('bomba', (err, res) => {
            this.setState({bombaArray: JSON.parse(res)})
        });
        AsyncStorage.getItem('planta', (err, res) => {
            this.setState({plantaArray: JSON.parse(res)})
        });

        AsyncStorage.getItem('especialidad', (err, res) => {
            this.setState({especialidadArray: JSON.parse(res)})
        });

        AsyncStorage.getItem('especialidad', (err, res) => {
            this.setState({especialidad2Array: JSON.parse(res),})
        });
    };

    _SaveMaintenance = async (values) => {
        let id = 0
        const {
            album,
            fechaIngreso,
            horaIngreso,
            fechaSalida,
            horaSalida,
            fecha_cotizacion
        } = this.state
        let AlbumValido = false
        let FechasValidas = false
        let MaximoFotos = false

        if (album.length === 0) {
            Toast.show({
                text: 'Las fotos son obligatorias',
                buttonText: "❗",
                type: "danger",
                position: "top",
                duration: 5000
            })
            AlbumValido = true
        } else if (album.length <= 5) {
            Toast.show({
                text: 'Minimo 6 fotos',
                buttonText: "❗",
                type: "danger",
                position: "top",
                duration: 5000
            })
            MaximoFotos = true
        }
        if (fechaIngreso === '' || horaIngreso === '' || fechaSalida === '' || horaSalida === '' || fecha_cotizacion === '') {
            Toast.show({
                text: 'Todas las fechas son obligatorias',
                buttonText: "❗",
                type: "danger",
                position: "top",
                duration: 5000
            })
            FechasValidas = true
        }


        if (!FechasValidas && !AlbumValido && !MaximoFotos) {
            const guardar = {
                'id': id++,
                'ContactoCliente': values.ContactoCliente,
                'n_cotizacion': values.n_cotizacion,
                'numeroOT': values.numeroOT,
                'descripcionTrabajoRealizar': values.descripcionTrabajoRealizar,
                'Equipo': values.Equipo,
                'estado_cotizacion': values.estado_cotizacion,
                'Placa': values.Placa,
                'spinnerUbicacion': values.spinnerUbicacion,
                'Horometro': values.Horometro,
                'Kilometraje': values.Kilometraje,
                'spinnerMixer': values.spinnerMixer,
                'spinnerAutobomba': values.spinnerAutobomba,
                'spinnerCargador': values.spinnerCargador,
                'spinnerBombaEstacionaria': values.spinnerBombaEstacionaria,
                'spinnerPlanta': values.spinnerPlanta,
                'Observaciones': values.Observaciones,
                'forma_de_pago': values.forma_de_pago,
                'vigencia': values.vigencia,
                'tiempo_lugar': values.tiempo_lugar,
                'att': values.att,

                //Fechas y horas
                'fechaIngreso': this.state.fechaIngreso,
                'horaIngreso': this.state.horaIngreso,
                'fechaSalida': this.state.fechaSalida,
                'horaSalida': this.state.horaSalida,
                'fecha_cotizacion': this.state.fecha_cotizacion,

                //Fotos
                'evidencias': this.state.album,

                //Externos
                'Viaticos': this.state.ViaticosArray,
                'Repuestos': this.state.RepuestosArray,
                'TrabajosExternos': this.state.TrabajosExternos,
                'ManoObra': this.state.ManoObraArray,

                //Totales
                'totalTrabajos_e': this.state.total4,
                'totalRepuestos': this.state.total3,
                'totalCostos_v': this.state.total1,
                'totalMano_o': this.state.total2,
                'subTotal': this.state.grandSubTotal,
                'IVA': this.state.IVA,
                'grandTotal': this.state.grandTotal,
            }
            let almacenados = await AsyncStorage.getItem('Mantenimiento1') || '[]'
            almacenados = JSON.parse(almacenados)
            almacenados.push(guardar)
            AsyncStorage.setItem('Mantenimiento1', JSON.stringify(almacenados)).then(() => {
                console.log(almacenados)
                Toast.show({
                    text: "Guardado con exito!",
                    buttonText: "✔",
                    type: "success",
                    position: "top",
                    duration: 5000
                })
            })
        }


    }

    _añadirFoto = async () => {

        ImagePicker.showImagePicker({noData: true, mediaType: 'photo'}, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('Image picker cancelado');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {


                const image = {
                    'path': response.path,
                    'fileName': response.fileName,
                    'uri': response.uri
                }

                if (this.state.album.length >= 6) {
                    Toast.show({
                        text: "solo se permiten 6 imagenes!",
                        buttonText: "❗",
                        type: "danger",
                        position: "top",
                        duration: 5000
                    })
                    return false
                }

                this.setState({
                    album: [...this.state.album, image]
                });

                this.state.album.map((item) => {

                    const path = `${RNFetchBlob.fs.dirs.CacheDir}/foto.jpg`
                    console.log('path', path)
                    try {
                        RNFetchBlob.fs.writeFile(path, item.uri, "base64")

                    } catch (e) {
                        console.log(e)
                    }

                })

                console.log(this.state.album)
            }
        });
    };


//Viaticos
    _Fecha = (inicial) => {

        let fecha = moment(inicial).locale('es').format('YYYY-MM-DD')
        console.log('La hora inicial  seleccionada es: ', fecha);
        this.setState({fecha})
        this._hideDate();
    }
    _showDate = () => this.setState({isDatePickerVisible5: true});
    _hideDate = () => this.setState({isDatePickerVisible5: false});

//Mano de obra
    _Fecha2 = (inicial) => {

        let fecha2 = moment(inicial).locale('es').format('YYYY-MM-DD')
        console.log('La hora inicial  seleccionada es: ', fecha2);

        this.setState({fecha2})
        this._hideDate();
    }
    _showDate2 = () => this.setState({isDatePickerVisible4: true});
    _hideDate2 = () => this.setState({isDatePickerVisible4: false});


//Hora inicial
    _HoraInicial = (date) => {
        console.log('La hora inicial  seleccionada es: ', date);

        let horaIngreso = moment(date).format('hh:mm a')

        this.setState({horaIngreso})

        this._hideTimePicker();
    };
    _showTimePicker = () => this.setState({isDateTimePickerVisible: true});
    _hideTimePicker = () => this.setState({isDateTimePickerVisible: false});

//Hora final
    _HoraFinal = (date2) => {
        console.log('La hora final seleccionada es: ', date2);

        let horaSalida = moment(date2).format('hh:mm a')

        this.setState({horaSalida})

        this._hideTimePicker2();
    };
    _showTimePicker2 = () => this.setState({isDateTimePickerVisible2: true});
    _hideTimePicker2 = () => this.setState({isDateTimePickerVisible2: false});

//Fecha Inicial
    _FechaInicial = (inicial) => {

        let fechaIngreso = moment(inicial).locale('es').format('YYYY-MM-DD')
        console.log('La hora inicial  seleccionada es: ', fechaIngreso);

        this.setState({fechaIngreso})
        this._hideDatePicker();
    }
    _showDatePicker = () => this.setState({isDatePickerVisible: true});
    _hideDatePicker = () => this.setState({isDatePickerVisible: false});

//Fecha Final
    _FechaFinal = (final) => {


        let fechaSalida = moment(final).locale('es').format('YYYY-MM-DD')
        console.log('La hora inicial  seleccionada es: ', fechaSalida);

        this.setState({fechaSalida})
        this._hideDatePicker2();

    }
    _showDatePicker2 = () => this.setState({isDatePickerVisible2: true});
    _hideDatePicker2 = () => this.setState({isDatePickerVisible2: false});

//Fecha de Cotización
    _FechaCotizacion = (Cotización) => {


        let fecha_cotizacion = moment(Cotización).locale('es').format('YYYY-MM-DD')
        console.log('La fecha seleccionada es: ', fecha_cotizacion);

        this.setState({fecha_cotizacion})
        this._hideDatePicker3();
    }
    _showDatePicker3 = () => this.setState({isDatePickerVisible3: true});
    _hideDatePicker3 = () => this.setState({isDatePickerVisible3: false});

    header() {
        return (
            <View>
                <TouchableOpacity style={style.CloseButton}
                                  onPress={() => this.props.navigation.goBack(null)}>
                    <Text style={style.TextB}>
                        <Icon name={'angle-down'} size={18}/> Cancelar
                    </Text>
                </TouchableOpacity>
                <View style={style.modalHeader}>
                    <Text style={{color: 'white', fontSize: 18, padding: 20,}}>
                        <Icon name={'toolbox'} size={25}/> Nuevo Mantenimiento
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        const {total1, total2, total3, total4, grandTotal, grandSubTotal, IVA} = this.state;

        return (
            <Root>
                {this.header()}
                <Formik initialValues={NuevoMantenimiento}
                        onSubmit={values => this._SaveMaintenance(values)}
                        validationSchema={validaciones}>
                    {({values, handleChange, errors, setFieldTouched, touched, handleSubmit}) => (
                        <ScrollView style={style.modalCard}>
                            <View style={style.modalBody}>
                                <View>
                                    {/*Orden de trabajo*/}
                                    <View>
                                        <View style={{margin: 5}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}>
                                                Orden de Trabajo:
                                            </Text>

                                            <View style={style.stylePicker}>
                                                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                                                    Forma de pago
                                                </Text>
                                                <Picker selectedValue={values.forma_de_pago}
                                                        onValueChange={handleChange('forma_de_pago')}
                                                        onBlur={() => setFieldTouched('forma_de_pago')}>

                                                    <Picker.Item label={'30 DIAS'} value={'30 DIAS'}/>
                                                    <Picker.Item label={'15 DIAS'} value={'15 DIAS'}/>
                                                    <Picker.Item label={'50% ANTICIPO-50% CONTRA ENTREGA'}
                                                                 value={'50% ANTICIPO-50% CONTRA ENTREGA'}/>

                                                </Picker>

                                            </View>
                                            <TextInput onChangeText={handleChange('vigencia')}
                                                       onBlur={() => setFieldTouched('vigencia')}
                                                       value={values.vigencia} style={style.InputS}
                                                       returnKeyType="next" placeholder={'Vigencia'}/>

                                            {touched.vigencia && errors.vigencia &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={20}/> {errors.vigencia}
                                            </Text>
                                            }
                                            <TextInput onChangeText={handleChange('tiempo_lugar')}
                                                       onBlur={() => setFieldTouched('tiempo_lugar')}
                                                       value={values.tiempo_lugar} style={style.InputS}
                                                       returnKeyType="next" placeholder={'Lugar y tiempo de entrega'}/>

                                            {touched.tiempo_lugar && errors.tiempo_lugar &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={20}/> {errors.tiempo_lugar}
                                            </Text>
                                            }
                                            <TextInput onChangeText={handleChange('att')}
                                                       onBlur={() => setFieldTouched('att')}
                                                       value={values.att} style={style.InputS}
                                                       returnKeyType="next" placeholder={'Atentamente'}/>

                                            {touched.att && errors.att &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={20}/> {errors.att}
                                            </Text>
                                            }

                                        </View>

                                    </View>
                                    <View style={{alignItems: 'center', margin: 5}}>
                                        <Text style={{fontWeight: 'bold', fontSize: 15}}>Cotización:</Text>
                                    </View>

                                    {/*Cliente*/}
                                    <View style={style.stylePicker}>
                                        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                                            Seleccione un cliente
                                        </Text>

                                        <View>
                                            <Picker selectedValue={values.ContactoCliente}
                                                    onValueChange={handleChange('ContactoCliente')}
                                                    onBlur={() => setFieldTouched('ContactoCliente')}>
                                                {this.state.clientesArray.map((item, key) =>
                                                    (
                                                        <Picker.Item label={item.cliente} value={item.cliente}
                                                                     key={key}/>)
                                                )}
                                            </Picker>

                                        </View>

                                    </View>
                                    {/*Estado Cotizacion*/}
                                    <View style={style.stylePicker}>
                                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Estado Cotizacion</Text>

                                        <Picker selectedValue={values.estado_cotizacion}
                                                onValueChange={handleChange('estado_cotizacion')}
                                                onBlur={() => setFieldTouched('estado_cotizacion')}>

                                            <Picker.Item label={'INICIAL'} value={'INICIAL'}/>
                                            <Picker.Item label={'FINAL'} value={'FINAL'}/>

                                        </Picker>
                                    </View>
                                    {/*fecha Cotizacion*/}
                                    <View style={style.timeContainer}>
                                        <Grid>
                                            <Col>
                                                <TouchableOpacity style={{margin: 3}} onPress={this._showDatePicker3}>
                                                    <Text style={{fontWeight: 'bold'}}>
                                                        <Icon name={'calendar-day'} size={25}/> Fecha de Cotización:
                                                    </Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col>
                                                <Text style={style.horaTexto}>
                                                    {this.state.fecha_cotizacion}
                                                </Text>
                                                <DateTimePicker
                                                    isVisible={this.state.isDatePickerVisible3}
                                                    onConfirm={this._FechaCotizacion}
                                                    onCancel={this._hideDatePicker3}
                                                    mode={'date'}
                                                    animationType={"fade"}
                                                />
                                            </Col>
                                        </Grid>
                                    </View>

                                    <TextInput onChangeText={handleChange('n_cotizacion')}
                                               onBlur={() => setFieldTouched('n_cotizacion')}
                                               value={values.n_cotizacion} style={style.InputS}
                                               placeholder={'Numero de Cotizacion'}
                                               keyboardType={'number-pad'} returnKeyType={'next'}/>

                                    {touched.n_cotizacion && errors.n_cotizacion &&
                                    <Text style={{fontSize: 15, color: 'red'}}>
                                        <Icon name={'exclamation-circle'} size={20}/> {errors.n_cotizacion}
                                    </Text>
                                    }

                                    <TextInput onChangeText={handleChange('numeroOT')}
                                               onBlur={() => setFieldTouched('numeroOT')}
                                               value={values.numeroOT} style={style.InputS}
                                               returnKeyType="next" placeholder={'Numero de OT'}
                                               keyboardType={'number-pad'}
                                    />

                                    {touched.numeroOT && errors.numeroOT &&
                                    <Text style={{fontSize: 15, color: 'red'}}>
                                        <Icon name={'exclamation-circle'} size={20}/> {errors.numeroOT}
                                    </Text>
                                    }
                                </View>

                                <View style={style.lineaSeparadora}/>
                                { /* Trabajo a realizar */}
                                <View style={{alignItems: 'center', margin: 5}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Trabajo a realizar:</Text>
                                </View>

                                <View>

                                    <Textarea onChangeText={handleChange('descripcionTrabajoRealizar')}
                                              style={style.StyleTextArea} rowSpan={3}
                                              onBlur={() => setFieldTouched('descripcionTrabajoRealizar')}
                                              value={values.descripcionTrabajoRealizar}
                                              placeholder={'Descripción del trabajo'}
                                              bordered underline/>
                                    {touched.descripcionTrabajoRealizar && errors.descripcionTrabajoRealizar &&
                                    <Text style={{fontSize: 15, color: 'red'}}>
                                        <Icon name={'exclamation-circle'}
                                              size={20}/> {errors.descripcionTrabajoRealizar}
                                    </Text>
                                    }

                                    <TextInput onChangeText={handleChange('Equipo')} style={style.InputS}
                                               onBlur={() => setFieldTouched('Equipo')}
                                               value={values.Equipo}
                                               returnKeyType="next" placeholder={'Equipo'}/>

                                    {touched.Equipo && errors.Equipo &&
                                    <Text style={{fontSize: 15, color: 'red'}}>
                                        <Icon name={'exclamation-circle'} size={20}/> {errors.Equipo}
                                        <Text>&nbsp;</Text>
                                    </Text>
                                    }
                                </View>

                                <View style={style.RowGrid}>

                                    <View style={style.timeContainer}>
                                        <View style={{justifyContent: 'center',}}>
                                            <TouchableOpacity style={{margin: 3}} onPress={this._showDatePicker}>
                                                <Text style={{fontWeight: 'bold'}}>
                                                    <Icon name={'calendar-day'} size={25}/> Fecha de ingreso:
                                                </Text>
                                            </TouchableOpacity>

                                            <Text style={style.horaTexto}>{this.state.fechaIngreso}
                                            </Text>
                                        </View>
                                        <DateTimePicker
                                            isVisible={this.state.isDatePickerVisible}
                                            onConfirm={this._FechaInicial}
                                            onCancel={this._hideDatePicker}
                                            mode={'date'}
                                            animationType={"fade"}
                                        />
                                    </View>


                                    <View style={style.timeContainer}>

                                        <View style={{justifyContent: 'center',}}>
                                            <TouchableOpacity style={{margin: 3}} onPress={this._showDatePicker2}>
                                                <Text style={{fontWeight: 'bold'}}>
                                                    <Icon name={'calendar-check'} size={25}/> Fecha de salida:
                                                </Text>
                                            </TouchableOpacity>

                                            <Text style={style.horaTexto}>
                                                {this.state.fechaSalida}
                                            </Text>
                                        </View>

                                        <DateTimePicker isVisible={this.state.isDatePickerVisible2}
                                                        onConfirm={this._FechaFinal}
                                                        onCancel={this._hideDatePicker2}
                                                        mode={'date'}
                                                        animationType={"fade"}
                                        />
                                    </View>


                                </View>

                                <View style={style.RowGrid}>

                                    {/* Hora Inicial */}
                                    <View style={style.timeContainer}>
                                        <View style={{justifyContent: 'center',}}>
                                            <TouchableOpacity style={{margin: 3}} onPress={this._showTimePicker}>
                                                <Text style={{fontWeight: 'bold'}}>
                                                    <Icon name={'clock'} size={25}/> Hora de ingreso:
                                                </Text>
                                            </TouchableOpacity>

                                            <Text style={style.horaTexto}>
                                                {this.state.horaIngreso}
                                            </Text>
                                        </View>
                                        <DateTimePicker
                                            isVisible={this.state.isDateTimePickerVisible}
                                            onConfirm={this._HoraInicial}
                                            onCancel={this._hideTimePicker}
                                            mode={'time'}
                                            animationType={"fade"}
                                        />
                                    </View>

                                    {/*  Hora Final */}
                                    <View style={style.timeContainer}>
                                        <TouchableOpacity style={{margin: 3}} onPress={this._showTimePicker2}>
                                            <Text style={{fontWeight: 'bold'}}>
                                                <Icon name={'clock'} size={25}/> Hora de Salida:
                                            </Text>
                                        </TouchableOpacity>
                                        <Text style={style.horaTexto}>
                                            {this.state.horaSalida}
                                        </Text>
                                        <DateTimePicker
                                            isVisible={this.state.isDateTimePickerVisible2}
                                            onConfirm={this._HoraFinal}
                                            onCancel={this._hideTimePicker2}
                                            mode={'time'}
                                            animationType={"fade"}
                                        />
                                    </View>
                                </View>

                                { /* Ubicaciones */}

                                <TextInput onChangeText={handleChange('spinnerUbicacion')}
                                           onBlur={() => setFieldTouched('spinnerUbicacion')}
                                           value={values.spinnerUbicacion} style={style.InputS}
                                           returnKeyType="next" placeholder={'Ingrese la ubicación'}/>

                                {touched.spinnerUbicacion && errors.spinnerUbicacion &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.spinnerUbicacion}
                                    <Text>&nbsp;</Text>
                                </Text>
                                }

                                <TextInput onChangeText={handleChange('Placa')}
                                           onBlur={() => setFieldTouched('Placa')}
                                           value={values.Placa} style={style.InputS}
                                           returnKeyType="next" placeholder={'Placa'}/>

                                {touched.Placa && errors.Placa &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/>
                                    {errors.Placa}
                                    <Text>&nbsp;</Text>
                                </Text>
                                }

                                <TextInput onChangeText={handleChange('Horometro')}
                                           onBlur={() => setFieldTouched('Horometro')}
                                           value={values.Horometro} style={style.InputS}
                                           keyboardType={'numeric'} returnKeyType="next"
                                           placeholder={'Horometro'}/>

                                {touched.Horometro && errors.Horometro &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.Horometro}
                                    <Text>&nbsp;</Text>
                                </Text>
                                }

                                <TextInput onChangeText={handleChange('Kilometraje')}
                                           onBlur={() => setFieldTouched('Kilometraje')}
                                           style={style.InputS} value={values.Kilometraje}
                                           returnKeyType="next" placeholder={'Kilometraje'}/>

                                {touched.Kilometraje && errors.Kilometraje &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.Kilometraje}
                                    <Text>&nbsp;</Text>
                                </Text>
                                }

                                <View style={style.lineaSeparadora}/>

                                { /* Sistema */}

                                <View style={{alignItems: 'center', margin: 5}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Sistema:</Text>
                                </View>

                                { /* Cada picker es un selector diferente */}
                                <View style={style.stylePicker}>
                                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                                        Mixer
                                    </Text>
                                    <Picker selectedValue={values.spinnerMixer}
                                            onValueChange={handleChange('spinnerMixer')}
                                            onBlur={() => setFieldTouched('spinnerMixer')}>

                                        {this.state.mixerArray.map((item, key) => (
                                            <Picker.Item label={item.nombre_mixer} value={item.nombre_mixer}
                                                         key={key}/>),
                                        )}
                                    </Picker>
                                </View>

                                {touched.spinnerMixer && errors.spinnerMixer &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.spinnerMixer}
                                    <Text>&nbsp;</Text>
                                </Text>
                                }

                                <View style={style.stylePicker}>
                                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                                        Autobomba
                                    </Text>
                                    <Picker selectedValue={values.spinnerAutobomba}
                                            onValueChange={handleChange('spinnerAutobomba')}
                                            onBlur={() => setFieldTouched(spinnerAutobomba)}>

                                        {this.state.autobombaArray.map((item, key) => (
                                            <Picker.Item label={item.nombre_autobomba} value={item.nombre_autobomba}
                                                         key={key}/>),
                                        )}
                                    </Picker>
                                </View>

                                {touched.spinnerAutobomba && errors.spinnerAutobomba &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.spinnerAutobomba}
                                    <Text>&nbsp;</Text>
                                </Text>
                                }

                                <View style={style.stylePicker}>
                                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                                        Cargador
                                    </Text>
                                    <Picker selectedValue={values.spinnerCargador}
                                            onValueChange={handleChange('spinnerCargador')}
                                            onBlur={() => setFieldTouched(spinnerCargador)}>

                                        {this.state.cargadorArray.map((item, key) => (
                                            <Picker.Item label={item.nombre_cargador} value={item.nombre_cargador}
                                                         key={key}/>),
                                        )}
                                    </Picker>
                                </View>

                                {touched.spinnerCargador && errors.spinnerCargador &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.spinnerCargador}
                                    <Text>&nbsp;</Text>
                                </Text>
                                }

                                <View style={style.stylePicker}>
                                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                                        Bomba Estacionaria
                                    </Text>

                                    <Picker selectedValue={values.spinnerBombaEstacionaria}
                                            onValueChange={handleChange('spinnerBombaEstacionaria')}
                                            onBlur={() => setFieldTouched(spinnerBombaEstacionaria)}>

                                        {this.state.bombaArray.map((item, key) => (
                                            <Picker.Item label={item.nombre_bomba} value={item.nombre_bomba}
                                                         key={key}/>),
                                        )}
                                    </Picker>
                                </View>

                                {touched.spinnerBombaEstacionaria && errors.spinnerBombaEstacionaria &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.spinnerBombaEstacionaria}
                                    <Text>&nbsp;</Text>
                                </Text>
                                }
                                <View style={style.stylePicker}>
                                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                                        Planta
                                    </Text>
                                    <Picker selectedValue={values.spinnerPlanta}
                                            onValueChange={handleChange('spinnerPlanta')}
                                            onBlur={() => setFieldTouched(spinnerPlanta)}>

                                        {this.state.plantaArray.map((item, key) => (
                                            <Picker.Item label={item.nombre_planta} value={item.nombre_planta}
                                                         key={key}/>),
                                        )}
                                    </Picker>
                                </View>

                                {touched.spinnerPlanta && errors.spinnerPlanta &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.spinnerPlanta}
                                    <Text>&nbsp;</Text>
                                </Text>
                                }


                                <View style={style.lineaSeparadora}/>
                                { /* Viaticos */}
                                <View>
                                    <View>
                                        <View style={{alignItems: 'center', margin: 5}}>
                                            <Text style={style.Titulos}>Viaticos:</Text>
                                        </View>


                                        <TextInput style={style.InputS}
                                                   onChangeText={(personal) => this.setState({personal})}
                                                   returnKeyType="next" keyboardType={'numeric'}
                                                   placeholder={'Personal'} value={this.state.personal}
                                        />

                                        <View style={style.timeContainer}>
                                            <Grid>
                                                <Col>
                                                    <TouchableOpacity style={{margin: 3}} onPress={this._showDate}>
                                                        <Text style={{fontWeight: 'bold'}}>
                                                            <Icon name={'calendar-day'} size={25}/> Fecha :
                                                        </Text>
                                                    </TouchableOpacity>
                                                </Col>
                                                <Col>
                                                    <Text style={style.horaTexto}>
                                                        {this.state.fecha}
                                                    </Text>
                                                    <DateTimePicker
                                                        isVisible={this.state.isDatePickerVisible5}
                                                        onConfirm={this._Fecha}
                                                        onCancel={this._hideDate}
                                                        mode={'date'}
                                                        locale={'es-ES'}
                                                        animationType={"fade"}
                                                    />

                                                </Col>
                                            </Grid>
                                        </View>
                                        <View style={style.stylePicker}>
                                            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                                                Expecialidad
                                            </Text>
                                            <Picker selectedValue={this.state.especialidad}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({especialidad: itemValue})}>

                                                {this.state.especialidadArray.map((item, key) => (
                                                    <Picker.Item label={item.id + ' - ' + item.nombre_especialidad}
                                                                 keyboardType={'numeric'}
                                                                 value={item.id} key={key}/>),
                                                )}
                                            </Picker>
                                        </View>

                                        <View style={style.RowGrid}>
                                            <TextInput style={style.InpuTime}
                                                       onChangeText={(hotel) => this.setState({hotel})}
                                                       keyboardType={'numeric'} returnKeyType="next"
                                                       placeholder={'Hotel'} value={this.state.hotel}
                                            />
                                            <Text>&nbsp;</Text>
                                            <TextInput style={style.InpuTime}
                                                       onChangeText={(alimentacion) => this.setState({alimentacion})}
                                                       keyboardType={'numeric'} returnKeyType="next"
                                                       placeholder={'Alimentacion'}
                                                       value={this.state.alimentacion}
                                            />
                                        </View>

                                        <TextInput style={style.InputS}
                                                   onChangeText={(transporte) => this.setState({transporte})}
                                                   returnKeyType="next" keyboardType={'numeric'}
                                                   placeholder={'Transporte'} value={this.state.transporte}
                                        />
                                    </View>

                                    { /* Boton para añadir viaticos */}
                                    <TouchableOpacity style={style.PlusButton} onPress={this.addViatico}>
                                        <Text style={style.TextB}>
                                            <Icon name={'plus'} size={20}/>
                                        </Text>
                                    </TouchableOpacity>

                                    <View style={style.contenedorTrabajos}>

                                        {/*Aqui se lista los objetos almacenados en el arreglo*/}
                                        {this.state.ViaticosArray.map((item, key) => (
                                            <ScrollView style={{alignSelf: 'stretch'}}>

                                                <View style={style.DinamicTable}>

                                                    <Text style={{alignItems: 'stretch', right: 10}} key={key}>
                                                        <Icon name={'wrench'} size={15}/>&nbsp;
                                                        Personal: {item.numero_personas}&nbsp;
                                                        Especialidad: {item.especialidad} Subtotal: {item.subtotal}&nbsp;
                                                    </Text>

                                                    {/*Boton para eliminar un viatico*/}
                                                    <TouchableOpacity style={style.minusButton}
                                                                      onPress={this.removeViatico.bind(this, item)}>
                                                        <Text style={style.TextB}>
                                                            <Icon name={'minus'} size={15}/>
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>

                                            </ScrollView>
                                        ))}
                                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                                            <Icon name={'dollar-sign'} color={'#24b62b'} size={15}/>
                                            Total: {total1}
                                        </Text>
                                    </View>
                                </View>

                                <View style={style.lineaSeparadora}/>
                                { /* Mano de obra */}
                                <View>

                                    <View style={{alignItems: 'center', margin: 5}}>
                                        <Text style={style.Titulos}>Mano de obra:</Text>
                                    </View>


                                    <TextInput style={style.InputS} returnKeyType="next" keyboardType={'numeric'}
                                               placeholder={'Personal'} value={this.state.personal1 || ''}
                                               onChangeText={(personal1) => this.setState({personal1})}/>

                                    <View style={style.timeContainer}>
                                        <Grid>
                                            <Col>
                                                <TouchableOpacity style={{margin: 3}} onPress={this._showDate2}>

                                                    <Text style={{fontWeight: 'bold'}}>
                                                        <Icon name={'calendar-day'} size={25}/> Fecha:
                                                    </Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col>
                                                <Text style={style.horaTexto}>
                                                    {this.state.fecha2}
                                                </Text>
                                                <DateTimePicker
                                                    isVisible={this.state.isDatePickerVisible4}
                                                    onConfirm={this._Fecha2}
                                                    onCancel={this._hideDate2}
                                                    mode={'date'}
                                                    animationType={"fade"}
                                                />
                                            </Col>
                                        </Grid>


                                    </View>


                                    <View style={style.stylePicker}>
                                        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                                            Expecialidad
                                        </Text>
                                        <Picker selectedValue={this.state.especialidad2}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    this.setState({especialidad2: itemValue})}>

                                            {this.state.especialidad2Array.map((item, key) => (
                                                <Picker.Item label={item.id + ' - ' + item.nombre_especialidad}
                                                             value={item.id}
                                                             key={key}/>),
                                            )}
                                        </Picker>
                                    </View>

                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>

                                        <TextInput style={style.InpuTime} keyboardType={'numeric'} returnKeyType="next"
                                                   placeholder={'Diurno'} value={this.state.diurno || 0}
                                                   onChangeText={(diurno) => this.setState({diurno})}/>

                                        <Text>&nbsp;</Text>

                                        <TextInput style={style.InpuTime} keyboardType={'numeric'} returnKeyType="next"
                                                   placeholder={'Nocturno'} value={this.state.nocturno}
                                                   onChangeText={(nocturno) => this.setState({nocturno})}/>
                                    </View>

                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>

                                        <TextInput style={style.InpuTime} keyboardType={'numeric'} returnKeyType="next"
                                                   placeholder={'Festivo'} value={this.state.festivo}
                                                   onChangeText={(festivo) => this.setState({festivo})}/>
                                        <Text>&nbsp;</Text>

                                        <TextInput style={style.InpuTime} keyboardType={'numeric'} returnKeyType="next"
                                                   placeholder={'Horas Trabajadas'}
                                                   value={this.state.horasTrabajadas || ''}
                                                   onChangeText={(horasTrabajadas) => this.setState({horasTrabajadas})}/>
                                    </View>

                                    { /*Boton para añadir Mano de obra */}
                                    <TouchableOpacity style={style.PlusButton} onPress={this.addManoObra}>
                                        <Text style={style.TextB}>
                                            <Icon name={'plus'} size={20}/>
                                        </Text>
                                    </TouchableOpacity>


                                    <View style={style.contenedorTrabajos}>

                                        {this.state.ManoObraArray.map((item, key) => (

                                            <ScrollView style={{alignSelf: 'stretch'}}>
                                                <View style={style.DinamicTable}>

                                                    <Text style={{alignItems: 'stretch', right: 10}} key={key}>
                                                        <Icon name={'user'} size={15}/>&nbsp;
                                                        Personal:{item.personal}&nbsp;Especialidad: {item.especialidad} Subtotal: {item.subtotal}
                                                    </Text>
                                                    {/*Boton para eliminar una mano de obra*/}
                                                    <TouchableOpacity style={style.minusButton}
                                                                      onPress={this.removeManoObra.bind(this, item)}>
                                                        <Text style={style.TextB}>
                                                            <Icon name={'minus'} size={15}/>
                                                        </Text>
                                                    </TouchableOpacity>

                                                </View>

                                            </ScrollView>))}
                                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                                            <Icon name={'dollar-sign'}
                                                  color={'#24b62b'}
                                                  size={15}/> Total: {total2}
                                        </Text>
                                    </View>
                                </View>

                                <View style={style.lineaSeparadora}/>
                                {/*Trabajos externos*/}
                                <View>
                                    <Text style={style.Titulos}>
                                        Trabajos externos:
                                    </Text>
                                    <TextInput style={style.InputS} returnKeyType="next"
                                               placeholder={'Descripción'} value={this.state.trabajoDescripcion || 0}
                                               onChangeText={(trabajoDescripcion) => this.setState({trabajoDescripcion})}/>

                                    <TextInput style={style.InputS} returnKeyType="next" keyboardType={'numeric'}
                                               placeholder={'Costo'} value={this.state.costoTrabajo || 0}
                                               onChangeText={(costoTrabajo) => this.setState({costoTrabajo})}/>

                                    <TextInput style={style.InputS} returnKeyType="next" keyboardType={'numeric'}
                                               placeholder={'AIU%'} value={this.state.aiuTrabajo || 0}
                                               onChangeText={(aiuTrabajo) => this.setState({aiuTrabajo})}/>

                                    { /*Boton para añadir ordenes de trabajo */}
                                    <TouchableOpacity style={style.PlusButton} onPress={this.addExternos}>
                                        <Text style={style.TextB}>
                                            <Icon name={'plus'} size={20}/>
                                        </Text>
                                    </TouchableOpacity>

                                    <View style={style.contenedorTrabajos}>

                                        {this.state.TrabajosExternos.map((item, key) => (

                                            <ScrollView style={{alignSelf: 'stretch'}}>
                                                <View style={style.DinamicTable}>

                                                    <Text style={{alignItems: 'stretch', right: 10}} key={key}>
                                                        <Icon name={'tools'} size={15}/>
                                                        &nbsp;Descripción: {item.descripcion} &nbsp;Costo:{item.costo} Valor: {item.valor}
                                                    </Text>
                                                    {/*Boton para eliminar una mano de obra*/}
                                                    <TouchableOpacity style={style.minusButton}
                                                                      onPress={this.removeExternos.bind(this, item)}>
                                                        <Text style={style.TextB}>
                                                            <Icon name={'minus'} size={15}/>
                                                        </Text>
                                                    </TouchableOpacity>

                                                </View>

                                            </ScrollView>))}
                                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                                            <Icon name={'dollar-sign'}
                                                  color={'#24b62b'}
                                                  size={15}/> Total: {total4}
                                        </Text>
                                    </View>

                                </View>


                                <View style={style.lineaSeparadora}/>
                                {/*Repuestos*/}
                                <View>

                                    <View style={{alignItems: 'center', margin: 5}}>
                                        <Text style={style.Titulos}>Repuestos:</Text>
                                    </View>

                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>


                                        <TextInput style={style.InputS}
                                                   onChangeText={(Cantidad) => this.setState({Cantidad})}
                                                   keyboardType={'numeric'} returnKeyType="next"
                                                   placeholder={'Cantidad'} value={this.state.Cantidad}
                                        />
                                    </View>

                                    <TextInput style={style.InputS}
                                               onChangeText={(DescripcionRepo) => this.setState({DescripcionRepo})}
                                               numberOfLines={4} value={this.state.DescripcionRepo}
                                               multiline returnKeyType="next" placeholder={'Descripción del repuesto'}/>

                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>

                                        <TextInput style={style.InpuTime}
                                                   onChangeText={(ValorUni) => this.setState({ValorUni})}
                                                   keyboardType={'numeric'} returnKeyType="next"
                                                   placeholder={'Valor Unitario'} value={this.state.ValorUni}
                                        />
                                        <Text>&nbsp;</Text>

                                        <TextInput style={style.InpuTime} onChangeText={(AIU) => this.setState({AIU})}
                                                   keyboardType={'numeric'} returnKeyType="next"
                                                   placeholder={'AIU%'} value={this.state.AIU}
                                        />
                                    </View>

                                    { /*Boton para añadir Repuestos */}
                                    <TouchableOpacity style={style.PlusButton} onPress={this.addRepuestos}>
                                        <Text style={style.TextB}>
                                            <Icon name={'plus'} size={20}/>
                                        </Text>
                                    </TouchableOpacity>

                                    <View style={style.contenedorTrabajos}>

                                        {this.state.RepuestosArray.map((item, key) => (

                                            <ScrollView style={{alignSelf: 'stretch'}}>

                                                <View style={style.DinamicTable}>

                                                    <Text style={{alignItems: 'stretch', right: 10}} key={key}>

                                                        <Icon name={'toolbox'} size={15}/>&nbsp;
                                                        {item.DescripcionRepo}&nbsp;{item.cantidad} Valor
                                                        Unitario: {item.valor_unt} Subtotal: {item.subtotal}

                                                    </Text>

                                                    {/*Boton para eliminar un Repuesto*/}
                                                    <TouchableOpacity style={style.minusButton}
                                                                      onPress={this.removeRepuesto.bind(this, item)}>
                                                        <Text style={style.TextB}>
                                                            <Icon name={'minus'} size={15}/>
                                                        </Text>
                                                    </TouchableOpacity>

                                                </View>

                                            </ScrollView>))}

                                    </View>

                                    <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                                        <Icon name={'dollar-sign'} color={'#24b62b'} size={15}/> Total: {total3}
                                    </Text>

                                </View>

                                <View style={style.lineaSeparadora}/>
                                {/*Observaciones*/}
                                <View>
                                    <View style={{margin: 5}}>

                                        <Textarea onChangeText={handleChange('Observaciones')}
                                                  style={style.StyleTextArea} rowSpan={3}
                                                  onBlur={() => setFieldTouched('Observaciones')}
                                                  value={values.Observaciones} placeholder="Observaciones"
                                                  bordered underline/>
                                        {touched.Observaciones && errors.Observaciones &&
                                        <Text style={{fontSize: 15, color: 'red'}}>
                                            <Icon name={'exclamation-circle'} size={20}/> {errors.Observaciones}
                                        </Text>
                                        }
                                    </View>

                                </View>
                                {/*Selector de fotos*/}
                                <View style={{margin: 5}}>
                                    <Text style={style.Titulos}>Evidencias:</Text>
                                    <View style={style.albumContainer}>
                                        <Button rounded onPress={this._añadirFoto}>
                                            <TxT style={{fontWeight: 'bold', textAlign: 'center'}}>
                                                <Icon name={'camera-retro'} size={20}/> Añadir</TxT>
                                        </Button>

                                        <View style={style.lineaSeparadora}/>

                                        {this.state.album.map((item, key) => (
                                            <ScrollView>
                                                <Image key={key} source={{uri: item.uri}}
                                                       style={{
                                                           height: (Dimensions.get('window').height / 2),
                                                           width: '100%',
                                                           margin: 3,
                                                           padding: 2,
                                                           backgroundColor: '#fff',
                                                       }}/>
                                                <TouchableOpacity style={style.removePicture}
                                                                  onPress={this.removeFoto.bind(this, key)}>
                                                    <Text style={style.TextB}>
                                                        <Icon name={'times'} size={15}/>
                                                    </Text>
                                                </TouchableOpacity>

                                            </ScrollView>
                                        ))}

                                    </View>
                                </View>


                                <View style={style.totalContainer}>

                                    <Grid>
                                        <Col>
                                            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                                                <Icon name={'dollar-sign'} color={'#24b62b'} size={15}/>
                                                &nbsp;Subtotal:{grandSubTotal}
                                            </Text>
                                        </Col>
                                        <Col>
                                            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                                                IVA: {IVA}%
                                            </Text>
                                        </Col>
                                        <Col>
                                            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                                                Total: {grandTotal}
                                            </Text>
                                        </Col>
                                    </Grid>

                                </View>


                                <TouchableOpacity style={style.SubmitButton} onPress={handleSubmit}>
                                    <Text style={style.TextB}>
                                        <Icon name={'check'} size={20}/> Guardar
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    )}
                </Formik>
            </Root>
        );
    }


//Viaticos
//para añadir un viatico
    addViatico = () => {
        const Personal = parseInt(this.state.personal);
        const Hotel = parseInt(this.state.hotel);
        const Alimentacion = parseInt(this.state.alimentacion);
        const Transporte = parseInt(this.state.transporte);
        const IVA = parseFloat(this.state.IVA);
        const fecha = this.state.fecha


        if (
            Personal === 0 || this.state.personal === '' ||
            Hotel === 0 || this.state.hotel === '' ||
            Alimentacion === 0 || this.state.alimentacion === '' ||
            Transporte === 0 || this.state.transporte === '' ||
            fecha === ''
        ) {
            Toast.show({
                text: "Campos Vacios",
                buttonText: "Ok",
                position: "top",
                type: "danger"
            })

        } else {

            const sumatoria = ((Hotel + Alimentacion + Transporte) * Personal);
            this.state.subtotal1 = sumatoria;
            //Valor del subtotal
            this.state.total1 += sumatoria;
            //Incremento al Total
            this.state.grandSubTotal += sumatoria;
            //Total mas el iva
            this.state.grandTotal = (this.state.grandSubTotal * (1 + IVA / 100));

            const Objeto = {
                'numero_personas': Personal,
                'especialidad': this.state.especialidad,
                'fecha': this.state.fecha,
                'hotel': Hotel,
                'alimentacion': Alimentacion,
                'transporte': Transporte,
                'subtotal': this.state.subtotal1,
            }

            this.setState({
                    ViaticosArray: [...this.state.ViaticosArray, Objeto],
                    personal: '',
                    hotel: '',
                    alimentacion: '',
                    transporte: '',
                    fecha: '',

                }
            );
        }
    };
//para eliminar un viatico
    removeViatico = (item) => {
        console.log(item)
        const Subtotal = item.subtotal;
        const IVA = parseFloat(this.state.IVA);

        //el subtotal va restanto al total de uno en uno cada vez que damos click en el boton


        this.state.total1 -= Subtotal;
        this.state.grandSubTotal -= Subtotal;
        this.state.grandTotal -= Subtotal;


        if (this.state.grandTotal > 0 || this.state.grandTotal < 0) {
            this.state.grandTotal = (this.state.grandSubTotal * (1 + IVA / 100))
        }

        if (this.state.total1 < 0) {
            this.state.subtotal1 = 0
            this.state.total1 = 0
            console.log('funciona')
        }


        this.state.ViaticosArray.splice(item, 1);
        console.log(this.state.ViaticosArray)
        this.setState({viaticosArray: this.state.ViaticosArray})

    };

//Mano de obra
//para añadir una mano de obra
    addManoObra = () => {

        const Diurno = parseInt(this.state.diurno);
        const Nocturno = parseInt(this.state.nocturno);
        const Festivo = parseInt(this.state.festivo);
        const Horas = parseInt(this.state.horasTrabajadas);
        const IVA = parseFloat(this.state.IVA);
        const fecha2 = this.state.fecha2

        if (
            this.state.personal1 === 0 || this.state.personal1 === '' ||
            Horas === 0 || this.state.horasTrabajadas === '' ||
            fecha2 === ''
        ) {
            Toast.show({
                text: "Campos Vacios",
                buttonText: "Ok",
                position: "top",
                type: "danger"
            })

        } else {

            const multiplo = (Diurno * Horas) || (Nocturno * Horas) || (Festivo * Horas);
            this.state.subtotal2 = multiplo;
            this.state.total2 += multiplo;
            //Incremento al subTotal
            this.state.grandSubTotal += multiplo;
            //Total mas el iva
            this.state.grandTotal = (this.state.grandSubTotal * (1 + IVA / 100));

            const Mano = {
                'personal': this.state.personal1,
                'fechaSalida': this.state.fecha2,
                'especialidad': this.state.especialidad2,
                'diurno': this.state.diurno,
                'nocturno': this.state.nocturno,
                'festivo': this.state.festivo,
                'horasTrabajadas': this.state.horasTrabajadas,
                'subtotal': this.state.subtotal2,
            };

            this.setState({
                ManoObraArray: [...this.state.ManoObraArray, Mano],
                diurno: '',
                nocturno: '',
                festivo: '',
                horasTrabajadas: '',
                fecha2: '',
                personal1: ''

            });

        }

    };
//para eliminar una mano de obra
    removeManoObra = (item) => {
        const Subtotal2 = item.subtotal;
        const IVA = parseFloat(this.state.IVA);

        //el subtotal va restanto al total de uno en uno cada vez que damos click en el boton
        this.state.total2 -= Subtotal2;
        this.state.grandSubTotal -= Subtotal2;
        this.state.grandTotal -= Subtotal2;

        if (this.state.grandTotal > 0) {
            this.state.grandTotal = (this.state.grandSubTotal * (1 + IVA / 100))
        }
        if (Subtotal2 < 0) {
            this.state.subtotal2 = 0
            this.state.total2 = this.state.subtotal2
        }

        this.state.ManoObraArray.splice(item, 1);
        this.setState({ManoObraArray: this.state.ManoObraArray});

    };

    //Repuestos
//para añadir un repuesto
    addRepuestos = () => {
        const DescripcionRepo = this.state.DescripcionRepo;
        const Cantidad = parseInt(this.state.Cantidad);
        const ValorUni = parseInt(this.state.ValorUni);
        const AIU = parseInt(this.state.AIU);
        const IVA = parseFloat(this.state.IVA);


        if (
            DescripcionRepo === 0 || this.state.DescripcionRepo === '' ||
            Cantidad === 0 || this.state.Cantidad === '' ||
            ValorUni === 0 || this.state.ValorUni === '' ||
            AIU === 0 || this.state.AIU === ''
        ) {
            Toast.show({
                text: "Campos Vacios",
                buttonText: "Ok",
                position: "top",
                type: "danger"
            })
        } else {

            const calculo = ((Cantidad * ValorUni) * (1 + AIU / 100));
            this.state.subtotal3 = calculo;
            this.state.total3 += calculo;
            //Incremento al subTotal
            this.state.grandSubTotal += calculo;
            this.state.grandTotal = (this.state.grandSubTotal * (1 + IVA / 100));

            const Repo = {

                'descripcion_repuesto': DescripcionRepo,
                'cantidad': Cantidad,
                'valor_unt': ValorUni,
                'aiu': AIU,
                'subtotal': this.state.subtotal3,
            };

            this.setState({
                RepuestosArray: [...this.state.RepuestosArray, Repo],
                DescripcionRepo: '',
                Cantidad: '',
                state: '',
                ValorUni: '',
                AIU: ''
            });
        }
    };
//para eliminar un repuesto
    removeRepuesto = (item) => {
        const Subtotal3 = item.subtotal;
        const IVA = parseFloat(this.state.IVA);

        //el subtotal va restanto al total de uno en uno cada vez que damos click en el boton
        this.state.total3 -= Subtotal3;
        this.state.grandSubTotal -= Subtotal3;
        this.state.grandTotal -= Subtotal3;

        if (this.state.grandTotal > 0) {
            this.state.grandTotal = (this.state.grandSubTotal * (1 + IVA / 100))
        }
        if (Subtotal3 < 0) {
            this.state.subtotal3 = 0
            this.state.total3 = this.state.subtotal3
        }

        this.state.RepuestosArray.splice(item, 1);
        this.state.grandTotal -= 0
        this.setState({RepuestosArray: this.state.RepuestosArray});

    };

//Trabajos externos
//añade trabajos externos
    addExternos = () => {
        const descripcion = this.state.trabajoDescripcion
        const costo = this.state.costoTrabajo
        const AIU = parseInt(this.state.aiuTrabajo)
        const IVA = parseFloat(this.state.IVA);


        if (
            descripcion === 0 || this.state.trabajoDescripcion === '' ||
            costo === 0 || this.state.costoTrabajo === '' ||
            AIU === 0 || this.state.aiuTrabajo === ''
        ) {
            Toast.show({
                text: "Campos Vacios",
                buttonText: "Ok",
                position: "top",
                type: "danger"
            })
        } else {
            const calculo = (costo * (1 + AIU / 100))

            this.state.valor = calculo
            this.state.total4 += calculo
            this.state.grandSubTotal += calculo;
            this.state.grandTotal = (this.state.grandSubTotal * (1 + IVA / 100))

            const Trabajo = {
                'descripcion': descripcion,
                'costo': costo,
                'aui': AIU,
                'valor': this.state.valor,
            }

            this.setState({
                TrabajosExternos: [...this.state.TrabajosExternos, Trabajo],
                trabajoDescripcion: '',
                costoTrabajo: '',
                aiuTrabajo: '',

            })
        }
    }
//elimina trabajos externos
    removeExternos = (item) => {
        const valor = item.valor
        const IVA = parseFloat(this.state.IVA);
        //el valor va restanto al total de uno en uno cada vez que damos click en el boton
        this.state.total4 -= valor;

        this.state.grandSubTotal -= valor;

        this.state.grandTotal -= valor;

        if (this.state.grandTotal > 0) {
            this.state.grandTotal = (this.state.grandSubTotal * (1 + IVA / 100))
        }
        this.state.TrabajosExternos.splice(item, 1);
        this.setState({TrabajosExternos: this.state.TrabajosExternos});

    }
    removeFoto = (key) => {

        this.state.album.splice(key, 1);
        this.setState({album: this.state.album});
    }
}

