/**
 * @description 模拟API请求
 */

import { TodoState } from '@/store/slices/todosSlice';

/**
 * 查询Todos列表
 * @returns
 */
export const fetch = () => {
  return new Promise<TodoState[]>((resolve) => {
    setTimeout(() => {
      const todos = localStorage.getItem('REDUX_TODOs');
      if (todos) {
        resolve(JSON.parse(todos) as TodoState[]);
      } else {
        resolve([] as TodoState[]);
      }
    }, 500);
  });
};

/**
 * 存储数据
 * @param todoText
 * @returns
 */
export const save = (todoText: string) => {
  return new Promise<TodoState>(async (resolve) => {
    resolve({
      text: todoText,
      completed: false,
      id: Math.random().toString(32).slice(2),
    });
  });
};
