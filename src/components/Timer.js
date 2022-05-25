import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
    };
  }


  tick = () => {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState, props) => ({
        timer: prevState.timer - 1
      }))

    }
  }


  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );

  }


  // countTimer = () => {
  //   const { timer } = this.state
  //   const thousand = 1000;
  //   if (timer > 0) {
  //     setInterval(
  //       this.degreeTimer,
  //       thousand,
  //     );
  //   }
  // }



  // (prevState) => ({
  //   timer: prevState - 1,
  // })




  degreeTimer = () => {
    const { timer } = this.state
    this.setState((prevState) => ({
      timer: prevState.timer - 1,
    })
    )
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <span>
          {timer}
        </span>
        <button
          onClick={this.tick}
        > click</button>
      </div>
    );
  }
}

export default Timer;
