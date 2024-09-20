import { createContext, useContext, useState } from "react";
import { User, UserContextType } from "../types";

const UserContext = createContext<UserContextType>(null);

export const UserStore = ({ children }) => {
 const [user, setUser] = useState<User>(null)
 const [selectedRadio, setSelectedRadio] = useState('');
 const [submit, setSubmit] = useState('');
 const [input, setInput] = useState('');
 const [total, setTotal] = useState('');
 const [monthly, setMonthly] = useState('');


 return (
  <UserContext.Provider value={{ user, setUser, submit, setSubmit, selectedRadio, setSelectedRadio, input, setInput, total, setTotal, monthly, setMonthly }}>
   {children}
  </ UserContext.Provider>
 )
};

export const useUserContext = () => useContext(UserContext);
