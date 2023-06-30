import React from 'react';

class ProfileStatus extends React.Component<any> {
    state = {
        editMode: false
    }

    activateEditMode() {
    this.state.editMode = true
}
//почему потеряется контекст при декларейшен?
    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                    </div>}
                {this.state.editMode && <div>
                    <input value={this.props.status}/>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;