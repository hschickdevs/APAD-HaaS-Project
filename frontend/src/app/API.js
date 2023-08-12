import { setShowPopUp } from "./appSlice";
import { setHardwareInfoArr, setProjectResourcesArr, setLoginSuccess, setProjectId } from "./userSlice";

const getApiURL = (type) => {
    if (process.env.NODE_ENV === 'development') {
        // For local testing
        URL = "http://localhost:5000/api";
    } else {
        // For production
        URL = "https://apad-project-backend-22fdec946e0a.herokuapp.com/api";
    }

    switch (type) {
        case "login":
            URL += "/login";
            break;
        case "signup":
            URL += "/register";
            break;
        case "createProject":
            URL += "/create_project";
            break;
        case "accessProject":
            URL += "/access_project";
            break;
        case "getResources":
            URL += "/view_resources";
            break;
        case "getHardware":
            URL += "/view_hardware";
            break;
        case "checkIn":
            URL += "/check_in_resource"
            break;
        case "checkOut":
            URL += "/check_out_resource"
            break;
        case "deleteProject":
            URL += "/delete_project"
            break;
        default:
            break;
    }
    return URL;
};

const getAPIRequest = (type, request, accessToken) => {
    let header = {
        'Content-Type': 'application/json',
    };
    if (accessToken !== "") {
        header.Authorization = "Bearer " + accessToken
    }
    let requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(request)
    };
    if (type === "getHardware") {
        requestOptions = {
            method: 'GET',
            headers: header
        }
    }

    return requestOptions;
};

const getAPIResponse = async (type, request, accessToken) => {
    const url = getApiURL(type);
    const requestObj = getAPIRequest(type, request, accessToken)
    let response = await (await fetch(url, requestObj)).json();
    return response;
};

export async function getLogin(request, dispatch) {
    try {
        let response = await getAPIResponse("login", request, "");
        if (response && response.access_token) {
            dispatch(setLoginSuccess({
                loginSuccess: true,
                username: request.username,
                password: request.password,
                accessToken: response.access_token,
                projectId: "",
                hardwareInfoArr: []
            }))
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: "Invalid Username or Password, Please try again!",
                heading: "Login Failed!"
            }
            ))
        }
    } catch (error) {
        console.log("error in loginAPI", error)
    }
}

export async function createUser(request, dispatch) {
    try {
        let response = await getAPIResponse("signup", request, "");
        if (response && response.msg && response.msg === "User registered successfully!") {
            dispatch(setShowPopUp({
                type: "success",
                message: "You are registered succesfully, Please login to continue.",
                heading: "Registration Succesful!"
            }
            ))
        } else if (response && response.msg && response.msg.includes("Error")) {
            dispatch(setShowPopUp({
                type: "error",
                message: response.msg + ", Please try again!",
                heading: "Registration Failed!"
            }
            ))
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: "Something went wrong, Please try again!",
                heading: "Registration Failed!"
            }
            ))
        }
    } catch (error) {
        return [];
    }
}

export async function createProjectAPI(request, dispatch, accessToken) {
    try {
        let response = await getAPIResponse("createProject", request, accessToken);
        if (response && response.msg && response.msg === "Project created successfully!") {
            await getHardwareAPI(dispatch, accessToken);
            dispatch(setProjectId(request.project_id));

        } else if (response && response.msg === "Token has expired") {
            dispatch(setShowPopUp({
                type: "error",
                message: "User session expired, Please Login again!",
                heading: "Session expired!"
            }
            ))
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: response.msg + ", Please try again!",
                heading: "Project Creation Failed!"
            },
            ))
        }
    } catch (error) {
        console.log("error in createAPI", error)
    }
}

export async function existingProjectAPI(request, dispatch, accessToken) {
    try {
        let response = await getAPIResponse("accessProject", request, accessToken)
        if (response && (response.project_id !== "" || undefined || null) && !response.msg) {
            await getHardwareAPI(dispatch, accessToken);
            dispatch(setProjectId(response.project_id));
        } else if (response && response.msg === "Token has expired") {
            dispatch(setShowPopUp({
                type: "error",
                message: "User session expired, Please Login again!",
                heading: "Session expired!"
            }
            ))
        } else if (response && response.msg.includes("Error")) {
            dispatch(setShowPopUp({
                type: "error",
                message: response.msg + ", Please try again!",
                heading: "Project not found!"
            }
            ))
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: response.msg + ", Please try again!",
                heading: "Accessing Project Failed!"
            },
            ))
        }
    } catch (error) {
        console.log("error in existingProjectAPI", error)
    }
}

