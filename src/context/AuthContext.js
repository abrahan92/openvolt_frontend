import * as R from "ramda";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import guestPages from "src/configs/guestPages";
import { showMe } from "src/services/userService";
import { login, getMe } from "src/services/authenticationService";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "src/@core/utils/utility";
import { createContext, useEffect, useState } from "react";
import {
 handleLoginCredentials,
 handleUserData,
 handleLogin
} from "src/store/slices/authenticationSlice";

const defaultProvider = {
 user: null,
 loading: true,
 setUser: () => null,
 setLoading: () => Boolean,
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
 const router = useRouter();
 const dispatch = useDispatch();
 const [user, setUser] = useState(defaultProvider.user);
 const [loading, setLoading] = useState(defaultProvider.loading);
 const { userData } = useSelector((store) => store?.authentication);

 useEffect( () => {
  const email = localStorage.getItem("email");
  const rememberMe = localStorage.getItem("rememberMe");

  async function getUserData() {
    try {
      const me = await getMe();

      dispatch(handleLogin(me?.data));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  getUserData();
 }, []);

 useEffect(() => {
  if(isUserLoggedIn()) {
   setUser(userData);
   setLoading(false);
  } else {
    setUser(null);
    setLoading(false);
    
    if(!guestPages.includes(router.pathname)) {
      router.replace("/login");
    }
  }
 }, [user, userData]);

 const values = {
  user,
  loading,
  setUser,
  setLoading,
 };

 return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
