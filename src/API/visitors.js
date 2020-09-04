import { baseURL, ONLINE_VISITORS } from "./API_URL"

export const loadOnlineVisitors = async () => {
    let response = await fetch(`${baseURL}/${ONLINE_VISITORS}?agency=telegram`)
    if (response.ok) {
        return await response.json()
    } else {
        throw new Error("Unexpected error!!!");
    }
}