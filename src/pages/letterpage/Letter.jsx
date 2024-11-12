import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavBack from "../../components/TopNavBack";
import styled from "styled-components";

const Letter = () => {
  const { state } = useLocation(); // 전달된 상태에 접근
  const data = state; // 이 상태에는 보고서 객체가 포함되어 있습니다

  const navigate = useNavigate();
  return (
    <Container>
      <TopNavBack></TopNavBack>
      <FlexBox>
        <Border>
          <InnerBox>
            <CloseIcon
              src="/image/Close.png"
              alt="CloseBtn"
              onClick={() => {
                navigate(-1);
              }}
            />
            <FromBox>
              <img src="/image/FROM..png" alt="FromImg" />
              <h2>{data.author}</h2>
            </FromBox>
          </InnerBox>
        </Border>
      </FlexBox>
    </Container>
  );
};

export default Letter;

const Container = styled.div`
  background-color: white;
  height: 100%;
`;

const FlexBox = styled.div`
  width: 100%;
  height: calc(100vh - 70px); /* TopNavBack을 제외한 높이 */
  max-height: calc(
    100vh - 70px
  ); /* 화면 높이에서 TopNavBack과 패딩을 뺀 최대 높이 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Border = styled.div`
  width: 80%;
  position: relative;
  top: 70px;
  max-height: calc(
    100vh - 70px
  ); /* 화면 높이에서 TopNavBack과 패딩을 뺀 최대 높이 */
  height: 80vh;
  box-sizing: border-box;
  padding: 1rem;

  background-color: #14532d;
  border-radius: 1rem;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

const InnerBox = styled.div`
  background-color: white;
  padding: 2rem 2rem;
  border-radius: 1rem;
  height: 100%;
  box-sizing: border-box;
`;

const CloseIcon = styled.img`
  position: absolute;
  width: 1.5rem;
  top: 2rem;
  right: 2rem;
`;

const FromBox = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 25%;
    object-fit: contain;
  }

  h2 {
    margin-left: 1rem;
  }
`;
