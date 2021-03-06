import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { register } from '../../../store/actions/UserAction'
import axios from 'axios'



function RegisterPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPasword, setConfirmPasword] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
   const [Tel, setTel] = useState("");
  const dispatch = useDispatch();
  const [Checkid, setCheckid] = useState(false);
  const [KeyPress, setKeypres] = useState(false);


  const onEmailHandler = (e) => {
   
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
  };
  const onAgeHandler = (e) => {
    const target = e.currentTarget.value;
    const modifiedValue = target.substring(0, 5);
    setAge(modifiedValue);
  };
    const onGenderHandler = (e) => {
      setGender(e.target.value)
    };
  const onTelHandler = (e) => {
    const target = e.currentTarget.value;
    const modifiedValue = target.substring(0, 13);
    setTel(modifiedValue)
    
  };


  const onSubmitHandler = async(e) => {
    e.preventDefault();

    const param = new URLSearchParams;
    param.append("email", Email);
    param.append("password", Password);
    param.append("name", Name);
    param.append("age", Age);
    param.append("gender", Gender);
    


    if (!Checkid) {
      alert("이메일 중복체크 해주세요")
    } else {
      if (!isEmail(Email)) {
        alert("이메일 형식에 맞지 않습니다")
      } else {
        if (Password !== ConfirmPasword) {
          alert("비밀번호를 다시 확인해주세요")
        } else {
          if(!isPassword(Password)){
            alert("비밀번호 형식을 확인해주세요")
          } else {

            const param = new URLSearchParams;
            param.append("email", Email);
            param.append("password", Password);
            param.append("name", Name);
            param.append("age", Age);
            param.append("gender", Gender);
            param.append("tel", Tel);
      
       await dispatch(register(param))
            .then((res)=>{
                alert("가입이 정상적으로 완료되었습니다")
                props.history.push("/login")
        
            })
            
          }
        }
      }
    }
            

  }
  
  //유효성 검사

  function isEmail(asValue) {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regExp.test(asValue)) {
      alert("이메일 형식에 맞지 않습니다")
    }
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
  }
  
  function isPassword(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
    if (!regExp.test(asValue)) {
      alert("비밀번호 형식에 맞지 않습니다")
    }
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
  }
  
  //이메일 중복 체크ㅡㅡㅡ
  const onKeypressHandler = (e) => {
    if (e.key) {
      return setCheckid(false)
    } 
  }

  //이메일 중복체크

  function checkID(e) {
     e.preventDefault();
     
   
    const param = new URLSearchParams;
    param.append("email", Email);
     axios.post('http://localhost:4000/checkid', param)
      .then(res=>res.data)
      .then(json => {
        if (json.tf === true && Email !== '')  {
          alert("사용가능한 아이디입니다")
          setCheckid(true)
          
        } else if (Email === '') {
          alert("아이디를 입력해주세요")
        }
        else {
          alert("다른 아이디를 입력해주세요!")
        }
      })
   
    } 
     
  
 
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}>
        <label>Email</label>
        <input type="text" value={Email} onChange={onEmailHandler} onKeyPress={onKeypressHandler} maxlength="50"/>
        <button onClick={checkID}>이메일 중복체크 확인</button>

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} maxlength="20" />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHanlder} maxlength="50" />

        <label>ConfirmPasword</label>
        <input
          type="password"
          value={ConfirmPasword}
          onChange={onConfirmPasswordHandler}
          maxlength="10"
        />
        <label>Age</label>
        <input type="number" value={Age} onChange={onAgeHandler} maxlength="5"/>
        <div>
        <label>Gender</label>
        <input type="radio" name="gender" id="women" value="여" onChange={onGenderHandler}/>여
				<input type="radio" name="gender" id="men" value="남" onChange={onGenderHandler} />남
          </div>
       

         <label>tel</label>
        <input type="number" value={Tel} onChange={onTelHandler} maxlength="13" />
        <br />
        <button type="submit" >회원 가입</button>
      </form>
    </div>
  );  
}

export default withRouter(RegisterPage);