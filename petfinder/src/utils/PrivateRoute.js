import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {

    function hasJWT() {
        let flag = false;

        //check user has JWT token
        localStorage.getItem("token") ? flag=true : flag=false
        
        return flag
    }

    let auth = {'token':hasJWT}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
        
    )
}

export default PrivateRoutes