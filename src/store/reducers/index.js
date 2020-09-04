import { combineReducers } from 'redux';

import conversationState from './conversations';
import messagesState from './messages';
import visitorsState from './visitor'
import services from './services'

export default combineReducers({
  conversationState,
  messagesState,
  visitorsState,
  services
});