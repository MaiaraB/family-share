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

const Signup = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isError, setIsError] = useState();
  const { userData, signup } = useAuth();
  const referer = (props.location.state && props.location.state.referer) ? 
                    props.location.state.referer : '/';

  const postSignup = () => {
    signup(email, firstName, lastName, phoneNumber, country, username, password, confirmPassword)
      .then((signedUp) => {
        if (!signedUp) {
          setIsError({message: 'Something went wrong with the sign up. Verify all the fields'});
        }
      });
  };

  if (userData) {
    console.log('referer: ', referer);
    return <Redirect to={referer} />;
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography className={classes.pos} variant="h4">Sign Up</Typography>
      <form className={classes.form} noValidade autoComplete="off">
        <TextField 
          id="email"
          type="email" 
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => { setEmail(e.target.value); }} />
        <TextField 
          id="firstName"
          type="text" 
          label="First name"
          variant="outlined"
          value={firstName}
          onChange={(e) => { setFirstName(e.target.value); }} />
        <TextField 
          id="lastName"
          type="text" 
          label="Last name"
          variant="outlined"
          value={lastName}
          onChange={(e) => { setLastName(e.target.value); }} />
        <TextField 
          id="phoneNumber"
          type="text" 
          label="Phone number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => { setPhoneNumber(e.target.value); }} />
        <TextField 
          id="country"
          type="text" 
          label="Country"
          variant="outlined"
          value={country}
          onChange={(e) => { setCountry(e.target.value); }} />
        <TextField 
          id="username"
          type="text" 
          label="username"
          variant="outlined"
          value={username}
          onChange={(e) => { setUsername(e.target.value); }} />
        <TextField 
          id="password"
          type="password" 
          label="password"
          variant="outlined"
          value={password}
          onChange={(e) => { setPassword(e.target.value); }} />
        <TextField 
          id="confirmPassword"
          type="password" 
          label="password again"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); }}
          onBlur={(e) => {
            if (confirmPassword !== password) {
                setIsError({message: 'Confirm password does not match password'});
              } else {
                setIsError();
              }
            }} />
      </form>
      {/* { isError && <Error>{ isError.message }</Error> } */}
      <Link to="/login">Already have an account?</Link>
      </CardContent>
      <CardActions>
        <Button size="medium" variant="contained" color="primary" onClick={postSignup}>Sign Up</Button>
      </CardActions>
    </Card>
  );
};

export default Signup;