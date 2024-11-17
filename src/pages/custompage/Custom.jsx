import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TopNavBack from '../../components/TopNavBack'
import Modal from '../../components/Modal';
import { fetchCustomItems } from '../../apis/custom';

export const Custom = () => {
    const mockItems = {
        accessoryItems : [{
            accessoryId : 1,
            imageUrl: '/image/tempCustom/acc1.png'
        },{
            accessoryId : 2,
            imageUrl: '/image/tempCustom/acc2.png'
        }],
        clothesItems:[{
            clothesId : 1,
            imageUrl : '/image/tempCustom/clothes1.png'
        },{
            clothesId : 2,
            imageUrl : '/image/tempCustom/clothes2.png'
        }],
        headItems:[{
            headId : 1,
            imageUrl : '/image/tempCustom/hair1.png'
        },{
            headId : 2,
            imageUrl : '/image/tempCustom/hair2.png'
        }],
        faceItems:[{
            faceId : 1,
            imageUrl : '/image/tempCustom/face1.png'
        },{
            faceId : 2,
            imageUrl : '/image/tempCustom/face2.png'
        }]
    }
    const [selectedCategory, setSelectedCategory] = useState('bg');
    const [completeModal, setCompleteModal] = useState(false);
    const [customItems, setCustomItems] = useState({});
    const [selectedItem, setSelectedItem] = useState({
        head: {headId: 0, imageUrl: null},
        face: {faceId: 0, imageUrl: null},
        clothes: {clothesId: 0, imageUrl: null},
        accessory: {accessoryId: 0, imageUrl: null}
    });

    const handleCustomSelect = (id, imageUrl) => {
        setSelectedItem(prevState=>({
            ...prevState,
            [selectedCategory]: {
                id: id,
                imageUrl: imageUrl
            }}));
        console.log(selectedItem);
    }

    const handleDeleteItem = () => {
        setSelectedItem(prevState=>({
            ...prevState,
            [selectedCategory]:{
                id: 0,
                imageUrl: null,
            }
        }))
    }

    const handleCategorySelect = (selected) => {
        setSelectedCategory(selected);
    }

    const handleComplete = () => {
        setCompleteModal(true);
    }

    const handleSave = () => {

    }

    useEffect(()=>{
        const getCustomItems = async() => {
            const result = await fetchCustomItems();
            setCustomItems(result);
            console.log(result);
        }  
        getCustomItems();
    },[]);

  return (
    <>
        {completeModal && 
        <Modal 
        isOpen={completeModal}
        onClose={()=>setCompleteModal(false)} 
        text={"“파티 준비를 다 하셨나요?”"} 
        onConfirm={()=>handleSave()}/>}
        <TopNavBack />
        <Container>
            <MainContainer>
                <CharacterBackground>
                    <Character src='/image/defaultCharacter.png'/>
                    {selectedItem.head.imageUrl  && <CustomItem id='head' src={selectedItem.head.imageUrl || null} />}
                    <CustomItem id='face' src={selectedItem.face.imageUrl || '/image/defaultFace.png'} />
                    {selectedItem.clothes.imageUrl && <CustomItem id='clothes' src={selectedItem.clothes.imageUrl || null} />}
                    {selectedItem.accessory.imageUrl && <CustomItem id='accessory' src={selectedItem.accessory.imageUrl || null} />}
                </CharacterBackground>
                <CompleteButton onClick={handleComplete}>완료</CompleteButton>
            </MainContainer>
            <CustomElementContainer>
                <SelectionContainer>
                    <Selection>
                        <Category selected={selectedCategory === 'bg'} onClick={()=>{handleCategorySelect('bg')}}>배경</Category>
                        <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                        <Category selected={selectedCategory === 'head'} onClick={()=>{handleCategorySelect('head')}}>머리</Category>
                        <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                        <Category selected={selectedCategory === 'face'} onClick={()=>{handleCategorySelect('face')}}>얼굴</Category>
                        <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                        <Category selected={selectedCategory === 'clothes'} onClick={()=>{handleCategorySelect('clothes')}}>옷</Category>
                        <SelectionDivider src="/image/Separator.png"></SelectionDivider>
                        <Category selected={selectedCategory === 'accessory'} onClick={()=>{handleCategorySelect('accessory')}}>악세사리</Category>
                    </Selection>
                </SelectionContainer>
                <CustomElements>
                    <CustomElement 
                    onClick={()=>handleDeleteItem()}
                    id='none' 
                    src='/image/defaultCustom.png'/>
                    {selectedCategory === 'head' &&
                        mockItems.headItems.map((item)=>
                            <CustomElement 
                            id={item.id} 
                            src={item.imageUrl}
                            onClick={()=>handleCustomSelect(item.headId, item.imageUrl)}/>)}
                    {selectedCategory === 'face' &&
                        mockItems.faceItems.map((item)=>
                            <CustomElement 
                            id={item.id} 
                            src={item.imageUrl}
                            onClick={()=>handleCustomSelect(item.faceId, item.imageUrl)}/>)}
                    {selectedCategory === 'clothes' &&
                        mockItems.clothesItems.map((item)=>
                            <CustomElement 
                            id={item.id} 
                            src={item.imageUrl}
                            onClick={()=>handleCustomSelect(item.clothesId, item.imageUrl)}/>)}
                    {selectedCategory === 'accessory' &&
                        mockItems.accessoryItems.map((item)=>
                            <CustomElement 
                            id={item.id} 
                            src={item.imageUrl}
                            onClick={()=>handleCustomSelect(item.accessoryId, item.imageUrl)}/>)}
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 47vh;
    backdrop-filter: blur(10px);
    box-shadow: -2px 2px 4px 0px #FFFFFF inset,
                -4px -4px 6px 0px #D1D5DB inset,
                -0.4px -0.4px 2px 0px #00000066 inset;
    border-radius: 16px;
    border: solid 1.5px #46464622 ;
`

const CompleteButton = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    margin-right: 5%;
    width: 20%;
    height: 4.5vh;
    border-radius: 13px;
    color: #DC2626;
    background: linear-gradient(138.66deg, rgba(255, 255, 255, 0.85) 23.4%, rgba(220, 38, 38, 0.85) 133.9%);
    backdrop-filter: blur(10px);
    box-shadow: -2px 2px 4px 0px #FFFFFF inset,
                -4px -4px 6px 0px #FECDD3 inset,
                -0.4px -0.4px 2px 0px #FDA4AF inset;
    cursor: pointer;
    border: solid 1px #FDA4AF;
`
const CustomElementContainer = styled.div`
    width: 80%;
    border-top: 1.5px solid #D4D4D4;
    border-right: 1.5px solid #D4D4D4;
    border-bottom: 0px; /* 아래쪽 테두리 없음 */
    border-left: 1.5px solid #D4D4D4;
    height: 34vh;
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
    height: 7vh;
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
    align-self: center;
    justify-self: center;
    padding-top: 8%;
    padding-bottom: 8%;
`
const CustomElements = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 5%;
    column-gap: 2%;
    width: 100%;
    overflow-y: auto;
   
`;

const CustomBackgroundElement = styled.div`
    background-color: #EEEEEF;
    border-radius: 16px;
    width: 100%; 
    height: 20vh; 
`
const CustomElement = styled.img`
    background-color: #EEEEEF;
    border-radius: 16px;
    width: 100%; 
    cursor: pointer;
    visibility: ${({ src }) => (src == null ? 'hidden': 'visible')};
    display: ${({ src }) => (src === null ? 'none': 'block')};;
`

const Character = styled.img`
    border: none;
    width: 500px;
    height: 500px;
`

const CustomItem = styled.img`
    position: absolute;
    width: 500px;
    height: 500px;
    cursor: pointer;

    .head{

    }
    .face{

    }
    .clothes{

    }
    .accessory{

    }
`
