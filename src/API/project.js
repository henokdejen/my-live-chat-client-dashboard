import { baseURL, ADD_PROJECT } from "./API_URL";
import { LS_TOKEN } from "../constants";

export const addProjectAPI = async (siteDetails) => {
  const token = localStorage.getItem(LS_TOKEN);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(siteDetails),
  };

  let response = await fetch(`${baseURL}/${ADD_PROJECT}`, requestOptions);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Unexpected error!!!");
  }
};

// check visitor ip address country

export const checkVisitorIPCountry = async (ipaddress) => {
  const requestOptions = {
    method: 'GET' };
    
    let response = await fetch(`http://ip-api.com/json/${ipaddress}`,requestOptions)
    if (response.ok) {
      return await response.json();
    } else {
    throw new Error("Unexpected error!!!");
  }
}; 
