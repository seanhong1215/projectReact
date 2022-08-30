import axios from 'axios';

const header = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjEiLCJzY3AiOiJ1c2VyIiwiYXVkIjpudWxsLCJpYXQiOjE2NjE4NDIyMjYsImV4cCI6MTY2MzEzODIyNiwianRpIjoiODU4YjNkYWYtMzIwMS00YWY3LThiNzktNTY2MGY4NmE4Y2Q0In0.pxcVcDY6NYCFeSFiIr3Dm_JsGRY4VrsDsUahBuz2vg8'
    },
};

const baseRequest = axios.create({
    baseURL: 'https://todoo.5xcamp.us/'
});

export const signIp = (data) => baseRequest.post('users/sign_in', data, header); // 使用者登入
export const signUp = () => baseRequest.delete('users/sign_out', header); // 使用者登出
export const register = (data) => baseRequest.post('users', data , header); // 使用者註冊
export const GetTodos = () => baseRequest.get('todos'); //TODO列表
export const PostTodos = (data) => baseRequest.post('todos', data , header); // 新增TODO
export const PutTodos = (data, id) => baseRequest.put(`todos/${id}`, data , header); // 修改TODO
export const DeleteTodos = (data, id) => baseRequest.delete(`todos/${id}`, data , header); // 刪除TODO
export const PatchTodos = (data, id) => baseRequest.patch(`todos/${id}/toggle`, data , header); // 完成TODO切換



