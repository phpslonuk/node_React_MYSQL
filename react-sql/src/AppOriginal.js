import React, { Component } from 'react';

import './App.css';

class App extends Component {

  state = {
    products: [],
    product: {
      name: 'sample',
      delete_name: 'insert name',
      price: 20
    }
  }

  componentDidMount() {
    this.getProducts();
  }




  // show products
  getProducts = _ =>{
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(response => this.setState({ products: response.data }))
      .catch(err => console.error(err))
  }

  // add products
  addProduct = _ => {
    const { product } = this.state;
    fetch(`http://localhost:4000/products/add?name=${product.name}&price=${product.price}`)
      .then(this.getProducts)
      .catch(err => console.error(err))
  }

  // delete products
  deleteProduct = _ => {
    const { product } = this.state;
    fetch(`http://localhost:4000/products/delete?name=${product.delete_name}`)
      .then(this.getProducts)
      .catch(err => console.error(err))

  }







  renderProduct = ({ ID, name, price }) => 
  	<div key={ID}>
		<p> {ID} {name} {price} </p> 

		
	</div>


  render() {
    const { products, product } = this.state;
    return (
      <div className="App">
          <div>

            {products.map(this.renderProduct)} 

            <br/>

             

          </div>


          <div>
            <input
            value={product.name} 
            onChange={e => this.setState({ product: { ...product, name: e.target.value}})}/>
            <input
            value={product.price} 
            onChange={e => this.setState({ product: { ...product, price: e.target.value}})}/>

            <button onClick={this.addProduct}> Add product </button>
         </div>
			
         <div>
            <input
            value={product.delete_name} 
            onChange={e => this.setState({ product: { ...product, delete_name: e.target.value}})}/>

            <button onClick={this.deleteProduct}> Delete product </button>
         </div>
			

 





      </div>
    );
  }
}

export default App;
