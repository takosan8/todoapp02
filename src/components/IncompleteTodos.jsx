import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete,onClickOngoing } = props;
  
  return (
    <div className="incomplete-area">
      <h2 className="title">Incomplete</h2>
      <ul>
        {todos.map((todo, index) => {
          return (
            <div key={todo} className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickComplete(index)}>DONE</button>
              <button onClick={() => onClickDelete(index)} className="delete">DELETE</button>
              <button onClick={() => onClickOngoing(index)} className="ongoing">ONGOING</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
