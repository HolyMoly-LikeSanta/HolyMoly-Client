import React from "react";
import styled from "styled-components";

const Modal = ({ isOpen, onClose, onConfirm, text }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {text
          ||
          <p>
          "편지가 저장되면 수정할 수 없어!
          <br />
          그래도 저장할래?"
        </p>
        }
        <ButtonGroup>
          <ModalButtonYes
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {" "}
            <img src="/image/YesBtn.png" />
          </ModalButtonYes>
          <ModalButtonNo onClick={onClose}>
            <img src="/image/NoBtn.png" />
          </ModalButtonNo>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(255 255 255 / 90%);
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
  width: 40%;
  img {
    width: 100%;
  }
`;

const ModalButtonNo = styled.div`
  width: 40%;
  img {
    width: 100%;
  }
`;
