import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

  const AuthContextProvider = ({children}) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("tkn")!==null) {
        setToken(localStorage.getItem("tkn"));
    }
  } , [])
    return (
  <AuthContext.Provider value={{token,setToken}}>   
  {children}
  </AuthContext.Provider>
  )
};
export default AuthContextProvider;

// import { createContext,  useState } from "react";
//  export let AuthContext = createContext();
// export default function AuthContextProvider({children}){
//   const [token, setUserToken] = useState("");
//   return <AuthContext.Provider value={{ token , setUserToken}}>
//     {children}
//   </AuthContext.Provider>
// }