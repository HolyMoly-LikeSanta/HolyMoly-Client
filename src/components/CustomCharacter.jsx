import React from 'react'
import styled from 'styled-components'

export const CustomCharacter = ({ selectedItem, loadInitial }) => {

    if (!loadInitial) {
        return <div>로딩중입니다..^^</div>; 
      }
    
    return (
        <>
            <CharacterContainer>
                <Character src="/image/defaultCharacter.png" />
                {selectedItem.head?.imageUrl && <CustomItem type="head" zIndex={5} src={selectedItem.head.imageUrl} />}  
                <CustomItem type="face" zIndex={2} src={selectedItem.face?.imageUrl || "/image/defaultFace.png"} />
                {selectedItem.clothes?.imageUrl && <CustomItem type="clothes" zIndex={10} src={selectedItem.clothes.imageUrl} />}
                {selectedItem.accessory?.imageUrl && <CustomItem type="accessory" zIndex={15} src={selectedItem.accessory.imageUrl} />}
            </CharacterContainer>
        </>
      );
      
}

const CharacterContainer = styled.div`
    position: relative;
    width: 400px;
    height: 400px;
    overflow: hidden;
`

const Character = styled.img`
    position: absolute;
    border: none;
    width: 400px;
    height: 400px;
    z-index: 0;
`

const CustomItem = styled.img`
    position: absolute;
    width: 400px;
    height: 400px;
    z-index: ${({zIndex}) => zIndex || 0};
`
