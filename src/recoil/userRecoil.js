import { atom } from "recoil";

export const isCharacterCreatedRecoil = atom({
    key: 'isCharacterCreated',
    default: false
})

export const userCharacterRecoil = atom({
    key: 'userCharacter',
    default: {
        bgId: 0,
        headId: 0,
        faceId: 0,
        clothesId: 0,
        accessoryId: 0
    }
})