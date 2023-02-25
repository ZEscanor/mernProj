import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { height } from '@mui/system';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: "15px",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: "relative",
    zIndex: "9000",
    top: "0",
    padding:"40px",
    height:"100px",
    marginBottom:"20px"
  },

  
  heading: {
    color: ' rgb(176,42,79)',
    
    textDecoration: 'none',
    fontSize: "2rem"
  },
  image: {
    marginLeft: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  logout:{
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    display: "flex",
    justifyContent: "center" ,
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight: "40px",
  },


}));