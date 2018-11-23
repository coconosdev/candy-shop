import React, { Component } from 'react';
import ConsultaCantidad from './ConsultaCantidad';
import ConsultaTotal from './ConsultaTotal';
import ConsultaFecha from './ConsultaFecha';
import moment from 'moment';

const Spinner = () =>{
  return (
    <div className="text-center">
      <img src="https://thumbs.gfycat.com/PotableEmbarrassedFrenchbulldog-size_restricted.gif" alt="Loading"></img>
    </div>
  )
}

class Consulta extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      loading: false,
      opcion: '1',
    };
    this.onHandleSelect = this.onHandleSelect.bind(this);
    this.sendQueryFecha = this.sendQueryFecha.bind(this);
    this.sendQueryCantidad = this.sendQueryCantidad.bind(this);
    this.sendQueryTotal = this.sendQueryTotal.bind(this);
  };
  onHandleSelect(e) {
    this.setState({
      opcion: e.target.value
    })
  }
  sendQueryFecha(fechaInicial, fechaFinal, opcion){
    this.setState({
      loading: true,
      data: [],
    });

    if (opcion == 1) {
      fetch(`/api/sales/${fechaInicial}`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            data: result,
            loading: false,
          });
        })
        .catch(err => console.log(err));
    }
    if (opcion == 2) {
      fetch(`/api/sales/${fechaInicial}/${fechaFinal}`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            data: result,
            loading: false,
          });
        })
        .catch(err => console.log(err));
    }
  }
  sendQueryCantidad(cantidad1, cantidad2){
    this.setState({
      loading: true,
      data: [],
    });
    fetch(`/api/filterCantidad/${cantidad1}/${cantidad2}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          data: result,
          loading: false,
        });
      })
      .catch(err => console.log(err));
  }
  sendQueryTotal(total1, total2){
    this.setState({
      loading: true,
      data: [],
    });
    fetch(`/api/filterTotal/${total1}/${total2}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          data: result,
          loading: false,
        });
      })
      .catch(err => console.log(err));
  }
  render(){
    return (
      <div>
        <select 
          className="form-control form-top"
          value={this.state.opcion}
          placeholder="Seleccione una opción"
          onChange={this.onHandleSelect}>
          <option value="1">Filtar por cantidad</option>
          <option value="2">Filtrar por total</option>
          <option value="3">Filtrar por fechas</option>
        </select>
        {this.state.opcion === '1' && <ConsultaCantidad query={this.sendQueryCantidad}/>}
        {this.state.opcion === '2' && <ConsultaTotal query={this.sendQueryTotal}/>}
        {this.state.opcion === '3' && <ConsultaFecha query={this.sendQueryFecha}/>}
        {
          this.state.loading && <Spinner></Spinner>
        }
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