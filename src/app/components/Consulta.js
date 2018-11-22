import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import './Consulta.css'

class Consulta extends Component {
  constructor(props){
    super(props);
    this.state = {
      opcion: 1,
      fechaInicial: new Date(),
      fechaFinal: new Date(),
      data: [],
    };
    this.onHandleSelect = this.onHandleSelect.bind(this);
    this.handleChangeInicial = this.handleChangeInicial.bind(this);
    this.handleChangeFinal = this.handleChangeFinal.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
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
  sendQuery(){
    const fechaInicial = moment(this.state.fechaInicial).format('YYYY-MM-DD');
    const fechaFinal = moment(this.state.fechaFinal).format('YYYY-MM-DD');
    if (this.state.opcion == 1) {
      fetch(`/api/sales/${fechaInicial}`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            data: result
          })
        })
        .catch(err => console.log(err));
    }
    if (this.state.opcion == 2) {
      fetch(`/api/sales/${fechaInicial}/${fechaFinal}`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            data: result
          })
        })
        .catch(err => console.log(err));
    }
  }
  render(){
    return (
      <div>
        <h3>Consultas</h3>
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
          <button className="btn btn-info" onClick={this.sendQuery}>Consultar</button>
        </div>
        {
          (this.state.data.length > 0) &&
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Producto</th>
                <th>Fecha de venta</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {
                
                this.state.data.map((obj, i) => {
                  return (
                    <tr key={i}>
                      <td>{obj.producto_id}</td>
                      <td>{moment(obj.fecha).format('DD/MMM/YYYY')}</td>
                      <td>{obj.venta}</td>
                      <td>{obj.valor}</td>
                    </tr>
                  )
                })   
              }
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default Consulta;