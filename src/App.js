import React, { Component } from 'react';
import './App.css';
import { render } from '@testing-library/react';


class todoList extends Component {
  // Create a reference to grab input field
  textInput = React.createRef()

  // Create State object YAY, my prayers have been answered.
  state = {
    query: '',
    text: '',
    todos: [],
    isClicked: false,
  }

  // Function to set focus on text input Field
  componentDidMount() {
    this.fixFocus();
  }
  
  fixFocus = () => {
    this.textInput.current.focus();
  }

  // Actions taken when Add Todo button is clicked.
  addTodoHandler = () => {
    // Save below 2 lines of code for another project
    // this.setState({ isClicked: !this.state.isClicked })
    // console.log(this.state.isClicked)
    
    // Move submitted text to todos array
    if(this.state.text.length > 0) {
    this.state.todos.push(this.state.text);
    } else {
      this.state.todos.push('Free time...I guess.')
    }

    // Clear input field
    this.setState({ text: ''});

    // Set Focus on Text Input Field
    this.fixFocus();
  }

  removeTodoHandler = (index)=> {
    // Filter through todos, compare todo scoped index with index passed in from VDOM click
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== index)
    })
  }

  inputFieldText = (e) => {
    this.setState({ text: e.target.value })
    // console.log(e.target.value);
  }

  searchFieldText = (e) => {
    this.setState({ query: e.target.value })
    // console.log(e.target.value)
  }

  render() {
    let filteredTodos = this.state.todos.filter((todo) => {
        return todo.indexOf(this.state.query) !== -1;
      }
    );
    return (
      <div className="todoBox">
        <h1 className="liveTodo">Todo: {this.state.text}</h1>
        <input className="textInput" ref={this.textInput} value={this.state.text} onChange={this.inputFieldText}></input>
        <button id="addButton" onClick={this.addTodoHandler}>Add Todo</button>
        <ul className="unorderedList">
          {filteredTodos.map((todo, index) => 
            <li className="listItem" key={index}>{index + 1}. {todo}<button id="deleteButton" onClick={() => this.removeTodoHandler(index)}>Done!</button></li>
          )}
        </ul>
        <input id="searchBox" className="textInput" placeholder="Search" value={this.state.query} onChange={this.searchFieldText}></input>
      </div>
    )
  }
};

export default todoList;
