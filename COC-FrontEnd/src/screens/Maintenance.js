'use strict';
//MantenimientoLocal
import React from 'react';
import {
  FlatList,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import EnviarMantenimiento from '../components/MantenimientoLocal/enviarMantenimiento';
import Icon from 'react-native-vector-icons/FontAwesome5';
import style from '@styles/ScheduleStyle';
import {connect} from 'react-redux';
import * as maintenanceActions from '../actions/Maintenance/maintenanceActions';
import {
  Separator,
  Content,
  Header,
  Container,
  Segment,
  Button,
  Body,
  Text as TxT,
  Right,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';
import {color, log} from 'react-native-reanimated';
import Modal from 'react-native-modal';
import styles from '../styles/Card-Loader';
import Axios from 'axios';

//dev
//const Url = 'http://192.168.1.55:3000/api';
//deployed
const Url = 'https://cocmovil.herokuapp.com/api';

const LaravelImages = 'http://oleohidraulica.aplicaciones-csge.com/images/';

const Espacio = <Text>&nbsp;</Text>;

class MaintenanceScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      isFetching: false,
      activePage: 1,
      modalVisible: false,
      datos: {},
      URISERVER: '',
    };
  }

  componentDidMount(): void {
    if (!this.props.data.length) {
      this.props.ListarMantenimientos();
    }
  }

  //Refresco desde el servidor
  onRefresh() {
    this.setState({isFetching: true}, function () {
      this.props.ListarMantenimientos();
    });
  }

  //Cabecera
  _header() {
    return (
      <Header style={{backgroundColor: 'white', alignItems: 'stretch'}}>
        <Body style={{alignItems: 'stretch'}}>
          <Text style={style.Title}>Mantenimiento</Text>
        </Body>
        <Right>
          <Button transparent onPress={() => this.onRefresh()}>
            <Icon name="sync" />
          </Button>
        </Right>
      </Header>
    );
  }

  setModalVisible = (item) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      datos: item,
    });
  };

  MantenimientoInfo = (datos) => {
    let {modalVisible, URISERVER} = this.state;

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Card>
          <CardItem header bordered>
            <TxT>NIT: {datos.nit}</TxT>
          </CardItem>
          <CardItem>
            <Body>
              <View style={{margin: 10}}>
                <TxT>Cotizacion: {datos.estado_cotizacion}</TxT>
                <TxT>Ubicación: {datos.spinnerUbicacion}</TxT>
                <TxT>Placa: {datos.Placa}</TxT>
                <TxT>Viaticos: {datos.totalCostos_v}</TxT>
                <TxT>Repuestos: {datos.totalRepuestos}</TxT>
                <TxT>Mano de obra: {datos.totalMano_o}</TxT>
                <TxT>Trabajos externos: {datos.totalTrabajos_e}</TxT>
                <TxT>Total : {datos.grandTotal}</TxT>
                <TxT
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Imagenes
                </TxT>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 3,
                    justifyContent: 'space-between',
                  }}>
                  <Thumbnail
                    square
                    large
                    source={{
                      uri: `${datos.imagen1}`,
                    }}
                  />
                  {Espacio}
                  <Thumbnail
                    square
                    large
                    source={{
                      uri: `${datos.imagen2}`,
                    }}
                  />
                  {Espacio}
                  <Thumbnail
                    square
                    large
                    source={{
                      uri: `${datos.imagen3}`,
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', margin: 3}}>
                  <Thumbnail
                    square
                    large
                    source={{
                      uri: `${datos.imagen4}`,
                    }}
                  />
                  {Espacio}
                  <Thumbnail
                    square
                    large
                    source={{
                      uri: `${datos.imagen5}`,
                    }}
                  />
                  {Espacio}
                  <Thumbnail
                    square
                    large
                    source={{
                      uri: `${datos.imagen6}`,
                    }}
                  />
                </View>
              </View>
            </Body>
          </CardItem>
          <CardItem footer>
            <View style={{left: 100}}>
              <Button
                style={styles.centerButton}
                block
                rounded
                onPress={() => this.setModalVisible(!modalVisible)}>
                <TxT style={{fontWeight: 'bold'}}>Cerrar &times;</TxT>
              </Button>
            </View>
          </CardItem>
        </Card>
      </Modal>
    );
  };

  //Loader
  _renderLoader = () => {
    const loader = this.props.loading;
    const error = this.props.error;
    if (loader) {
      return (
        <View style={{paddingVertical: 20, borderTopWidth: 1}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            Recargando...
          </Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={{justifyContent: 'center', flex: 1, margin: 10}}>
          <Text style={{textAlign: 'center'}}>
            <Icon name={'exclamation-circle'} size={20} />
            &nbsp; Error {this.props.error}
          </Text>
        </View>
      );
    }
  };
  //Obteniendo datos del reducer
  _renderList = () => {
    let {data, loading} = this.props;
    return (
      <FlatList
        data={data}
        LisHeaderComponent={<></>}
        renderItem={this._renderItem}
        ListEmptyComponent={this._listEmptyComponent}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={this._renderLoader()}
        refreshing={loading}
        onRefresh={() => this.onRefresh()}
      />
    );
  };
  //Renderizando la lista
  _renderItem = ({item, index}) => {
    return (
      <View style={style.CronoCard} key={index}>
        <Text style={style.CronoText}>
          <Icon name={'clipboard-check'} size={15} /> Cliente:{' '}
          {item.ContactoCliente}
        </Text>
        <Text style={style.CronoText}>
          <Icon name={'calendar-plus'} size={15} /> Fecha de Ingreso:{' '}
          {item.fechaIngreso} - <Icon name={'clock'} size={15} />{' '}
          {item.horaIngreso}{' '}
        </Text>
        <Text style={style.CronoText}>
          <Icon name={'calendar-check'} size={15} /> Fecha de Salida:{' '}
          {item.fechaSalida} - <Icon name={'clock'} size={15} />{' '}
          {item.horaSalida}
        </Text>
        <TouchableOpacity
          style={style.ViewButton}
          onPress={() => this.setModalVisible(item)}>
          <Text style={style.TextB}>
            <Icon name={'eye'} size={20} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  //Si la lista esta vacia
  _listEmptyComponent = () => {
    return (
      <View>
        <View style={{justifyContent: 'center', flex: 1, margin: 10}}>
          <Text style={{textAlign: 'center'}}>
            <Icon name={'exclamation-circle'} size={20} />
            &nbsp; No hay mantenimientos registrados
          </Text>
        </View>
      </View>
    );
  };
  //Toast para mostrar mas detalles del mantenimiento
  _ShowInfo = (item) => {
    let Repuestos = item.totalRepuestos;
    let Viaticos = item.totalCostos_v;
    let Mano_de_obra = item.totalMano_o;
    let Total = item.grandTotal;

    ToastAndroid.showWithGravity(
      ` Mantenimiento 🔧

    Repuestos: ${Repuestos}
    Viaticos:  ${Viaticos}
    Mano de obra: ${Mano_de_obra}
    Total: ${Total}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };
  //Selector de componente
  selectComponent = (activePage) => () => this.setState({activePage});
  _renderComponent = () => {
    if (this.state.activePage === 1) {
      return (
        <View>
          {/*Renderizando la lista*/}
          <Separator bordered>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              <Icon name={'clock'} size={20} />
              &nbsp;Enviados
            </Text>
          </Separator>
          {this._renderList()}
        </View>
      );
    } else {
      return (
        <View>
          {/*Datos persistentes*/}
          <Separator bordered>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              <Icon name={'clock'} size={20} />
              &nbsp;Pendientes
            </Text>
          </Separator>
          <View style={{flex: 1}}>
            <EnviarMantenimiento />
          </View>
        </View>
      );
    }
  };

  render() {
    const {datos} = this.state;
    return (
      <Container>
        {this._header()}
        <Segment style={{backgroundColor: 'white'}}>
          <Button
            active={this.state.activePage === 1 && color('white')}
            onPress={this.selectComponent(1)}
            dark
            rounded
            first>
            <TxT>
              <Icon name={'tasks'} size={15} />
              &nbsp;Enviados
            </TxT>
          </Button>
          <Text>&nbsp;</Text>
          <Button
            active={this.state.activePage === 2 && color('white')}
            onPress={this.selectComponent(2)}
            dark
            rounded>
            <TxT>
              <Icon name={'clock'} size={15} />
              &nbsp;Pendientes
            </TxT>
          </Button>
        </Segment>
        <Content padder>{this._renderComponent()}</Content>

        <TouchableOpacity
          style={style.AddButton}
          onPress={() => this.props.navigation.navigate('MantenimientoNuevo')}>
          <Text style={style.TextB}>
            <Icon name={'wrench'} size={20} />
            <Icon name={'plus'} size={10} />
          </Text>
        </TouchableOpacity>

        {this.MantenimientoInfo(datos)}
      </Container>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.maintenanceReducer;
};

export default connect(mapStateToProps, maintenanceActions)(MaintenanceScreen);
