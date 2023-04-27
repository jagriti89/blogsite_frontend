import { useState } from 'react'
// import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let navigate = useNavigate()

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  async function loginData(e) {
    e.preventDefault()
    console.log(userName, password);
    
    let result = await fetch("https://dms-todo-back-end.vercel.app/api/login", {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password })
    })
    
    result = await result.json()

    if (result.status == false) {
      alert(result.message)

    } else {
      localStorage.setItem("userId", JSON.stringify(result.data.userId))
      localStorage.setItem("token", JSON.stringify(result.data.token))
      localStorage.setItem("userName", userName)
      // console.log(result);
      navigate('/home')
    }

  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <input className="input" type="userName" placeholder="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} /> <br /><br />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button className="btn" onClick={loginData}>Login</button>
      </form>
    </div>
  );
};

export default Login;