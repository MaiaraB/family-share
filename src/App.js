import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import Header from './components/Header';
import Calendar from './pages/Calendar';
import NewTask from './pages/NewTask';
import PrivateRoute from './PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthenticatedApp from './pages/AuthenticatedApp';
import { useAuth } from './context/auth';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
}));

const App = (props) => {
  const classes = useStyles();
  const { userData } = useAuth(); 

  return (
    <BrowserRouter>
      <div>
        <CssBaseline />
        <Header />
        { userData ? <AuthenticatedApp /> : <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />}
        <Container className={classes.container} fixed>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute exact path="/" component={Calendar} />
          <PrivateRoute path="/new" component={NewTask} />
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
