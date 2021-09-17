import { createContext, useContext } from "react";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ProductStore from "./productStore";
import CartStore from "./cartStore";
import CheckoutStore from "./checkoutStore";

export const store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    productStore: new ProductStore(),
    cartStore: new CartStore(),
    checkoutStore: new CheckoutStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}