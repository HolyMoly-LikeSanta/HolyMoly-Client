import React from 'react'
import styled from 'styled-components'

export const MainButton = ({imgSrc, text}) => {
  return (
    <>
      <ButtonContainer>
        <ButtonIcon src={imgSrc}></ButtonIcon>
        <ButtonText>{text}</ButtonText>
      </ButtonContainer>
    </>
  )
}

const ButtonContainer = styled.div`
  background: linear-gradient(124.65deg, rgba(255, 255, 255, 0.85) 4.56%, rgba(248, 250, 252, 0.85) 4.57%, rgba(241, 245, 249, 0.85) 95.3%);
  color: #FFFFFFD9;
  width: 342px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 18px;
`
const ButtonIcon = styled.img`
  width: 32px;
  height: 32px;
`
const ButtonText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: black;
`
