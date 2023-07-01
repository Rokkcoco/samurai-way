import React, {ChangeEvent} from 'react';

class ProfileStatus extends React.Component<any> {

    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = ()=> {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode() {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    //делаем стрелочным, чтобы не потерять this
    statusOnChange = (e:ChangeEvent<HTMLInputElement>)=> {
        this.setState({status: e.currentTarget.value})
    }

    //setState асинхронен
    //force update
    //почему потеряется контекст при декларейшен?
    //можно создать через стрелочную функцию и без байнда
    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "------"}</span>
                    </div>}
                {this.state.editMode && <div>
                    <input autoFocus onChange={this.statusOnChange} onBlur={this.deactivateEditMode.bind(this)} value={this.state.status}/>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;