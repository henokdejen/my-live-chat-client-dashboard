import { NEW_MESSAGE_SOUND } from "../constants/notifications";

export const newMessageSound = () => {
  const audio = new Audio(NEW_MESSAGE_SOUND);
  audio.play();
};

export const newVisitorSound = () => {
  const audio = new Audio(NEW_MESSAGE_SOUND);
  audio.play();
};
