import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
    status: string
    updateStatus: (status:string)=>void
}
const ProfileStatusWithHooks = ({status, updateStatus}:PropsType) =>  {

    const [editMode, setEditMode] = useState(false)
    const [newStatus, setNewStatus] = useState(status)

    useEffect(() => {
        setNewStatus(status)
    },[status])
    const activateEditMode = () => {
        setEditMode(true)
    }
    const disableEditMode = () => {
        setEditMode(false)
        updateStatus(newStatus)
    }
    const statusOnChange = (e:ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }
        return (
            <div>
                {!editMode &&
                    <div>
                        <b>Status</b>:<span onDoubleClick={activateEditMode}>{status || "------"}</span>
                    </div>}
                {editMode && <div>
                    <input autoFocus onChange={statusOnChange} onBlur={disableEditMode} value={newStatus}/>
                </div>}
            </div>
        )

}


export default ProfileStatusWithHooks;