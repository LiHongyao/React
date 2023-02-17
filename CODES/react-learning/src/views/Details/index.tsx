/*
 * @Author: Lee
 * @Date: 2023-02-08 19:00:13
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-09 11:29:16
 * @Description:
 */
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
const Details: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { state } = useLocation();
  const onGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    // throw new Error('oh dang!');
  }, []);
  return (
    <div className='page'>
      <b
        style={{
          letterSpacing: 1,
          color: 'orange',
        }}
      >
        This is 「About」 page.
      </b>
      <p>ID:{searchParams.get('id')}</p>
      <p>
        {state.name} - {state.job}
      </p>
      <div
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
          color: 'blue',
        }}
        onClick={onGoBack}
      >
        Go Back...
      </div>
    </div>
  );
};

export default Details;
