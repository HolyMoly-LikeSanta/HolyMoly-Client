import React, { useState } from 'react'
import styled from 'styled-components'
import TopNavBack from '../../components/TopNavBack'

export const Custom = () => {
    const [selectedCategory, setSelectedCategory] = useState('background');

    const handleSelect = (selected) => {
        setSelectedCategory(selected);
    }


  return (
    <>
        <TopNavBack />
        <Container>
            <MainContainer>
                <CharacterBackground></CharacterBackground>
                <CompleteButton>완료</CompleteButton>
            </MainContainer>
            <CustomElementContainer>
                <Selection>
                    <Category selected={selectedCategory === 'background'} onClick={()=>{handleSelect('background')}}>배경</Category>
                    <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                    <Category selected={selectedCategory === 'hair'} onClick={()=>{handleSelect('hair')}}>머리</Category>
                    <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                    <Category selected={selectedCategory === 'face'} onClick={()=>{handleSelect('face')}}>얼굴</Category>
                    <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                    <Category selected={selectedCategory === 'clothes'} onClick={()=>{handleSelect('clothes')}}>옷</Category>
                    <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                    <Category selected={selectedCategory === 'accessary'} onClick={()=>{handleSelect('accessary')}}>악세사리</Category>
                </Selection>
            </CustomElementContainer>
        </Container>
    </>
  )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
    position: relative;
    height: 90vh;
`
const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1vh;
`
const CharacterBackground = styled.div`
    width: 90%;
    height: 47vh;
    backdrop-filter: blur(10px);
    box-shadow: -2px 2px 4px 0px #FFFFFF inset,
                -4px -4px 6px 0px #D1D5DB inset,
                -0.4px -0.4px 2px 0px #00000066 inset;
    border-radius: 16px;
    border: solid 1.5px #46464622 ;
`
const CompleteButton = styled.div`
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    margin-right: 5%;
    width: 20%;
    height: 4.5vh;
    border-radius: 13px;
    color: #DC2626;
    background: linear-gradient(138.66deg, rgba(255, 255, 255, 0.85) 23.4%, rgba(220, 38, 38, 0.85) 133.9%);
    backdrop-filter: blur(10px);
    box-shadow: -2px 2px 4px 0px #FFFFFF inset,
                -4px -4px 6px 0px #FECDD3 inset,
                -0.4px -0.4px 2px 0px #FDA4AF inset;
    cursor: pointer;
    border: solid 1px #FDA4AF;
`
const CustomElementContainer = styled.div`
    width: 90%;
    border-top: 1.5px solid #D4D4D4;
    border-right: 1.5px solid #D4D4D4;
    border-bottom: 0px; /* 아래쪽 테두리 없음 */
    border-left: 1.5px solid #D4D4D4;
    height: 34vh;
    justify-self: flex-end;
    position: absolute;
    bottom: 0;
    border-radius: 16px 16px 0px 0px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Selection = styled.div`
    background-color: #EEEEEF;
    border-radius: 10px;
    width: 95%;
    height: 15%;
    margin-top: 2%;
    display: flex;
    justify-content: center;
    align-items: center;    
    display: grid;
    grid-template-columns: 1fr 0.001fr 1fr 0.001fr 1fr 0.001fr 1fr 0.001fr 1fr;
    padding: 1px;
`
const SelectionDivider = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5px;
`

const Category = styled.div`
    font-size: 17px;
    font-weight: 400;
    white-space: nowrap;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color : ${({selected})=> selected ? "#FFFFFF" : "transparent"};
    box-shadow: ${({selected})=> selected ? "0px 3px 1px 0px #0000000A, 0px 3px 8px 0px #0000001F" : "none"};
    border-radius: ${({selected})=> selected ? "8px" : "0"};
    width: 85%;
    align-self: center;
    justify-self: center;
`