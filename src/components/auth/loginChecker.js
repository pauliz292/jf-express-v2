import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../_api/_mobx/stores/store";
import ProductListScreen from "../product/productList";
import LoginScreen from "./login";

const LoginChecker = observer(()=>{
    const { commonStore } = useStore();
    const { user } = commonStore;

    const ProductDetails = () =>{
        return(
            <ProductListScreen/>
        )
    }
    const DefaultLogin = () =>{
        return (
            <LoginScreen/>
        )
    }

    return(
        <>
            { user?
                <ProductDetails/> : <DefaultLogin/>
            }
        </>
    )
})

export default LoginChecker;