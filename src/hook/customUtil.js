import { useRecoilState, useRecoilValue } from "recoil";
import { isCharacterCreatedRecoil, userCharacterRecoil } from "../recoil/userRecoil";
import { CUSTOMITEMS } from "../constant/customData";
import { checkPartyReadyAndgetCharacter } from "../apis/custom";
import { useEffect } from "react";

const idToImageUrl = (category, id) => {
    const item =  CUSTOMITEMS[category]?.find((element)=> element[`${category}Id`] === id);
    return item ? item.imageUrl : null;
}

export const useInitializeCustom = () => {
    const initialCustomItems = useRecoilValue(userCharacterRecoil);

    const initializedCustom = {
        bg: { id: initialCustomItems.bgId, imageUrl: idToImageUrl("bg", initialCustomItems.bgId) },
        head: { id: initialCustomItems.headId, imageUrl: idToImageUrl("head", initialCustomItems.headId) },
        face: { id: initialCustomItems.faceId, imageUrl: idToImageUrl("face", initialCustomItems.faceId) },
        clothes: { id: initialCustomItems.clothesId, imageUrl: idToImageUrl("clothes", initialCustomItems.clothesId) },
        accessory: { id: initialCustomItems.accessoryId, imageUrl: idToImageUrl("accessory", initialCustomItems.accessoryId) },
    }
    return initializedCustom;
}

export const useCheckAndGetPartyReady = () => {
    const [userCharacter, setUserCharacter] = useRecoilState(userCharacterRecoil);
    const [isCharacterCreated, setIsCharacterCreated] = useRecoilState(isCharacterCreatedRecoil);

    const fetchAndSetPartyReady = async () => {
        try{
            const result = await checkPartyReadyAndgetCharacter();
            setUserCharacter(result);
            setIsCharacterCreated(true);
        }catch(e){
            setIsCharacterCreated(false);
        }
    };

    useEffect(() => {
        fetchAndSetPartyReady();
    }, []);
}