import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/ModalCadastrarVoluntario.css'
import api from '../../service/api.js'

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [user, setUser] = useState('')

  const [isDisabled, setIsDisabled] = useState(false)

  async function sendUser() {
    const data = {
      name, email,
      password, user
    }

    if (name === '' || email === '' || password === '' || user === '') {
      alert('Preencha todos os campos')
    } else {
      const confirm = window.confirm('Deseja cadastrar o voluntário?')
      if (confirm) {
        try {
          setIsDisabled(true)
          await api.post('/librian/insert-collaborator', data)
          alert('Voluntário cadastrado com sucesso!')
          setIsDisabled(false)
        } catch (error) {
          alert('Erro ao cadastrar o voluntário!')
          console.log(error)
          setIsDisabled(false)
        }
        window.location.reload()
      }
    }
  }

  return (
    <>
      <button className="btn-cadastrar-voluntario" onClick={handleShow}>
        Cadastrar
      </button>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Cadastrar Voluntário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Nome</label>
                <input type="text" required 
                onChange={e => setName(e.target.value)} />
              </div>

              <div className="input-box-modal">
                <label>Email</label>
                <input type="text" required 
                onChange={e => setEmail(e.target.value)}/>
              </div>

              <div className="input-box-modal">
                <label>Usuário</label>
                <input type="text" required 
                onChange={e => setUser(e.target.value)} />
              </div>

              <div className="input-box-modal">
                <label>Senha</label>
                <input type="password" required 
                onChange={e => setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cancelar-cadastrar-voluntario" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn-cadastrar-cadastrar-voluntario" onClick={sendUser} disabled={isDisabled}>
            Cadastrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example