export const ADD_ISSUE = "ADD_ISSUE";
export const FETCH_ISSUE = "FETCH_ISSUE";

export const initialState = {
  issues: []
}

export const issueReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ISSUE: {
      return {
        ...state,
        issues: payload
      };
    }
    case ADD_ISSUE: {
      return {
        ...state,
        issues: [payload, ...state.issues]
      };
    }
    default:
      return state;
  }
};