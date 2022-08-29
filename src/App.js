import React, { useState, useEffect } from 'react';

// import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import './App.scss';
import {
  HashRouter,
  NavLink,
  Routes,
  Route,
} from 'react-router-dom';

import { FaPlus } from "react-icons/fa"
import { FaRegTimesCircle } from "react-icons/fa"

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
            <input type="text" id="email" name="email" className="formControls_input" placeholder="請輸入email" {...register("email", { required: { value: true, message: "此欄位必填" }, pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "不符合 Email 規則" } })} />
            <span> {errors.email?.message} </span>
            <label className="formControls_label" htmlFor="name">您的暱稱</label>
            <input type="text" name="name" id="name" className="formControls_input" placeholder="請輸入您的暱稱"  {...register("name")} />
            <label className="formControls_label" htmlFor="pwd">密碼</label>

            <input type="password" name="pwd" id="pwd" className="formControls_input" placeholder="請輸入密碼"  {...register("password", { required: { value: true, message: "此欄位必填" }, minLength: { value: 8, message: "密碼至少為 8 碼" } })} />
            <span>{errors.password?.message}</span>

            <NavLink to="/todo" style={{ textAlign: "center" }}>
              <input className="formControls_btnSubmit" type="submit" value="登入" />
            </NavLink>

            <NavLink to="/register" className="formControls_btnLink">
              註冊帳號
            </NavLink>

          </form>
        </div>
      </div>
    </div>
  )
};


const TodoList = () => {
  // 代辦事項清單元件
  const TodoListItem = ({ todoList, setTodolist, listTab }) => {
    // 完成事項
    const doneList = (id) => {
      const newArr = [...todoList];
      newArr.map((item) => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
      });
      setTodolist(newArr);
    };

    const delItem = (id) => {
      setTodolist(() => todoList.filter((item) => item.id !== id));
    };

    return (
      <ul className="todoList_item">
        {todoList.length > 0 ? (
          todoList.filter((item) => {
            if (listTab == 1) {
              return todoList;
            } else if (listTab == 2) {
              return item.checked == false;
            } else if (listTab == 3) {
              return item.checked == true;
            }
          })
            .map((item, i) => {
              return (
                <li key={i}>
                  <label className="todoList_label">
                    <input className="todoList_input" type="checkbox"
                      onChange={() => doneList(item.id)} checked={item.checked} />
                    <span>{item.title}</span>
                  </label>
                  <a onClick={() => delItem(item.id)}>
                  <FaRegTimesCircle />
                  </a>
                </li>
              );
            })
        ) : (
          <p>沒有代辦事項</p>
        )}
      </ul>
    );
  };
  //輸入代辦事項元件
  const InputBox = ({ todoList, setTodolist }) => {
    const [todoInput, setTodoInput] = useState('');
    // 新增代辦
    const addList = () => {
      if (todoInput !== '' && todoInput.trim() !== "") {
        let addId = Math.max(...todoList.map((item) => item.id)) + 1;
        setTodolist((state) => [
          { id: addId, title: todoInput, checked: false },
          ...state
        ]);
        setTodoInput('');
      }

    };
    //  輸入代辦事項
    const inputAdd = (e) => {
      e.preventDefault();
      setTodoInput(e.target.value);
    };
    return (
      <div className="inputBox">
        <input type="text" placeholder="請輸入待辦事項" value={todoInput} onChange={(e) => { setTodoInput(e.target.value); }} />
        <a  onClick={addList}>
        <FaPlus />
        </a>
      </div>
    );
  };
  const [todoList, setTodolist] = useState([
    { id: 1, title: "把冰箱發霉的檸檬拿去丟", checked: true },
    { id: 2, title: "打電話叫媽媽匯款給我", checked: false },
    { id: 3, title: "整理電腦資料夾", checked: false },
    { id: 4, title: "繳電費水費瓦斯費", checked: false },
    { id: 5, title: "約vicky禮拜三泡溫泉", checked: false },
    { id: 6, title: "約ada禮拜四吃晚餐", checked: false }
  ]);
  
  const [listTab, setListTab] = useState(1);
  
  
  // 清除完成項目
  const doneItem = ()=> {
    setTodolist((state)=> state.filter((item)=> item.checked === false));
  };
  
  // wacth
  useEffect(()=> {
    console.log(todoList);
  }, [todoList]);


  
  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1><a href="#">ONLINE TODO LIST</a></h1>
        <ul>
          <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
          <li><NavLink to="/login">登出</NavLink></li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <InputBox todoList={todoList} setTodolist={setTodolist} />
          {TodoListItem.length > 0 ? (
            <div className="todoList_list">
              <ul className="todoList_tab">
                <li>
                  <a
                    // href="#"
                    className={listTab == 1 ? "active" : ""}
                    onClick={() => setListTab(1)}
                  >
                    全部
                  </a>
                </li>
                <li>
                  <a
                    // href="#"
                    className={listTab == 2 ? "active" : ""}
                    onClick={() => setListTab(2)}
                  >
                    待完成
                  </a>
                </li>
                <li>
                  <a
                    // href="#"
                    className={listTab == 3 ? "active" : ""}
                    onClick={() => setListTab(3)}
                  >
                    己完成
                  </a>
                </li>
              </ul>
              <div className="todoList_items">
                <TodoListItem todoList={todoList} setTodolist={setTodolist} listTab={listTab} />
                <div className="todoList_statistics">
                  <p>
                    {todoList.filter((item) => item.checked !== true).length ? todoList.filter((item) => item.checked !== true).length + '個待完成項目' : '目前尚無待辦事項'}，
                    {todoList.filter((item) => item.checked == true).length}
                    個己完成項目</p>
                  <a  onClick={doneItem}>清除已完成項目</a>
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
            <input type="text" id="email" name="email" className="formControls_input" placeholder="請輸入email" {...register("email", { required: { value: true, message: "此欄位必填" }, pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "不符合 Email 規則" } })} />
            <span> {errors.email?.message} </span>

            <label className="formControls_label" htmlFor="pwd">密碼</label>
            <input type="password" name="pwd" id="pwd" className="formControls_input" placeholder="請輸入密碼"  {...register("password", { required: { value: true, message: "此欄位必填" }, minLength: { value: 8, message: "密碼至少為 8 碼" } })} />
            <span>{errors.password?.message}</span>

            <NavLink to="/todo" style={{ textAlign: "center" }}>
              <input className="formControls_btnSubmit" type="submit" value="登入" />
            </NavLink>

            <NavLink to="/register" className="formControls_btnLink">
              註冊帳號
            </NavLink>

          </form>
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
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </HashRouter>
    </div>
  );


}

export default App;