export async function getHardwareAPI(dispatch, accessToken) {
    try {
        let response = await getAPIResponse("getHardware", {}, accessToken);
        if (response && response.length !== 0 && !response.msg) {
            dispatch(setHardwareInfoArr(response));
        } else if (response && response.msg === "Token has expired") {
            dispatch(setShowPopUp({
                type: "error",
                message: "User session expired, Please Login again!",
                heading: "Session expired!"
            }
            ))
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: "Something went wrong while fetching the hardware details, Please try again!",
                heading: "Hardware Information Failed!"
            }
            ))
        }
    } catch (error) {
        console.log("error in gettingHardwareAPI", error)
    }
}

export async function checkInAPI(request, projectId, dispatch, accessToken) {
    try {
        let response = await getAPIResponse("checkIn", request, accessToken)
        if (response && response.msg && response.msg === "Hardware checked in successfully!") {
            dispatch(setShowPopUp({
                type: "success",
                message: "Requested quantities for respected hardwares got checked in succesfully.",
                heading: "Check In Successful!"
            }
            ))
            existingProjectAPI({ "project_id": projectId }, dispatch, accessToken);
            getResourcesAPI({ "project_id": projectId }, dispatch, accessToken);
        } else if (response && response.msg === "Token has expired") {
            dispatch(setShowPopUp({
                type: "error",
                message: "User session expired, Please Login again!",
                heading: "Session expired!"
            }
            ))
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: "Something went wrong while checking in the hardware, Please try again!",
                heading: "Check In Failed!"
            }
            ))
        }
    } catch (error) {
        console.log("error in checkInAPI", error)
    }
}

export async function checkOutAPI(request, projectId, dispatch, accessToken) {
    try {
        let response = await getAPIResponse("checkOut", request, accessToken)
        if (response && response.msg && response.msg === "Hardware checked out successfully!") {
            dispatch(setShowPopUp({
                type: "success",
                message: "Requested quantities for respected hardwares got checked out succesfully.",
                heading: "Check Out Successful!"
            }
            ))
            existingProjectAPI({ "project_id": projectId }, dispatch, accessToken);
            getResourcesAPI({ "project_id": projectId }, dispatch, accessToken);
        } else if (response && response.msg === "Token has expired") {
            dispatch(setShowPopUp({
                type: "error",
                message: "User session expired, Please Login again!",
                heading: "Session expired!"
            }
            ))
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: "Something went wrong while checking out the hardware, Please try again!",
                heading: "Check Out Failed!"
            }
            ))
        }
    } catch (error) {
        console.log("error in checkOutAPI", error)
    }
}

export async function getResourcesAPI(request, dispatch, accessToken) {
    try {
        let response = await getAPIResponse("getResources", request, accessToken)
        if (response && !response.msg) {  // Modified to accept an empty list
            dispatch(setProjectResourcesArr(response));
        } else if (response && response.msg === "Token has expired") {
            dispatch(setShowPopUp({
                type: "error",
                message: "User session expired, Please Login again!",
                heading: "Session expired!"
            }
            ))
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: "Something went wrong while fetching the project hardware resource details, Please try again!",
                heading: "Project Hardware Resource Info Fetch Failed!"
            }
            ))
        }
    } catch (error) {
        console.log("error in getResourcesAPI", error)
    }
}

export async function deleteProjectAPI(request, dispatch, accessToken) {
    let status = 0; // Need success status for reroute to projects page
    try {
        let response = await getAPIResponse("deleteProject", request, accessToken)
        if (response && response.msg && response.msg === "Project deleted successfully!") {
            dispatch(setShowPopUp({
                type: "success",
                message: `${request.project_id} project deleted successfully.`,
                heading: "Project Deletion Successful!"
            }
            ))
            status = 1;
        } else if (response && response.msg === "Token has expired") {
            dispatch(setShowPopUp({
                type: "error",
                message: "User session expired, Please Login again!",
                heading: "Session expired!"
            }
            ))
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: "Something went wrong while deleting the project, Please try again!",
                heading: "Check Out Failed!"
            }
            ))
        }
    } catch (error) {
        console.log("error in deleteProjectAPI", error)
    }
    return status;
}
