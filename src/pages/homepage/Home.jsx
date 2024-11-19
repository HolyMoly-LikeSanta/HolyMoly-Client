import React, { useEffect, useState } from "react";
import Board from "./Board";
import styled from "styled-components";
import { CustomCharacter } from "../../components/CustomCharacter";
import {
  useCheckAndGetPartyReady,
  useInitializeCustom,
} from "../../hook/customUtil";
import { Nav } from "../../components/Nav";

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
      <Nav isBack={true} isNoUser={false}/>
      <BoardContainer>
        <Board></Board>
      </BoardContainer>
      <CustomCharacterContainer>
        <ShadowImage src="/image/characterShadow.png" alt="Shadow" />
        <CustomCharacter
          selectedItem={initializedCustom}
          loadInitial={loadInitial}
        />
      </CustomCharacterContainer>

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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardContainer = styled.div`
  margin-bottom: 10vh;
  width: 100%;

  @media screen and (max-width: 600px) {
    margin-bottom: 20vh;
  }
`;

const CustomCharacterContainer = styled.div`
  position: relative; /* CustomCharacter와 ShadowImage를 겹치도록 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShadowImage = styled.img`
  position: absolute;
  width: 200px;
  height: 82px;
  bottom: 38px; /* 원하는 위치 조정 */
  z-index: 1; /* CustomCharacter보다 뒤에 배치 */
`;