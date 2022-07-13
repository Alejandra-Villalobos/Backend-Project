import React, { useState, useEffect, useRef } from "react";
import { BsArrowDown, BsPlusCircleFill } from "react-icons/bs";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState(
    props.edit ? props.edit.description : ""
  );
  const date = new Date();
  const creationDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const [editionDate, setEditionDate] = useState();

  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setEditionDate(creationDate);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setShowDescription(!showDescription);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: uuidv4(),
      title: input,
      description,
      isDone: false,
      showDescription: false,
      creation: creationDate,
      edition: editionDate
    });
    setInput("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <div className="todo-form--update">
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit todo-description"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            name="description"
            className="todo-input todo-description"
          />

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
          <button onClick={handleDescription} className="todo-button edit">
            <BsArrowDown />
          </button>
          <button onClick={handleSubmit} className="todo-button">
            <BsPlusCircleFill />
          </button>
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
  );
}

export default TodoForm;
