import { useNavigate, NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../utils/context'
import { sweetAlert, showToast } from '../utils/sweetalert'
import * as api from "../utils/api.js";


const Login = () => {
    const { setToken, setUserName } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onError = (errors, e) => console.log(errors, e);
  
    const onSubmit = data => {
      const { email, password } = data
        api.signIn({
            user: {
              email: email, 
              password: password
            }
          }).then((res)=>{
          console.log(res.data.message)
          // save token
            setToken(res.headers.authorization)
          console.log(setToken(res.headers.authorization))

            localStorage.setItem('token', res.headers.authorization)
            showToast('登入成功', 'success')
            navigate('/', { replace: true })

          }).catch((err)=>{
            console.log(err)
            sweetAlert(err.response.data.message , '帳號或密碼錯誤', 'warning')
            reset({ password: '' })
          })
    };

    return (
      <div id="loginPage" className="bg-yellow">
        <div className="conatiner loginPage vhContainer">
          <div className="side">
            <a href="#">
              <img className="logoImg" src={require('../assets/images/rhefZ3.png')} alt="logoImg" />
            </a>
            <img className="d-m-n" src={require('../assets/images/tj3Bdk.png')} alt="workImg" />
          </div>
          <div>
            <form className="formControls" onSubmit={handleSubmit(onSubmit, onError)}>
              <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
              <label className="formControls_label" htmlFor="email">Email</label>
              <input type="text" id="email" name="email" className="formControls_input" placeholder="請輸入email" {...register("email", { required: { value: true, message: "此欄位必填" }, pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "不符合 Email 規則" } })} />
              <span> {errors.email?.message} </span>
  
              <label className="formControls_label" htmlFor="password">密碼</label>
              <input type="password" name="password" id="password" className="formControls_input" placeholder="請輸入密碼"  {...register("password", { required: { value: true, message: "此欄位必填" }, minLength: { value: 8, message: "密碼至少為 8 碼" } })} />
              <span>{errors.password?.message}</span>
  
                <input style={{ textAlign: "center" }} className="formControls_btnSubmit" type="submit" value="登入" />
              
  
              <NavLink to="/register" className="formControls_btnLink">
                註冊帳號
              </NavLink>
  
            </form>
          </div>
        </div>
      </div>
    )
  };

  export default Login