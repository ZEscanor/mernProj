import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import zIndex from '@material-ui/core/styles/zIndex';

export default makeStyles((theme) => ({
    dropdownMenu: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "75px",
        right: '20px',
        backgroundColor: "white",
        borderRadius: '25px',
        padding: '10px 20px',
        
        height: "250px",
        zIndex: "10",
        fontSize: "20px",
      },

   dropdownInner: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "white",
      height: "40px",
      width: "300px",
      borderRadius: '10px',
      '&:hover' : {
      
         opacity: "0.5",
         cursor: "pointer",
         backgroundColor:"grey"
       }
      
   },

   avatar: {
      left: "10px",
      paddingBottom: "10px",
      justifyContent: "center",
      display: "flex",
      alignItems: "end",
      
   },
   innerAvatar:{
      marginRight: "10px",
      backgroundColor: "#673ab7"
   },
   supportDiv: {
      display: "flex"
    },
   innerText: {
      display: "flex",
      alignItems: "center",
      marginLeft: "10px",
      justifyContent: "center",
      textDecoration: "none",
      color: "black",
      fontSize: "18px"
   }

}));