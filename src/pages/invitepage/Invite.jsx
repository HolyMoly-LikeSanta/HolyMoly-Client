import React, { useState } from "react";
import TopNavBack from "../../components/TopNavBack";
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";

const Invite = () => {
  const [isFlowBtnVisible, setIsFlowBtnVisible] = useState(false);

  const navigate = useNavigate();

  // 두 번째 버튼 클릭 시 FlowBtn 토글
  const handleSecondButtonClick = () => {
    setIsFlowBtnVisible(!isFlowBtnVisible);
  };

  return (
    <Container>
      <TopNavBack />
      <BtnBox>
        <BtnFlexBox>
          {/* 첫 번째 버튼 */}
          <div>
            <img src="/image/InviteBtn1.png" alt="Button 1" />
          </div>

          {/* 두 번째 버튼 클릭 시 FlowBtn이 나타나도록 */}
          <div onClick={handleSecondButtonClick}>
            <img src="/image/InviteBtn2.png" alt="Button 2" />
          </div>

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
              <img src="/image/InviteBtn5.png" alt="URL주소" />
            </InviteBtnBox>
          </FlowBtn>
        </BtnFlexBox>
      </BtnBox>
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
  background-color: white;
  height: 100%;
  position: relative;
`;

const BtnBox = styled.div`
  position: fixed;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%); /* 가로 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 600px;
`;

const BtnFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    margin-bottom: 5px; /* 버튼들 간의 간격 */
  }

  text-align: center;

  img {
    width: 60%;
    cursor: pointer;
    @media screen and (max-width: 600px) {
      width: 80%;
    }
  }
`;

const FlowBtn = styled.div`
  position: absolute; /* FlowBtn을 두 번째 버튼 뒤에 배치 */
  top: 85%; /* 두 번째 버튼 바로 아래에 위치 */
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
`;

const InviteBtnBox = styled.div`
  display: flex; /* 가로로 버튼 배치 */
  justify-content: space-evenly; /* 버튼 사이에 균등하게 공간 배치 */
  align-items: center; /* 버튼들을 세로로 가운데 정렬 */
  width: 60%;
  position: absolute;
  top: 50%; /* FlowBtn 안에서 수직으로 중앙 배치 */
  left: 50%;
  transform: translate(-50%, -50%); /* FlowBtn의 중앙에 배치 */

  @media screen and (max-width: 600px) {
    width: 80%;
  }

  img {
    width: 40%;
    cursor: pointer;
    margin-top: 5px;
  }
`;
