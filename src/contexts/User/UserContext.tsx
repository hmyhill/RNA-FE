import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { userStatuses } from "./types/userStatuses";

interface IUserContext {
  userStatus: userStatuses;
  userEmail: string | null;
  onStartup: () => void;
  onLogout: () => void;
  onLogin: (userStatus: userStatuses, userEmail: string) => void;
}

export const Context = createContext<IUserContext>({
  userStatus: null,
  userEmail: null,
  onStartup: () => {},
  onLogout: () => {},
  onLogin: () => {},
});

/**
 * State management for users.
 */
const UserContext = ({ children }: PropsWithChildren) => {
  // Session token that we'll get when logging in. We'll send this in the header of each subsequent request.
  const [userStatus, setUserStatus] = useState<userStatuses>("loggedOut");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  /** Function to be called on user login */
  const onStartup = useCallback(() => {
    //TODO: Ensure to add a system to check local cache for existing JWT
  }, []);

  /** Function to be called when user logs out. */
  const onLogout = useCallback(() => {
    //TODO: On logout, ensure JWT is removed from memory
    setUserStatus("loggedOut");
  }, []);

  /** Function to be called when user logs in. */
  const onLogin = useCallback((userStatus: userStatuses, userEmail: string) => {
    //TODO: On login, ensure JWT is generated and stored in appropriate location
    setUserStatus("standard");
  }, []);

  const value = {
    userStatus,
    userEmail,
    onLogin,
    onLogout,
    onStartup,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const UserState = () => {
  return useContext(Context);
};

export default UserContext;
