import React, { useEffect, useRef, useState } from "react";
import TopNavBack from "../../components/TopNavBack";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Circle from "@uiw/react-color-circle";
import { toPng } from "html-to-image";
import { createBoard } from "../../apis/api";

const MAX_NICKNAME_LENGTH = 10;

const missionData = [
  "올해 계획에 없었지만 뜻밖에 즐거웠던 일이나, 예상 밖으로 나를 웃게 만든 작은 순간은 뭐였어? 산타에게 슬쩍 얘기해줘! 🎁",
  "산타가 모르는 나의 비밀스러운 취향 하나를 알려줘! 내 친구들이 이걸 맞출 수 있을까? 진짜 내 친구라면, 이 취향까지 알겠지? 😏",
  "올해 힘들었지만 그만큼 성숙해졌다고 느낀 순간이 있다면? 산타에게 그 경험을 나눠줘! 너의 한 해를 산타가 진심으로 축하해 줄게. 🎉",
  "내가 보낸 메시지 중 가장 반응이 좋았거나, 나 스스로 너무 웃겼던 거 하나만 공유해줘! 그 순간을 생각하면서 같이 웃어보자. 😂",
  "내년의 나에게 하고 싶은 약속이나 꼭 이루고 싶은 목표가 있어? 산타가 네 목표를 기억하고 응원해 줄게. 🎯",
  "기쁘거나 슬퍼서 울컥했던, 가슴이 뭉클해진 순간을 나눠줘. 우리 같이 올해의 감동을 떠올려 보자. 🥲",
  "크리스마스를 맞이해, 내가 진심으로 이루고 싶은 소망을 하나만 살짝 털어놓기! 크리스마스 기적이 이뤄질지도 몰라... 🎄",
  "내 올해를 한 줄로 요약한다면 뭐라고 표현할 수 있을까? 유머든 진지하든 좋으니, 내 한 해를 산타에게 압축해서 알려줘!",
  "올해 나를 위해 찾은 최고의 간식 조합이 있다면? 산타가 나중에 한 번 따라 해보게 살짝 비법을 알려줘! 🍟🍦",
  "올해 너의 웃음이 멈추지 않게 만든 일이 있다면? 산타가 상상하면서 피식 웃을 준비 완료! 😜",
];

const InviteForm = () => {
  const navigate = useNavigate();
  const innerBoxRef = useRef(null); // 이미지화할 영역을 참조할 ref

  const [nickname, setNickname] = useState("");
  const [hex, setHex] = useState("#FFC6C6");

  const [showErrorName, setShowErrorName] = useState(true); // 에러 메시지 표시 여부

  const [mission, setMission] = useState(missionData[0]); // 상태를 추가하여 랜덤 미션 저장

  const accessToken = localStorage.getItem("accessToken");

  const memberId = localStorage.getItem("memberId");
  useEffect(() => {
    createBoard(accessToken);
  }, []);

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    if (newNickname.length <= MAX_NICKNAME_LENGTH) {
      setNickname(newNickname);
    }
    if (newNickname.length > 0) {
      setShowErrorName(false); // 입력값이 있으면 에러 숨김
    } else {
      setShowErrorName(true);
    }
  };

  // URL 복사 함수
  const handleUrlCopy = () => {
    navigator.clipboard
      .writeText(`http://localhost:3000/stage/${memberId}`)
      .then(() => {
        alert("URL이 클립보드에 복사되었습니다.");
      })
      .catch((error) => {
        console.error("URL 복사 실패:", error);
      });
  };

  // 이미지 저장 함수
  const handleSaveImage = () => {
    if (innerBoxRef.current === null) {
      return;
    }

    toPng(innerBoxRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "invite.png"; // 다운로드할 파일 이름
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("이미지 저장에 실패했습니다.", err);
      });
  };

  // 랜덤 미션 선택 함수
  const handleRandomMission = () => {
    const randomMission =
      missionData[Math.floor(Math.random() * missionData.length)];
    setMission(randomMission); // 미션 상태 업데이트
  };

  return (
    <Container>
      <TopNavBack></TopNavBack>
      <FlexBox>
        <Border ref={innerBoxRef} colorSelect={hex}>
          <InnerBox>
            <CloseIcon
              src="/image/Close.png"
              alt="CloseBtn"
              onClick={() => {
                navigate(-1);
              }}
            />
            <LetterBox>
              <Title colorSelect={hex}>♡초대장♡</Title>
              <InputBox colorSelect={hex}>
                <div>TO.&nbsp;</div>
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="닉네임을 입력하세요"
                  required
                />
              </InputBox>
              <MessageBox>
                {showErrorName ? (
                  <ErrorBox>
                    <img src="/image/ErrorIcon.png" alt="ErrorIcon" />
                    <ErrorMessage>&nbsp;닉네임을 입력해주세요</ErrorMessage>
                  </ErrorBox>
                ) : (
                  <ErrorMessage></ErrorMessage>
                )}
                <CharacterCount>
                  {nickname.length}/{MAX_NICKNAME_LENGTH}
                </CharacterCount>
              </MessageBox>
              <MissonBox>{mission}</MissonBox>
            </LetterBox>
          </InnerBox>
        </Border>
        <ColorRandomBox>
          <Circle
            colors={["#FFC6C6", "#FFC8A5", "#FFEB90", "#D1E29D", "#355F52"]}
            style={{
              padding: 10,
              borderRadius: "1rem",
              background: "linear-gradient(90deg, #FFFFFF 0%, #E5E7EB 100%)",
              boxShadow: "-2px -2px 4px 0px #00000040 inset",
              alignItems: "center",
            }}
            color={hex}
            pointProps={{
              style: {
                width: "1rem",
                height: "1rem",
                margin: "0px 2.5px",
                borderRadius: "50%",
                justifyContent: "space-around",
              },
            }}
            onChange={(color) => {
              setHex(color.hex);
            }}
          ></Circle>
          <RandomBtnBox>
            <img
              src="/image/RandomBtn.png"
              alt="RandomBtn"
              onClick={handleRandomMission}
            />
          </RandomBtnBox>
        </ColorRandomBox>
        <BtnBox>
          <SaveLetterBtnBox onClick={handleSaveImage}>
            <img src="/image/InviteFormBtn1.png" alt="초대장 저장버튼" />
          </SaveLetterBtnBox>
          <UrlCopyBtnBox onClick={handleUrlCopy}>
            <img src="/image/InviteFormBtn2.png" alt="Url 복사버튼" />
          </UrlCopyBtnBox>
        </BtnBox>
      </FlexBox>
    </Container>
  );
};

