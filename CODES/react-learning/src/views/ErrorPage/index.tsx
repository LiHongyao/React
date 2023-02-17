/*
 * @Author: Lee
 * @Date: 2023-02-08 14:13:28
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-08 17:22:36
 * @Description:
 */

import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div id='error-page' style={{ textAlign: 'center', paddingTop: 100 }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as any).statusText || (error as any).message}</i>
      </p>
    </div>
  );
}
