import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [userName , setUserName] = useState("")
  const [password , setPassword] = useState("")


  const collectData = async (e) =>{
    e.preventDefault()
    console.log(userName, password);
    let result = await fetch("https://dms-todo-back-end.vercel.app/api/register", {
        method:"post",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({userName, password})
    })
    result = await result.json()
    console.log(result);

    if(result.status == false){
      alert(result.message)
    }else{
      console.log(result);
      navigate('/')
    }
    // navigate("/login")
  }

  return (
    <div className='signup'>
    <h1>Sign Up</h1>
      <form>
        <input className='input' type="userName" placeholder='UserName' value={userName} onChange={(e) => setUserName(e.target.value)} /><br/><br/>
        <input className='input' type="password" placeholder='PassWord' value={password} onChange={(e) => setPassword(e.target.value)} /><br/><br/>
        <button className='btn' onClick={collectData}>Register</button>
      
      </form>
    </div>
  )
}

export default SignUp