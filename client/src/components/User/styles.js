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
    
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
    marginBottom: "20px",
    cursor: "pointer",
    color: "black",
    '&:hover' : {
      backgroundColor: "teal",
      color: "white"
      
     }
    
 },
}));