import { createContext, useContext, useState } from "react";
import { User, UserContextType } from "../types";

const UserContext = createContext<UserContextType>(null);

export const UserStore = ({ children }) => {
 const [user, setUser] = useState<User>(null)
 const [selectedRadio, setSelectedRadio] = useState('');
 const [submit, setSubmit] = useState('');
 const [input, setInput] = useState('');


 return (
  <UserContext.Provider value={{ user, setUser, submit, setSubmit, selectedRadio, setSelectedRadio, input, setInput }}>
   {children}
  </ UserContext.Provider>
 )
};

export const useUserContext = () => useContext(UserContext);
