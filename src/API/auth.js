import {baseURL, SIGNUP, LOGIN, CHECKEMAILAVAILABLE } from './API_URL';

export const signupuser = async (signupCredentials) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupCredentials)
    };

    let response = await fetch(`${baseURL}/${SIGNUP}`,requestOptions)
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Unexpected error!!!");
    }
}


export const loginuser = async (loginCredentials) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginCredentials)
    };

    let response = await fetch(`${baseURL}/${LOGIN}`,requestOptions)
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Unexpected error!!!");
    }
}

export const checkemailavailable = async (email) => {
    const requestOptions = {
        method: 'GET'
    };

    let response = await fetch(`${CHECKEMAILAVAILABLE}${email}`,requestOptions)
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Unexpected error!!!");
    }
}