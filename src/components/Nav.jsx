import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { MyPage } from '../modal/MyPage';

export const Nav = ({isBack, isNoUser}) => {
    const navigate = useNavigate();
    const [isMyPageOpen, setIsMyPageOpen] = useState(false);

    const handleMyPage = () => {
      setIsMyPageOpen(!isMyPageOpen);
    };

    const handleTopClick = () => {
        if(isNoUser){
            navigate('/login');
        }else{
            navigate('/invite');
        }
    }

  return (
    <Container>
        {isMyPageOpen && (
          <ModalOverlay onClick={() => setIsMyPageOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <MyPage
                setIsMyPageOpen={setIsMyPageOpen}
                isMyPageOpen={isMyPageOpen}
              />
            </ModalContent>
          </ModalOverlay>
        )}
                <div>
                <BackIcon
                  isBack={isBack}
                  src="/image/BackIcon.png"
                  alt="ArrowBack"
                  onClick={() => {
                    navigate(-1);
                  }}
                />
              </div>
    <AppTitle
      onClick={() => {
        handleTopClick();
      }}
    >
      <img src="/image/HOLY_MOLY.png"></img>
    </AppTitle>
        <UserIconWrapper>
        {!isNoUser &&
          <UserIcon
            src="/image/UserIcon.png"
            alt="ArrowBack"
            onClick={() => {
              handleMyPage();
            }}
          />}
        </UserIconWrapper>
  </Container>
  )
}

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
  margin-left: auto;
  margin-right: auto;
  z-index: 100;
`;
const BackIcon = styled.img`
  width: 1.2rem;
  cursor: pointer;
  margin-left: 30px;
  cursor: ${({ isBack }) => (isBack ? "pointer" : "default")};
  visibility: ${({ isBack }) => (isBack ? "visible" : "hidden")};
  pointer-events: ${({ isBack }) => (isBack ? "auto" : "none")}; /* 클릭 불가능 */
`;

const UserIcon = styled.img`
  width: 2rem;
  cursor: pointer;
  margin-right: 30px;
`;

const AppTitle = styled.div`
  text-align: center;
  img {
    width: 58%;
  }
`;

const UserIconWrapper = styled.div`
  width: 15%; /* 고정된 크기 */
  text-align: center;
`;
