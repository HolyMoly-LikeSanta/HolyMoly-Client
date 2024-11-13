import React from 'react'
import styled from 'styled-components'

export const MyPage = () => {
  return (
    <ModalContent>
        <ProfileHeader>
            <ProfileImgContainer>
                <ProfileImg></ProfileImg>
            </ProfileImgContainer>
            <ProfileName>전람회 드렁슨</ProfileName>
        </ProfileHeader>
        <ProfileMiddle>
            <EmailLabel>이메일</EmailLabel>
            <EmailContent>alcoholpower@gmail.com</EmailContent>
        </ProfileMiddle>
        <LogoutBtn>로그아웃</LogoutBtn>
    </ModalContent>
  )
}

const ModalContent = styled.div`
    width: 186px;
    gap: 14%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 25vh;
    background-color: #fff;
    padding: 20px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    //text-align: center;
    backdrop-filter: blur(10px);
    box-shadow: -2px 2px 4px 0px #FFFFFF inset,
                -4px -4px 6px 0px #D1D5DB inset,
                -0.4px -0.4px 2px 0px #00000066 inset;
`

const ProfileHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
`
const ProfileImgContainer = styled.div`
    width: 63px;
    height: 63px;
    border-radius: 137.78px;
    box-shadow: 0px 0px 6px 0px #0000000D;
    border: 0.5px solid #A1A1AA;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ProfileImg= styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
`
const ProfileName = styled.div`
    color: #14532D;
    font-size: 11px;
`
const ProfileMiddle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
`
const EmailLabel = styled.div`
    color: #27272A;
    font-size: 10px;
    font-weight: 700;
  
`
const EmailContent = styled.div`
    font-size: 10px;
    font-weight: 400;
    font-size: 9px;
`
const LogoutBtn = styled.div`
    font-size: 11px;
    color: #007AFF;
    text-decoration: underline;
    cursor: pointer;
    margin-top: 3%;
`
