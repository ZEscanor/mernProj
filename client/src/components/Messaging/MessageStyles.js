import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => ({

    messenger: {
    

    },
    messageDropDown: {
        [theme.breakpoints.between('md', 'lg')]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '600px',
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
    [theme.breakpoints.down('md')]: {

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
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
    [theme.breakpoints.down('sm')]: {

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '500px',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
        position: 'absolute',
        top: '100px',
        overflow: 'scroll',
        margin: '100px',
    },
},

    
    messageHolder: {

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.4)',
        marginBottom: '20px',
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
        width: '80%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: '10px',
    },

    buttons: {
        border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          margin: '10px',
          padding: '10px',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
          zIndex: '1000'
    },
    messengerContent: {
        margin: '10px',
        padding: '10px',
        borderRadius: '10px',

    },

    deleteButton: {

        backgroundColor: 'red',
        color: 'white',
        borderRadius: '10px',
        padding: '10px',
        margin: '10px',
        cursor: 'pointer',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
        position: 'relative',
        left: '40%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '50px',
        fontSize: '20px',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '20px',
        textDecoration: 'underline',
        cursor: 'pointer',
        margin: '10px',
        padding: '10px',
    }

}));