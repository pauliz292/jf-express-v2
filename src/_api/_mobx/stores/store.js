import { createContext, useContext } from "react";
import UserStore from "./userStore";
import CommonStore from "./commonStore";

export const store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}