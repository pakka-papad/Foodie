import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import {auth} from "../firebase"
import db from "../firebase"
import { Loading } from './Loading';
import { useState } from 'react';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} style={{marginTop: "64px", marginBottom: "32px"}}>
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

const SignUp = () => {

  const history = useHistory()
  const [loading, setLoading] = useState(false);
  const [wrongpass, setWrongpass] = useState(true);
  const [wrongemail, setWrongemail] = useState(false);
  const [wrongpassheader, setWrongpassheader] = useState(false);
  const [alreadytaken, setAlreadytaken] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true)
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if(!wrongpass){
      // createUserWithEmailAndPassword() function.
      auth
      .createUserWithEmailAndPassword(data.get('email'), data.get('password'))
      .then((res) => {
        console.log(res)
        if(res.additionalUserInfo.isNewUser){
          const user = auth.currentUser;
          db.collection("users").doc(auth.currentUser.uid).set({
            uid: user.uid,
            displayName: data.get('fname'),
            photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPeVGGBQSs7GFZVVUzG1yOjT_bcRyRNq7eeQ&usqp=CAU"
          })
          .then(() => console.log("firebase.js","New user added"))
          .catch((error) => console.log("firebase.js",error));
        }
        setLoading(false)
        history.push('/home');
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
        switch(error.code){
          case "auth/invalid-email":
            setWrongemail(true);
            break;
          case "auth/email-already-in-use":
            setAlreadytaken(true);
            break;
        }
      });
    }else{
      setLoading(false);
      setWrongpassheader(true);
    }
  };

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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <Typography component="h6" variant="h6" style={{color: "red", textAlign:"center"}}>
                  {wrongpassheader ? "Choose a password with atleast 8 characters" : ""}
                  {wrongemail ? "Wrong email format entered" : ""}
                  {alreadytaken ? "This email already exists" : ""}
                </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      id="fname"
                      label="Full name"
                      name="fname"
                      autoComplete="fname"
                      onChange={()=>{
                        setWrongemail(false);
                        setWrongpassheader(false);
                        setAlreadytaken(false);
                      }}
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={()=>{
                      setWrongemail(false);
                      setWrongpassheader(false);
                      setAlreadytaken(false);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e)=>{
                      if(e.target.value.length < 8){
                        setWrongpass(true);
                      }else{
                        setWrongpass(false);
                      }
                      setWrongemail(false);
                      setWrongpassheader(false);
                      setAlreadytaken(false);
                    }}
                  />
                </Grid>
                {wrongpass ? <p style={{paddingLeft:"16px", color:"red", marginBottom:"0px"}}>Choose a password with atleast 8 characters</p> : <p style={{paddingLeft:"16px", color:"green", marginBottom:"0px"}}>Available</p>}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" variant="body2" style={{textDecoration: "none"}}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      </div>
    );
  }
}

export default SignUp;