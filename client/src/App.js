import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cookie from "js-cookie"
import { Header, Wrapper } from "./components"
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'

function App() {
  const [ user, setUser ] = useState(null)

  const verifyUser = async () => {
    const authCookie = cookie.get("auth-token")
    if( authCookie ){
      const query = await fetch("/api/user/verify", {
        method: "post",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": authCookie
        }
      })
      const result = await query.json()
      if( result ){
        setUser(result)
      }
    }
  }

  useEffect(() => {
    verifyUser()
  },[])

  return (
    <BrowserRouter>
      <Wrapper>
        <Header user={user} />
        <div className="pt-3 px-4">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
