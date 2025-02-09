import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../auth/kakaoAuth";
import { getUserData } from "../../apis/api";
import { useRecoilState } from "recoil";
import {
  isCharacterCreatedRecoil,
} from "../../recoil/userRecoil";
import { useCheckAndGetPartyReady } from "../../hook/customUtil";
import { Nav } from "../../components/Nav";

const Invite = () => {
  const [isFlowBtnVisible, setIsFlowBtnVisible] = useState(false);
  const [showError, setShowError] = useState(false); // 에러 메시지 표시 여부
  const [isCharacterCreated, setIsCharacterCreated] = useRecoilState(
    isCharacterCreatedRecoil
  );
  const checkAndGetPartyReady = useCheckAndGetPartyReady();

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  useCheckAndGetPartyReady();

  const memberId = localStorage.getItem("memberId");
  useEffect(() => {
    const initialize = async () => {
      await kakaoLogin();
      getUserData(accessToken);
    };
    initialize();
  }, []);

  const handleReadyParty = () => {
    if (isCharacterCreated) {
      navigate("/home");
    } else if (!isCharacterCreated) {
      navigate("/custom");
    }
  };

  // 두 번째 버튼 클릭 시 FlowBtn 토글
  const handleSecondButtonClick = () => {
    if (isCharacterCreated) {
      setIsFlowBtnVisible(!isFlowBtnVisible);
    } else if (!isCharacterCreated) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3500);
    }
  };

  const handleUrlCopy = () => {
    // 현재 도메인 (예: http://localhost:3000 또는 배포된 사이트의 URL)
    const currentOrigin = window.location.origin;

    // 복사할 URL 생성
    const fullUrl = `${currentOrigin}/stage/${memberId}`;

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        alert("URL이 클립보드에 복사되었습니다.");
      })
      .catch((error) => {
        console.error("URL 복사 실패:", error);
      });
  };

  return (
    <Container>
      <Nav isBack={false} isNoUser={false}/>
      <BtnContainer>
        <SantaBox>
          <img src="/image/Santa.png" alt="" />
        </SantaBox>
        <BtnFlexBox>
          <MessageBox>
            {showError ? (
              <ErrorBox>
                <ErrorMessage>
                  <img src="/image/ErrorIcon.png" alt="ErrorIcon" />
                  &nbsp;`크리스마스 파티 준비` 먼저 해주세요!
                </ErrorMessage>
              </ErrorBox>
            ) : (
              <ErrorMessage></ErrorMessage>
            )}
          </MessageBox>
          {/* 첫 번째 버튼 */}

          <BtnBox>
            <img
              src="/image/InviteBtn1.png"
              alt="Button 1"
              onClick={() => {
                handleReadyParty();
              }}
            />
          </BtnBox>

          {/* 두 번째 버튼 클릭 시 FlowBtn이 나타나도록 */}
          <BtnBox onClick={handleSecondButtonClick}>
            <img src="/image/InviteBtn2.png" alt="Button 2" />
          </BtnBox>

          {/* FlowBtn은 두 번째 버튼 뒤에서 나타나게 */}
          <FlowBtn isVisible={isFlowBtnVisible}>
            <img src="/image/InviteBtnex.png" alt="Flow Button" />
            <InviteBtnBox>
              <img
                src="/image/InviteBtn4.png"
                alt="초대장 만들기"
                onClick={() => {
                  navigate("/inviteform");
                }}
              />
              <img
                src="/image/InviteBtn5.png"
                alt="URL주소"
                onClick={handleUrlCopy}
              />
            </InviteBtnBox>
          </FlowBtn>
        </BtnFlexBox>
      </BtnContainer>
    </Container>
  );
};

export default Invite;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-40px); // 위에서
  }
  to {
    opacity: 1;
    transform: translateY(-3px); // 원래 위치
  }
`;

const Container = styled.div`
  background-image: url("/image/BackgroundImg.png");
  background-size: cover; /* 배경 이미지 크기 자동 조정 */
  background-position: top 80% right 50%; /* 배경 하단이 보이게 */
  background-repeat: no-repeat; /* 배경 이미지 반복하지 않음 */
  background-color: white;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    background-position: bottom; /* 배경 이미지 중앙 정렬 */
  }
`;

const SantaBox = styled.div`
  width: 55%;
  position: fixed;
  bottom: 10.5rem;

  img {
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const BtnContainer = styled.div`
  position: fixed;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%); /* 가로 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 80%;
  max-width: 600px;
`;

const BtnFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  text-align: center;

  img {
    width: 100%;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  span {
    font-size: 13px;
  }
`;

const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 1rem;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ErrorMessage = styled.span`
  color: #d00b0e;
  animation: ${fadeOut} 0.5s forwards; /* 3초 후 완전히 투명해짐 */
  animation-delay: 3s; /* 3초 후 시작 */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;
`;

const BtnBox = styled.div`
  margin-bottom: 5px; /* 버튼들 간의 간격 */
`;

const FlowBtn = styled.div`
  position: absolute; /* FlowBtn을 두 번째 버튼 뒤에 배치 */
  top: 85%; /* 두 번째 버튼 바로 아래에 위치 */
  width: 60%;
  z-index: -2;
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${slideUp} 0.7s ease forwards;
      opacity: 1;
    `}
  ${({ isVisible }) =>
    !isVisible &&
    css`
      opacity: 0;
      pointer-events: none;
    `}

    @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const InviteBtnBox = styled.div`
  display: flex; /* 가로로 버튼 배치 */
  justify-content: space-evenly; /* 버튼 사이에 균등하게 공간 배치 */
  align-items: center; /* 버튼들을 세로로 가운데 정렬 */
  width: 100%;
  position: absolute;
  top: 50%; /* FlowBtn 안에서 수직으로 중앙 배치 */
  left: 50%;
  transform: translate(-50%, -50%); /* FlowBtn의 중앙에 배치 */

  img {
    width: 40%;
    cursor: pointer;
    margin-top: 5px;
  }
`;
