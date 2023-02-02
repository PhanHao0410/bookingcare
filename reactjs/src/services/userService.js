import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`)
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (user) => {
    return axios.delete('/api/delete-a-user', { data: { id: user.id } })
}
const editUserService = (userUpdate) => {
    return axios.put('/api/update-user', userUpdate)
}
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService };