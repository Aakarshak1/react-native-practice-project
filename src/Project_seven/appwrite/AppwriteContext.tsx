import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import Appwrite from './service';

type AppContextType = {
  appwrite: Appwrite;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const AppwriteContext = createContext<AppContextType>({
  appwrite: new Appwrite(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultValue = {
    appwrite: new Appwrite(),
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

export const useAppwriteContext = () => {
  const ctx = useContext(AppwriteContext);
  if (!ctx) {
    throw new Error('context not found');
  }

  return ctx;
};
