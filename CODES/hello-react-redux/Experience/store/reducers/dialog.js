/*
 * @Author: Lee
 * @Date: 2022-04-27 09:05:25
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-27 09:07:00
 */
const dialog = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_DIALOG':
      return { status: true };
    case 'CLOSE_DIALOG':
      return { status: false };
    default:
      return state;
  }
};

module.exports = {
  dialog,
};
