import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavBack from "../../components/TopNavBack";
import styled from "styled-components";
import Modal from "../../components/Modal";
import { postBoardLetter } from "../../apis/api";

const MAX_NICKNAME_LENGTH = 10;
const MAX_LETTER_LENGTH = 500; // Adjust this to your desired max length

const Letterwrite = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [letter, setLetter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const [showErrorName, setShowErrorName] = useState(true); // 에러 메시지 표시 여부
  const [showErrorContent, setShowErrorContent] = useState(true); // 에러 메시지 표시 여부

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

  const handleLetterChange = (e) => {
    const newLetter = e.target.value;
    if (newLetter.length <= MAX_LETTER_LENGTH) {
      setLetter(newLetter);
    }
    if (newLetter.length > 0) {
      setShowErrorContent(false); // 입력값이 있으면 에러 숨김
    } else {
      setShowErrorContent(true);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveData = async () => {
    try {
      // API 호출
      const response = await postBoardLetter(nickname, letter);
      console.log(response);
      navigate(-1);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // 이미지 파일 경로를 변수로 선언
  const saveBtnImage =
    showErrorName || showErrorContent
      ? "/image/SaveBtnUnable.png"
      : "/image/SaveBtn.png"; // 에러가 있으면 SaveBtnUnable로 설정

  return (
    <Container>
      <TopNavBack></TopNavBack>
      <FlexBox>
        <Border>
          <InnerBox>
            <CloseIcon
              src="/image/Close.png"
              alt="CloseBtn"
              onClick={() => {
                navigate(-1);
              }}
            />
            <FromBox>
              {/* <img src="/image/FROM..png" alt="FromImg" /> */}
              <span>FROM.</span>
              <form>
                <InputBox>
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
                <LetterBox>
                  <textarea
                    value={letter}
                    onChange={handleLetterChange}
                    placeholder="편지를 써주세요"
                    required
                  />
                </LetterBox>
                <MessageBox>
                  {showErrorContent ? (
                    <ErrorBox>
                      <img src="/image/ErrorIcon.png" alt="ErrorIcon" />
                      <ErrorMessage>&nbsp;편지내용을 입력해주세요</ErrorMessage>
                    </ErrorBox>
                  ) : (
                    <ErrorMessage></ErrorMessage>
                  )}
                  <CharacterCount>
                    {letter.length}/{MAX_LETTER_LENGTH}
                  </CharacterCount>
                </MessageBox>
              </form>
              <SaveButton>
                <ClickBtn
                  onClick={
                    showErrorName || showErrorContent ? undefined : openModal
                  } // 에러가 있으면 클릭 비활성화
                >
                  <img src={saveBtnImage} alt="" />
                </ClickBtn>
              </SaveButton>
            </FromBox>
          </InnerBox>
        </Border>
      </FlexBox>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          saveData();
          closeModal();
        }}
      />
    </Container>
  );
};

export default Letterwrite;

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
  height: calc(100vh - 70px); /* TopNavBack을 제외한 높이 */
  max-height: calc(
    100vh - 70px
  ); /* 화면 높이에서 TopNavBack과 패딩을 뺀 최대 높이 */

  position: absolute;
  top: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Border = styled.div`
  width: 80%;
  max-height: calc(
    100vh - 70px
  ); /* 화면 높이에서 TopNavBack과 패딩을 뺀 최대 높이 */
  height: 80vh;
  box-sizing: border-box;
  padding: 1rem;
  box-shadow:
    -4px -4px 6px 0px #00000040 inset,
    0px 4px 4px 0px #00000040 inset;

  background-color: #eab5b5;
  border-radius: 1rem;

  @media screen and (max-width: 600px) {
    width: 80%;
    height: 70vh;
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
    padding: 2rem 1.5rem;
  }
`;

const CloseIcon = styled.img`
  cursor: pointer;
  position: absolute;
  width: 1.5rem;
  top: 1rem;
  right: 1rem;
`;

const FromBox = styled.div`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;

  span {
    font-size: 1.2rem;
  }

  form {
    height: 90%;
  }

  h2 {
    margin-left: 1rem;
  }

  input {
    font-family: "UhBee_SeHyun_Regular";
  }

  textarea {
    padding: 0.5rem;
    border: 2px solid #a1a1aa;
    border-radius: 0.5rem;
    box-sizing: border-box;
    font-family: "UhBee_SeHyun_Regular";
  }
`;

const InputBox = styled.div`
  width: 100%;
  margin-top: 1rem;
  input {
    width: 100%;
    padding: 0.5rem;
    border: 2px solid #a1a1aa;
    border-radius: 0.5rem;
    box-sizing: border-box;
  }
`;

const LetterBox = styled.div`
  margin-top: 1rem;
  height: 70%;
  textarea {
    width: 100%;
    height: 100%;
    padding: 0.75rem;
    resize: none;
    box-sizing: border-box;

    /* 스크롤바 스타일 */
    &::-webkit-scrollbar {
      width: 4px; /* 스크롤바 두께를 줄여 깔끔하게 */
    }
    &::-webkit-scrollbar-thumb {
      background-color: #eab5b5; /* 테두리와 조화를 이루는 색상 */
      border-radius: 4px;
      border: 1px solid #eab5b5; /* 스크롤바에 테두리 추가 */
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #b86b6b; /* 호버 시 강조 */
    }
    &::-webkit-scrollbar-track {
      background-color: #f5f5f5;
      border-radius: 4px;
    }
  }

  @media screen and (max-width: 600px) {
    height: 75%;
  }
`;

const CharacterCount = styled.div`
  font-size: 0.9rem;
  color: gray;
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

const SaveButton = styled.div`
  width: 100%;
  margin-top: 1rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    cursor: pointer;
    text-align: end;
    width: 100%;
  }
`;

const ClickBtn = styled.div`
  width: 30%;
`;
