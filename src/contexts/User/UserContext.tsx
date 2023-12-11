import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { userStatuses } from "./types/userStatuses";
import { httpGet, httpPost } from "../../utils/api.utils";

//Declare the interface for the user context
interface IUserContext {
  userStatus: userStatuses;
  userEmail: string | null;
  userID: number | null;
  username: string | null;
  onStartup: () => void;
  logout: () => void;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
}

//Create the UserContext, assigning fully null values by default (other than userStatus which takes logged out by default)
export const UserContext = createContext<IUserContext>({
  userStatus: "loggedOut",
  userEmail: null,
  username: null,
  userID: null,
  onStartup: () => {},
  logout: () => {},
  login: () => {},
  signup: () => {},
});

//Create the UserContextProvider function, this can be utilised as a contect provider with specific instances of the functions, etc
const UserContextProvider = ({ children }: PropsWithChildren) => {
  // Establish the user states that are needed
  const [userStatus, setUserStatus] = useState<userStatuses>("loggedOut");
  const [userID, setUserID] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  //Will load any relevant user related cached data on startup
  const onStartup = async () => {
    //Send request to backend login endpoint
    const successResponse = await httpPost(
      "/api/login/",
      {},
      {
        headers: { withCredentials: false },
      }
    );

    //If user is already logged in, the response type will be JSON, otherwise they are not already logged in, and all user based contexts should be deleted
    if (successResponse.headers["content-type"] !== "application/json") {
      setUserStatus("loggedOut");
      setUserID(null);
      setUserEmail(null);
      setUsername(null);
      localStorage.removeItem("rnaUploadStory");
      localStorage.removeItem("rnaUploadHeadline");
      localStorage.removeItem("rnaUploadImageURL");
    } else {
      //By this point we know the user has logged in and is a legitimate user so will assign user permissions appropriately
      if (successResponse.data["is_admin"]) {
        setUserStatus("admin");
      } else {
        setUserStatus("standard");
      }

      //Set other user details as received from response
      setUserEmail(successResponse.data["email"]);
      setUsername(successResponse.data["username"]);
    }
  };

  //Will ensure all relevant access is revoked on logout
  const logout = async () => {
    //All user related states and local storage items to be removed on logout
    //The logout endpoint is also called which will revoke the sessionID cookie
    setUserStatus("loggedOut");
    setUserID(null);
    setUserEmail(null);
    setUsername(null);
    localStorage.removeItem("rnaUploadStory");
    localStorage.removeItem("rnaUploadHeadline");
    localStorage.removeItem("rnaUploadImageURL");
    await httpGet("/api/accounts/logout/", { withCredentials: true });
  };

  //Ensure relevant accesses are granted on login
  const login = async (email: string, password: string) => {
    //Generate form data based on user inputs
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    //Attempt login
    await httpPost("/api/accounts/login/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    //The login endpoint will not inform us of a succesful login during the login attempt as this is hidden from browser
    //Instead we make request to /api/login/ endpoint which, if you are already logged in, will provide user details
    const successResponse = await httpPost(
      "/api/login/",
      {},
      {
        headers: { withCredentials: true },
      }
    );

    //If the response is not a JSON, then the user was not logged in and something has gone wrong, throw an error
    if (successResponse.headers["content-type"] !== "application/json") {
      logout();
      throw new Error("LOGIN FAILED");
    }

    //By this point we know the user has logged in and is a legitimate user so will assign user permissions appropriately
    if (successResponse.data["is_admin"]) {
      setUserStatus("admin");
    } else {
      setUserStatus("standard");
    }

    //The other user details are set as appropriate
    setUserEmail(successResponse.data["email"]);
    setUsername(successResponse.data["username"]);
  };

  //Ensure relevant accesses are granted on login
  const signup = async (email: string, password: string) => {
    //Generate form data as provided, some of this needs to be replicated to meet BE criteria
    const formData = new FormData();
    formData.append("username", email);
    formData.append("email", email);
    formData.append("password1", password);
    formData.append("password2", password);

    //Attempt signup (which can be done through a post request to /api/login/)
    await httpPost("/api/login/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    //If signup was succesful then a followup request to login will return the user detils
    const successResponse = await httpPost(
      "/api/login/",
      {},
      {
        headers: { withCredentials: true },
      }
    );

    //If the response is not JSON data then the signup request failed, and an error should be thrown
    if (successResponse.headers["content-type"] !== "application/json") {
      logout();
      throw new Error("LOGIN FAILED");
    }

    //By this point we know the user has logged in and is a legitimate user so will assign user permissions appropriately
    if (successResponse.data["is_admin"]) {
      setUserStatus("admin");
    } else {
      setUserStatus("standard");
    }

    //Set the other user details as received from backend
    setUserEmail(successResponse.data["email"]);
    setUsername(successResponse.data["username"]);
  };

  const value = {
    userID,
    userStatus,
    userEmail,
    username,
    login,
    logout,
    signup,
    onStartup,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

//User state can be considered the consumer of the UserContextProvider
export const UserState = () => {
  return useContext(UserContext);
};

//Export the UserContextProvider value so that the context can be wrapped around the app
export default UserContextProvider;
