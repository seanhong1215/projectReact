import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import './App.scss';
import {
  HashRouter,
  NavLink,
  Routes,
  Route,
  Outlet
} from 'react-router-dom';
// import Swal from 'sweetalert2'

import { FaPlus } from "react-icons/fa"
import { FaRegTimesCircle } from "react-icons/fa"
import * as api from "./utils/api.js";
import Swal from 'sweetalert2'

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(JSON.stringify(data));
  const onError = (errors, e) => console.log(errors, e);
  const Swal = require('sweetalert2');  


const Register = () => {
    console.log('帳號註冊')
    api.register({
      user: {
        email: '',
        password: '',
        nickname: '' 
      }
    }).then((res)=>{
    console.log(res.data.message)
    }).catch((error)=>{
      console.log(error)
    })
}

const SignIp = () => {
  console.log('帳號登入')
  api.signIp({
    user: {
      email: 'seanhong1215@gmail.com',
      password: 'sean1215',
    }
  }).then((res)=>{
    console.log(res.data.message)
    if(res.data.message === '登入成功'){
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
    }).catch((error)=>{
      console.log(error)
    })
}

const SignUp = () => {
  console.log('帳號登出')
  api.signUp().then((res)=>{
    console.log(res.data.message)
    }).catch((error)=>{
      console.log(error)
    })
}

const GetTodos = () => {
  console.log('todos列表')
  api.GetTodos().then((res)=>{
    console.log(res.data.message)
    }).catch((error)=>{
      console.log(error)
    })
}
const PostTodos = () => {
  console.log('新增todos')
  api.PostTodos({
    todo: {
      content: ""
    }
  }).then((res)=>{
    console.log(res.data.message)
    }).catch((error)=>{
      console.log(error)
    })
}
const PutTodos = (id) => {
  console.log('修改todos')
  api.PutTodos(id,{
    todo: {
      content: ""
    }
  }).then((res)=>{
    console.log(res.data.message)
    }).catch((error)=>{
      console.log(error)
    })
}
const DeleteTodos = (id) => {
  console.log('刪除todos')
  api.DeleteTodos(id).then((res)=>{
    console.log(res.data.message)
    }).catch((error)=>{
      console.log(error)
    })
}
const PatchTodos = (id) => {
  console.log('更新完成todos切換')
  api.PatchTodos(id).then((res)=>{
    console.log(res.data.message)
    }).catch((error)=>{
      console.log(error)
    })
}
const [data, setData] = useState([]);


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

            <NavLink to='/register' className="formControls_btnLink" >
              註冊帳號
            </NavLink>
            <span onClick={Register}>註冊</span>
            <span onClick={SignIp}>登入</span>
            <span onClick={SignUp}>登出</span>
          </form>
        </div>
      </div>
    </div>
  )
};


const TodoList = () => {
  //輸入代辦事項元件
  const InputBox = ({ todoList, setTodolist }) => {
    const [todoInput, setTodoInput] = useState("");

    // 新增代辦
    const addListTodo = () => {
      if (todoInput !== "" && todoInput.trim() !== "") {
        let addTodoIndex = Math.random();
        setTodolist((state) => [
          { id: addTodoIndex, title: todoInput, checked: false },
          ...state,
        ]);
        setTodoInput("");
      }
    };

    //畫面
    return (
      <div className="inputBox">
        <input
          type="text"
          placeholder="請輸入待辦事項"
          value={todoInput}
          onChange={(e) => {
            setTodoInput(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") addListTodo();
          }}
        />
        <a onClick={addListTodo}>
          <FaPlus />
        </a>
      </div>
    );
  };

  // 代辦清單
  const [todoList, setTodolist] = useState([
    { id: 1, title: "把香蕉吃完", checked: true },
    { id: 2, title: "整理冰箱", checked: false },
    { id: 3, title: "打掃房間", checked: false },
    { id: 4, title: "洗衣服", checked: false },
    { id: 5, title: "繳房租水電", checked: false },
    { id: 6, title: "打電話訂餐廳", checked: false }
  ]);

  // tab清單切換
  const [itemListTab, setitemListTab] = useState(1); //tab === 全部(1)

  // 代辦清單元件
  const TodoListItem = ({ todoList, setTodolist, itemListTab }) => {
    // 完成事項
    const doneTodoList = (id) => {
      const newTodoList = [...todoList];
      // console.log(newTodoList)
      newTodoList.map((item) => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
      });
      setTodolist(newTodoList);
    };

    // 刪除事項
    const delTodoList = (id) => {
      setTodolist(() => todoList.filter((item) => item.id !== id));
    };

    // reander畫面
    return (
      <ul className="todoList_item">
        {todoList
          .filter((item) => {
            // 全部
            if (itemListTab === 1) {
              return todoList;
            } else if (itemListTab === 2) {
              //待完成
              return item.checked === false;
            } else if (itemListTab === 3) {
              // 已完成
              return item.checked === true;
            }
          })
          .map((item, i) => {
            return (
              <li key={i}>
                <label className="todoList_label">
                  <input
                    className="todoList_input"
                    type="checkbox"
                    onChange={() => doneTodoList(item.id)}
                    checked={item.checked}
                  />
                  <span>{item.title}</span>
                </label>
                <a onClick={() => delTodoList(item.id)}>
                  <FaRegTimesCircle />
                </a>
              </li>
            );
          })}
      </ul>
    );
  };

  // 清除完成項目
  const finishItem = () => {
    setTodolist((state) => state.filter((item) => item.checked === false));
  };

  // wacth
  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (itemListTab) {
      case "1":
        setitemListTab(todoList);
        break;
      case "2":
        setitemListTab(todoList.filter((item) => !item.checked));
        break;
      case "3":
        setitemListTab(todoList.filter((item) => item.checked));
        break;
    }
    // console.log(todoList);
  }, [itemListTab, todoList]);

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="#">
              <span>王小明的代辦</span>
            </a>
          </li>
          <li>
            <NavLink to="/login">登出</NavLink>
          </li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <InputBox todoList={todoList} setTodolist={setTodolist} />
          <div className="todoList_list">
            <ul className="todoList_tab">
              <li>
                <a
                  className={itemListTab == 1 ? "active" : ""}
                  onClick={() => setitemListTab(1)}
                >
                  全部
                </a>
              </li>
              <li>
                <a
                  className={itemListTab == 2 ? "active" : ""}
                  onClick={() => setitemListTab(2)}
                >
                  待完成
                </a>
              </li>
              <li>
                <a
                  className={itemListTab == 3 ? "active" : ""}
                  onClick={() => setitemListTab(3)}
                >
                  己完成
                </a>
              </li>
            </ul>
            <div className="todoList_items">
              <TodoListItem
                todoList={todoList}
                setTodolist={setTodolist}
                itemListTab={itemListTab}
              />
              <div className="todoList_statistics">
                <p>
                  {todoList.filter((item) => item.checked !== true).length > 0
                    ? todoList.filter((item) => item.checked !== true).length +
                      "個待完成項目"
                    : "目前尚無待辦事項"}
                </p>
                <a onClick={finishItem}>清除已完成項目</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
