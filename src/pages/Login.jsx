import React from 'react'
import styled from 'styled-components'
import { MainButton } from '../components/MainButton'

export const Login = () => {
  return (
    <Container>
      <MainContainer>
        <MainLogo src="/image/HOLY_MOLY.png"></MainLogo>
        <MainText>익명의 편지로 마음을 전하고, 따뜻한 연말을 함께하세요!</MainText>
      </MainContainer>
      <MainImage src="/image/ginger_breadman1.png"></MainImage>
      <MainButton imgSrc={"/image/Kakaotalk.png"} text={"카카오톡 계정으로 로그인하기"}/>
    </Container>
  )
}

const Container = styled.div`
    width: 100%;
    background-color: #1C2721;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 72px;
`
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`
const MainLogo = styled.img`
  width: 318px;
`
const MainText = styled.div`
  color: white;
  font-size: 12px;
`
const MainImage = styled.img`
  width: 230px;
  object-fit: cover;
  margin-bottom: 8px;
`
