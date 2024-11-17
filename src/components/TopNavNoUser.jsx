import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MyPage } from "../modal/MyPage";

const TopNavBackNoUser = () => {
  const navigate = useNavigate();
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);

  const handleMyPage = () => {
    setIsMyPageOpen(!isMyPageOpen);
  };

  return (
    <>
      <Container>
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
          <img src="/image/TopTitle.png"></img>
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

export default TopNavBackNoUser;

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
const BackIcon = styled.img`
  width: 1rem;
  cursor: pointer;
`;

const BackIconWrapper = styled.div`
  width: 15%;
  text-align: center;
`;

const UserIconWrapper = styled.div`
  opacity: 0; /* 아이콘 보이기/숨기기 */
  pointer-events: none;
  width: 15%;
  text-align: center;
`;

const UserIcon = styled.img`
  width: 1.5rem;
  cursor: pointer;
`;

const AppTitle = styled.div`
  flex-grow: 1;
  text-align: center;
  img {
    width: 40%;
  }
`;
