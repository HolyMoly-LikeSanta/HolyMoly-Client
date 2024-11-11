import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import Home from "./pages/homepage/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AppDom>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
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
