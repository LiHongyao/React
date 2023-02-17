/*
 * @Author: Lee
 * @Date: 2023-02-11 14:51:20
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-12 07:47:47
 * @Description:
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
