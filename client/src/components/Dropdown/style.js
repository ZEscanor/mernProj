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
        backgroundColor: "grey",
        borderRadius: '25px',
        padding: '10px 20px',
        width: '300px',
        height: "400px",
        zIndex: "10",
        fontSize: "20px",
      },

   dropdownInner: {
      
      backgroundColor: "black",
      height: "100px",
      width: "300px",
      marginBottom: "10px",
      borderRadius: '10px',
      textDecoration: "none",
      '&:hover' : {
      
         opacity: "0.5",
         cursor: "pointer"
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
  
   innerText: {
      display: "flex",
      alignItems: "center",
      marginLeft: "10px",
      justifyContent: "center",
      paddingTop: "40px",
      textDecoration: "none",
      color: "white"
   }

}));
