import React, { Component } from 'react';

import './App.css';

class App extends Component {

  state = {
    products: [],
    product: {
      name: 'sample',
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
	deleteProd = item =>{
	console.log('this is:', item);
	var linka = "http://localhost:4000/products/delete?ID=" + item;
	console.log('this is kolya:', linka);
	fetch(linka)
      .then(this.getProducts)
      .catch(err => console.error(err))
}

  // edit products
	editProd = item =>{
	const { product } = this.state;
	console.log('this is:', item);
	var linka = `http://localhost:4000/products/edit?name=${product.name}&price=${product.price}&ID=` + item;
	console.log('this is kolya:', linka);
	fetch(linka)
      .then(this.getProducts)
      .catch(err => console.error(err))
}



  render() {



{/*    new version  */}
    const { product } = this.state;

    const listItem = this.state.products.map((item)=>{
        return <div key={item.ID}>
        			<span>{item.name} </span>
					<span>{item.price} </span>
         			<button type="button" onClick={this.deleteProd.bind(this, item.ID)}>Delete</button>
        			<button type="button" onClick={this.editProd.bind(this, item.ID)}>Edit</button>
        				<div className={item.ID}>   tut knopka </div>
		        </div>
    })



    return (
      <div className="App">
          
          <div className="container"> 
        <div id="firstname"> <p> lalala </p> </div>

        <div>
            <input
            placeholder="name"
            value ={product.name}
            onChange={e => this.setState({ product: { ...product, name: e.target.value}})}/>
            <input
            placeholder="price" 
            value ={product.price}
            onChange={e => this.setState({ product: { ...product, price: e.target.value}})}/>

            <button onClick={this.addProduct}> Add product </button>
        </div>
	
	{/*           new_version  */}
	{listItem}	

	<br/>

	




			</div>
      </div>
    );
  }
}

export default App;
