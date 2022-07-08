import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import axios from "axios";
import { getTodos, updatedTodoData } from "../lib/api"

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/to-dos")
    .then((res)=>{
      const { data: { todos }, } = res;
      setTodos(todos);
    })
    .catch((err)=>{
      console.log(err.res.data.message);
    });
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    axios.post("http://localhost:3000/api/v1/to-dos", { ...todo })
    .then(()=>{
      getTodos().then((todos)=>setTodos(todos))
      .catch((err)=>console.log(err.message))
    })
  };

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    axios.delete(`http://localhost:3000/api/v1/to-dos/${id}`)
    .then(()=>{
      getTodos().then((todos)=>setTodos(todos))
      .catch((err)=>console.log(err.message))
    })
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}

export default TodoList;
