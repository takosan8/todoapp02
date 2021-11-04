import React from "react";

export const InputTodo = (props) => {
  const { todoText, onChange, onClick, disabled } = props;
  return (
    <div className="input-area">
      <input
        disabled={disabled}
        placeholder="Type some todo"
        value={todoText}
        onChange={onChange}
      />
      <button disabled={disabled} onClick={onClick}>
        Add
      </button>
    </div>
  );
};
