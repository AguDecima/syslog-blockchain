import React, { Fragment } from 'react';

// routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import bootstrap
import '../Assets/css/bootstrap.min.css'


// components
import Home from './Home/Home';
import Login from './Login/Login';
import AddUsuario from './Usuarios/AddUsuario';



const App = () => {


  return (
      <Router>
        <Fragment>
          <Switch>

            <Route exact path='/' component={Login} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/usuarios' component={AddUsuario} />

          </Switch>
        </Fragment>
      </Router>

  );
}

export default App;
