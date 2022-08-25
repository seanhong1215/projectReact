import React from "react";
import { useForm } from "react-hook-form";
import './App.scss';
import {
  HashRouter,
  // NavLink,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import {FaPlus} from "react-icons/fa"
import {FaRegTimesCircle} from "react-icons/fa"

const { useState, useEffect } = React;


const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(JSON.stringify(data));
  const onError = (errors, e) => console.log(errors, e);
  return (
    <div id="signUpPage" className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
        <div className="side">
            <a href="#">
              <img className="logoImg" src={require('./assets/images/rhefZ3.png')} alt="logoImg" />
            </a>
            <img className="d-m-n" src={require('./assets/images/tj3Bdk.png')} alt="workImg" />
        </div>
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmit, onError)}>
            <h2 className="formControls_txt">註冊帳號</h2>
            <label className="formControls_label" htmlFor="email">Email</label>
            <input type="text" id="email" name="email" className="formControls_input" placeholder="請輸入email" {...register("email", { required: {value : true, message: "此欄位必填"}, pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message:  "不符合 Email 規則"} })} />
            <span> {errors.email?.message } </span>
            <label className="formControls_label" htmlFor="name">您的暱稱</label>
            <input type="text" name="name" id="name" className="formControls_input" placeholder="請輸入您的暱稱"  {...register("name")} />
            <label className="formControls_label" htmlFor="pwd">密碼</label>

            <input type="password" name="pwd" id="pwd" className="formControls_input" placeholder="請輸入密碼"  {...register("password", { required: {value : true, message: "此欄位必填"}, minLength: {value: 8, message:  "密碼至少為 8 碼"} })} />
            <span>{errors.password?.message}</span>

            <Link to="/todo" style={{textAlign: "center"}}>
              <input className="formControls_btnSubmit" type="submit" value="登入" />
            </Link>

            <Link to="/register" className="formControls_btnLink">
              註冊帳號
            </Link>

          </form>
        </div>
      </div>
    </div>
  )
};
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(JSON.stringify(data));
  const onError = (errors, e) => console.log(errors, e);
  
  return (
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer">
        <div className="side">
            <a href="#">
              <img className="logoImg" src={require('./assets/images/rhefZ3.png')} alt="logoImg" />
            </a>
            <img className="d-m-n" src={require('./assets/images/tj3Bdk.png')} alt="workImg" />
        </div>
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmit, onError)}>
            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
            <label className="formControls_label" htmlFor="email">Email</label>
            <input type="text" id="email" name="email" className="formControls_input" placeholder="請輸入email" {...register("email", { required: {value : true, message: "此欄位必填"}, pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message:  "不符合 Email 規則"} })} />
            <span> {errors.email?.message } </span>
            
            <label className="formControls_label" htmlFor="pwd">密碼</label>
            <input type="password" name="pwd" id="pwd" className="formControls_input" placeholder="請輸入密碼"  {...register("password", { required: {value : true, message: "此欄位必填"}, minLength: {value: 8, message:  "密碼至少為 8 碼"} })} />
            <span>{errors.password?.message}</span>

            <Link to="/todo" style={{textAlign: "center"}}>
              <input className="formControls_btnSubmit" type="submit" value="登入" />
            </Link>

            <Link to="/register" className="formControls_btnLink">
              註冊帳號
            </Link>

          </form>
        </div>
      </div>
    </div>
  )
};

