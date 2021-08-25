import { createContext, useContext } from "react";

var GlobalContext = createContext();

function useGlobalContext(){
 return useContext(GlobalContext);
}

export function GlobalProvider({children, value}){
 return (
	 <GlobalContext.Provider value={value}>
		 {children}
	 </GlobalContext.Provider>
 );
}

export default useGlobalContext;
