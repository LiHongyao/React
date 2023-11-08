import { fetch } from '@/api';
import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TodoState = {
  id: string;
  text: string;
  completed: boolean;
  color?: string;
};

const initialState: TodoState[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * 👉 全量更新todos（服务器请求待办事项列表赋值）
     * @param state
     * @param action {type: 'todos/todosLoaded', payload: TodoState[] → todos}
     * @returns
     */
    todosLoaded(_, action: PayloadAction<TodoState[]>) {
      return action.payload;
    },
    /**
     * 👉 添加一个新的待办事项
     * @param state
     * @param action {type: 'todos/todoAdded', payload: text → todo}
     */
    todoAdded: {
      reducer: (state, action: PayloadAction<TodoState>) => {
        state.push(action.payload);
      },
      prepare: (text: string) => {
        const payload: TodoState = {
          id: Math.random().toString(32).slice(2),
          text,
          completed: false,
        };
        return { payload };
      },
    },
    /**
     * 👉 切换待办事项的完成状态
     * @param state
     * @param action {type: 'todos/todoToggled', payload: string → todoId}
     */
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    /**
     * 👉 为待办事项选择颜色类别
     * @param state
     * @param action {type: 'todos/colorSelected, payload: { todoId: number; color: string }}
     */
    colorSelected(
      state,
      action: PayloadAction<{ todoId: string; color: string }>
    ) {
      const { color, todoId } = action.payload;
      const todo = state.find((todo) => todo.id === todoId);
      if (todo) {
        todo.color = color;
      }
    },
    /**
     * 👉 删除待办事项
     * @param state
     * @param action {type: 'todos/todoDeleted', payload: number → todoId}
     */
    todoDeleted(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    /**
     * 👉 将所有待办事项标记为已完成
     * @param state
     * @param action {type: 'todos/todoDeleted'}
     */
    allCompleted(state) {
      state.forEach((todo) => {
        todo.completed = true;
      });
    },
    /**
     * 👉 清除所有【已完成】的待办事项
     * @param state
     * @param action {type: 'todos/completedCleared'}
     * @returns
     */
    completedCleared: (state) => {
      return state.filter((todo) => !todo.completed);
    },
  },
});

// -- 导出Actions
export default todosSlice.reducer;
// -- 导出Reducers
export const todoActions = todosSlice.actions;

/**
 * 「Thunk」 函数 - 异步请求待办事项列表
 * @param dispatch
 */
export async function fetchTodos(dispatch: Dispatch) {
  const response = await fetch();
  dispatch(todoActions.todosLoaded(response));
}
/**
 * 「Thunk」 函数 - 异步存储待办事项
 * @param dispatch
 */
// export function saveNewTodo(text: string) {
//   return async function saveNewTodoThunk(dispatch: Dispatch) {
//     const todo = await save(text);
// dispatch(todoActions.todoAdded(todo));
//   };
// }
