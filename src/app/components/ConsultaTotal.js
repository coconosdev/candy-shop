import React, { Component } from 'react';

class ConsultaCantidad extends Component {
  constructor(props){
    super(props);
    this.state = {
      total1: 1,
      total2: 1,
    };
    this.onHandleInput = this.onHandleInput.bind(this);
  };
  onHandleInput(e){
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  render(){
    const t1 = this.state.total1;
    const t2 = this.state.total2;
    return (
      <div>
        <h4>Filtro por total</h4>
        <div className="select-row">
          <div className="form-group">
            <label>De:</label>
            <input type="number" 
              onChange={this.onHandleInput}
              name="total1"
              min="1" 
              placeholder="1" 
              value={this.state.total1}
              className="form-control"/>
          </div>
          <div className="form-group">
            <label>Hasta:</label>
            <input type="number"
               onChange={this.onHandleInput} 
               name="total2" 
               min="1"
               placeholder="2"
               value={this.state.total2}
               className="form-control"/>
          </div>
          <button className="btn btn-info" onClick={()=> this.props.query(t1, t2)}>Consultar</button>
        </div>
      </div>
    );
  }
}

export default ConsultaCantidad;