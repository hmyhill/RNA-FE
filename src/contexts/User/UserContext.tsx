import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { userStatuses } from "./types/userStatuses";
import { httpPost } from "../../utils/api.utils";

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
  const onStartup = useCallback(() => {
    //TODO: Ensure to add a system to check local cache for existing JWT
  }, []);

  //Will ensure all relevant access is revoked on logout
  const logout = useCallback(() => {
    //TODO: On logout, ensure JWT is removed from memory
    setUserStatus("loggedOut");
  }, []);

  //Ensure relevant accesses are granted on login
  const login = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    await httpPost("/api/accounts/login/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    const successResponse = await httpPost(
      "/api/login/",
      {},
      {
        headers: { withCredentials: true },
      }
    );

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

    setUserEmail(successResponse.data["email"]);
    setUsername(successResponse.data["username"]);
  };

  //Ensure relevant accesses are granted on login
  const signup = useCallback((email: string, password: string) => {}, []);

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
