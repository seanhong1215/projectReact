import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import { api } from "../utils/api.js";


const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
    const onError = (errors, e) => console.log(errors, e);
    const onSubmit = async ({ email, password, nickname}) => {
      try {
         const { data } = await api({
            method: 'post',
            url: '/users',
            data: { user: { email, password, nickname } },
          })
        const result = Swal.fire({
          icon: 'success',
          title: data.message,
          confirmButtonText: '前往登入',
        })
          if (result.isConfirmed) {
            navigate('/login')
          }
          reset({ email: '', password: '', confirm_password: '', nickname: '' })

          } catch(err) {
              console.log(err)
              reset({ password: '' })
          }
        }
      
    return (
      <div id="signUpPage" className="bg-yellow">
        <div className="conatiner signUpPage vhContainer">
          <div className="side">
            <a href="#">
              <img className="logoImg" src={require('../assets/images/rhefZ3.png')} alt="logoImg" />
            </a>
            <img className="d-m-n" src={require('../assets/images/tj3Bdk.png')} alt="workImg" />
          </div>
          <div>
            <form className="formControls" onSubmit={handleSubmit(onSubmit, onError)}>
              <h2 className="formControls_txt">註冊帳號</h2>

              <label className="formControls_label" htmlFor="email">Email</label>
              <input type="text" id="email" name="email" className="formControls_input" placeholder="請輸入email" {...register("email", { required: { value: true, message: "此欄位必填" }, pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "不符合 Email 規則" } })} />
              <span> {errors.email?.message}</span>

              <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
              <input type="text" name="nickname" id="nickname" className="formControls_input" placeholder="請輸入您的暱稱"  {...register("nickname", { required: { value: true, message: "此欄位必填" }} )} />
              <span> {errors.nickname?.message}</span>

              <label className="formControls_label" htmlFor="password">密碼</label>
              <input type="password" name="password" id="password" className="formControls_input" placeholder="請輸入密碼"  {...register("password", { required: { value: true, message: "此欄位必填" }, minLength: { value: 8, message: "密碼至少為 8 碼" } })} />
              <span>{errors.password?.message}</span>
  
              
              <input style={{ textAlign: "center" }} className="formControls_btnSubmit" type="submit" value="註冊帳號" />
              
              <NavLink to='/login' className="formControls_btnLink" >
                登入
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    )
  };
  export default Register