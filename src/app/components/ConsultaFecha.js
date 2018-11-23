import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

class ConsultaFecha extends Component {
  constructor(props){
    super(props);
    this.state = {
      opcion: 1,
      fechaInicial: new Date(),
      fechaFinal: new Date(),
    };
    this.onHandleSelect = this.onHandleSelect.bind(this);
    this.handleChangeInicial = this.handleChangeInicial.bind(this);
    this.handleChangeFinal = this.handleChangeFinal.bind(this);
  };
  onHandleSelect(e) {
    this.setState({
      opcion: e.target.value
    })
  }
  handleChangeInicial(date) {
    this.setState({
      fechaInicial: date
    });
  }
  handleChangeFinal(date) {
    this.setState({
      fechaFinal: date
    });
  }
  render(){
    const f1 = moment(this.state.fechaInicial).format('YYYY-MM-DD');
    const f2 = moment(this.state.fechaFinal).format('YYYY-MM-DD');
    const op = this.state.opcion;
    return (
      <div>
        <h4>Filtro por fecha</h4>
        <div className="select-row">
          <select 
            className="form-control"
            value={this.state.opcion}
            placeholder="Seleccione una opción"
            onChange={this.onHandleSelect}>
            <option value="1">Apartir de una fecha</option>
            <option value="2">Rango de fechas</option>
          </select>
          <DatePicker
            dateFormat="dd/MMM/yyyy"
            selected={this.state.fechaInicial}
            onChange={this.handleChangeInicial}/>
          {
            this.state.opcion === '2' && 
            <DatePicker
              dateFormat="dd/MMM/yyyy"
              selected={this.state.fechaFinal}
              onChange={this.handleChangeFinal}/>
          }
          <button className="btn btn-info" onClick={()=> this.props.query(f1, f2, op)}>Consultar</button>
        </div>
      </div>
    );
  }
}

export default ConsultaFecha;