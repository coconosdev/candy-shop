import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Sales from './Sales';
import Consulta from './Consulta';

class Main extends Component {
  render(){
    return (
      <Switch>
        <Route exact path='/' component={Sales}/>
        <Route path='/sales' component={Sales}/>
        <Route path='/consulta' component={Consulta}/>
      </Switch>
    );
  }
}

export default Main;