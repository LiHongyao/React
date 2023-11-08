/**
 * @description 模拟API请求
 */

import { TodoState } from '@/store/slices/todosSlice';

/**
 * 工具函数：生成 TodoID
 * @returns
 * @param todos
 */
const generateID = (todos: Array<TodoState>) => {
  return todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
};

/**
 * 查询Todos列表
 * @returns
 */
export const fetch = () => {
  return new Promise<TodoState[]>((resolve) => {
    setTimeout(() => {
      const todos = localStorage.getItem('REDUX_TODOs');
      if (todos) {
        resolve(JSON.parse(todos));
      }
    }, 2000);
  });
};

/**
 * 存储数据
 * @param todoText
 * @returns
 */
export const save = (todoText: string) => {
  return new Promise<TodoState>(async (resolve) => {
    const todos = await fetch();
    resolve({
      text: todoText,
      completed: false,
      id: generateID(todos),
    });
  });
};
