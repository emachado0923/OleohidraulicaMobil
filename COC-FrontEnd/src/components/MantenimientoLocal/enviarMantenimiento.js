import React, {Component} from 'react';
import {View, ScrollView, Image, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Right,
  Content,
  Left,
  Toast,
  Root,
  Text as TxT,
  Badge,
} from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from 'react-native-modal';
import styles from '../../styles/Card-Loader';
import {Col, Grid} from 'react-native-easy-grid';

//dev
//const URL = 'http://192.168.1.55:3000/api';
//deployed
const URL = 'https://cocmovil.herokuapp.com/api';

export default class EnviarMantenimiento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arreglo: [],

      modalVisible: false,
      modalVisible2: false,
      modalVisible3: false,
      modalVisible4: false,
      modalVisible5: false,

      modalVisible6: false,
      datos: {},
      viatico: [],
      mano: [],
      externo: [],
      repuesto: [],
      evidencias: [],
      modalVisible7: false,

      downloadProgress: 0,
    };
  }

  anim = new Animated.Value(0);

  async componentDidMount() {
    try {
      this.setState({
        arreglo: JSON.parse(await AsyncStorage.getItem('Mantenimiento1')) || '',
      });
      this.state.mantenimiento =
        JSON.parse(await AsyncStorage.getItem('Mantenimiento1')) || [];
    } catch (e) {
      console.log(e);
    }
  }

  _post = (item) => {
    const {modalVisible7} = this.state;
    let externo = [];
    let viatico = [];
    let manoObra = [];
    let repuestos = [];
    let mantenimientos = [];

    mantenimientos.push(item);

    item.TrabajosExternos.map((trabajo) => {
      externo.push(trabajo);
    });
    item.Viaticos.map((viaticos) => {
      viatico.push(viaticos);
    });
    item.ManoObra.map((mano) => {
      manoObra.push(mano);
    });
    item.Repuestos.map((repuesto) => {
      repuestos.push(repuesto);
    });

    RNFetchBlob.fetch(
      'POST',
      `${URL}/mantenimiento/nuevo`,
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        //imagenes
        {
          name: 'imagen1',
          type: 'image/jpg',
          filename: `${item.evidencias[2].fileName}`,
          data: RNFetchBlob.wrap(item.evidencias[2].path),
        },
        {
          name: 'imagen2',
          type: 'image/jpg',
          filename: `${item.evidencias[1].fileName}`,
          data: RNFetchBlob.wrap(item.evidencias[1].path),
        },
        {
          name: 'imagen3',
          type: 'image/jpg',
          filename: `${item.evidencias[2].fileName}`,
          data: RNFetchBlob.wrap(item.evidencias[2].path),
        },
        {
          name: 'imagen4',
          type: 'image/jpg',
          filename: `${item.evidencias[3].fileName}`,
          data: RNFetchBlob.wrap(item.evidencias[3].path),
        },
        {
          name: 'imagen5',
          type: 'image/jpg',
          filename: `${item.evidencias[4].fileName}`,
          data: RNFetchBlob.wrap(item.evidencias[4].path),
        },
        {
          name: 'imagen6',
          type: 'image/jpg',
          filename: `${item.evidencias[5].fileName}`,
          data: RNFetchBlob.wrap(item.evidencias[5].path),
        },
        //Datos del MantenimientoLocal
        {name: 'Mantenimientos', data: JSON.stringify(mantenimientos)},
        //Trabajos Externos
        {name: 'Externos', data: JSON.stringify(externo)},
        //Viaticos
        {name: 'Viaticos', data: JSON.stringify(viatico)},
        //Mano de Obra
        {name: 'ManoObra', data: JSON.stringify(manoObra)},
        //Repuestos
        {name: 'Repuestos', data: JSON.stringify(repuestos)},
      ],
    )
      .uploadProgress({interval: 250}, (written, total) => {
        this.setModalVisible7(true);
        console.log('uploaded', Math.floor((written / total) * 100));
        this.setState({
          downloadProgress: Math.floor((written / total) * 100),
        });
      })
      .then((res) => {
        this.setModalVisible7(false);
        Toast.show({
          text: `${res.data}`,
          buttonText: '✔',
          type: 'success',
          position: 'bottom',
          duration: 5000,
        });
      })
      .catch((err) => {
        Toast.show({
          text: `${err.data}`,
          buttonText: '❗',
          type: 'danger',
          position: 'top',
          duration: 5000,
        });
      });
  };

  ListarPendientes = async () => {
    try {
      this.setState({
        arreglo: JSON.parse(await AsyncStorage.getItem('Mantenimiento1')) || '',
      });
      this.state.mantenimiento =
        JSON.parse(await AsyncStorage.getItem('Mantenimiento1')) || [];
    } catch (e) {
      console.log(e);
    }
  };

  VaciarLista = async () => {
    try {
      await AsyncStorage.removeItem('Mantenimiento1');
      this.setState({
        arreglo: JSON.parse(await AsyncStorage.getItem('Mantenimiento1')) || '',
      });
    } catch (e) {
      console.log(e);
    }
  };

  _listEmptyComponent2 = () => {
    return (
      <View>
        <View style={{justifyContent: 'center', flex: 1, margin: 10}}>
          <Text style={{textAlign: 'center'}}>
            <Icon name={'exclamation-circle'} size={20} />
            &nbsp; No hay mantenimientos pendientes
          </Text>
        </View>
      </View>
    );
  };

  setModalVisible = (item) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      viatico: [item],
    });
  };

  setModalVisible2 = (item) => {
    this.setState({
      modalVisible2: !this.state.modalVisible2,
      mano: [item],
    });
  };
  setModalVisible3 = (item) => {
    this.setState({
      modalVisible3: !this.state.modalVisible3,
      repuesto: [item],
    });
  };
  setModalVisible4 = (item) => {
    this.setState({
      modalVisible4: !this.state.modalVisible4,
      externo: [item],
    });
  };
  setModalVisible5 = (item) => {
    this.setState({
      modalVisible5: !this.state.modalVisible5,
      evidencias: [item],
    });
  };
  setModalVisible7 = (visible) => {
    this.setState({modalVisible7: visible});
  };

  setModalVisible6 = (item) => {
    this.setState({
      modalVisible6: !this.state.modalVisible6,
      datos: item,
    });
  };

  Viaticos = (viatico) => {
    const {modalVisible} = this.state;

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {viatico.map((value) => (
          <Card>
            <CardItem header bordered>
              <TxT style={{fontWeight: 'bold'}}>Viaticos</TxT>
            </CardItem>

            <CardItem>
              <Body style={{height: 300}}>
                <ScrollView>
                  {!value.Viaticos.length <= 0 ? (
                    value.Viaticos.map((value1) => (
                      <View style={styles.borderCard}>
                        <Text>Personal: {value1.numero_personas}</Text>
                        <Text>Especialidad: {value1.especialidad}</Text>
                        <Text>Fecha:{value1.fecha}</Text>
                        <Text>Hotel: {value1.hotel}</Text>
                        <Text>Alimentación: {value1.alimentacion}</Text>
                        <Text>Transporte: {value1.transporte}</Text>
                        <Text>Subtotal: {value1.subtotal}</Text>
                        <View style={styles.lineaSeparadora} />
                      </View>
                    ))
                  ) : (
                    <View style={styles.borderCard}>
                      <View
                        style={{
                          backgroundColor: '#299cb1',
                          borderRadius: 100,
                          width: 100,
                          height: 50,
                          marginLeft: 90,
                          marginTop: 50,
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#fff',
                          }}>
                          No hay registros !
                        </Text>
                      </View>
                    </View>
                  )}
                </ScrollView>
              </Body>
            </CardItem>
            <CardItem footer>
              <View style={{left: 100}}>
                <Button
                  style={styles.centerButton}
                  block
                  rounded
                  onPress={() => this.setModalVisible(value)}>
                  <Text style={{fontWeight: 'bold'}}>Cerrar &times;</Text>
                </Button>
              </View>
            </CardItem>
          </Card>
        ))}
      </Modal>
    );
  };
  ManoObra = (mano) => {
    const {modalVisible2} = this.state;
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        {mano.map((item) => (
          <Card>
            <CardItem header bordered>
              <TxT style={{fontWeight: 'bold'}}>Mano de obra</TxT>
            </CardItem>
            <CardItem>
              <Body style={{height: 300}}>
                <ScrollView>
                  {!item.ManoObra.length <= 0 ? (
                    item.ManoObra.map((value) => (
                      <View style={styles.borderCard}>
                        <Text>Personal: {value.personal}</Text>
                        <Text>Fecha de salida: {value.fechaSalida}</Text>
                        <Text>Especialidad: {value.especialidad}</Text>
                        <Text>Diurno:{value.diurno}</Text>
                        <Text>Nocturno: {value.nocturno}</Text>
                        <Text>Festivo: {value.festivo}</Text>
                        <Text>Horas trabajadas: {value.horasTrabajadas}</Text>
                        <Text>Subtotal: {value.subtotal}</Text>
                        <View style={styles.lineaSeparadora} />
                      </View>
                    ))
                  ) : (
                    <View style={styles.borderCard}>
                      <View
                        style={{
                          backgroundColor: '#299cb1',
                          borderRadius: 100,
                          width: 100,
                          height: 50,
                          marginLeft: 90,
                          marginTop: 50,
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#fff',
                          }}>
                          No hay registros !
                        </Text>
                      </View>
                    </View>
                  )}
                </ScrollView>
              </Body>
            </CardItem>
            <CardItem footer>
              <View style={{left: 100}}>
                <Button
                  style={styles.centerButton}
                  block
                  rounded
                  onPress={() => this.setModalVisible2(item)}>
                  <Text style={{fontWeight: 'bold'}}>Cerrar &times;</Text>
                </Button>
              </View>
            </CardItem>
          </Card>
        ))}
      </Modal>
    );
  };

  Respuestos = (repuesto) => {
    const {modalVisible3} = this.state;
    console.log(repuesto);
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible3}>
        {repuesto.map((item) => (
          <Card>
            <CardItem header bordered>
              <TxT style={{fontWeight: 'bold'}}>Repuestos</TxT>
            </CardItem>
            <CardItem>
              <Body style={{height: 300}}>
                <ScrollView>
                  {!item.Repuestos.length <= 0 ? (
                    item.Repuestos.map((value) => (
                      <View style={styles.borderCard}>
                        <Text>
                          DescripcionRepo: {value.descripcion_repuesto}
                        </Text>
                        <Text>Cantidad: {value.cantidad}</Text>
                        <Text>Valor unitario:{value.valor_unt}</Text>
                        <Text>AIU: {value.aiu}</Text>
                        <Text>Subtotal: {value.subtotal}</Text>
                      </View>
                    ))
                  ) : (
                    <View style={styles.borderCard}>
                      <View
                        style={{
                          backgroundColor: '#299cb1',
                          borderRadius: 100,
                          width: 100,
                          height: 50,
                          marginLeft: 90,
                          marginTop: 50,
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#fff',
                          }}>
                          No hay registros !
                        </Text>
                      </View>
                    </View>
                  )}
                </ScrollView>
              </Body>
            </CardItem>
            <CardItem footer>
              <View style={{left: 100}}>
                <Button
                  style={styles.centerButton}
                  block
                  rounded
                  onPress={() => this.setModalVisible3(item)}>
                  <Text style={{fontWeight: 'bold'}}>Cerrar &times;</Text>
                </Button>
              </View>
            </CardItem>
          </Card>
        ))}
      </Modal>
    );
  };
  TrabajosExternos = (externo) => {
    const {modalVisible4} = this.state;

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible4}>
        {externo.map((item) => (
          <Card>
            <CardItem header bordered>
              <TxT style={{fontWeight: 'bold'}}>Trabajos externos</TxT>
            </CardItem>
            <CardItem>
              <Body style={{height: 300}}>
                <ScrollView>
                  {!item.TrabajosExternos.length <= 0 ? (
                    item.TrabajosExternos.map((value) => (
                      <View style={styles.borderCard}>
                        <Text>Descripcion: {value.descripcion}</Text>
                        <Text>Costo: {value.costo}</Text>
                        <Text>AIU: {value.aui}</Text>
                        <Text>Valor: {value.valor}</Text>
                      </View>
                    ))
                  ) : (
                    <View style={styles.borderCard}>
                      <View
                        style={{
                          backgroundColor: '#299cb1',
                          borderRadius: 100,
                          width: 100,
                          height: 50,
                          marginLeft: 90,
                          marginTop: 50,
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#fff',
                          }}>
                          No hay registros !
                        </Text>
                      </View>
                    </View>
                  )}
                </ScrollView>
              </Body>
            </CardItem>
            <CardItem footer>
              <View style={{left: 100}}>
                <Button
                  style={styles.centerButton}
                  block
                  rounded
                  onPress={() => this.setModalVisible4(item)}>
                  <Text style={{fontWeight: 'bold'}}>Cerrar &times;</Text>
                </Button>
              </View>
            </CardItem>
          </Card>
        ))}
      </Modal>
    );
  };
  Informacion = (datos) => {
    let {modalVisible6} = this.state;

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible6}>
        <Card>
          <CardItem header bordered>
            <TxT style={{fontWeight: 'bold'}}>Información {datos.id}</TxT>
          </CardItem>
          <CardItem>
            <Body>
              <ScrollView>
                <View style={{margin: 10}}>
                  <Text>Numero cotización: {datos.n_cotizacion}</Text>
                  <Text>Fecha cotización: {datos.fecha_cotizacion}</Text>
                  <Text>Numero de OT: {datos.numeroOT}</Text>
                  <Text>Equipo: {datos.Equipo}</Text>
                  <Text>Ubicación: {datos.spinnerUbicacion}</Text>
                  <Text>Ingreso: {datos.fechaIngreso}</Text>
                  <Text>Salida: {datos.fechaSalida}</Text>
                  <Text>Hora de datos: {datos.horaIngreso}</Text>
                  <Text>Hora de Salida: {datos.horaSalida}</Text>
                  <Text>Forma de Pago: {datos.forma_de_pago}</Text>
                  <Text>Vigencia: {datos.vigencia}</Text>
                  <Text>Tiempo y lugar: {datos.tiempo_lugar}</Text>
                  <Text>Atentamente: {datos.att}</Text>
                  <Text>Observaciones: {datos.Observaciones}</Text>
                  <Text>Total: {datos.grandTotal}</Text>
                </View>
              </ScrollView>
            </Body>
          </CardItem>
          <CardItem footer>
            <View style={{left: 100}}>
              <Button
                style={styles.centerButton}
                block
                rounded
                onPress={() => this.setModalVisible6(!modalVisible6)}>
                <Text style={{fontWeight: 'bold'}}>Cerrar &times;</Text>
              </Button>
            </View>
          </CardItem>
        </Card>
      </Modal>
    );
  };
  Galeria = (evidencias) => {
    const {modalVisible5} = this.state;
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible5}>
        {evidencias.map((item) => (
          <Card>
            <CardItem header bordered>
              <TxT style={{fontWeight: 'bold'}}>Imagenes</TxT>
            </CardItem>
            <CardItem>
              <Body style={{height: 300}}>
                <ScrollView>
                  {item.evidencias.map((value) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        margin: 3,
                        justifyContent: 'space-between',
                        alignItems: 'stretch',
                      }}>
                      <Image
                        style={{width: '100%', height: 250}}
                        source={{uri: 'file:///' + value.path}}
                      />
                      <View style={styles.lineaSeparadora} />
                    </View>
                  ))}
                </ScrollView>
              </Body>
            </CardItem>
            <CardItem footer>
              <View style={{left: 100}}>
                <Button
                  style={styles.centerButton}
                  block
                  rounded
                  onPress={() => this.setModalVisible5(item)}>
                  <Text>Cerrar &times;</Text>
                </Button>
              </View>
            </CardItem>
          </Card>
        ))}
      </Modal>
    );
  };

  render() {
    const {
      arreglo,
      modalVisible7,
      datos,
      viatico,
      mano,
      externo,
      repuesto,
      evidencias,
    } = this.state;
    return (
      <View>
        <Root>
          {arreglo === null || arreglo.length === 0
            ? this._listEmptyComponent2()
            : arreglo.map((item, key) => (
                <View style={{marginTop: 10}}>
                  <Content>
                    <Card key={key}>
                      <CardItem header bordered>
                        <Text>
                          <Icon name={'users'} size={20} /> Cliente:{' '}
                          {item.ContactoCliente}
                        </Text>
                      </CardItem>
                      <CardItem bordered>
                        <Body>
                          <CardItem bordered>
                            <Left>
                              <Text style={{textAlign: 'center'}}>
                                <Icon
                                  name={'info-circle'}
                                  color={'#24b62b'}
                                  size={15}
                                />{' '}
                                Información:
                              </Text>
                            </Left>

                            <Right>
                              <Button
                                onPress={() => {
                                  this.setModalVisible6(item);
                                }}>
                                <Text>
                                  <Icon name={'eye'} color={'#fff'} size={20} />
                                </Text>
                              </Button>
                            </Right>
                          </CardItem>
                          <CardItem bordered>
                            <Left>
                              <Text>
                                <Icon
                                  name={'dollar-sign'}
                                  color={'#24b62b'}
                                  size={15}
                                />{' '}
                                Viaticos:
                                {item.totalCostos_v}
                              </Text>
                            </Left>
                            <Right>
                              <Button
                                onPress={() => this.setModalVisible(item)}>
                                <Text>
                                  <Icon name={'eye'} color={'#fff'} size={20} />
                                </Text>
                              </Button>
                            </Right>
                          </CardItem>
                          <CardItem bordered>
                            <Left>
                              <Text>
                                <Icon
                                  name={'dollar-sign'}
                                  color={'#24b62b'}
                                  size={15}
                                />{' '}
                                Mano de obra: {item.totalMano_o}
                              </Text>
                            </Left>
                            <Right>
                              <Button
                                onPress={() => this.setModalVisible2(item)}>
                                <Text>
                                  <Icon name={'eye'} color={'#fff'} size={20} />
                                </Text>
                              </Button>
                            </Right>
                          </CardItem>
                          <CardItem bordered>
                            <Left>
                              <Text>
                                <Icon
                                  name={'dollar-sign'}
                                  color={'#24b62b'}
                                  size={15}
                                />{' '}
                                Repuestos: {item.totalRepuestos}
                              </Text>
                            </Left>
                            <Right>
                              <Button
                                onPress={() => this.setModalVisible3(item)}>
                                <Text>
                                  <Icon name={'eye'} color={'#fff'} size={20} />
                                </Text>
                              </Button>
                            </Right>
                          </CardItem>
                          <CardItem bordered>
                            <Left>
                              <Text>
                                <Icon
                                  name={'dollar-sign'}
                                  color={'#24b62b'}
                                  size={15}
                                />{' '}
                                Trabajos externos: {item.totalTrabajos_e}
                              </Text>
                            </Left>
                            <Right>
                              <Button
                                onPress={() => this.setModalVisible4(item)}>
                                <Text>
                                  <Icon name={'eye'} color={'#fff'} size={20} />
                                </Text>
                              </Button>
                            </Right>
                          </CardItem>
                          <CardItem bordered>
                            <Left>
                              <Text>
                                <Icon
                                  name={'images'}
                                  color={'#24b62b'}
                                  size={15}
                                />{' '}
                                Fotos:
                              </Text>
                            </Left>
                            <Right>
                              <Button
                                onPress={() => this.setModalVisible5(item)}>
                                <Text>
                                  <Icon name={'eye'} color={'#fff'} size={20} />
                                </Text>
                              </Button>
                            </Right>
                          </CardItem>
                        </Body>
                      </CardItem>
                      <CardItem
                        onPress={this._post.bind(this, item)}
                        footer
                        bordered
                        button>
                        <Text>
                          <Icon name={'paper-plane'} size={20} />
                          &nbsp;Enviar
                        </Text>
                      </CardItem>
                    </Card>
                  </Content>
                </View>
              ))}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible7}>
            <View style={styles.loaderStyle}>
              <Text style={{color: '#fff'}}>Enviando</Text>
              <View style={styles.container}>
                <Animated.View
                  style={[
                    styles.inner,
                    {width: this.state.downloadProgress + '%'},
                  ]}
                />
                <Animated.Text style={styles.label}>
                  {this.state.downloadProgress}%
                </Animated.Text>
              </View>
              <Button
                rounded
                style={{margin: 10}}
                onPress={() => this.setModalVisible7(!modalVisible7)}>
                <Text>Cerrar</Text>
              </Button>
            </View>
          </Modal>
        </Root>
        {this.ManoObra(mano)}
        {this.Respuestos(repuesto)}
        {this.Galeria(evidencias)}
        {this.TrabajosExternos(externo)}
        {this.Informacion(datos)}
        {this.Viaticos(viatico)}

        <Grid>
          <Col>
            <Button style={{margin: 5}} onPress={this.ListarPendientes}>
              <Text>
                <Icon name={'sync'} size={18} /> Actualizar
              </Text>
            </Button>
          </Col>
          <Col>
            <Button dark style={{margin: 5}} onPress={this.VaciarLista}>
              <Text>
                <Icon name={'trash'} size={18} /> Limpiar
              </Text>
            </Button>
          </Col>
        </Grid>
      </View>
    );
  }
}
