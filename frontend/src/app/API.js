import { setLoginSuccess } from "./userSlice";

const getApiURL = (type) => {
    let URL = "";
    switch (type) {
        case "login":
            URL = "https://apad-project-backend-22fdec946e0a.herokuapp.com/api/login";
            break;
        case "signup":
            URL = "https://apad-project-backend-22fdec946e0a.herokuapp.com/api/register";
            break;
        default:
            break;
    }
    return URL;
};

const getAPIResponse = async (type, request) => {
    const url = getApiURL(type);
    let methodType = "";
    if (type === "login" || "signup") {
        methodType = 'POST'
    };
    const header = { 'Content-Type': 'application/json' }
    const requestOptions = {
        method: methodType,
        headers: header,
        body: JSON.stringify(request)
    };
    let response = await fetch(url, requestOptions);
    return response;
};

export async function getLogin(request, dispatch) {
    try {
        let response = getAPIResponse("login", request);
        console.log(response, "response")
        if (response.msg !== "User not found") {
            dispatch(setLoginSuccess(true))
        } else {

        }
    } catch (error) {
        return [];
    }
}

export async function createUser(request) {
    try {
        let response = getAPIResponse("signup", request);
        console.log(response, "response")
        if (response.msg === "User registered successfully!") {

        } else {

        }
    } catch (error) {
        return [];
    }
}