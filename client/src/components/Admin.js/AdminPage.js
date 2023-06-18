import React, {useState,useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Box, useTheme} from '@mui/material';
import { getUsers, editUser } from "../../actions/actionPost";
import { GridRowsProp } from '@mui/x-data-grid';
import {DataGrid } from "@mui/x-data-grid"; 
import Alert from '@mui/material/Alert';


const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'name',
    headerName: 'Name',
    width: 170,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 170
  },
  {
    field: 'role',
    headerName: 'Role',
    type: 'string',
    width: 170,
    editable: true,

  },
]

 
const AdminPage = () => {
  const userArray = [];
    const theme = useTheme();
    const [message,setMessage] = useState("Click a User, Change its Role, Click User again and Press Submit");
    const [rows,setRows] = useState([]) //rows for our datagrid
    const [currentClickedUser, setCurrentClickedUser] = useState(null); // next two lines keep track of the currently clicked user and payload
    const [currentPayload, setCurrentPayload] = useState(null)
    const [stateUser, setStateUser] = useState(null) // this user is solely for the purpose of reloading the page when our state finishes pushing
    const dispatch = useDispatch(); 
    
    
      
    

  useEffect( () => {
     testGet();
  }, [stateUser]); // on page load and when users change reload our page state

 
  const testGet = async () => {
    const userData = await dispatch(getUsers())
    userData.map((user)=> userArray.push({id:user._id, name:user.name, email:user.email, role: user.role}))
    setRows(userArray)
  } // this function will intialize all users in our db and put it into a datagrid

  
  const handleRowClick = (params, e) => {
    //e.persist();
    console.log(params, "params", params.value)

    const { id, role, name, email } = params?.row;
    let payload = { id, name, role, email };
    payload={...payload, role: params.value}
    console.log(payload, "payload");
  
     setMessage(`User ${payload.name} ${payload.role} selected`);
     setCurrentClickedUser(params?.row);
     setCurrentPayload(payload);
     setMessage(`User ${payload.name} ${payload.role} changed to ${payload.role}`);
    // setUser(payload);


  } // clicking on a row will set current user for changes\
  

  
  const setUser = async (
  
  ) => {
    setMessage(`UseR ${currentPayload.name} ${currentClickedUser.role} updated to ${currentPayload.role}`);
    console.log(currentPayload, "currentPayload");
    if (currentPayload?.id !== null && currentPayload?.role !== null) {
      const data = await dispatch(editUser(currentPayload.id, currentPayload));
      console.log(data);
      setMessage(`User ${data.name} updated to ${data.role}`);
      setStateUser(data);
      return data;
    }
    }

      

      
  


  
   
      

  return (
    
    <Box m="1.5rem 2.5rem" >
      {message && <Alert severity='info'>
        {message}
      </Alert> }
      <Box
        mt="30px"
        ml="50px"
        height="80vh"
        width={{sm:"500px",md: "65%"}}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "theme.palette.background.alt",
            color: "theme.palette.secondary[100]",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
      
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[10]}
        onCellEditCommit={handleRowClick}
        //onRowEditStop={handleRowClick}
    
        autoPageSize= {true}
        disableSelectionOnClick
      
      />
      
       <button type='submit'  
        onClick={setUser}
       style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "20px",
            marginRight: "20px",
       }}>
           Push Changes
       </button>
      </Box>
      
    </Box>
  );
};
  

export default AdminPage