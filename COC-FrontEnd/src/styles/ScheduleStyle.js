import {Dimensions, StyleSheet} from 'react-native';
//Estilos para Cronogramas y Mantenimientos
const BlueCoc = '#365187';
export default StyleSheet.create({
    //boton para añadir un mantenimiento
    AddButton: {
        position: 'absolute',
        backgroundColor: '#365187',
        zIndex: 11,
        borderRadius: 10,
        right: 10,
        bottom: 70,
        padding: 15,
//para cerrar el formulario
    }, CloseButton: {
        position: 'relative',
        backgroundColor: '#d42035',
        zIndex: 11,
        bottom: '0%',
        padding: 5,
    },
    TextB: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    CronoText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#365187',
    },
    CronoCard: {
        position: 'relative',
        padding: 10,
        paddingRight: 100,
        borderBottomWidth: 5,
        borderBottomColor: '#ededed',
    },
    ViewButton: {
        backgroundColor: '#365187',
        position: 'absolute',
        zIndex: 11,
        borderRadius: 50,
        right: 10,
        bottom: 10,
        padding: 5,
    },
    modalCard: {
        flex: 1,
        backgroundColor: '#fff',

    }, modalHeader: {
        backgroundColor: BlueCoc,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    },
    modalBody: {
        alignItems: 'stretch',
        flex: 1,
        marginHorizontal: 10,
    },
    //inputs y botones del formulario
    InputS: {
        width: '100%',
        height: 44,
        padding: 10,
        marginBottom: 10,
        margin: 4,
        backgroundColor: '#ecf0f1',
        color: '#000'

    }, InpuTime: {
        width: '50%',
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#ecf0f1',
        color: '#000'
    },
    SubmitButton: {
        backgroundColor: '#365187',
        position: 'relative',
        zIndex: 5,
        borderRadius: 20,
        bottom: 5,
        padding: 10,
        margin: 5,
    }, PlusButton: {
        backgroundColor: '#365187',
        position: 'relative',
        justifyContent: 'center',
        zIndex: 20,
        borderRadius: 20,
        width: 50,
        height: 30
    }, minusButton: {
        backgroundColor: '#d42035',
        position: 'absolute',
        justifyContent: 'center',
        padding: 8,
        right: 5,
        borderRadius: 10
    },
    CalendarButton: {
        backgroundColor: '#365187',
        position: 'relative',
        zIndex: 11,
        borderRadius: 50,
        bottom: 10,
        padding: 5,
    },
    RowGrid: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5
    },
    DinamicTable: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        margin: 5
    }, stylePicker: {
        borderWidth: 1,
        borderColor: '#278dc6',
        padding: 7,
        borderRadius: 10,
        justifyContent: 'center',
        margin: 3,
    }, StyleTextArea: {
        width: '100%',
        marginBottom: 10,
        margin: 4,
        backgroundColor: '#ecf0f1',
        color: '#000'
    }, lineaSeparadora: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 5,
        bottom: 4
    }, totalContainer: {
        borderWidth: 1,
        borderColor: '#278dc6',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        margin: 5,
    }, albumImage: {
        height: (Dimensions.get('window').height / 2),
        width: 250,
        margin: 3,
        padding: 2,
        backgroundColor: '#fff',
        overflow: 'visible'
    }, timeContainer: {
        borderWidth: 1,
        borderColor: '#278dc6',
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
        margin: 5,
    }, horaTexto: {
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#131313',
        borderRadius: 5,
        margin: 15,
    }, sendButton: {
        backgroundColor: '#365187',
        borderRadius: 10,
        right: 10,
        bottom: 70,
        padding: 15,
    }, Titulos: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    }, contenedorTrabajos: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%'
    }, Title: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17
    },removePicture:{
        backgroundColor: '#100e0e',
        position: 'absolute',
        justifyContent: 'center',
        padding: 15,
        right: 5,
        marginTop: 10,
        borderRadius: 10
    },albumContainer:{
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
        margin: 3,
        alignItems: 'stretch', textAlign: 'center'
    }


});