import React from "react";
import { useForm } from "react-hook-form";
import './App.scss';
import {
  HashRouter,
  NavLink,
  Routes,
  Route,
} from 'react-router-dom';

import {FaPlus} from "react-icons/fa"
import {FaRegTimesCircle} from "react-icons/fa"

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

            <NavLink to="/todo" style={{textAlign: "center"}}>
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

const Todo = () => {
  const todoList_item = ['把冰箱發霉的檸檬拿去丟', '打電話叫媽媽匯款給我', '整理電腦資料夾', '繳電費水費瓦斯費', '約vicky禮拜三泡溫泉', '約ada禮拜四吃晚餐'];
  const todoList = todoList_item.map((items,i) =>
    <li key={i}>
       <label className="todoList_label">
         <input className="todoList_input" type="checkbox" value="true" />
          <span>{items}</span>
      </label>
      <a href="#">
        <FaRegTimesCircle />
      </a>
    </li>
  );
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
          <div className="inputBox">
          <input type="text" placeholder="請輸入待辦事項" />
                    <a href="#">
                        <FaPlus />
                    </a>
          </div>
          <div className="todoList_list">
            <ul className="todoList_tab">
              <li><a href="#" className="active">全部</a></li>
              <li><a href="#">待完成</a></li>
              <li><a href="#">已完成</a></li>
            </ul>
            <div className="todoList_items">
              <ul className="todoList_item">
                  {todoList}
              </ul>
              <div className="todoList_statistics">
                  <p> 5 個已完成項目</p>
                  <a href="#">清除已完成項目</a>
              </div>
            </div>
          </div>
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

            <NavLink to="/todo" style={{textAlign: "center"}}>
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
          <Route path="/" element={<Login />}/>
          <Route path="/todo" element={<Todo />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </HashRouter>
    </div>
  );


}

export default App;
