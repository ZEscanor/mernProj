import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  
  userCard: {
    height: "400px",
    
  },
  userDiv: {
    width: "50%",
  },
  userInfo: {
    marginBottom: "30px",
    marginTop: "0px",
    paddingTop: "20px",
    paddingLeft: "20px",
    fontSize: "1.5rem",
  },
  textOptions: {
    backgroundColor: "teal"
  },
  
  dropdownInner: {
      
    backgroundColor: "grey",
    height: "70px",
    width: "100%",
    marginBottom: "10px",
    borderRadius: '10px',
    color:"white",
    '&:hover' : {
    
       opacity: "0.5",
       cursor: "pointer"
     }
    
 },
}));