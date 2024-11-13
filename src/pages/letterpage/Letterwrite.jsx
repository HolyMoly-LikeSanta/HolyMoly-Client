import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavBack from "../../components/TopNavBack";
import styled from "styled-components";
import Modal from "../../components/Modal";

const MAX_NICKNAME_LENGTH = 10;
const MAX_LETTER_LENGTH = 500; // Adjust this to your desired max length

const Letterwrite = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [letter, setLetter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    if (newNickname.length <= MAX_NICKNAME_LENGTH) {
      setNickname(newNickname);
    }
  };

  const handleLetterChange = (e) => {
    const newLetter = e.target.value;
    if (newLetter.length <= MAX_LETTER_LENGTH) {
      setLetter(newLetter);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveData = () => {
    // 데이터 저장하는 것
  };

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
              <img src="/image/FROM..png" alt="FromImg" />
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
                <CharacterCount>
                  {nickname.length}/{MAX_NICKNAME_LENGTH}
                </CharacterCount>
                <LetterBox>
                  <textarea
                    value={letter}
                    onChange={handleLetterChange}
                    placeholder="편지를 써주세요"
                    required
                  />
                  <CharacterCount>
                    {letter.length}/{MAX_LETTER_LENGTH}
                  </CharacterCount>
                </LetterBox>
                <SaveButton type="button" onClick={openModal}>
                  발송
                </SaveButton>
              </form>
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

  background-color: #14532d;
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
`;

const CloseIcon = styled.img`
  cursor: pointer;
  position: absolute;
  width: 1.5rem;
  top: 1rem;
  right: 1rem;
`;

const FromBox = styled.div`
  height: 100%;
  box-sizing: border-box;
  img {
    width: 25%;
    object-fit: contain;
    margin-bottom: 0.5rem;
  }

  form {
    height: 90%;
  }

  h2 {
    margin-left: 1rem;
  }

  textarea {
    padding: 0.5rem;
    border: 2px solid #a1a1aa;
    border-radius: 0.5rem;
    box-sizing: border-box;
  }
`;

const InputBox = styled.div`
  width: 100%;
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
    padding: 0.5rem;
    resize: none;
    box-sizing: border-box;
  }

  @media screen and (max-width: 600px) {
    height: 75%;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 0.9rem;
  color: gray;
`;

const SaveButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #14532d;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(255 255 255 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(23.22deg, #f1f5f9 -30.82%, #f8fafc 84.08%);
  padding: 2rem;
  margin: 0 2rem;
  border-radius: 1rem;
  max-width: 400px;
  text-align: center;
  position: relative;
  width: 35%;
  box-shadow: 0px 8px 10px 0px #71717a66;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
`;

const ModalButtonYes = styled.div`
  padding: 0.5rem 1rem;
  background: linear-gradient(
    138.66deg,
    rgba(255, 255, 255, 0.85) 23.4%,
    rgba(220, 38, 38, 0.85) 133.9%
  );

  backdrop-filter: blur(10px);

  box-shadow:
    -2px 2px 4px 0px #ffffff inset,
    -4px -4px 6px 0px #fecdd3 inset,
    -0.4px -0.4px 2px 0px #fda4af inset;

  color: #dc2626;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 30%;
`;

const ModalButtonNo = styled.div`
  padding: 0.5rem 1rem;
  background: linear-gradient(
    164.98deg,
    rgba(255, 255, 255, 0.85) -10.59%,
    rgba(20, 83, 45, 0.85) 342.91%
  );

  backdrop-filter: blur(10px);

  box-shadow:
    -2px 2px 4px 0px #ffffff inset,
    -2px -4px 8px 0px #f0fdf4 inset,
    -0.4px -0.4px 2px 0px #a7f3d0 inset;

  color: #14532d;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 30%;
`;
