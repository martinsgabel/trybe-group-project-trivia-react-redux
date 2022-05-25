import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    const second = 1000;
    this.timerID = setInterval(
      () => this.tick(), second,
    );
  }

  tick = () => {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <span>
          {timer}
        </span>
        <button
          type="button"
          onClick={ this.tick }
        >
          {' '}
          click
        </button>
      </div>
    );
  }
}

export default Timer;
