import React from "react";
import axios from "axios";
import { setAuthToken } from "../context/setAuthToken"

function LoginPage() {

  async function handleSubmit(e)  {
    e.preventDefault()
    const form = e.target;
    //reqres registered sample user
    const loginInfo = {
      username: form[0].value,
      password: form[1].value
    }

    axios.post("http://localhost:4000/api/user/login", loginInfo)
      .then(response => {
        //get token from response
        const token = response.data.token;

        //set JWT token to local
        localStorage.setItem("token", token);

        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        window.location.href = '/Home'

      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={event => handleSubmit(event)}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit" value="Submit"/>
            </form>
  );
}
export default LoginPage