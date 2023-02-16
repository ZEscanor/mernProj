import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import zIndex from '@material-ui/core/styles/zIndex';

export default makeStyles((theme) => ({
    dropdownMenu: {
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: "100px",
        right: '20px',
        backgroundColor: "grey",
        borderRadius: 'var(--border-radius)',
        padding: '10px 20px',
        width: '200px',
        height: "400px",
        zIndex: "10",
        fontSize: "20px",
      },

}));