import { put, takeEvery, call } from 'redux-saga/effects';
import { FETCH_ALL_CONVERSATIONS_REQUEST } from '../../constants';
import { conversationLoaded, conversationsLoading, messagesLoaded } from '../actions';
import * as API from '../../API'
import { getConversation, getSortedConversations } from './helper';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const conversations = [
    {
        id: '1',
        imageUrl: require('../../images/profiles/daryl.png'),
        imageAlt: 'Daryl Duckmanton',
        title: 'Daryl Duckmanton',
        createdAt: 'Apr 16',
        latestMessageText: 'Ok then',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Ok then',
                createdAt: 'Apr 16',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png'),
                imageAlt: 'Daryl Duckmanton',
                messageText: `
                    Yeah I think it's best we do that. Otherwise things won't work well at all. 
                    I'm adding more text here to test the sizing of the speech bubble and the 
                    wrapping of it too.
                `,
                createdAt: 'Apr 16',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Maybe we can use Jim\'s studio.',
                createdAt: 'Apr 15',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png'),
                imageAlt: 'Daryl Duckmanton',
                messageText: `
                    All I know is where I live it's too hard
                    to record because of all the street noise.
                `,
                createdAt: 'Apr 15',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: `
                    Well we need to work out sometime soon where
                    we really want to record our video course.
                `,
                createdAt: 'Apr 15',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png'),
                imageAlt: 'Daryl Duckmanton',
                messageText: `
                    I'm just in the process of finishing off the
                    last pieces of material for the course.
                `,
                createdAt: 'Apr 15',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'How\'s it going?',
                createdAt: 'Apr 13',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png'),
                imageAlt: 'Daryl Duckmanton',
                messageText: ' Hey mate what\'s up?',
                createdAt: 'Apr 13',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hey Daryl?',
                createdAt: 'Apr 13',
                isMyMessage: true
            }
        ]
    },
    {
        id: '2',
        imageUrl: require('../../images/profiles/kim.jpeg'),
        imageAlt: 'Kim O\'Neil',
        title: 'Kim O\'Neil',
        createdAt: 'Oct 20',
        latestMessageText: 'Ok fair enough. Well good talking to you.',
        messages: []
    },
    {
        id: '3',
        imageUrl: require('../../images/profiles/john.jpeg'),
        imageAlt: 'John Anderson',
        title: 'John Anderson',
        createdAt: '1 week ago',
        latestMessageText: 'Yes I love how Python does that',
        messages: []
    },
    {
        id: '4',
        imageUrl: require('../../images/profiles/ben.png'),
        imageAlt: 'Ben Smith',
        title: 'Ben Smith',
        createdAt: '2:49 PM',
        latestMessageText: 'Yeah Miami Heat are done',
        messages: []
    }
];

const convs = []

export const loadConversationsSaga = function* () {

    try {

        const response = yield call(API.loadConversations)
        if (response.success) {
            console.log('RECEIVED Conversations', response.data)

            let conversations = response.data.map(conv => (getConversation(conv)))
            conversations = getSortedConversations(conversations)
            
            yield put(conversationLoaded(conversations));

            // yield put({type: 'connect'})

        }

    } catch (error) {

    }

    const { response, error } = yield call(API.loadConversations)

}

export function* watchGetConversationsAsync() {
    yield takeEvery(FETCH_ALL_CONVERSATIONS_REQUEST, loadConversationsSaga);
}