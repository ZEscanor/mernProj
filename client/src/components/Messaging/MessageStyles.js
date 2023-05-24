import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => ({

    messenger: {
    

    },
    messageDropDown: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '20%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
        position: 'absolute',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '1000',
        overflow: 'scroll'
    },
    messageHolder: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
        marginBottom: '10px',
        cursor: 'pointer'
    },

    buttonSubmit: {
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        margin: '10px',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)'
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '20%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: '10px',
    },
}));