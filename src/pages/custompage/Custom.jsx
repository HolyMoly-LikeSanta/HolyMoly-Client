import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TopNavBack from '../../components/TopNavBack'
import Modal from '../../components/Modal';
import { CUSTOMITEMS, HEADCOLORS } from '../../constant/customData';
import { CustomCharacter } from '../../components/CustomCharacter';
import { useRecoilValue } from 'recoil';
import { isCharacterCreatedRecoil } from '../../recoil/userRecoil';
import { createCustomCharacter, updateCustomCharacter } from '../../apis/custom';
import { useNavigate } from 'react-router-dom';
import { useInitializeCustom } from '../../hook/customUtil';

export const Custom = () => {
    const navigate = useNavigate();
    const isCharacterCreated = useRecoilValue(isCharacterCreatedRecoil);
    const [selectedCategory, setSelectedCategory] = useState('bg');
    const [completeModal, setCompleteModal] = useState(false);
    const [selectedColor, setSelectedColor] = useState('black');
    const [selectedItem, setSelectedItem] = useState({});
    const initializedCustom = useInitializeCustom(); 
    const [loadInitial, setLoadInitial] = useState(false);

    useEffect(()=>{
        if(!loadInitial){
            setSelectedItem(initializedCustom);
            setLoadInitial(true);
        }
        // 브라우저에 새로고침 방지 알림 표시
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = ""; 
          };
          window.addEventListener("beforeunload", handleBeforeUnload);
          return () => {window.removeEventListener("beforeunload", handleBeforeUnload);}
    },[])

    const handleCustomSelect = (id, imageUrl) => {
        setSelectedItem(prevState=>({
            ...prevState,
            [selectedCategory]: {
                id: id,
                imageUrl: imageUrl
            }}));
        console.log(selectedItem);
    }

    const handleRemoveItem = () => {
        setSelectedItem(prevState=>({
            ...prevState,
            [selectedCategory]:{
                id: 0,
                imageUrl: null,
            }
        }))
    }

    const handleSave = () => {
        const selectedItemIds = {
            bgId: selectedItem.bg.id,
            headId: selectedItem.head.id,
            faceId: selectedItem.face.id,
            clothesId: selectedItem.clothes.id,
            accessoryId: selectedItem.accessory.id,
        }
        if(!isCharacterCreated){
            console.log('생성: ',selectedItemIds);
            createCustomCharacter(selectedItemIds);
        }
        else if(isCharacterCreated){
            console.log('수정: ', selectedItemIds);
            updateCustomCharacter(selectedItemIds);
        }
        navigate('/invite');
    }

    if (Object.keys(selectedItem).length === 0) {
        return <div>로딩중입니다..^^</div>; 
      }

  return (
    <>
        {completeModal && 
        <Modal 
        isOpen={completeModal}
        onClose={()=>setCompleteModal(false)} 
        text={"“파티 준비를 다 하셨나요?”"} 
        onConfirm={()=>handleSave()}/>}
        <Container>
        <TopNavBack />
            <MainContainer>
                <CharacterBackground src={selectedItem?.bg.imageUrl}>
                    <CustomCharacter selectedItem={selectedItem} loadInitial={loadInitial}/>
                </CharacterBackground>
                <MiddleContainer>
                    {selectedCategory === 'head' && <ColorPalette>
                        {HEADCOLORS.map((color)=>(
                            <ColorCircle key={color.id} 
                            name={color.colorName}
                            color={color.hex}
                            onClick={()=>setSelectedColor(color.colorName)}
                            />
                        ))}
                    </ColorPalette>}
                    <CompleteButton onClick={()=>setCompleteModal(true)}>완료</CompleteButton>
                </MiddleContainer>    
            </MainContainer>
            <CustomElementContainer>
                <SelectionContainer>
                    <Selection>
                        <Category selected={selectedCategory === 'bg'} onClick={()=>{setSelectedCategory('bg')}}>배경</Category>
                        <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                        <Category selected={selectedCategory === 'head'} onClick={()=>{setSelectedCategory('head')}}>머리</Category>
                        <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                        <Category selected={selectedCategory === 'face'} onClick={()=>{setSelectedCategory('face')}}>얼굴</Category>
                        <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                        <Category selected={selectedCategory === 'clothes'} onClick={()=>{setSelectedCategory('clothes')}}>옷</Category>
                        <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                        <Category selected={selectedCategory === 'accessory'} onClick={()=>{setSelectedCategory('accessory')}}>악세사리</Category>
                    </Selection>
                </SelectionContainer>
                <CustomElements>
                    <CustomElement 
                    onClick={()=>handleRemoveItem()}
                    id='remove'
                    src='/image/defaultCustom.png'
                    type={selectedCategory}/>
                    {selectedCategory === 'head' &&
                        CUSTOMITEMS.head.filter((item)=> item.color === selectedColor)
                        .map((item)=>
                            <CustomElement 
                            key={item.headId} 
                            src={item.imageUrl}
                            onClick={()=>handleCustomSelect(item.headId, item.imageUrl)}/>)}
                    {selectedCategory !== 'head' &&
                        CUSTOMITEMS[selectedCategory].map((item) => 
                        <CustomElement
                            type={selectedCategory === 'bg' ? 'bg' : ''}
                            key={item[`${selectedCategory}Id`]}
                            src={item.imageUrl} 
                            onClick={() =>handleCustomSelect(item[`${selectedCategory}Id`], item.imageUrl)}/>)}
                </CustomElements>
            </CustomElementContainer>
        </Container>
    </>
  )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
    position: relative;
    height: 90vh;
    overflow-x: hidden;
