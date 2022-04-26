/*
 * @Author: Lee
 * @Date: 2022-04-26 17:39:00
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 17:40:03
 */
// -- 默认数据结构
const initialState = {
  card: { name: 'Li-HONGYAO', picture: 'xxx.jpg' },
  dialog: { status: false },
};

// -- reducers
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        card: { ...state.card, name: action.name },
        dialog: { ...state.dialog },
      };
    case 'CHANGE_PICTURE':
      return {
        ...state,
        card: { ...state.card, picture: action.picture },
        dialog: { ...state.dialog },
      };
    case 'SHOW_DIALOG':
      return {
        ...state,
        card: { ...state.card },
        dialog: { status: true },
      };
    case 'CLOSE_DIALOG':
      return {
        ...state,
        card: { ...state.card },
        dialog: { status: false },
      };
    default:
      return state;
  }
};

module.exports = {
  reducers,
};
