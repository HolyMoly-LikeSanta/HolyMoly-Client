import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getUserData } from '../apis/api'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isCharacterCreatedRecoil } from '../recoil/userRecoil'

export const MyPage = ({isMyPageOpen}) => {
    const [userData, setUserData] = useState({})
    const navigate = useNavigate();
    const isCharacter = useRecoilValue(isCharacterCreatedRecoil);

    useEffect(()=>{
        const getUser = async() => {
            const result = await getUserData();
            setUserData(result);
        }
        getUser();
    },[isMyPageOpen])

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    }

  return (
    <ModalContent onClick={(e) => e.stopPropagation()}>
        <ProfileHeader>
            <ProfileImgContainer>
                <ProfileImg src={userData.profileImage}/>
            </ProfileImgContainer>
            <ProfileName>{userData.name}</ProfileName>
        </ProfileHeader>
        <ProfileMiddle>
        { isCharacter && 
            <UpdateContainer>
               <UpdateCharacterBtn onClick={()=>navigate('/custom')}>캐릭터 수정하기</UpdateCharacterBtn>
                <UpdateIcon src='/image/updateIcon.png'/>
            </UpdateContainer>}
        </ProfileMiddle>
        <LogoutBtn onClick={()=>{handleLogout()}}>로그아웃</LogoutBtn>
    </ModalContent>
  )
}

const ModalContent = styled.div`
    width: 186px;
    gap: 5%;
    //position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 20vh;
    background-color: #fff;
    padding: 20px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    box-shadow: -2px 2px 4px 0px #FFFFFF inset,
                -4px -4px 6px 0px #D1D5DB inset,
                -0.4px -0.4px 2px 0px #00000066 inset;
    
    position: absolute; /* 네비게이션 바 기준으로 위치를 설정 */
    top: 0; /* 네비게이션 바의 맨 위에 위치 */
    @media (max-width: 1280px) {
        left: 120px; 
        width: 200px; 
    }
    @media (max-width: 820px) {
        left: 110px; 
        width: 200px; 
    }
    @media (max-width: 600px) {
        left: 40px; /* 작은 화면에서 오른쪽 간격을 좁힘 */
        width: 150px; /* 작은 화면에서는 너비를 줄임 */
    }
    @media (max-width: 430px) {
        left: 60px;
        width: 120px;
    }
    @media (max-width: 400px) {
        left: 50px;
        width: 110px;
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
`
const ProfileImg= styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 63px;
    border-radius: 137.78px;
    height: 63px;
    border-radius: 137.78px;
    box-shadow: 0px 0px 6px 0px #0000000D;
    border: 0.5px solid #A1A1AA;
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

const UpdateContainer = styled.div`
    background: linear-gradient(114.94deg, #E0F2FE -71.8%, #14532D 48.88%);
    width: 111px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -2px -2px 2px 0px #00000066 inset;
    border-radius: 10px;
    height: 21px;
    background: linear-gradient(119.66deg, #E0F2FE -82.08%, #14532D 123.96%);
    cursor: pointer;
    gap: 3px;
`
const UpdateIcon = styled.img`
    width: 8px;
    height: 8px;
`

const UpdateCharacterBtn = styled.div`
    color: white;
    font-size: 10px;
    font-weight: 700;
    font-size: 10px;
`

const LogoutBtn = styled.div`
    font-size: 11px;
    color: #007AFF;
    text-decoration: underline;
    cursor: pointer;
    margin-top: 3%;
`
