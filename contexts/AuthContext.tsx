//@ts-nocheck
import { signOut } from 'firebase/auth';
import React, {createContext, useEffect, useContext} from 'react';
import {auth} from '../config/firebase'
import { useRouter } from 'next/router';

//create firebase auth context
const AuthContext = createContext({user : {}, logOut: ()=>{}});

//create provider
const AuthProvider = ({children}) => {
    const router = useRouter();
    const [user, setUser] = React.useState({});
    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user != null) {
                setUser(user);
                if(router.pathname === '/auth' || router.pathname === '/'){
                    router.push('/dashboard')
                }
            } else {
                setUser({});
            }
        });
    }, [])
    const navigate=useRouter();
     const logout = ()=>{
        signOut(auth)
    }

     const value = {user, logout};
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}

export const useAuth = () => {
    return useContext(AuthContext);
}