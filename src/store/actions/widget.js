import * as types from "../../constants";

export const changeWidgetSettings = (change) => ({
  type: types.CHANGE_WIDGET_SETTING,
  payload: change,
});
