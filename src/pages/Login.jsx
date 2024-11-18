import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MainButton } from '../components/MainButton';
import { kakaoLogin } from '../auth/kakaoAuth';

export const Login = () => {
  const kakaoLoginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  
  const handleKakaoLogin = (e) => {
    e.preventDefault();
    window.location.href = kakaoLoginLink;
  }

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
        <ButtonContainer>
          <BtnDeco id='up' src='/image/loginBtnDecoUp.png'></BtnDeco>
          <MainButton
            handleClick={(e)=>handleKakaoLogin(e)}
            imgSrc={'/image/Kakaotalk.png'}
            text={'카카오톡 계정으로 로그인하기'}
          />
          <BtnDeco id='down' src='/image/loginBtnDecoDown.png'></BtnDeco>
        </ButtonContainer>
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
  gap: 250px;
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
  text-shadow: 
    -1px -1px 0 black, /* 왼쪽 위 */
    1px -1px 0 black,  /* 오른쪽 위 */
    -1px 1px 0 black,  /* 왼쪽 아래 */
    1px 1px 0 black;   /* 오른쪽 아래 */
`;


const ButtonContainer = styled.div`
  position: relative;
`

const BtnDeco = styled.img`
  position: absolute;
  z-index: 99;

  &[id='up']{
    width: 130px;
    top: -62px;
    left: 220px;
  }
  &[id='down']{
    width: 60px;
    left: 258px;
  }
`