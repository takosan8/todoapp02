import React from "react";

export const IncompleteTodos = (props) => {
  //propsをApp.jsxからもらってきてこのコンポーネント内で展開する
  const { todos, onClickComplete, onClickDelete,onClickOngoing,onClickEdit } = props;
  
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
              <button onClick={() => onClickEdit(index)} className="important">★</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
