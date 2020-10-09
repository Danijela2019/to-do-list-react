import React, { Component } from 'react'
import './TodoCards.css';

class TodoCards extends Component {
  constructor(props) {
    super(props);
  
    this.createTasks = this.createTasks.bind(this);
  } 

  delete(key, event) {
    event.stopPropagation();
    this.props.delete(key);
  }

  toggle(key) {
    this.props.toggle(key);
  }

  createTasks(item){
    const className = item.done ? 'task done' : 'task';
    return (
      <li className={`${className} task-card`}  onClick={() => this.toggle(item.key)} key={item.key}>
        <h1 className="task-header">{item.text}</h1>
        <p className="task-paragraph">{item.description}</p>
        <button className="task-button" onClick ={(event) => this.delete(item.key, event)}>Remove</button>
      </li>
    );
  }
  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);
    return <ul className="task-list">{listItems}</ul>
  }
}
export default TodoCards; 
