import React from "react";
import StageBoard from "../stagepage/Stageboard";
import styled from "styled-components";
import TopNavBackNoUser from "../../components/TopNavNoUser";

const Stage = () => {
  return (
    <Container>
      <TopNavBackNoUser></TopNavBackNoUser>
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
