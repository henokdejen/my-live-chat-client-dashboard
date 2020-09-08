export function* watchGetConversationsAsync() {
  yield takeEvery(FETCH_ALL_CONVERSATIONS_REQUEST, loadConversationsSaga);
}
