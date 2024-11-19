import React from "react";
import styled from "styled-components";

export const StageCharacter = ({ selectedItem, loadInitial }) => {
  if (!loadInitial) {
    return <div>로딩중입니다..^^</div>;
  }

  return (
    <>
      <CharacterContainer>
        <Character src="/image/defaultCharacter.png" />
        {selectedItem.head?.imageUrl && (
          <CustomItem type="head" zIndex={5} src={selectedItem.head.imageUrl} />
        )}
        <CustomItem
          type="face"
          zIndex={2}
          src={selectedItem.face?.imageUrl || "/image/defaultFace.png"}
        />
        {selectedItem.clothes?.imageUrl && (
          <CustomItem
            type="clothes"
            zIndex={10}
            src={selectedItem.clothes.imageUrl}
          />
        )}
        {selectedItem.accessory?.imageUrl && (
          <CustomItem
            type="accessory"
            zIndex={15}
            src={selectedItem.accessory.imageUrl}
          />
        )}
      </CharacterContainer>
    </>
  );
};

const CharacterContainer = styled.div`
  position: absolute;
  width: 80%;
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Character = styled.img`
  position: absolute;
  border: none;
  width: 100%;
  z-index: 0;
`;

const CustomItem = styled.img`
  position: relative;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex || 0};
`;
