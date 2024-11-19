import "./App.css";
import styled from "styled-components";
import Home from "./pages/homepage/Home";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Letter from "./pages/letterpage/Letter";
import Invite from "./pages/invitepage/Invite";
import InviteForm from "./pages/invitepage/InviteForm";
import Letterwrite from "./pages/letterpage/Letterwrite";
import { Custom } from "./pages/custompage/Custom";
import Stage from "./pages/stagepage/Stage";

function App() {
  return (
    <AppDom>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/stage/:memberId" element={<Stage />} />
        <Route path="login" element={<Login />} />
        <Route path="custom" element={<Custom />} />
        <Route path="invite" element={<Invite />} />
        <Route path="inviteform" element={<InviteForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/letterwrite" element={<Letterwrite />} />
      </Routes>
    </AppDom>
  );
}

export default App;

const AppDom = styled.div`
  width: min(100vw, 600px); // 화면 너비에 맞추면서 최대 600px로 제한
  height: 100vh; // 웹 뷰
  margin: 0 auto;

  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 600px) {
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
  }
`;

// view height 변수 설정
window.addEventListener("resize", () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
