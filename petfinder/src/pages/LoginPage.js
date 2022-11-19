import React, {useContext, useLayoutEffect, useState} from 'react'
// import AuthContext from '../context/AuthContext'
import { useEffect } from 'react'
// usehistory eq from react 5
import { useNavigate } from 'react-router'

function LoginPage () {
    // const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    // let {loginUser} = useContext(AuthContext)
   
    
    
    async function handleLogin(e) {


        e.preventDefault()

        const form = e.target;

        const user = {
            username: form[0].value,
            password: form[1].value
        }

        try {
            const res = await fetch("http://localhost:4000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await res.json()
            localStorage.setItem("token", data.token)
            // setErrorMessage(data.message)
        } catch(err) {
            
        }
    }
    //     fetch("http://localhost:4000/api/user/login", {
    //         method: "POST",
    //         headers:{
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify(user) 
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         localStorage.setItem("token", data.token)
    //     })
    // }

    useLayoutEffect(() => {
        fetch("http://localhost:4000/api/user/login", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })

        .then(res => res.json())

        .then(data => data.isLoggedIn ? navigate.push("/home"): null)
        // .catch(err => setErrorMessage(err)) 
    }, [navigate])

    return (
   
            <form onSubmit={event => handleLogin(event)}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit" value="Submit"/>
            </form>
    
    )
}

export default LoginPage;