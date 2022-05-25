import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    CountTimer();
  }

CountTimer = () => {
  const thousand = 1000;
  if (timer > 0) {
    setTimeout(
      this.setState((prevState) => ({
        timer: prevState - 1,
      })),
      thousand,
    );
  }
}

render() {
  const { timer } = this.state;
  return (
    <span>
      {timer}
    </span>
  );
}
}

export default Timer;
