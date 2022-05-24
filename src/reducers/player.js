const playerState = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = playerState, action) => {
  switch (action.type) {
  case ('userInfo'):
    return { ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email };
  default:
    return state;
  }
};

export default player;
