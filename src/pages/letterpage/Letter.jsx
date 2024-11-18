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
              {/* <img src="/image/FROM..png" alt="FromImg" /> */}
              <span>FROM.&nbsp;&nbsp;{data.authorNickname}</span>
              <p>{data.content}</p>
            </FromBox>
          </InnerBox>
        </Border>
      </FlexBox>
    </Container>
  );
};

export default Letter;

const Container = styled.div`
  background-image: url("/image/InviteBackgroundImg.png");
  background-size: cover; /* 배경 이미지 크기 자동 조정 */
  background-position: center; /* 배경 이미지 중앙 정렬 */
  background-repeat: no-repeat; /* 배경 이미지 반복하지 않음 */
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
  box-shadow:
    -4px -4px 6px 0px #00000040 inset,
    0px 4px 4px 0px #00000040 inset;

  background-color: #eab5b5;
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
  box-shadow:
    -4px -4px 8px 0px #00000073 inset,
    0px 4px 4px 0px #00000040 inset;
`;

const CloseIcon = styled.img`
  position: absolute;
  width: 1.5rem;
  top: 2rem;
  right: 2rem;
`;

const FromBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden; /* FromBox 내부로 스크롤을 제한 */
  height: 100%; /* FromBox가 부모 요소에 맞게 확장되도록 설정 */
  span {
    font-size: 1.2rem;
  }

  p {
    margin-top: 2rem;
    line-height: 3rem;
    overflow-y: auto;
    padding-right: 0.5rem; /* 스크롤바와 내용 간 여백 */

    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #eab5b5;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #d19494;
    }
    &::-webkit-scrollbar-track {
      background-color: #f5f5f5;
      border-radius: 4px;
    }
  }
  img {
    width: 25%;
    object-fit: contain;
  }

  h2 {
    margin-left: 1rem;
  }
`;
