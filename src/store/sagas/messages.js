import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';

import { messagesLoaded, messasgeSent, newMessageAdded } from '../actions';
import { MessageStatus, FETCH_ALL_MESSAGES_REQUEST } from '../../constants';
import * as API from '../../API'
import { getMessage } from './helper';

const messageDetails = {
    '2': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Ok fair enough. Well good talking to you.',
            createdAt: 'Oct 20',
            isMyMessage: true
        },
        {
            id: '2',
            imageUrl: require('../../images/profiles/kim.jpeg'),
            imageAlt: 'Kim O\'Neil',
            messageText: `
                Not sure exactly yet. It will be next year sometime. Probably late.
            `,
            createdAt: 'Oct 20',
            isMyMessage: false
        },
        {
            id: '3',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Yeah I know. But oh well. So when is the big date?',
            createdAt: 'Oct 19',
            isMyMessage: true
        },
        {
            id: '4',
            imageUrl: require('../../images/profiles/kim.jpeg'),
            imageAlt: 'Kim O\'Neil',
            messageText: `
                Well I know you like doing that stuff. But honestly I think
                you are already really talented. It's a shame you haven't found
                what you are looking for yet.
            `,
            createdAt: 'Oct 19',
            isMyMessage: false
        },
        {
            id: '5',
            imageUrl: null,
            imageAlt: null,
            messageText: `
                I'm doing ok. Just working on building some applications to
                bulk up my resume, so I can get a better job.
            `,
            createdAt: 'Oct 19',
            isMyMessage: true
        },
        {
            id: '6',
            imageUrl: require('../../images/profiles/kim.jpeg'),
            imageAlt: 'Kim O\'Neil',
            messageText: `
                I've just been really busy at work myself, looking to get
                married sometime next year too. How are you going?
            `,
            createdAt: 'Oct 19',
            isMyMessage: false
        },
        {
            id: '7',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Yes it has been a little while',
            createdAt: 'Oct 19',
            isMyMessage: true
        },
        {
            id: '8',
            imageUrl: require('../../images/profiles/kim.jpeg'),
            imageAlt: 'Kim O\'Neil',
            messageText: 'Hey!!!! Have not spoken to you for a while',
            createdAt: 'Oct 19',
            isMyMessage: false
        },
        {
            id: '9',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hi Kim?',
            createdAt: 'Oct 19',
            isMyMessage: true
        }
    ],
    '3': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hi',
            createdAt: '1 week ago',
            isMyMessage: true
        },

    ],
    '4': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hi',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ],
    '5': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hi',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ],
    '6': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hi',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ],
    '7': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hi',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ],
    '8': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hi',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ],
    '9': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hi',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ]
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const fetchMessagesSaga = function* (action) {
    const { conversationId, numberOfMessages, lastMessageId } = action.payload;
    console.log('Given convId', conversationId, numberOfMessages)

    try {
        const response = yield call(API.loadMessages, conversationId)
        if (response.success) {
            let messages = response.data.history.reverse().map(msg => {
                return getMessage(msg)
            }
            )
            console.log('RECEIVED messages', messages)
            if (!messages) messages = []

            // const startIndex = lastMessageId ? messages.findIndex(message => message.id === lastMessageId) + 1 : 0;
            // const endIndex = startIndex + numberOfMessages;
            // const pageGroup = messages.slice(startIndex, endIndex);
            // const newLastMessageId = pageGroup.length > 0 ? pageGroup[pageGroup.length - 1].id : null;
            // const hasMoreMessages = newLastMessageId && endIndex < (messages.length - 1);

            yield put(messagesLoaded(
                conversationId,
                messages,
                false,
                null
            ));
        }

    } catch (error) {
        console.log('Connection Error ezih ga', error)
    }

    // const {response, error} = yield call(loadMessages, conversationId)

    // if (response){
    // console.log('response', response)
    // const messages = yield response;
    // let messages = messageDetails[conversationId];
    // if (!messages) messages = []
    // const startIndex = lastMessageId ? messages.findIndex(message => message.id === lastMessageId) + 1 : 0;
    // const endIndex = startIndex + numberOfMessages;
    // const pageGroup = messages.slice(startIndex, endIndex);
    // const newLastMessageId = pageGroup.length > 0 ? pageGroup[pageGroup.length - 1].id : null;
    // const hasMoreMessages = newLastMessageId && endIndex < (messages.length - 1);

    // yield put(messagesLoaded(
    //     conversationId,
    //     pageGroup,
    //     hasMoreMessages,
    //     newLastMessageId
    // ));
    // } else {
    //     console.log('error', error)
    // }
}

const sendMsgSaga = function* (action) {
    const { conversationId, message } = action.payload
    yield put(newMessageAdded(conversationId, message))
    yield put({ type: 'SEND_MESSAGE_SOCKET', data: { conversationId, message } })
    yield delay(700);
    yield put(messasgeSent(MessageStatus.SUCCESS, conversationId, message))
}

export const watchGetMessagesAsync = function* () {
    yield takeLatest(FETCH_ALL_MESSAGES_REQUEST, fetchMessagesSaga);
}

export const watchSendMsgAsync = function* () {
    // yield takeEvery('SEND_MESSAGE', sendMsgSaga)
}