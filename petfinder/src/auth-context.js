import {createContext} from 'react'

export const AuthContext = createContext({
        isloggedIn: false,
        name: null,
        token: null,
        login: () => {}, 
        logout: () => {},
});