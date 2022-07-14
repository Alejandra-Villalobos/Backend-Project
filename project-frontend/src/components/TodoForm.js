import React, { useState, useEffect, useRef } from "react";
import { BsArrowDown, BsPlusCircleFill } from "react-icons/bs";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

function TodoForm(props) {
  const errorMessage = "The priority must be between 0 (min) and 5 (max)";
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [priority, setPriority] = useState(props.edit ? props.edit.priority : "");
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState(
    props.edit ? props.edit.description : ""
  );
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setShowDescription(!showDescription);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(priority<0||priority>5){
      return;
    }

    props.onSubmit({
      id: uuidv4(),
      title: input,
      description,
      isDone: false,
      showDescription: false,
      priority
    });
    setInput("");
    setDescription("");
    setPriority("");
    errorMessage = "";
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <div className="todo-form--update">
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input"
          />
          <input 
            placeholder="level"
            value={priority}
            onChange={handlePriorityChange}
            ref={inputRef}
            className="todo-input level"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            name="description"
            className="todo-input todo-description"
          />
          <div className = {(priority<0||priority>5) ? "error" : "hide"}>
            {errorMessage}
          </div>
          <button onClick={handleSubmit} className="todo-button">
            <RiCheckboxCircleLine />
          </button>
        </div>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <input 
            placeholder="level"
            value={priority}
            onChange={handlePriorityChange}
            ref={inputRef}
            className="todo-input level"
          />
          <button onClick={handleDescription} className="todo-button edit">
            <BsArrowDown />
          </button>
          <button onClick={handleSubmit} className="todo-button">
            <BsPlusCircleFill />
          </button>
          <div className = {(priority<0||priority>5) ? "error" : "hide"}>
            {errorMessage}
          </div>
          {showDescription && (
            <textarea
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              className="todo-input todo-description"
            />
          )}
        </>
      )}
    </form>
    </>
  );
}

export default TodoForm;
