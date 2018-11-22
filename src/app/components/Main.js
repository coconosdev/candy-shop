import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Sales from './Sales';
import Consulta from './Consulta';
import Grafica from './Grafica';

class Main extends Component {
  render(){
    return (
      <Switch>
        <Route exact path='/' component={Sales}/>
        <Route path='/sales' component={Sales}/>
        <Route path='/consulta' component={Consulta}/>
        <Route path='/grafica' component={Grafica}/>
      </Switch>
    );
  }
}

export default Main;