import React from 'react';

class ProfileStatus extends React.Component<any> {
    state = {
        editMode: false
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
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>}
                {this.state.editMode && <div>
                    <input autoFocus onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}/>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;