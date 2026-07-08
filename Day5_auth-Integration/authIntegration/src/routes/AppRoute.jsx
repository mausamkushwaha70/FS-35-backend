import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router"
import PublicRoutes from '../protectedRoutes/PublicRoutes'
import App from "../App"
import MainRoutes from "../protectedRoutes/MainRoutes"
import HomePage from '../pages/HomePage'
import { useDispatch } from 'react-redux'
import { axiosInstance } from '../config/axiosInstance'
import { useEffect } from 'react'
import addUser from "../features/authSlice"


const AppRoute = () => {

    const dispatch = useDispatch();
    const userHydration = async () => {
        try {
            let res = await axiosInstance.get("/api/auth/getMe",);
            dispatch(addUser(res.data.data));
            console.log(res)

        } catch (error) {
            console.log("error in hydration", error);
        }
    };

    useEffect(() => {
        userHydration();
    }, []);




    const router = createBrowserRouter([
        {
            path: "/",
            element: <PublicRoutes />,
            children: [
                {
                    path: "",
                    element: <App />
                }
            ]

        },

        {
            path: "/main",
            element: <MainRoutes />,
            children: [
                {
                    path: "",
                    element: <HomePage />
                }
            ]
        }
    ])

    return (<RouterProvider router={router} />)

}

export default AppRoute


