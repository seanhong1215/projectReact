import axios from 'axios';

const header = {
        headers: {
                'Content-Type': 'application/json',
                'Authorization': ''
            },
        };
        
const baseRequest = axios.create({
    baseURL: 'https://todoo.5xcamp.us/',
    // headers: {
    //     'Content-Type': 'application/json', 
    //     'Authorization': 'token',
    // }, 
});

export const checkLogIn = (token) => baseRequest.get('check', { headers: token }, header); // 登入權限
export const signIn = (data) => baseRequest.post('users/sign_in', data); // 使用者登入
export const register = (data) => baseRequest.post('users', data); // 使用者註冊
export const signUp = (token) => baseRequest.delete('users/sign_out', { headers: token }, header); // 使用者登出

export const GetTodos = (token) => baseRequest.get('todos', { headers: token }, header); //TODO列表
export const PostTodos = (data, token) => baseRequest.post('todos', data, { headers: token }, header); // 新增TODO
export const PutTodos = (id, data, token) => baseRequest.put(`todos/${id}`, data, { headers: token }, header); // 修改TODO
export const DeleteTodos = (id, token) => baseRequest.delete(`todos/${id}`, { headers: token }, header); // 刪除TODO
export const PatchTodos = (id, token) => baseRequest.patch(`todos/${id}/toggle`, { header: token } , header); // 完成TODO切換