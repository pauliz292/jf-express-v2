import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../_api/_mobx/stores/store";
import ProductListScreen from "../product/productList";
import LoginScreen from "./login";
import * as authService from "../../_api/_services/authService";

const LoginChecker = observer(()=>{
    const { commonStore } = useStore();
    const { user } = commonStore;
    const [role, setRole] = useState("user");

    useEffect(() => {
        console.log(user)
        if (user) {
            const loggedInUser = authService.getCurrentUser(user.token);
            const { unique_name } = loggedInUser;
            setRole(unique_name);
        }
    }, [user])

    const ProductDetails = () =>{
        return(
            <ProductListScreen/>
        )
    }

    const LoginView = () =>{
        return (
            <LoginScreen/>
        )
    }

    return(
        <>
            {user == null || role !== "admin" ?
                <LoginView /> : <ProductDetails />
            }
        </>
    )
})

export default LoginChecker;