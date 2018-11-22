import React, { Component } from 'react';
import productosJson from './products.json';
import ventasJson from './sales.json';

class Sales extends Component {
  constructor(props){
    super(props);
    this.state = {
      producto: '',
      precio: 0,
      cantidad: 1,
      total: 0,
    };
    this.onHandleSelect = this.onHandleSelect.bind(this);
    this.onHandleInput = this.onHandleInput.bind(this);
    this.onSell = this.onSell.bind(this);
  };
  fillDatabase(){
    for(let i = 0; i<1000; i++){
      const venta = {
        producto_id: ventasJson[i].producto_id,
        fecha: this._randomDate(new Date(2018, 0, 1), new Date()),
        venta: ventasJson[i].venta,
        valor: ventasJson[i].valor,
      };
      fetch('/api/sales', {
        method: 'POST',
        body: JSON.stringify(venta),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  }
  onHandleSelect(e) {
    const filtered = productosJson.filter((obj)=> Number(e.target.value) === obj.producto)[0];
    this.setState({
      producto: filtered.producto,
      precio: filtered.precio,
      total: filtered.precio * this.state.cantidad,
    });
  }
  onHandleInput(e){
    this.setState({
      cantidad: e.target.value,
      total: this.state.precio * e.target.value,
    })
  }
  onSell(){
    const venta = {
      producto_id: this.state.producto,
      fecha: this._randomDate(new Date(2018, 0, 1), new Date()),
      venta: this.state.cantidad,
      valor: this.state.total
    };
    fetch('/api/sales', {
      method: 'POST',
      body: JSON.stringify(venta),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          producto: '',
          precio: 0,
          cantidad: 1,
          total: 0,
        });
      })
      .catch(err => console.log(err));
  }
  _randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  render(){
    return (
      <div>
        <h3>Venta de producto</h3>
        <div className="form-group">
          <label>Producto</label>
          <select 
            className="form-control"
            value={this.state.producto}
            placeholder="Seleccione un producto"
            name="producto" onChange={this.onHandleSelect}>
            {
              productosJson.map((obj) => {
                return (
                  <option value={obj.producto} key={obj.producto}>{obj.familia} {obj.categoria}</option>
                )
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input type="text" name="precio" value={this.state.precio} disabled={true} className="form-control"/>
        </div>
        <div className="form-group">
          <label>Cantidad</label>
          <input type="number" onChange={this.onHandleInput} name="cantidad" min="1" max="99" placeholder="1" className="form-control"/>
        </div>
        <div className="form-group">
          <label>Total</label>
          <input type="text" name="total" value={this.state.total} disabled={true} className="form-control"/>
        </div>
        <div className="form-group">
          <button className="btn btn-success" onClick={this.onSell}>Vender</button>
        </div>
      </div>
    );
  }
}

export default Sales;