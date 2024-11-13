import React from "react";
import styled from "styled-components";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p>
          "편지가 저장되면 수정할 수 없어!
          <br />
          그래도 저장할래?"
        </p>
        <ButtonGroup>
          <ModalButtonYes
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            네!
          </ModalButtonYes>
          <ModalButtonNo onClick={onClose}>아니요</ModalButtonNo>
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
