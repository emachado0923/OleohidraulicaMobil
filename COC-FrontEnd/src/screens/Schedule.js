'use strict';
//Cronograma
import React from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import style from '@styles/ScheduleStyle';

import {connect} from 'react-redux';
import * as scheduleActions from '../actions/Schedule/scheduleActions';
import {
  Body,
  Button,
  Container,
  Header,
  Card,
  CardItem,
  Right,
  Text as TxT,
} from 'native-base';
import Modal from 'react-native-modal';
import styles from '../styles/Card-Loader';

class ScheduleScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      modalVisible: false,
      datos: {},
    };
  }

  componentDidMount(): void {
    if (!this.props.data.length) {
      this.props.ListarCronograma();
    }
  }

  setModalVisible = (item) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      datos: item,
    });
  };
  CronogramaInfo = (datos) => {
    let {modalVisible} = this.state;

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Card>
          <CardItem header bordered>
            <TxT>Planta: {datos.planta}</TxT>
          </CardItem>
          <CardItem>
            <Body>
              <View style={{margin: 10}}>
                <TxT>Equipo: {datos.equipo}</TxT>
                <TxT>Denominacion: {datos.denominacion}</TxT>
                <TxT>Operacion: {datos.operacion}</TxT>
                <TxT>Orden: {datos.orden}</TxT>
                <TxT>Ejecutor : {datos.ejecutor}</TxT>
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

  _header = () => {
    return (
      <Header style={{backgroundColor: 'white', alignItems: 'stretch'}}>
        <Body style={{alignItems: 'stretch'}}>
          <Text style={style.Title}>Cronograma</Text>
        </Body>
        <Right>
          <Button transparent onPress={() => this.onRefresh()}>
            <Icon name="sync" />
          </Button>
        </Right>
      </Header>
    );
  };

  //Renderizando la lista
  _renderItem = ({item, index}) => {
    return (
      <View style={style.CronoCard}>
        <Text style={style.CronoText}>
          <Icon name={'map-marker-alt'} size={15} /> Ubicación: {item.ubicacion}
        </Text>
        <Text style={style.CronoText}>
          <Icon name={'calendar-plus'} size={15} /> Fecha Inicial:{' '}
          {item.fechaTemprano} - <Icon name={'clock'} size={15} />{' '}
          {item.horaTemprano}
        </Text>
        <Text style={style.CronoText}>
          <Icon name={'calendar-check'} size={15} /> Fecha Final:{' '}
          {item.fechaFinTemprano} - <Icon name={'clock'} size={15} />{' '}
          {item.horaFinTemprano}
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
        <View style={{paddingVertical: 20, borderTopWidth: 1}}>
          <Text style={{textAlign: 'center'}}>
            <Icon name={'exclamation-circle'} size={20} />
            &nbsp; Error {this.props.error}
          </Text>
        </View>
      );
    }
  };

  onRefresh() {
    this.setState({isFetching: true}, function () {
      this.props.ListarCronograma();
    });
  }

  _renderList = () => {
    let {data, loading} = this.props;
    return (
      <FlatList
        data={data}
        renderItem={this._renderItem}
        KeyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={this._listEmptyComponent}
        ListFooterComponent={this._renderLoader()}
        refreshing={loading}
        onRefresh={() => this.onRefresh()}
      />
    );
  };
  _listEmptyComponent = () => {
    return (
      <View>
        <View style={{justifyContent: 'center', flex: 1, margin: 10}}>
          <Text style={{textAlign: 'center'}}>
            <Icon name={'exclamation-circle'} size={20} />
            &nbsp; No hay cronogramas registrados
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const {datos} = this.state;
    return (
      <Container>
        <View
          style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
          {this._header()}
          {this._renderList()}
          {this.CronogramaInfo(datos)}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.scheduleReducer;
};

export default connect(mapStateToProps, scheduleActions)(ScheduleScreen);
