// import { Route,  Navigate } from 'react-router-dom'
// import { useContext } from 'react'
// // import AuthContext from '../context/AuthContext'

// const PrivateRoute = ({children, ...rest}) => {
//     // let {user} = useContext(AuthContext)
//     return(
//         <Route {...rest}>{!user ? < Navigate to="/login" /> :   children}</Route>
//     )
// }

// export default PrivateRoute;
import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'







const PrivateRoutes = ({children, ...rest}) => {

      
        var token=""
        let gettoken = localStorage.getItem(token)
   
   
        token = window.localStorage.getItem(token);
        if (!(localStorage.getItem("authenticated"))) {
           
            return(
                <Navigate to="/login"/>
            )
        } else {
            return(
                <Outlet/> 
            )
        
            
        }
         
      }

   

    // let auth = {'token':localStorage.getItem("token")}
  


export default PrivateRoutes