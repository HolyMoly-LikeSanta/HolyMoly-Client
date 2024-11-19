import React, { useEffect, useState } from "react";
import StageBoard from "../stagepage/Stageboard";
import styled from "styled-components";
import TopNavBackNoUser from "../../components/TopNavNoUser";
import { StageCharacter } from "../../components/StageCharacter";
import {
  useCheckAndGetPartyReady,
  useInitializeCustom,
} from "../../hook/customUtil";

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
    <Container>
      <TopNavBackNoUser></TopNavBackNoUser>
      <StageBoard></StageBoard>
      <StageCharacter
        selectedItem={initializedCustom}
        loadInitial={loadInitial}
      ></StageCharacter>
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
`;
