import {PhotosType, ProfileType} from "../types/types";
import {BaseResponseType, instance} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userID: number) {
        return instance.get<ProfileType>(`profile/${userID}`).then(res => res.data)
    },
    getStatus(userID: number) {
        return instance.get<string>(`profile/status/${userID}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<BaseResponseType>(`profile/status`, {status})
    },
    //fix savePhoto
    savePhoto(photoFile: File) {
        const saveData = new FormData()
        saveData.append("avatar", photoFile)
        return instance.put<BaseResponseType<SavePhotoResponseDataType>>(`profile/photo`, saveData, {headers: {"Content-type": "multipart/form-data"}})
            .then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<BaseResponseType<ProfileType>>(`profile`, profile).then(res => res.data)
    }
}

