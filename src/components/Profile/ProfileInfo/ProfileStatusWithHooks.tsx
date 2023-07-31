import React, {ChangeEvent, useState} from 'react';

const ProfileStatusWithHooks = (props:any) =>  {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const disableEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const statusOnChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
        return (
            <div>
                {!editMode &&
                    <div>
                        <span onDoubleClick={activateEditMode}>{props.status || "------"}</span>
                    </div>}
                {editMode && <div>
                    <input autoFocus onChange={statusOnChange} onBlur={disableEditMode} value={status}/>
                </div>}
            </div>
        )

}

export default ProfileStatusWithHooks;