import { baseURL, LOAD_CONVERSATIONS } from "./API_URL";

export const loadConversations = async () => {
  let response = await fetch(`${baseURL}${LOAD_CONVERSATIONS}?agency=telegram`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Unexpected error!!!");
  }
};

export const loadMessages = async (conversationId) => {
  let response = await fetch(
    `${baseURL}conversations/${conversationId}/history?fetchedHistoryCount=0`
  );
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Unexpected error!!!");
  }
};
