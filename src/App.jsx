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
  const [ongoingTodos, setOngoingTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState(["Task C", "Task D"]);

  //Change active tab in response to pushing button
  const [activeTab, setActiveTab] = useState("tab1");
  const onClickActive1 = () => {
    setActiveTab("tab1");
  };
  const onClickActive2 = () => {
    setActiveTab("tab2");
  };
  //todo欄が入力できないのを阻止する
  const onChangeTodoText = (e) => setTodoText(e.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  //todoを未完了リストから削除
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
    console.log(newTodos);
  };
  //ONGOINGボタンを押したときの処理
  const onClickOngoing = (index) => {
    const targets = document.querySelectorAll(".list-row .ongoing");
    const arr = document.querySelectorAll('.list-row li');
    if(targets[index].classList.contains('ongoing-active') ){
      targets[index].classList.remove('ongoing-active');
      ongoingTodos.splice(index, 1);
      setOngoingTodos(ongoingTodos);
    } else {
      targets[index].classList.add('ongoing-active');
      const newOngoingTodos = [...ongoingTodos, arr[index].innerHTML];
      console.log(newOngoingTodos);
      setOngoingTodos(newOngoingTodos);
    }

  };
  //DONEボタンが押された時の処理
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };
  // UNDOボタンが押されたときの処理
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };
  //EDITボタンを押したときの処理
  const onClickEdit = (index) => {
    const arr = document.querySelectorAll(".list-row");
    const targetRow = arr[index];
    console.log(targetRow);

  };
  //IMPORTANTボタンを押したときの処理
  const onClickImportant = (index) => {
    const targets = document.querySelectorAll(".list-row .important");
    console.log(targets)
    targets[index].classList.contains('important-active') ? targets[index].classList.remove('important-active') : targets[index].classList.add('important-active');

  };
  // const onClickCheckbox = () => {
  //   const newTodos = [...incompleteTodos];
  //   newTodos.splice(index, 1);
  //   setIncompleteTodos(newTodos);
  //   console.log(newTodos);
  // }
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

      {/* <p>ONGOING</p><input type="checkbox" onChange={() => onClickCheckbox}></input> */}

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
          onClickEdit={onClickEdit}
          onClickImportant={onClickImportant}
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
