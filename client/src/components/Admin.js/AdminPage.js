import React, {useState,useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Box, useTheme} from '@mui/material';
import { getUsers, editUser } from "../../actions/actionPost";
import { GridRowsProp } from '@mui/x-data-grid';
import {DataGrid } from "@mui/x-data-grid"; 
import Alert from '@mui/material/Alert';



 
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

  
  const handleRowClick = async (params) => {

    //  const {id} = params?.row
    //  const {role} = params?.row
    //  const {name} = params?.row
    //  const {email} = params?.row
    //  const payload = {id,name,role ,email}
    //  console.log(payload)
    
    //   setMessage(`User ${payload.name} ${payload.role} selected`)
    //   return payload
    const { id, role, name, email } = params?.row;
    const payload = { id, name, role, email };
    console.log(payload);
  
    setMessage(`User ${payload.name} ${payload.role} selected`);
    setCurrentClickedUser(params?.row);
    setCurrentPayload(payload);


  } // clicking on a row will set current user for changes
  const setUser = async () => {
    //   const para = await handleRowClick()
    //     console.log(para , "params")
    // if (para.id != null && para.role != null) {
    
    //   const data = await dispatch(editUser(para.id, para.role))
    //   //console.log(data)
    //   setMessage(`User ${data.name} updated to ${data.role}`)
    //   setStateUser(data)

    //   return data
    if (currentPayload?.id != null && currentPayload?.role != null) {
      const data = await dispatch(editUser(currentPayload.id, currentPayload.role));
      setMessage(`User ${data.name} updated to ${data.role}`);
      setStateUser(data);
      return data;
    }
    }

      

      
  


  
   
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
        onRowClick={handleRowClick}
        autoPageSize= {true}
        disableSelectionOnClick
      
      />
      
       <button type='submit'  
       onClick={setUser}
       style={{"background-color": "#4CAF50",
  "border": "none",
  "color": "white",
  'padding': '15px 32px',
  'text-align': 'center',
  'text-decoration': 'none',
  'display': 'inline-block',
  'font-size': '16px',
  'margin': '4px 2px',
 ' cursor':'pointer'}}>
           Push Changes
       </button>
      </Box>
      
    </Box>
  );
};
  

export default AdminPage