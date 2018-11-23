import React, { Component } from 'react';

class ConsultaCantidad extends Component {
  constructor(props){
    super(props);
    this.state = {
      cantidad1: 1,
      cantidad2: 1,
    };
    this.onHandleInput = this.onHandleInput.bind(this);
  };
  onHandleInput(e){
    if (e.target.value > 99) {
      e.target.value = 99;
    }
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  render(){
    const c1 = this.state.cantidad1;
    const c2 = this.state.cantidad2;
    return (
      <div>
        <h4>Filtro por cantidad</h4>
        <div className="select-row">
          <div className="form-group">
            <label>De:</label>
            <input type="number" 
              onChange={this.onHandleInput}
              name="cantidad1"
              min="1" max="99" 
              placeholder="1" 
              value={this.state.cantidad1}
              className="form-control"/>
          </div>
          <div className="form-group">
            <label>Hasta:</label>
            <input type="number"
               onChange={this.onHandleInput} 
               name="cantidad2" 
               min="1" max="99"
               placeholder="2"
               value={this.state.cantidad2}
               className="form-control"/>
          </div>
          <button className="btn btn-info" onClick={()=> this.props.query(c1, c2)}>Consultar</button>
        </div>
      </div>
    );
  }
}

export default ConsultaCantidad;