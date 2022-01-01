import React, { useState } from "react";
import "./App.css";

//Todo's type
type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
  important: boolean;
};
type Filter = "all" | "checked" | "unchecked" | "removed" | "important";

export const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const handleOnSubmit = () => {
    if (!text) return;
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
      important: false,
    };

    setTodos([newTodo, ...todos]);
    setText("");
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleOnEdit = (id: number, value: string) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });
    console.log("=== Original todos ===");
    todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));
    setTodos(newTodos);
  };
  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "important":
        return todo.important && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  const handleOnImportant = (id: number, important: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.important = !important;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const today = new Date();

  return (
    <div className="wrapper">
      <div className="header">
        <h1>
          {today.getFullYear() +
            "/" +
            (today.getMonth() + 1) +
            "/" +
            today.getDate() +
            "/"}
        </h1>
      </div>
      <div className="main">
        {/* filter */}
        {/* // e.target.value: string を Filter 型にキャストします */}
        <select
          defaultValue="all"
          onChange={(e) => setFilter(e.target.value as Filter)}
        >
          <option value="all">すべて</option>
          <option value="checked">完了</option>
          <option value="unchecked">未完了</option>
          <option value="important">重要</option>
          <option value="removed">ごみ箱</option>
        </select>
        {filter === "removed" ? (
          <button
            onClick={handleOnEmpty}
            disabled={todos.filter((todo) => todo.removed).length === 0}
          >
            ごみ箱を空にする
          </button>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
          >
            <input
              type="text"
              className="input-area"
              value={text}
              disabled={filter === "checked"}
              onChange={(e) => handleOnChange(e)}
            />
            <input
              type="submit"
              value="追加"
              disabled={filter === "checked"}
              onSubmit={handleOnSubmit}
            />
          </form>
        )}
        <ul>
          {filteredTodos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  disabled={todo.removed}
                  checked={todo.checked}
                  onChange={(e) => handleOnCheck(todo.id, todo.checked)}
                />
                <input
                  type="text"
                  disabled={todo.checked || todo.removed}
                  value={todo.value}
                  onChange={(e) => handleOnEdit(todo.id, e.target.value)}
                />
                <button
                  className="removeBtn"
                  onClick={() => handleOnRemove(todo.id, todo.removed)}
                >
                  {todo.removed ? "復元" : "削除"}
                </button>
                <button
                  className={todo.important ? "importantBtn" : "inactive"}
                  onClick={() => handleOnImportant(todo.id, todo.important)}
                >
                  重要
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
