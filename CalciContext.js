import { createContext,useContext } from "react";
export const CalciContext = createContext({
    themeMode:'light',
    darkTheme: ()=>{},
    lightTheme: () =>{},
})
export const CalciContextProvider = CalciContext.Provider;

export default function useCalci (){
    return useContext(CalciContext);

}
