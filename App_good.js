import React, { Component } from 'react';

import './App.css';

class App extends Component {

  state = {
    canadd: false,
    companies: [],
    company: {
      nameMain: 'company',
      nameChild: 'child company',
      profit: 0,
      childEarnings: 0,
      id: 0
    }
  }

  componentDidMount() {
    this.getCompanies();
  }

  // show Companies
  getCompanies = _ =>{
    fetch('http://localhost:4000/companies')
      .then(response => response.json())
      .then(response => this.setState({ companies: response.data }))
      .catch(err => console.error(err))

  }

  // delete Companies
  deleteCompanies = item =>{
  console.log('this is:', item);
  const ID_DELETE = "http://localhost:4000/companies/delete?id=" + item;
  console.log('this is id:', ID_DELETE);
  fetch(ID_DELETE)
      .then(this.getCompanies)
      .catch(err => console.error(err))
}

  // add Companies
  addCompanies = _ => {
    const { company } = this.state;
    const ADD_NEW_COMP = `http://localhost:4000/companies/add?namemain=${company.nameMain}&namechild=${company.nameChild}&profit=${company.profit}&childearnings=${company.childEarnings}`;
    console.log('this is ADD_NEW_COMP:', ADD_NEW_COMP);  
    this.setState({ canadd: false});
    fetch(ADD_NEW_COMP)
      .then(this.getCompanies)
      .catch(err => console.error(err))

 
  }

  //button add new company
    addNewShow = _ => {
  this.setState({ canadd: true});
}

  //button edit company
showEdit = _ => {

}

  // edit Companies
  editCompanies = item =>{
  const { company } = this.state;
  console.log('this is:', item);
  const EDIT = `http://localhost:4000/companies/edit?namemain=${company.nameMain}&namechild=${company.nameChild}&profit=${company.profit}&childearnings=${company.childEarnings}&id=` + item;
  console.log('this is EDIT:', EDIT);
    fetch(EDIT)
      .then(this.getCompanies)
      .catch(err => console.error(err))
}





  render() {

        const { company } = this.state;

        const canadd = this.state.canadd;

        const listItem = this.state.companies.map((item)=>{
        return (<div key={item.id} className="showDetail border border-info rounded">
              <span>Company: {item.NameMain}</span>
              <br/>
              <span>Profit: ${item.Profit} </span> 
              <br/>
              <span>Children: {item.NameChild} </span>
              <br/>
              <span>ChildEarnings: ${item.ChildEarnings} </span>
              <br/>

              <div className="buuutton">  
                <button type="button" className="btn btn-info buuutton" onClick={this.showEdit}>Edit</button>
                <button type="button" className="btn btn-danger buuutton" onClick={this.deleteCompanies.bind(this, item.id)}>Delete</button>
              </div>
              

              
              <div ref='showEdit' className="show Edit form-group"> <h3> Enter data </h3>
                <input className="form-control" placeholder="new company name"
                   onChange={e => this.setState({ company: { ...company, nameMain: e.target.value}})}/>
                <input className="form-control" placeholder="new name Child" 
                  onChange={e => this.setState({ company: { ...company, nameChild: e.target.value}})}/>
                <input className="form-control" placeholder="new  profit"
                  onChange={e => this.setState({ company: { ...company, profit: e.target.value}})}/>
                <input className="form-control" placeholder="new child Earnings" 
                  onChange={e => this.setState({ company: { ...company, childEarnings: e.target.value}})}/>

                 <div className="buuutton">     
                  <button className="btn btn-success" type="button" onClick={this.editCompanies.bind(this, item.id)}>Save</button>
                </div>
              

                </div>
              

              </div>)
                })


    return (
      <div className="App">
          
             {/* header */} 
        <div className="container"> 
          <div id="title"> <h1> Hello, list of companies </h1> </div>
            
            {/* new company button */} 
            <button className="addnew btn btn-primary" onClick={this.addNewShow}> New company </button>
	        
          {canadd ? (
            
              <div  className="show AddNew form-group"> 
              
                <input className="form-control" placeholder="company name"
                   onChange={e => this.setState({ company: { ...company, nameMain: e.target.value}})}/>
                <input className="form-control" placeholder="child name" 
                  onChange={e => this.setState({ company: { ...company, nameChild: e.target.value}})}/>
                <input className="form-control" placeholder="profit" 
                  onChange={e => this.setState({ company: { ...company, profit: e.target.value}})}/>
                <input className="form-control" placeholder="earnings" 
                  onChange={e => this.setState({ company: { ...company, childEarnings: e.target.value}})}/>
                <button className="addbtn btn btn-success" onClick={this.addCompanies}> Add company </button>
              </div> 
              ) : (<div>  </div>)}

	<br/>   
    {/* show companies */}
    {listItem}








			</div>
      </div>
    );
  }
}

export default App;
