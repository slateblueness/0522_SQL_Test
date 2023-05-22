import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>HOME</h2>
      <p>로그인에 실패하면 HOME 화면으로 돌아옵니다.</p>
      <Link to={"/loginform"}>로그인/회원가입</Link>
    </div>
  );
}