export default InviteForm;

const Container = styled.div`
  background-image: url("/image/InviteBackgroundImg.png");
  background-size: cover; /* 배경 이미지 크기 자동 조정 */
  background-position: center; /* 배경 이미지 중앙 정렬 */
  background-repeat: no-repeat; /* 배경 이미지 반복하지 않음 */
  background-color: white;
  height: 100%;
`;

const FlexBox = styled.div`
  width: 100%;
  position: absolute;
  top: 70px;
  height: calc(100vh - 70px); /* TopNavBack을 제외한 높이 */
  max-height: calc(
    100vh - 70px
  ); /* 화면 높이에서 TopNavBack과 패딩을 뺀 최대 높이 */

  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;

const Border = styled.div`
  width: 60%;
  margin-top: 5vh;
  max-height: calc(
    100vh - 70px
  ); /* 화면 높이에서 TopNavBack과 패딩을 뺀 최대 높이 */
  box-sizing: border-box;
  height: auto; /* 내용에 맞게 자동으로 높이 조정 */
  padding: 1rem;

  box-shadow:
    -4px -4px 6px 0px #00000040 inset,
    0px 4px 4px 0px #00000040 inset;

  /* width와 height를 동일하게 맞추는 설정 */
  aspect-ratio: 1 / 1;

  background-color: ${(props) => props.colorSelect};
  border-radius: 1rem;

  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;

const InnerBox = styled.div`
  position: relative;
  background-color: white;
  padding: 2rem 2rem;
  border-radius: 1rem;
  height: 100%;
  box-sizing: border-box;

  box-shadow:
    -4px -4px 8px 0px #00000073 inset,
    0px 4px 4px 0px #00000040 inset;

  @media screen and (max-width: 600px) {
    padding: 1.5rem 1.2rem;
  }
`;

const MissonBox = styled.div`
  width: 100%;
  margin-top: 1rem;
  text-align: center;
`;

const CloseIcon = styled.img`
  position: absolute;
  width: 1.5rem;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const LetterBox = styled.div``;

const Title = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: ${(props) => props.colorSelect};
`;

const FromBox = styled.div`
  display: flex;
  align-items: center;
  text-align: start;

  img {
    width: 15%;
    object-fit: contain;
  }

  h2 {
    margin-left: 1rem;
  }
`;

const InputBox = styled.div`
  width: 100%;
  margin-top: 5%;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    padding: 0.5rem 0.8rem;
    border: 1px solid #a1a1aa;
    border-radius: 0.5rem;
    box-sizing: border-box;
    font-family: "UhBee_SeHyun_Regular";
  }

  input::placeholder {
    font-weight: bold;
    text-align: center;
  }
`;

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  span {
    font-size: 10px;
  }
`;

const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 1rem;
  }
`;

const ErrorMessage = styled.span`
  color: #d00b0e;
  flex-shrink: 0;
`;

const CharacterCount = styled.div`
  font-size: 0.9rem;
  color: gray;
`;

const ColorRandomBox = styled.div`
  width: 60%;
  margin-top: 2%;

  display: flex;
  text-align: end;
  justify-content: space-between;
  img {
    width: 30%;
  }

  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;

const RandomBtnBox = styled.div`
  img {
    cursor: pointer;
  }
`;

const BtnBox = styled.div`
  display: flex;
  width: 60%;
  margin-top: 5%;
  justify-content: space-between;
  align-items: center;

  img {
    width: 100%;
  }

  div {
    cursor: pointer;
    width: 45%;
  }

  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;

const SaveLetterBtnBox = styled.div``;

const UrlCopyBtnBox = styled.div``;
