import React, { useEffect } from 'react'
import styled from 'styled-components'

export const CustomCharacter = ({selectedItem}) => {
    useEffect(()=>{
        //커스텀 데이터 불러오기
    },[])

  return (
    <>
        <Character src='/image/defaultCharacter.png'/>
        {selectedItem.head.imageUrl  && <CustomItem type='head' zIndex={5} src={selectedItem.head.imageUrl || null} />}
        <CustomItem type='face' zIndex={2} src={selectedItem.face.imageUrl || '/image/defaultFace.png'} />
        {selectedItem.clothes.imageUrl && <CustomItem type='clothes' zIndex={10} src={selectedItem.clothes.imageUrl || null} />}
        {selectedItem.accessory.imageUrl && <CustomItem type='accessory' zIndex={15} src={selectedItem.accessory.imageUrl || null} />}
    </>
  )
}

const Character = styled.img`
    border: none;
    width: 500px;
    height: 500px;
    z-index: 0;
`

const CustomItem = styled.img`
    position: absolute;
    width: 500px;
    height: 500px;
    z-index: ${({zIndex}) => zIndex || 0};
`
