import React, { useEffect, useState } from "react";
import StageBoard from "../stagepage/Stageboard";
import styled from "styled-components";
import TopNavBackNoUser from "../../components/TopNavNoUser";
import {
  useCheckAndGetPartyReady,
  useInitializeCustom,
} from "../../hook/customUtil";
import { CustomCharacter } from "../../components/CustomCharacter";

const Stage = () => {
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
      <TopNavBackNoUser></TopNavBackNoUser>
      <BoardContainer>
        <StageBoard></StageBoard>
      </BoardContainer>
      <CustomCharacter
        selectedItem={initializedCustom}
        loadInitial={loadInitial}
      ></CustomCharacter>
    </Container>
  );
};

export default Stage;

const Container = styled.div`
  background-color: white;
  height: 100%;
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardContainer = styled.div`
  margin-bottom: 20vh;
  width: 100%;
`;
