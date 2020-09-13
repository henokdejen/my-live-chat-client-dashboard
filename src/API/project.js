import { baseURL, ADD_PROJECT } from './API_URL';

export const addProjectAPI = async (siteDetails) => {
    console.log(siteDetails);
    const token = localStorage.getItem("usertoken");
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(siteDetails)
    };

    let response = await fetch(`${baseURL}/${ADD_PROJECT}`,requestOptions)
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Unexpected error!!!");
    }
}
