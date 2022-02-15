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
import Paper from '@mui/material/Paper';


const AuthPage = () => {
  const [fatherKey, setFatherKey] = React.useState(null);

  const handleChangeFatherKey = (event) => {
    setFatherKey(event.target.value);
    console.log(fatherKey);
  };

  let navigate = useNavigate();

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


  return (

<Grid container component="main" sx={{ height: '100vh' }}>

<Grid
  item
  xs={false}
  sm={4}
  md={7}
  sx={{
    backgroundImage: 'url(https://img.freepik.com/free-vector/happy-big-family-standing-together-illustration_179970-753.jpg?w=826)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: (t) =>
      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
/>
<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
  <Box
    sx={{
      my: 8,
      mx: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: '#1976d2' }} style={{ marginTop: '7vh' }}>
      {/* <LockOutlinedIcon /> */}
    </Avatar>
    <Typography component="h1" variant="h5" style={{ minHeight: '9vh', marginTop: '7vh' }}>
    Please enter your father key
    </Typography>
    <Box component="form" noValidate  sx={{ mt: 1 }}>
      
      <TextField 
      margin="normal"
      required
      fullWidth
      id="fatherKey"
        label="fatherKey"
        name="fatherKey"
        autoFocus
      // variant="outlined" 
      onChange={(e) => handleChangeFatherKey(e)} />
     
      <Button variant="contained"
      fullWidth
      sx={{ mt: 3, mb: 2 }} 
      style={{ minHeight: '7vh', marginTop: '7vh' }}
      onClick={handleSetFatherKey}>
        Confirm
        </Button>
      <Grid container>
        <Grid item xs>
          
        </Grid>
        <Grid item>
          
        </Grid>
      </Grid>
    </Box>
  </Box>
</Grid>
</Grid>

  );
};

export default AuthPage;