import React, { useEffect, useState }from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import FindIdPage from "./components/views/LoginPage/FindIdPage";
import FindPasswordPage from "./components/views/LoginPage/FindPasswordPage";
function App() {

//로그인 상태관리
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('email') === null) {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin??::', isLogin)
    } else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true)
      console.log('isLogin ?? :: ', isLogin)
      
    }
  },[])

  return (
    <Router>
      <div>
        <Switch>
          {isLogin ? <Route exact path="/main" render={() => <LandingPage isLogin={isLogin}/>} />: <Route exact path="/login" component={LoginPage} />}
         {/* <Route exact path="/" component={LandingPage} /> */}
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/id" component={FindIdPage} />
          <Route exact path="/pass" component={FindPasswordPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
