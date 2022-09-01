import api from './api.js'

// Verifica se o usuário existe 
async function checkUser(login, password) {

    const reponse = await api.post('/librian/login-collaborator', {login, password})

    return reponse.data
}

export default checkUser