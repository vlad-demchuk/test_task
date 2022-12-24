const SET_CURR_PAGE = 'SET_CURR_PAGE';
const SET_PREV_PAGE = 'SET_PREV_PAGE';
const SET_NEXT_PAGE = 'SET_NEXT_PAGE';

const initialStore = {
  currPage: 1,
  coinsPerPage: 20
}

const setCurrPage = (pageNumber) => ({ type: SET_CURR_PAGE, payload: pageNumber });
const setPrevPage = () => ({ type: SET_PREV_PAGE });
const setNextPage = () => ({ type: SET_NEXT_PAGE });
export const actions = { setCurrPage, setPrevPage, setNextPage };

const paginationReduser = (state = initialStore, action) => {
  switch (action.type) {
    case SET_CURR_PAGE:
      return {
        ...state,
        currPage: action.payload
      };
    case SET_PREV_PAGE:
      return {
        ...state,
        currPage: state.currPage - 1
      };
    case SET_NEXT_PAGE:
      return {
        ...state,
        currPage: state.currPage + 1
      };
  
    default:
      return state;
    }
};

export default paginationReduser;
