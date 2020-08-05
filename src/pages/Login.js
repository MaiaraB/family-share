import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../context/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 500,
    marginBottom: 40,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
    },
    '& .MuiCardContent-root': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& .MuiCardActions-root': {
      justifyContent: 'center',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  pos: {
    marginBottom: 12,
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const { userData, login } = useAuth();
  const referer = (props.location.state && props.location.state.referer) ? 
                    props.location.state.referer : '/';

  function postLogin() {
    console.log("POST LOGIN");
    login(email, password)
      .then((loggedIn) => {
        if (!loggedIn) {
          setIsError(true);
        }
      });
  }

  if (userData) {
    // console.log('referer: ', referer);
    return <Redirect to={referer} />;
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.pos} variant="h4"> Log In</Typography>
        <form className={classes.form} noValidade autoComplete="off">
          <TextField 
            id="email"
            type="email"
            label="email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }} />
          <TextField
            id="password" 
            type="password" 
            label="password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }} />
          {/* <Button onClick={postLogin}>Sign In</Button> */}
        </form>
        <Link to="/signup">Don't have an account</Link>
        {/* { isError && <Error>The email or password provided were incorrect</Error> } */}
      </CardContent>
      <CardActions>
        <Button size="medium" variant="contained" color="primary" onClick={postLogin}>Sign In</Button>
      </CardActions>
    </Card>  
  );
};

export default Login;