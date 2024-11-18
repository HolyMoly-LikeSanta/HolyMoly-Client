import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { userCharacterRecoil } from '../recoil/userRecoil'
import { useInitializeCustom } from '../hook/customUtil'

export const CustomCharacter = ({selectedItem, setSelectedItem}) => {
    const initialCustomItems = useRecoilValue(userCharacterRecoil);
    const [loadInitial, setLoadInitial] = useState(false);
    const initializedCustom = useInitializeCustom();

    // 초기 Recoil 상태를 반영하여 selectedItem 설정
    useEffect(() => {
        if(!loadInitial && initializedCustom){
            setSelectedItem(initializedCustom);
            setLoadInitial(true);
        }
  }, [initialCustomItems, selectedItem]);
    
    useEffect(() => {
        console.log("initialCustomItems:", initialCustomItems);
        console.log("selected", selectedItem);
    }, [initializedCustom, selectedItem]);

    if (!loadInitial) {
        return <div>로딩중입니다..^^</div>; 
      }
    
    return (
        <>
            <Character src="/image/defaultCharacter.png" />
            {selectedItem.head?.imageUrl && <CustomItem type="head" zIndex={5} src={selectedItem.head.imageUrl} />}  
            <CustomItem type="face" zIndex={2} src={selectedItem.face?.imageUrl || "/image/defaultFace.png"} />
            {selectedItem.clothes?.imageUrl && <CustomItem type="clothes" zIndex={10} src={selectedItem.clothes.imageUrl} />}
            {selectedItem.accessory?.imageUrl && <CustomItem type="accessory" zIndex={15} src={selectedItem.accessory.imageUrl} />}
        </>
      );
      
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
