/*
 * @Author: Lee
 * @Date: 2022-04-22 17:07:56
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 18:36:06
 */

import { Component } from 'react';
import IInput from './Input';
import ITextarea from './Textarea';
import ISelect from './Select';
import IReservation from './Reservation';
import ILoginBox from './LoginBox';
export default class Form extends Component {
  render() {
    return (
      <>
        <IInput />
        <ITextarea />
        <ISelect />
        <IReservation />
        <ILoginBox />
      </>
    );
  }
}
