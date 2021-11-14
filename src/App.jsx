import { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import { Header } from "./components/Header";

import './style.css';

function App() {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([
    "new Task",
    "new Task 2"
  ]);
  const [completeTodos, setCompleteTodos] = useState(["Task C", "Task D"]);

  const [activeTab, setActiveTab] = useState("tab1");
  const onClickActive1 = () => {
    setActiveTab("tab1");
  };
  const onClickActive2 = () => {
    setActiveTab("tab2");
  };

  const onChangeTodoText = (e) => setTodoText(e.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };
  const onClickOngoing = (index) => {
    const arr = document.querySelectorAll(".list-row");
    console.log(arr);
    if(arr[index].classList.contains('ongoing') == true){
      arr[index].classList.remove('ongoing');
    } else {
      arr[index].classList.add('ongoing');
    }
  };
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];gi
    newIncompleteTodos.splice(index, 1);
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };
  return (
    <>
      {/* show header */}
      <Header />
      <div className="button-area">
        <button
          className={activeTab === "tab1" ? "active-btn" : "inactive-btn"}
          onClick={onClickActive1}
        >
          Incomplete
        </button>
        <button
          className={activeTab === "tab2" ? "active-btn" : "inactive-btn"}
          onClick={onClickActive2}
        >
          Done
        </button>
      </div>
      {/* input new task */}
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p className="overAlert">
          You can register todo upto 5.
          <br />
          Now it's time to focus finish remaining task.
        </p>
      )}
      <div className={activeTab === "tab1" ? "tab tab-done active" : "tab"}>
        <IncompleteTodos
          todos={incompleteTodos}
          onClickComplete={onClickComplete}
          onClickDelete={onClickDelete}
          onClickOngoing={onClickOngoing}
        />
      </div>
      <div
        className={activeTab === "tab2" ? "tab tab-incomplete active" : "tab"}
      >
        <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
      </div>
    </>
  );
}
export default App;
