import { useNavigate, NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../utils/context'
import Swal from 'sweetalert2'
import { api } from "../utils/api.js";


const Login = () => {
  const { setToken } = useAuth();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onError = (errors, e) => console.log(errors, e);
  
    const onSubmit = async ({ email, password }) => {
      try {
        const { data, headers } = await  api({
          method: 'post',
          url: '/users/sign_in',
          data: { user: { email, password } },
        })
          // save token
          setToken(headers.authorization)
          localStorage.setItem('token', headers.authorization)

          await Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          // console.log(data)
          navigate('/')

          }catch(err) {
            console.error(err)
            reset({ password: '' })
          }
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
              <input type="password" name="password" id="password" className="formControls_input" placeholder="請輸入密碼"  {...register("password", { required: { value: true, message: "此欄位必填" }, minLength: { value: 6, message: "密碼至少為 6 碼" } })} />
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