const INITIAL_STATE = {
  message: 'Hi',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'BUTTON_PRESS':
      return { ...state, message: action.payload };
    default: return state;
  }
};
