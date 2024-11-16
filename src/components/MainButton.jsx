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
  z-index: 1; /* 배경 위에 표시되도록 */
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: -2px 2px 4px 0px #FFFFFF inset,
              -4px -4px 6px 0px #D1D5DB inset,
              -0.4px -0.4px 2px 0px #00000066 inset;
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
