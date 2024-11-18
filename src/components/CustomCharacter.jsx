import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { userCharacterRecoil } from '../recoil/userRecoil'
import { CUSTOMITEMS } from '../constant/customData'

export const CustomCharacter = ({selectedItem, setSelectedItem}) => {
    const initialCustomItems = useRecoilValue(userCharacterRecoil);
    const idToImageUrl = (category, id) => {
        return CUSTOMITEMS[category].filter((item)=> item.id === id).imageUrl || null;
    }

    useEffect(()=>{
        setSelectedItem({
            bg: {id: initialCustomItems.bgId, imageUrl: idToImageUrl('bg', initialCustomItems.bgId)},
            head: {id: initialCustomItems.headId, imageUrl: idToImageUrl('head', initialCustomItems.headId)},
            face: {id: initialCustomItems.faceId, imageUrl: idToImageUrl('face', initialCustomItems.faceId)},
            clothes: {id: initialCustomItems.clothesId, imageUrl: idToImageUrl('clothes', initialCustomItems.clothesId)},
            accessory: {id: initialCustomItems.accessoryId, imageUrl: idToImageUrl('accessory', initialCustomItems.accessoryId)}
        })
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
