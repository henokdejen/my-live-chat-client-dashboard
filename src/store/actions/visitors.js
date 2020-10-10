import * as types from "../../constants";

export const allOnlineVisitorsRequested = () => ({
    type: types.FETCH_ONLINE_VISITORS_REQUESTED
})

export const onlineVisitorsLoaded = (visitors) => ({
    type: types.FETCH_ONLINE_VISITORS_SUCCESS,
    payload: {
        onlineVisitors: visitors
    }
})

export const visitorGetOnline = (visitor) => ({
    type: types.VISITOR_GET_ONLINE,
    payload: visitor
})

export const visitorGetOffline = (visitor) => ({
    type: types.VISITOR_GET_OFFLINE,
    payload: visitor
})

export const banVisitor = (visitor) => ({
    type: types.BAN_VISITOR,
    payload: visitor
})

export const removeBanVisitor = (visitorbanid) => ({
    type: types.REMOVE_BANNED_VISITOR,
    visitorbanid
})
