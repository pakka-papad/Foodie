import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';
import {auth} from "../firebase"
import { Loading } from './Loading';
import { useState, useEffect } from 'react';
import { signInWithGoogle } from '../firebase';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="#" style={{textDecoration: "none"}}>
        Foodie
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {

  const history = useHistory()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false);
  const [wrongpass, setWrongpass] = useState(false);
  const [wrongemail, setWrongemail] = useState(false);
  const [notfound, setNotfound] = useState(false);
  const [mail, setMail] = useState("")

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email
      }
      if(userAuth){
        setUser(user)
      }
    })
    return unsubscribe;
  }, [])

  useEffect(()=>{
    if(user){
      history.push("/home");
    }
  }, [user])

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true)
    // eslint-disable-next-line no-console
    await auth
    .signInWithEmailAndPassword(data.get('email'), data.get('password'))
    .then((user) => {
      setLoading(false);
      // console.log(user)
    })
    .catch((error) => {
      setLoading(false)
      console.log(error)
      switch(error.code){
        case "auth/wrong-password":
          setWrongpass(true);
          break;
        case "auth/invalid-email":
          setWrongemail(true);
          break;
        case "auth/user-not-found":
          setNotfound(true);
          break;
      }
    });
  };

  const forgotPassword = (email) => {
    auth.sendPasswordResetEmail(email)
    .then(function(){
      alert("Please check your email")
    }).catch(function(error){
      console.log(error)
      switch(error.code){
        case "auth/wrong-password":
          setWrongpass(true);
          break;
        case "auth/invalid-email":
          setWrongemail(true);
          break;
        case "auth/user-not-found":
          setNotfound(true);
          break;
      }
    })
  }

  if(loading){
    return(
      <Loading />
    );
  }else{
    return (
      <div style={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "10px", paddingLeft: "10px", backgroundColor:"#616D7E"}}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" style={{border: "1px solid grey", boxShadow: "2px 2px #888888", backgroundColor: "white"}}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            style={{marginTop: "0px"}}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Typography component="h5" variant="h5" style={{color: "red"}}>
              {wrongpass ? "Wrong password entered" : ""}
              {wrongemail ? "Wrong email format entered" : ""}
              {notfound ? "No such user exists" : ""}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                required
                onChange={(e)=>{
                  setWrongemail(false);
                  setWrongpass(false);
                  setNotfound(false);
                  setMail(e.target.value)
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                onChange={()=>{
                  setWrongemail(false);
                  setWrongpass(false);
                  setNotfound(false);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                onClick={signInWithGoogle}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In With Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button onClick={()=>forgotPassword(mail)} variant="body2" style={{textDecoration: "none", paddingTop: "2px", paddingLeft: "0px", paddingRight: "0px"}}>
                    Forgot password?
                  </Button>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2" style={{textDecoration: "none"}}>
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      </div>
    );
  }
}