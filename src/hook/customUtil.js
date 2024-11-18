import { useRecoilValue } from "recoil";
import { userCharacterRecoil } from "../recoil/userRecoil";
import { CUSTOMITEMS } from "../constant/customData";

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