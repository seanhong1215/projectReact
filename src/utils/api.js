import axios from 'axios';


const header = {
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
    },
};

const baseRequest = axios.create({
    baseURL: 'https://todoo.5xcamp.us/'
});

export const checkLogIn = () => baseRequest.get('check', header); // 登入權限
export const signIn = (data) => baseRequest.post('users/sign_in', data, header); // 使用者登入
export const register = (data) => baseRequest.post('users', data, header); // 使用者註冊
export const signUp = (token) => baseRequest.delete('users/sign_out', { headers: token }, header); // 使用者登出
export const GetTodos = (token) => baseRequest.get('todos', { headers: token }); //TODO列表
export const PostTodos = (data) => baseRequest.post('todos', data, header); // 新增TODO
export const PutTodos = (data, id) => baseRequest.put(`todos/${id}`, data, header); // 修改TODO
export const DeleteTodos = (data, id) => baseRequest.delete(`todos/${id}`, data, header); // 刪除TODO
export const PatchTodos = (data, id) => baseRequest.patch(`todos/${id}/toggle`, data, header); // 完成TODO切換