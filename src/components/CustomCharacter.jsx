import React, { useEffect } from 'react'
import styled from 'styled-components'

export const CustomCharacter = ({selectedItem}) => {
    useEffect(()=>{
        //커스텀 데이터 불러오기
    },[])

  return (
    <>
        <Character src='/image/defaultCharacter.png'/>
        {selectedItem.head.imageUrl  && <CustomItem id='head' src={selectedItem.head.imageUrl || null} />}
        <CustomItem id='face' src={selectedItem.face.imageUrl || '/image/defaultFace.png'} />
        {selectedItem.clothes.imageUrl && <CustomItem id='clothes' src={selectedItem.clothes.imageUrl || null} />}
        {selectedItem.accessory.imageUrl && <CustomItem id='accessory' src={selectedItem.accessory.imageUrl || null} />}
    </>
  )
}

const Character = styled.img`
    border: none;
    width: 500px;
    height: 500px;
`

const CustomItem = styled.img`
    position: absolute;
    width: 500px;
    height: 500px;
`
