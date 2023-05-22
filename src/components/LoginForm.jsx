import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../database/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = styled.button`
  background-color: slateblue;
  color: white;
  font-weight: bolder;
  border: 0;
  border-radius: 7px;
  width: 70px;
  height: 30px;
  margin-right: 5px;
  margin-top: 15px;
`;

const Join = styled.input`
  background-color: #3b6b6b;
  color: white;
  font-weight: bolder;
  border: 0;
  border-radius: 7px;
  width: 70px;
  height: 30px;
  margin-right: 5px;
  margin-top: 15px;
`;

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const onEmailLogin = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("회원가입 성공!", user);

        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });

        navigate("/main");
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode == "auth/email-already-in-use") {
          alert("회원가입 실패: 동일한 이메일로 가입 정보가 있습니다.");
        } else if (errorCode == "auth/weak-password") {
          alert("회원가입 실패: 비밀번호를 6자리 이상 적어 주세요.");
        }
      });
  };

  const onClickLogin = () => {
    async function getLogin() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });

        navigate("/main");
      } catch (error) {
        console.log(error.code, error.message);
        if (
          error.code == "auth/user-not-found" ||
          error.code == "auth/wrong-password"
        ) {
          alert("회원가입 정보에 없는 이메일이거나 비밀번호가 맞지 않습니다.");
        }

        navigate("/");
      }
    }
    getLogin();
  };

  return (
    <div>
      <h3>로그인 또는 회원가입을 진행해 주세요.</h3>

      <form onSubmit={onEmailLogin}>
        <label htmlFor="">E-mail </label>
        <input
          type="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <br />
        <label htmlFor="">Password </label>
        <input
          type="password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <br />
        <Login type="button" onClick={onClickLogin}>
          로그인
        </Login>
        <Join type="submit" value="회원가입" />
      </form>
    </div>
  );
}
