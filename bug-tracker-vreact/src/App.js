import React, { Component } from 'react';
import Header from './header.js'
import Footer from './footer.js'
import Chance from 'chance'
import BugList from './BugList.js'
import './App.css';
import './../node_modules/bulma/css/bulma.css'

const chance = new Chance()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bugs: JSON.parse(localStorage.getItem('bugs')) || [],
      bug: {
        id: chance.guid(),
        description: '',
        severity: '',
        assignedTo: '',
        status: 'Open'
      }
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleStatusClosed = this.handleStatusClosed.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveBug = this.saveBug.bind(this)
  }

  handleChange (e) {
    // console.log('------', this.state);
    const state = this.state.bug
    state[e.target.name] = e.target.value

    this.setState(state)
  }

  saveBug (e) {
    e.preventDefault()

    // console.log(this.state.bug);

    this.setState(function(state) {
      state.bugs.push(state.bug)
      // console.log(state.bugs);
      localStorage.setItem('bugs', JSON.stringify(state.bugs))
    })

    this.setState({
      bug: {
        id: chance.guid(),
        description : '',
        severity : '',
        assignedTo : '',
        status: 'Open'
      }
    })

    alert("Berhasil Tambah")
  }

  handleDelete (id) {
    // console.log("ini kepanggil");

    let index = this.state.bugs.findIndex((bug) => {
      return bug.id === id
    })

    this.state.bugs.splice(index, 1)

    localStorage.setItem('bugs', JSON.stringify(this.state.bugs))

    this.forceUpdate()
  }

  handleStatusClosed (id) {
    // console.log(this.state.bugs);
    let index = this.state.bugs.findIndex((bug) => {
      return bug.id === id
    })

    this.state.bugs[index].status = 'Close'
    // console.log(this.state.bugs[index].status);

    localStorage.setItem('bugs', JSON.stringify(this.state.bugs))

    this.forceUpdate()
  }

  render () {
    const { description, severity, assignedTo } = this.state.bug
    return (
      <div className="App">
        <Header />

        <div className="container">
          <section className="hero is-medium">
            <div className="hero-body">
              <h2 className="title">Add New Bug Report:</h2>

              <form id="bugInputForm" onSubmit={this.saveBug}>
                <label className="label" for="">Description</label>
                <p className="control">
                  <input className="description" name="description" type="text" id="description" placeholder="Describe a bug..." value={description} onChange={this.handleChange} required/>
                </p>
                <label className="label" for="">Severity</label>
                <span className="select">
                  <select id="severity" name="severity" value={severity} onChange={this.handleChange} required>
                    <option value="">Please Select Severity</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </span>
                <label className="label" for="">Assigned To</label>
                <p className="control">
                  <input className="assignedTo" name="assignedTo" type="text" id="assignedTo" placeholder="Enter responsible..." value={assignedTo} onChange={this.handleChange} required/>
                </p> <br />
                <div className="control is-grouped">
                  <p className="control">
                    <button className="button is-warning">Submit</button>
                  </p>
                </div>
              </form>
            </div>
          </section>

          <hr />

          <div className="columns">
            <BugList bugs={this.state.bugs} delete={this.handleDelete} close={this.handleStatusClosed} />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
