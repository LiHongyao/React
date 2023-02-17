/*
 * @Author: Lee
 * @Date: 2023-02-07 14:36:36
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-07 14:53:27
 * @Description:
 */

import React from 'react';

interface IProps {}
interface IState {
  date: Date;
}

class LocaleTime extends React.Component<IProps, IState> {

  // -- define components props
  timer: any;

  // -- constructor
  constructor(props: IProps) {
    super(props);
    this.state = { date: new Date() };
  }
  
  // -- life circles
  componentDidMount(): void {
    this.timer = setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }
  componentWillUnmount(): void {
    clearInterval(this.timer);
  }

  // -- renders
  render(): React.ReactNode {
    return <h5>北京时间：{this.state.date.toLocaleTimeString()}</h5>;
  }
}

export default LocaleTime;

/*import React, { useEffect, useState } from 'react';

const LocaleTime: React.FC = () => {
  // -- initial states
  const [date, setDate] = useState<Date | null>(null);

  // -- life circles
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // -- renders
  return <h5>北京时间：{date ? date.toLocaleTimeString() : '-'}</h5>;
};

export default LocaleTime;*/
