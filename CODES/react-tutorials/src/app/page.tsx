/*
 * @Author: Lee
 * @Date: 2023-07-26 11:47:50
 * @LastEditors: Lee
 * @LastEditTime: 2023-07-30 09:54:07
 * @Description:
 */

import Gallery from '@/components/Gallery';
import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <main>
      <Gallery />
      <TodoList />
    </main>
  );
}
