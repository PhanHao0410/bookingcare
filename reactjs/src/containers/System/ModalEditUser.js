import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { bindActionCreators } from 'redux';
import { emitter } from '../../utils/emitter'
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: ''

        };
    }

    componentDidMount() {
        let user = this.props.currentUser
        console.log('check lỗi sex', user)
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
                gender: user.gender,
                roleId: user.roleId
            })
        }
    }
    toggle = () => {
        this.props.handleToggleEditModal()
    }
    handleOnchangeInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value
        this.setState({
            ...copystate
        })
    }
    isValidInputUser = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parament:' + arrInput[i])
                break
            }

        }
        return isValid
    }
    handleOnclickEditUser = () => {
        let isValid = this.isValidInputUser();
        if (isValid === true) {
            this.props.editUser(this.state)
        }
    }

    render() {
        console.log('check data from parent: ', this.props)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Update user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='email' onChange={(event) => this.handleOnchangeInput(event, "email")}
                                disabled
                                value={this.state.email} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                onChange={(event) => this.handleOnchangeInput(event, "password")}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Frist Name</label>
                            <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, "firstName")}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, "lastName")}
                                value={this.state.lastName}
                            />
                        </div>
                    </div>

                    <div className='modal-user-body'>
                        <div className='input-container w-100'>
                            <label>Address</label>
                            <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, "address")}
                                value={this.state.address}
                            />
                        </div>

                    </div>

                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, "phonenumber")}
                                value={this.state.phonenumber} />
                        </div>
                        <div className='form-row d-flex '>
                            <div className='form-group'>
                                <label htmlFor="inputState">Sex</label>
                                <select name="gender" className="form-control"
                                    onChange={(event) => this.handleOnchangeInput(event, "gender")}
                                    value={this.state.gender}>
                                    <option value=""></option>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>

                                </select>
                            </div>
                            <div className='form-group px-3'>
                                <label htmlFor="inputZip">Role</label>
                                <select name="roleId" className="form-control"
                                    onChange={(event) => this.handleOnchangeInput(event, "roleId")}
                                    value={this.state.roleId} >
                                    <option value=""></option>
                                    <option value="1">Admin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option>

                                </select>
                            </div>
                        </div>


                    </div>



                </ModalBody>
                <ModalFooter>
                    <Button color='primary' className='px-2' onClick={() => this.handleOnclickEditUser()}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className='px-2' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
