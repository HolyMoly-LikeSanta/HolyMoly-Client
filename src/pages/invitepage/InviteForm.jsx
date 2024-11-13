import React, { useRef, useState } from "react";
import TopNavBack from "../../components/TopNavBack";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Circle from "@uiw/react-color-circle";
import { toPng } from "html-to-image";

const MAX_NICKNAME_LENGTH = 10;

const InviteForm = () => {
  const navigate = useNavigate();
  const innerBoxRef = useRef(null); // 이미지화할 영역을 참조할 ref

  const [nickname, setNickname] = useState("");
  const [hex, setHex] = useState("white");

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    if (newNickname.length <= MAX_NICKNAME_LENGTH) {
      setNickname(newNickname);
    }
  };

  // URL 복사 함수
  const handleUrlCopy = () => {
    navigator.clipboard
      .writeText("예시 url")
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

  return (
    <Container>
      <TopNavBack></TopNavBack>
      <FlexBox>
        <Border>
          <InnerBox ref={innerBoxRef} colorSelect={hex}>
            <CloseIcon
              src="/image/Close.png"
              alt="CloseBtn"
              onClick={() => {
                navigate(-1);
              }}
            />
            <LetterBox>
              <FromBox>
                <img src="/image/To..png" alt="FromImg" />
              </FromBox>
              <InputBox>
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="닉네임을 입력하세요"
                  required
                />
              </InputBox>
              <MissonBox>미션</MissonBox>
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
          >
            colorpatte
          </Circle>
          <RandomBtnBox>
            <img src="/image/RandomBtn.png" alt="RandomBtn" />
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
  // height: 80vh;
  box-sizing: border-box;
  padding: 1rem;

  box-shadow:
    -4px -4px 6px 0px #00000040 inset,
    0px 4px 4px 0px #00000040 inset;

  /* width와 height를 동일하게 맞추는 설정 */
  aspect-ratio: 1 / 1;

  background-color: #14532d;
  border-radius: 1rem;

  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;

const InnerBox = styled.div`
  position: relative;
  background-color: ${(props) => props.colorSelect};
  padding: 2rem 2rem;
  border-radius: 1rem;
  height: 100%;
  box-sizing: border-box;

  box-shadow:
    -4px -4px 8px 0px #00000073 inset,
    0px 4px 4px 0px #00000040 inset;
`;

const MissonBox = styled.div`
  width: 100%;
  margin-top: 20%;
  text-align: center;
`;

const CloseIcon = styled.img`
  position: absolute;
  width: 1.5rem;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const LetterBox = styled.div`
dis`;

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

  input {
    width: 100%;
    padding: 0.7rem;
    border: 1px solid #a1a1aa;
    border-radius: 0.5rem;
    box-sizing: border-box;
  }

  input::placeholder {
    font-weight: bold;
    text-align: center;
  }
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
  cursor: pointer;
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
