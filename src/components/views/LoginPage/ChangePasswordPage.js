import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios'


function ChangePasswordPage(props) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ChangePassword, setChangePassword] = useState("");
    const [ConfirmPasword, setConfirmPasword] = useState("");
    

    const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

    const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
    const onChangePasswordHandler = (e) => {
    setChangePassword(e.currentTarget.value);
    };
    
     const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
    };
    
    const onSubmitHandler = (e) => {
        e.preventDefault();

        const param = new URLSearchParams;
        param.append("email", Email);
        param.append("password", Password);
        param.append("changePass", ChangePassword);

      if (ChangePassword !== ConfirmPasword) {
        alert("비밀번호를 다시 확인해주세요")
      } else {
        if (isPassword(ChangePassword)) {
          axios.post('http://localhost:4000/change_pw', param)
                 .then((res) => {
                   console.log(res)
                   alert("비밀번호가 변경되었습니다")
                   props.history.push("/login")
                 })
        } 
      }
      
     
            
        }
        
   

    function isPassword(asValue) {  
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
    if (!regExp.test(asValue)) {
      alert("비밀번호 형식에 맞지 않습니다")
    }
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
    }
  
    return (
        <div style={{
            display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",      
        height: "100vh",
        }}>
        
            <form onSubmit={onSubmitHandler}
          style={{ display: "flex", flexDirection: "column" }}>
          <h2>비밀번호 변경하기</h2>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>현재 비밀번호</label>
        <input type="password" id="pass" value={Password} onChange={onPasswordHandler} maxlength="50"/>
        <label>변경 비밀번호</label>
       <input type="password" id="chang_id" value={ChangePassword} onChange={onChangePasswordHandler} maxlength="20"/>
       <label>변경 비밀번호 확인</label>
       <input type="password" value={ConfirmPasword} onChange={onConfirmPasswordHandler} maxlength="50"/>
        <br/>
        <button type="submit" >비밀번호 변경</button>        
            </form>
         
           
        </div>
    )
}

export default withRouter(ChangePasswordPage);