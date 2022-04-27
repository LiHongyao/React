/*
 * @Author: Lee
 * @Date: 2022-04-27 09:05:20
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-27 09:06:41
 */
const card = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return { ...state, name: action.name };
    case 'CHANGE_PICTURE':
      return { ...state, picture: action.picture };
    default:
      return state;
  }
};

module.exports = {
  card,
};
