import React, { Component } from 'react';
import productosJson from './products.json';

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

  onHandleSelect(e) {
    const filtered = productosJson.filter((obj)=> Number(e.target.value) === obj.producto)[0];
    this.setState({
      producto: filtered.producto,
      precio: filtered.precio,
      total: filtered.precio * this.state.cantidad,
    });
  }
  onHandleInput(e){
    if (e.target.value > 99) {
      e.target.value = 99;
    }
    this.setState({
      cantidad: e.target.value,
      total: this.state.precio * e.target.value,
    })
  }
  onSell(){
    const venta = {
      producto_id: this.state.producto,
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
        this.setState({
          producto: '',
          precio: 0,
          cantidad: 1,
          total: 0,
        });
        M.toast({html: 'Venta satisfactoria!'});
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
            name="producto" onChange={this.onHandleSelect}>
            <option value="" defaultValue disabled hidden >Seleccione un producto</option>
            {
              productosJson.map((obj) => {
                return (
                  <option value={obj.producto} key={obj.producto}>{obj.familia} {obj.categoria} ${obj.precio}</option>
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
          <input type="number" onChange={this.onHandleInput} value={this.state.cantidad} name="cantidad" min="1" max="99" placeholder="1" className="form-control"/>
        </div>
        <div className="form-group">
          <label>Total</label>
          <input type="text" name="total" value={this.state.total} disabled={true} className="form-control"/>
        </div>
        <div className="form-group">
          <button className="btn btn-success"
            disabled={this.state.producto == ''} 
            onClick={this.onSell}>Vender</button>
        </div>
      </div>
    );
  }
}

export default Sales;