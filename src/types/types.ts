export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

//ПОПРОБОВАТЬ с userID ПОЗЖЕ
export type ProfileType = {
    userId: number
    lookingForAJob: string
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}


export type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: string
    followed: boolean
}

