import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column-reverse',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.between(0,500)]: {
      width: "200px",
      height: "200px"
        },
    [theme.breakpoints.between(501,800)]: {
      width: "350px",
      height: "350px"
    },
    [theme.breakpoints.between(801,4000)]: {
      width: "400px",
      height: "500px"
    }
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  postCards:{
    margin:'20px', 
    cursor: "pointer", 
    paddingLeft:"10px", 
    paddingRight:"10px", 
    width: "20%",
    boxShadow: "2px 1px 20px",
    backgroundColor: "#e8e8e8",
    "&:hover" : {
      opacity: ".6"
    },
    [theme.breakpoints.between(0,795)]: {
      width: "150px",
      color:"red"
      
        },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  recommendedImg: {
    width: "75%",
    height:"100px"
    
  }
}));