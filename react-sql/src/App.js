import React, { Component } from 'react';
import $ from 'jquery';
import {findDOMNode} from 'react-dom';
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


addNewShow = _ => {
  const el =findDOMNode(this.refs.showAddNew);
  $(el).slideToggle();
}

showEdit = _ => {
  const el =findDOMNode(this.refs.showEdit);
  $(el).slideToggle();
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

        const el =findDOMNode(this.refs.showAddNew);
        $(el).slideToggle();


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
          <div id="title"> <h1> Hello, list of companies </h1> </div>



            <button className="addnew btn btn-primary" onClick={this.addNewShow}> New company </button>
              

              <div ref='showAddNew' className="showAddNew form-group"> 
                <input className="form-control" placeholder="name"
                   onChange={e => this.setState({ product: { ...product, name: e.target.value}})}/>
                <input className="form-control" placeholder="price" 
                  onChange={e => this.setState({ product: { ...product, price: e.target.value}})}/>
                <button className="addbtn btn btn-success" onClick={this.addProduct}> Add product </button>
              </div>

              
              <div ref='showEdit' className="showEdit form-group"> Enter data 
                <input className="form-control" placeholder="new name"
                   onChange={e => this.setState({ product: { ...product, name: e.target.value}})}/>
                <input className="form-control" placeholder="new price" 
                  onChange={e => this.setState({ product: { ...product, price: e.target.value}})}/>

                <button type="button" onClick={this.editProd}>Edit</button>
              </div>










	
	{/*           new_version  */}
	{listItem}	

	<br/>

	

      <button onClick={this.showEdit}> Edit </button>



      



			</div>
      </div>
    );
  }
}

export default App;
