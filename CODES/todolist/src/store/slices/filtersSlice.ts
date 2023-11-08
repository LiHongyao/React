import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum FiltersStatus {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export interface FiltersState {
  /** 根据状态筛选 */
  status: FiltersStatus;
  /** 根据颜色筛选 */
  colors: string[];
}

const initialState: FiltersState = {
  status: FiltersStatus.All,
  colors: [],
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
