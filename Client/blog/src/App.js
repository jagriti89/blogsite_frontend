import Header from "./Componets/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from "./Componets/SignUp";
import Login from "./Componets/Login";
import Home from "./Componets/Home";
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
        <Route>

        </Route>
          <Route path="/signUp" element={<SignUp />} />

          <Route path="/" element={<Login />} />
          
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;