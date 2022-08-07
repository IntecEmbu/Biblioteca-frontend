import React from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import './index.css'

function index() {
  return (
    <div id='AreaForm-CadastroLivro'>
        <Form>
            
            <div>
                <Form.Group className='Form-group'>
                    <Form.Label>TÍTULO</Form.Label>
                    <Form.Control className='Form-control' type="text"/>
                </Form.Group>
                <Form.Group className='Form-group'>
                    <Form.Label>EDIÇÃO/VOLUME</Form.Label>
                    <Form.Control className='Form-control' type="text"/>
                </Form.Group>
                <Form.Group className='Form-group'>
                    <Form.Label>CATEGORIA</Form.Label>
                    <Form.Control className='Form-control' type="text"/>
                </Form.Group>
            </div>

            <div>
                <Form.Group className='Form-group'>
                    <Form.Label>IDIOMA</Form.Label>
                    <Form.Control className='Form-control' type="text" />
                </Form.Group>
                <Form.Group className='Form-group'>
                    <Form.Label>ANO LANÇAMENTO</Form.Label>
                    <Form.Control className='Form-control' type="text" maxLength={4}/>
                </Form.Group>
                <Form.Group className='Form-group'>
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control className='Form-control' type="text"/>
                </Form.Group>
            </div>

            <div>
                <Form.Group className='Form-group'>
                    <Form.Label>CDD</Form.Label>
                    <Form.Control className='Form-control' type="text" />
                </Form.Group>
            </div>

            <div id="AreaButton-CadastrarLivro">
            <Button id="FormButton-CadastrarLivro" type="submit">ENVIAR</Button>
            </div>
        </Form>
    </div>
  )
}

export default index