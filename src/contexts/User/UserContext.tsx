import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { userStatuses } from "./types/userStatuses";

//Declare the interface for the user context
interface IUserContext {
  userStatus: userStatuses;
  userEmail: string | null;
  username: string | null;
  onStartup: () => void;
  logout: () => void;
  login: (userStatus: userStatuses, userEmail: string) => void;
}

//Create the UserContext, assigning fully null values by default (other than userStatus which takes logged out by default)
export const UserContext = createContext<IUserContext>({
  userStatus: "loggedOut",
  userEmail: null,
  username: null,
  onStartup: () => {},
  logout: () => {},
  login: () => {},
});

//Create the UserContextProvider function, this can be utilised as a contect provider with specific instances of the functions, etc
const UserContextProvider = ({ children }: PropsWithChildren) => {
  // Establish the user states that are needed
  const [userStatus, setUserStatus] = useState<userStatuses>("loggedOut");
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
  const login = useCallback((userStatus: userStatuses, userEmail: string) => {
    //TODO: On login, ensure JWT is generated and stored in appropriate location
    setUserStatus(userStatus);
  }, []);

  const value = {
    userStatus,
    userEmail,
    username,
    login,
    logout,
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