`
const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1vh;

`
const CharacterBackground = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 45vh;
    backdrop-filter: blur(10px);
    box-shadow: -2px 2px 4px 0px #FFFFFF inset,
                -4px -4px 6px 0px #D1D5DB inset,
                -0.4px -0.4px 2px 0px #00000066 inset;
    border-radius: 16px;
    border: solid 1.5px #46464622 ;
    background-image: ${({ src })=> (src ? `url(${src})` : 'none')};
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat;
    position: relative;

     //중앙정렬
    & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    }
`

const MiddleContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 87%;
    justify-content: space-between;
    height: 37px;
`
const ColorPalette = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  width: 160px;
  background: linear-gradient(90deg, #FFFFFF 0%, #E5E7EB 100%);
  box-shadow: -2px -2px 4px 0px #00000040 inset;
  border-radius: 10px;
  z-index: 99;
`;

const ColorCircle = styled.button`
    border-radius: 16px;
    width: 20px;
    height: 20px;
    border: none;
    cursor: pointer;
    background: ${({color})=> color || 'transparent'};
`

const CompleteButton = styled.div`
    font-size: 14px;
    height: 35px;
    display: flex;
    width: 100px;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    border-radius: 13px;
    color: #DC2626;
    background: linear-gradient(138.66deg, rgba(255, 255, 255, 0.85) 23.4%, rgba(220, 38, 38, 0.85) 133.9%);
    backdrop-filter: blur(10px);
    box-shadow: -2px 2px 4px 0px #FFFFFF inset,
                -4px -4px 6px 0px #FECDD3 inset,
                -0.4px -0.4px 2px 0px #FDA4AF inset;
    cursor: pointer;
    border: solid 1px #fbd6da97;
    margin-left: auto; 
    z-index: 999;
`
const CustomElementContainer = styled.div`
    width: 80%;
    border-top: 1.5px solid #D4D4D4;
    border-right: 1.5px solid #D4D4D4;
    border-bottom: 0px; /* 아래쪽 테두리 없음 */
    border-left: 1.5px solid #D4D4D4;
    height: 37vh;
    justify-self: flex-end;
    position: absolute;
    bottom: 0;
    border-radius: 16px 16px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 3%;
    padding-left: 3%;
`
const SelectionContainer = styled.div`
    width: 100%;
    height: 6vh;
    display: flex;
    justify-content: center;
`

const Selection = styled.div`
    background-color: #EEEEEF;
    border-radius: 10px;
    width: 100%;
    height: 5vh;
    margin-top: 2%;
    display: flex;
    justify-content: center;
    align-items: center;    
    display: grid;
    grid-template-columns: 1fr 0.001fr 1fr 0.001fr 1fr 0.001fr 1fr 0.001fr 1fr;
    padding: 1px;
`
const SelectionDivider = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5px;
`

const Category = styled.div`
    font-size: 13px;
    font-weight: 400;
    white-space: nowrap;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color : ${({selected})=> selected ? "#FFFFFF" : "transparent"};
    box-shadow: ${({selected})=> selected ? "0px 3px 1px 0px #0000000A, 0px 3px 8px 0px #0000001F" : "none"};
    border-radius: ${({selected})=> selected ? "8px" : "0"};
    width: 85%;
    justify-self: center;
    padding-top: 8%;
    padding-bottom: 8%;
`
const CustomElements = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 5%;
    column-gap: 3%;
    width: 100%;
    overflow-y: auto; 
    max-height: 37vh;
    min-height: 67%;
    overflow-y: auto; 
    padding-top: 3%;
    padding-bottom: 3%;
`

const CustomElement = styled.img`
    background-color: #EEEEEF;
    border-radius: 16px;
    width: 100%; 
    cursor: pointer;
    object-fit: cover;
    height: ${({type})=> type === 'bg' ? '15vh' : ''};
`