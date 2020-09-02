import React, {Component} from 'react';
import {connect} from "react-redux";
import Navigator from './navigators/AuthNavigator'
import {getToken} from './actions/Auth/authActions'
import {ListarComponentes} from './actions/Items/itemsActions'
import {ActivityIndicator, Text, View} from "react-native";


class Inicio extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        this.props.getToken()
    }

    componentDidMount() {

        this.props.getToken()
        this.props.getItems()
    }


    render() {
        if (this.props.load) {
            return (
                <View style={{margin: 20, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Bienvenido
                    </Text>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        } else if (!this.props.token) {
            console.log(this.props.token)
            return (
                <Navigator View={'LoginScreen'}/>
            );
        } else if (this.props.token) {
            return (<Navigator View={'Main'}/>)
        }

    }
}

const mapStateToProps = (state) => {
    return {
        token: state.AuthReducer.token,
        usuario: state.AuthReducer.usuario,
        load: state.AuthReducer.loader,
        items: state.itemsReducer.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(getToken()),
        getItems: () => dispatch(ListarComponentes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inicio)
