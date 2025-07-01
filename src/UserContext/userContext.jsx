import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import { useScroll } from "framer-motion";
const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const safeParse = (value, fallback) => {
        try {
            const item = Cookies.get(value);
            const actitem = JSON.parse(item);
            return actitem;
        } catch (error) {
            return fallback;
        }
    }
    const [UserCred, setUserCred] = useState(Cookies.get("user") ? Cookies.get("user") : {});
    return (
        <UserContext.Provider value={{ UserCred, setUserCred }}>
            {children}
        </UserContext.Provider>
    )
}
export const UserAuth = () => {
    return useContext(UserContext);
};