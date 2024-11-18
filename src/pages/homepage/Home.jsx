import React, { useEffect } from "react";
import TopNavBack from "../../components/TopNavBack";
import Board from "./Board";
import styled from "styled-components";
import { createBoard, getBoardLetter, getUserData } from "../../apis/api";
import { CustomCharacter } from "../../components/CustomCharacter";
import { useInitializeCustom } from "../../hook/customUtil";

const Home = () => {
  const initializedCustom = useInitializeCustom(); 

  return (
    <Container imageUrl={initializedCustom.bg.imageUrl}>
      <TopNavBack></TopNavBack>
      <Board></Board>
      <CustomCharacter selectedItem={initializedCustom}/>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: white;
  height: 100%;
  background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : "none")};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20vh;
`

