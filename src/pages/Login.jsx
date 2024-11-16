import React from 'react';
import styled from 'styled-components';
import { MainButton } from '../components/MainButton';

export const Login = () => {
  const link = `http://localhost:3000/invite`

  return (
    <Container>
      <BackgroundLayer />
      <MainContent>
        <MainContainer>
          <MainLogo src="/image/HOLY_MOLY.png" />
          <MainText>
            익명의 편지로 마음을 전하고, 따뜻한 연말을 함께하세요!
          </MainText>
        </MainContainer>
        <MainImage />
        <MainButton
          imgSrc={'/image/Kakaotalk.png'}
          text={'카카오톡 계정으로 로그인하기'}
        />
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden; /* 자식 요소가 컨테이너 밖으로 나가지 않도록 */
`;

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/image/loginBackground.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -1; 
`;

const MainContent = styled.div`
  position: relative;
  z-index: 1; /* 배경 위에 콘텐츠 배치 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 72px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const MainLogo = styled.img`
  width: 318px;
`;

const MainText = styled.div`
  color: white;
  font-size: 12px;
`;

const MainImage = styled.div`
  width: 230px;
  height: 230px;
  object-fit: cover;
  margin-bottom: 8px;
`;
