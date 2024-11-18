import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MyPage } from "../modal/MyPage";

const TopNavBack = () => {
  const navigate = useNavigate();
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);

  const handleMyPage = () => {
    setIsMyPageOpen(!isMyPageOpen);
  };

  return (
    <>
      <Container>
        {isMyPageOpen && (
          <ModalOverlay onClick={() => setIsMyPageOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <MyPage setIsMyPageOpen={setIsMyPageOpen} />
            </ModalContent>
          </ModalOverlay>
        )}
        <BackIconWrapper>
          <BackIcon
            src="/image/BackIcon.png"
            alt="ArrowBack"
            onClick={() => {
              navigate(-1);
            }}
          />
        </BackIconWrapper>
        <AppTitle onClick={() => navigate("/")}>
          <img src="/image/HOLY_MOLY.png"></img>
        </AppTitle>{" "}
        <UserIconWrapper>
          <UserIcon
            src="/image/UserIcon.png"
            alt="ArrowBack"
            onClick={() => {
              handleMyPage();
            }}
          />
        </UserIconWrapper>
      </Container>
    </>
  );
};

export default TopNavBack;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(255 255 255 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  top: 70px;
  left: 42%;
  display: flex;
  align-self: flex-end;
  justify-self: end;
  z-index: 1111;
  position: absolute;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 600px;
  max-height: 70px;
  height: 70px; // 네비게이션 바의 높이를 화면 비율에 맞춰 설정 (전체 화면의 10%)
  bottom: 0;
  // background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    height: calc(
      var(--vh, 1vh) * 8
    ); // 작은 화면에서는 화면 비율에 맞게 높이 설정 전체 높이의 &%
  }

  z-index: 1;
`;

const BackIconWrapper = styled.div`
  width: 15%; /* 고정된 크기 */
  text-align: center;
`;

const UserIconWrapper = styled.div`
  width: 15%; /* 고정된 크기 */
  text-align: center;
`;

const BackIcon = styled.img`
  width: 1rem;
  cursor: pointer;
`;

const UserIcon = styled.img`
  width: 1.5rem;
  cursor: pointer;
`;

const AppTitle = styled.div`
  text-align: center;
  img {
    width: 40%;
  }
`;
