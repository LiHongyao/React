/*
 * @Author: Lee
 * @Date: 2023-02-11 17:22:28
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-14 17:32:03
 * @Description:
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum FiltersStatus {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}
export interface FiltersState {
  status: FiltersStatus /** 根据状态筛选 */;
  colors: Array<string> /** 根据颜色筛选 */;
}

const initialState: FiltersState = {
  status: FiltersStatus.Active,
  colors: ['green'],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    /**
     * 👉 待办事项事项筛选状态切换
     * @param state
     * @param action {type: 'filters/statusFilterChanged', payload: FiltersStatus → filterValue}
     */
    statusFilterChanged(state, action: PayloadAction<FiltersStatus>) {
      state.status = action.payload;
    },

    /**
     * 👉 待办事项筛选颜色切换 - 添加/移除滤色器筛选项
     * @param state
     * @param action {type: 'filters/colorFilterChanged', payload: {color: string, changeType: 'added' | 'removed' }}
     */
    colorFilterChanged(
      state,
      action: PayloadAction<{ color: string; changeType: 'added' | 'removed' }>
    ) {
      const { color, changeType } = action.payload;
      if (changeType === 'added') {
        if (!state.colors.includes(color)) {
          state.colors.push(color);
        }
      }
      if (changeType === 'removed') {
        state.colors = state.colors.filter(
          (existingColor) => existingColor !== color
        );
      }
    },
  },
});

// -- 导出Actions
export const filtersActions = filtersSlice.actions;
// -- 导出Reducers
export default filtersSlice.reducer;
