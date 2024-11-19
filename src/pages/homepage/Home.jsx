import React, { useEffect, useState } from "react";
import TopNavBack from "../../components/TopNavBack";
import Board from "./Board";
import styled from "styled-components";
import { createBoard, getBoardLetter, getUserData } from "../../apis/api";
import { CustomCharacter } from "../../components/CustomCharacter";
import {
  useCheckAndGetPartyReady,
  useInitializeCustom,
} from "../../hook/customUtil";
import { StageCharacter } from "../../components/StageCharacter";

const Home = () => {
  const [loadInitial, setLoadInitial] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const initializedCustom = useInitializeCustom();

  useCheckAndGetPartyReady();

  useEffect(() => {
    if (!loadInitial) {
      setSelectedItem(initializedCustom);
      setLoadInitial(true);
    }
  }, []);

  return (
    <Container imageUrl={initializedCustom.bg.imageUrl}>
      <TopNavBack></TopNavBack>
      <Board></Board>
      <StageCharacter
        selectedItem={initializedCustom}
        loadInitial={loadInitial}
      />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: white;
  height: 100%;
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
