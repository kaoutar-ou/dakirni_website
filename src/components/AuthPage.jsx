import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../white_logo.png'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { store } from "../reducers/store.js";


const pages = ['home', 'map'];
const settings = ['Profile', 'Logout'];

const AuthPage = () => {
  const [fatherKey, setFatherKey] = React.useState(null);

  const handleChangeFatherKey = (event) => {
    setFatherKey(event.target.value);
  };

  const handleSetFatherKey = () => {
    if(fatherKey !== null)
    {
      store.dispatch({
        type: "SET_FATHERKEY",
        payload: fatherKey,
      });
      navigate("/home");
    }
  };


  let navigate = useNavigate();

  return (
    <div>
        <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                // style={{ minHeight: '100vh' }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ minHeight: '7vh' }} onChange={(e) => handleChangeFatherKey(e)}>
                  Please enter your father key
                </Typography>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <Button variant="contained" onClick={handleSetFatherKey}>Confirm</Button>
              </Grid>
    </div>
  );
};
export default AuthPage;