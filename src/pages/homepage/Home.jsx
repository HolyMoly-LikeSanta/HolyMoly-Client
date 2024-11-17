import React, { useEffect } from "react";
import TopNavBack from "../../components/TopNavBack";
import Board from "./Board";
import styled from "styled-components";
import { createBoard, getBoardLetter, getUserData } from "../../apis/api";

const Home = () => {
  return (
    <Container>
      <TopNavBack></TopNavBack>
      <Board></Board>
      <UserImg src="/image/UserImgEx.png" alt="" />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: white;
  height: 100%;
  background-image:;
`;

const UserImg = styled.img`
  position: absolute;
  width: 40%;
  bottom: 3rem;
  left: 3rem;
`;
