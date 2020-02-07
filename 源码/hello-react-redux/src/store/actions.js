// ./src/store/actions.js
import { INCREASE, DECREASE } from "./action-types";

// +
export const inCrease = (number) => ({ type: INCREASE, number });
// -
export const deCrease = (number) => ({ type: DECREASE, number });
