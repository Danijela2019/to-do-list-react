import React, { Component } from 'react'
import TodoCards from "./TodoCards";
import './TodoList.css'; 

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: []
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
  }

  addItem(event) {
    event.preventDefault();
    if (this._titleElement.value !== "" && this._descriptionElement.value !== ""){
      const newItem = {
        text: this._titleElement.value,
        description: this._descriptionElement.value,
        done: false,
        key: Date.now(),
        }
      this.setState((prevState) => {
        return {
          items: [...prevState.items, newItem].sort((a, b) => {
            return a.done - b.done || a.key - b.key;
          })
        }
      });
      this._titleElement.value = "";
      this._descriptionElement.value = "";
    }
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter((item) => (item.key !== key));
    this.setState({
      items: filteredItems
    });
  }

  toggleItem(key) {
    const itemsCopy = this.state.items;
    const index = itemsCopy.findIndex((item) => item.key === key);
    itemsCopy[index].done = !itemsCopy[index].done;
   
    this.setState({
      items: itemsCopy.sort((a, b) => {
        return a.done - b.done || a.key - b.key;
      })
    });
  }

  render() {
    return (
      <section className="todo-list ">
        <form className="todo-list__form" onSubmit={this.addItem}>
        <div>
          <button className="to-do__decoration-button">Register new todo</button>
        </div>
          <input ref={(titleElement) => this._titleElement = titleElement} 
            placeholder=" Enter Task Name" className="todo-list__title"/>
          <input ref={(descElement) => this._descriptionElement = descElement} 
             placeholder=" Enter Task Description" className="todo-list__description"/>
          <button className="todo-list__button" type="submit"> Add Task </button>
        </form>
          
        <TodoCards entries={this.state.items}
                    toggle={this.toggleItem}
                    delete={this.deleteItem}/>
      </section>
    );
  }
}

export default TodoList;
