import { ActionTypes } from "./types";

const INITIAL_STATE = {
  currentPage: "dashboard",
  step: 1,
  showVerifyEmail: false,
  branch: null,
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case ActionTypes.SET_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case ActionTypes.SHOW_VERIFY_EMAIL:
      return {
        ...state,
        showVerifyEmail: action.payload,
      };
    case ActionTypes.SET_CURRENT_BRANCH:
      return {
        ...state,
        branch: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