const Todolist = () => {

  // component
  function AddContent({ newTodo, setNewTodo, addTodo }) {
    return (
      <div className="inputBox">
        <input
          className="todoList_input"
          type="text"
          placeholder="請新增代辦事項"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value.trim())}
          onKeyPress={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <a onClick={addTodo}>
        <FaPlus />
        </a>
      </div>
    );
  }
  function Tab({ tab, currentTab, setCurrentTab }) {
    return (
      <>
        {tab.map((item) => (
          <li
            key={item.id}
            className={item.id === currentTab ? "currentTab" : ""}
            id={item.id}
            onClick={() => setCurrentTab(item.id)}
          >
            {item.type}
          </li>
        ))}
      </>
    );
  }
  function TodoItem({ currentTodoItem, done, clean }) {
    return (
      <>
        {currentTodoItem.map((item) => (
          <li key={item.id} className="todoItems">
            <label className="todoList_label" htmlFor={item.id}>
              <input
                className="todoList_input"
                type="checkbox"
                id={item.id}
                checked={item.isDone}
                onChange={done}
              />
              <div className={item.isDone ? "check" : ""}></div>
              <p className={item.isDone ? "done" : ""}>{item.todo}</p>
            </label>
            <a id={item.id} onClick={clean}>
            <FaRegTimesCircle />
            </a>
          </li>
        ))}
      </>
    );
  }
  
  const [newTodo, setNewTodo] = useState("");
  const tab = [
    {
      id: "all",
      type: "全部"
    },
    {
      id: "undone",
      type: "待完成"
    },
    {
      id: "done",
      type: "已完成"
    }
  ];
  const [currentTab, setCurrentTab] = useState("all");
  const [todoItem, setTodoItem] = useState([
    {
      id: Math.random(),
      todo: "起床",
      isDone: true
    },
    {
      id: Math.random(),
      todo: "吃飯",
      isDone: false
    },
    {
      id: Math.random(),
      todo: "洗澡",
      isDone: false
    },
    {
      id: Math.random(),
      todo: "睡覺",
      done: false
    }
  ]);
  const [currentTodoItem, setCurrentTodoItem] = useState(todoItem);
  const undone = todoItem.filter((item) => !item.isDone);
  const undoneLeg = undone.length;

    // function
    const addTodo = () => {
      if (newTodo !== "") {
        setTodoItem((state) => [
          ...state,
          {
            id: Math.random(),
            todo: newTodo,
            isDone: false
          }
        ]);
        setCurrentTodoItem(todoItem);
        setNewTodo("");
      }
    };
    // 1.監聽currentTab，當切換tab就執行 2.監聽todoItem，當切換check就執行
    useEffect(() => {
      switch (currentTab) {
        case "all":
          setCurrentTodoItem(todoItem);
          break;
        case "undone":
          setCurrentTodoItem(todoItem.filter((item) => !item.isDone));
          break;
        case "done":
          setCurrentTodoItem(todoItem.filter((item) => item.isDone));
          break;
      }
    }, [currentTab, todoItem]);
    const done = (e) => {
      // 要取得的事checked的值，才能將checked值放到done上（原因：checked是負責切換checkbox的）
      const { id, checked } = e.target;
      return setTodoItem(
        todoItem.map((item) =>
          item.id === Number(id) ? { ...item, isDone: checked } : item
        )
      );
    };
    const clean = (e) => {
      setTodoItem(todoItem.filter((item) => item.id !== Number(e.target.id)));
    };
    const cleanAll = () => {
      setTodoItem(todoItem.filter((item) => !item.isDone));
      setCurrentTab("all");
    };
 


  return (
    <div id="todoListPage" className="bg-half">
       <nav>
            <h1><a href="#">ONLINE TODO LIST</a></h1>
            <ul>
                <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
                <li><Link to="/login">登出</Link></li>
            </ul>
        </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
        <AddContent
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
        />
{todoItem.length > 0 ? (
          <div className="todoList_list">
            <ul className="todoList_tab">
            <Tab
                tab={tab}
                setCurrentTab={setCurrentTab}
                currentTab={currentTab}
              />
            </ul>
            <div className="todoList_items">
              <ul className="todoList_item">
              <TodoItem
                currentTodoItem={currentTodoItem}
                done={done}
                clean={clean}
              />
              </ul>
              <div className="todoList_statistics">
              <p>
              {undoneLeg}個待完成項目
              </p>
              <a onClick={cleanAll}>清除已完成項目</a>
              </div>
            </div>
         
              

         
          </div>
             ) : (
              <div className="empty">
            <div>
              <h2>目前無待辦事項 !</h2>
            </div>
          </div>
           )}
        </div>
      </div>
    </div>
  )
};







function App() {
  return (
    <div className="container">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/todo" name="todo" element={<Todolist />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </HashRouter>
    </div>
  );


}

export default App;
