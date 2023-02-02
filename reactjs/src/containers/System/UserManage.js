import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import { isTemplateExpression } from 'typescript';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditModalUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact()

    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.users) {
            this.setState({
                arrUsers: response.users

            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })

    }
    handleToggleModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })

    }
    createNewUser = async (data) => {
        console.log('check user lỗi add new: ', data)
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUserFromReact()

                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')

            }
        }
        catch (e) {
            console.log(e)
        }
    }
    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user)
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact()
            }
            else {
                alert(res.message)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    handleEditUser = (user) => {
        this.setState({
            isOpenEditModalUser: true,
            userEdit: user
        })
    }
    handleToggleEditModal = () => {
        this.setState({
            isOpenEditModalUser: !this.state.isOpenEditModalUser,
        })

    }
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenEditModalUser: false,
                })
                await this.getAllUserFromReact()
            } else {
                alert(res.message)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromModalUser={this.handleToggleModal}
                    createNewUser={this.createNewUser}

                />
                {this.state.isOpenEditModalUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEditModalUser}
                        handleToggleEditModal={this.handleToggleEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className="title text-center">Manage users with Su-IT</div>
                <div className='mx'>
                    <button className='btn btn-primary mx-3 px-2'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className='user-table mt-4 mx-2'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {arrUsers && arrUsers.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(user)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(user)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>

                                )
                            }
                            )}
                        </tbody>


                    </table>


                </div>

            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
