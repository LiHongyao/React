/*
 * @Author: Lee
 * @Date: 2023-07-30 09:52:11
 * @LastEditors: Lee
 * @LastEditTime: 2023-07-30 09:55:59
 * @Description:
 */
export default function TodoList() {
  const person = {
    name: 'Gregorio Y. Zara',
    theme: {
      backgroundColor: '#444',
      color: 'white',
    },
  };
  return (
    <div className='container mt-4'>
      <div className='p-4' style={person.theme}>
        <h1>{person.name}'s Todos</h1>
        <img width={140} src='https://avatars.githubusercontent.com/u/1?v=4' />
        <ul>
          <li>Improve the videophone</li>
          <li>Prepare aeronautics lectures</li>
          <li>Work on the alcohol-fuelled engine</li>
        </ul>
      </div>
    </div>
  );
}
