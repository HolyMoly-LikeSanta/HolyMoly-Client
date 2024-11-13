import React from "react";
import TopNavBack from "../../components/TopNavBack";
import StageBoard from "../stagepage/Stageboard";
import styled from "styled-components";

const Stage = () => {
  return (
    <Container>
      <TopNavBack></TopNavBack>
      <StageBoard></StageBoard>
      <UserImg src="/image/UserImgEx.png" alt="" />
    </Container>
  );
};

export default Stage;

const Container = styled.div`
  background-color: white;
  height: 100%;
`;

const UserImg = styled.img`
  position: absolute;
  width: 40%;
  bottom: 3rem;
  left: 3rem;
`;
