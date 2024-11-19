import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Circle from "@uiw/react-color-circle";
import { toPng } from "html-to-image";
import { createBoard } from "../../apis/api";
import { Nav } from "../../components/Nav";
import { MISSIONDATA } from "../../constant/letterData";

const MAX_NICKNAME_LENGTH = 10;

const InviteForm = () => {
  const navigate = useNavigate();
  const innerBoxRef = useRef(null); // 이미지화할 영역을 참조할 ref

  const [nickname, setNickname] = useState("");
  const [hex, setHex] = useState("#FFC6C6");

  const [showErrorName, setShowErrorName] = useState(true); // 에러 메시지 표시 여부

  const [mission, setMission] = useState(MISSIONDATA[0]); // 상태를 추가하여 랜덤 미션 저장

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

  // 이미지 저장 함수
  const handleSaveImage = () => {
    if (innerBoxRef.current === null) {
      return;
    }

    const element = innerBoxRef.current;
    const style = getComputedStyle(element);
    const width =
      element.offsetWidth +
      parseFloat(style.marginLeft) +
      parseFloat(style.marginRight);
    const height =
      element.offsetHeight +
      parseFloat(style.marginTop) +
      parseFloat(style.marginBottom);

    toPng(element, { width, height })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "invite.png";
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
      MISSIONDATA[Math.floor(Math.random() * MISSIONDATA.length)];
    setMission(randomMission); // 미션 상태 업데이트
  };

  return (
    <Container>
      <Nav isBack={true} isNoUser={false}/>
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
  top: 100px;
  // height: calc(100vh - 70px); /* TopNavBack을 제외한 높이 */
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
  box-sizing: border-box;
  padding: 1rem;

  box-shadow:
    -4px -4px 6px 0px #00000040 inset,
    0px 4px 4px 0px #00000040 inset;

  /* width와 height를 동일하게 맞추는 설정 */
  aspect-ratio: 1 / 1;

  /* overflow 속성을 visible로 설정하여 잘리지 않게 */
  overflow: visible;

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
  color: #343434;
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

  div {
    color: #27272a;
  }

  input {
    width: 100%;
    padding: 0.5rem 0.8rem;
    border: 1px solid #a1a1aa;
    border-radius: 0.5rem;
    box-sizing: border-box;
    font-family: "UhBee_SeHyun_Regular";
    color: #343434;
  }

  input::placeholder {
    color: #737373;
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
  color: #27272a;
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
