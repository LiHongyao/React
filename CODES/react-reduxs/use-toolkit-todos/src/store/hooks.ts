/*
 * @Author: Lee
 * @Date: 2023-02-12 23:13:58
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-12 23:16:34
 * @Description:
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';

// 👉 推荐在整个应用程序中使用，而不是单纯的使用 useDispatch & useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
