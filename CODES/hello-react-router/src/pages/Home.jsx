/*
 * @Author: Lee
 * @Date: 2022-04-24 17:32:15
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-24 18:10:24
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/about', {
      state: { id: 1, age: 2 },
      replace: true,
    });
  }, []);
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
    </>
  );
};
export default Home;
