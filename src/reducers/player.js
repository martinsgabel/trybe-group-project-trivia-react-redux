const playerState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = playerState, action) => {
  switch (action.type) {
    case ('userInfo'):
      return {
        ...state,
        name: action.payload.name,
        gravatarEmail: action.payload.email
      };
    case ('scoreUpdate'):
      return {
        ...state,
        score: (action.payload === 0 ? action.payload : state.score + action.payload),
        assertions: state.assertions + 1
      };
    case ('reset'):
      return {
        ...state,
        assertions: 0,
        score: 0,
      }
    default:
      return state;
  }
};

export default player;
