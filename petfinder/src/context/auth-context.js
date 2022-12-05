import {createContext} from 'react'

export const AuthContext = createContext({
        isloggedIn: false,
        na: null,
        token: null,
        login: () => {}, 
        logout: () => {},
});