import React from 'react'
import { Form, Row, Button, Card, Col, InputGroup, FormGroup, Container} from 'react-bootstrap';
import '../Form/style.css'


function Main() {
    return (
       <Container style={{ borderRadius:'15px'}} >
        <div className='id' style={{

        }}>
        <Form style={{}}> 
              <Row  style={{backgroundColor:'white', }}>
                <div style={{backgroundColor:'white', borderRadius:'15%' }}>
                  <br></br>
              <Form.Label style={{textAlign: 'left', marginTop:'2%', marginLeft:'2%'}} id='titulo'>TÍTULO</Form.Label>
              <Form.Label style={{textAlign: 'center',marginTop:'2%', marginLeft:'32%' }} id='edicao'>EDIÇÃO/VOLUME</Form.Label>
              <Form.Label style={{textAlign: 'right', marginLeft:'24%',marginTop:'2%' }} id='categ'>CATEGORIA</Form.Label>
        </div>

        
        <div style={{backgroundColor:'white'}} >
              <Form.Control  style={{ width:'25%', display: 'inline-block', marginLeft:'2%' }} type="text" />
               <Form.Control   style={{ width:'25%', display: 'inline-block', marginLeft:'12%' }} type="text" name="lastName"/>
               <Form.Control  style={{ width:'25%', display: 'inline-block', marginLeft:'10%' }}type="text"/>
               
        </div>        
              </Row>           
          <Row style={{backgroundColor:'white' }} >
            <div style={{backgroundColor:'white'}}>
              <br></br>
              <br></br>
              <Form.Label style={{textAlign: 'left', marginLeft:'2%'}}>IDIOMA</Form.Label>
              <Form.Label style={{textAlign: 'center', marginLeft:'32%'}}>DATA DE LANÇAMENTO</Form.Label>
              <Form.Label style={{textAlign: 'right', marginLeft:'20%'}}>ISBN</Form.Label>
            </div>
            
            <div style={{backgroundColor:'white'}} >
              <Form.Control  style={{ width:'25%', display: 'inline-block', marginLeft:'2%' }} type="text" />
               <Form.Control   style={{ width:'25%', display: 'inline-block', marginLeft:'12%' }} type="date" name="lastName"/>
               <Form.Control  style={{ width:'25%', display: 'inline-block', marginLeft:'10%' }}type="text"/>
               
        </div> 
        </Row>
        <Row style={{backgroundColor:'white'}}>
          <div style={{backgroundColor:'white'}}>
          <br></br>
          <br></br>
              <Form.Label style={{textAlign: 'left', marginLeft:'2%'}}>CDD</Form.Label>
          </div>
          <div style={{backgroundColor:'white'}} >
              <Form.Control  style={{ width:'25%', display: 'inline-block', marginLeft:'2%' }} type="text" />
          </div>
        </Row>
        <Row style={{backgroundColor:'white'}}>
          <div style={{backgroundColor:'white'}}>
          <br></br>
          <br></br>  
          <Button style={{ width:'8%', display: 'inline-block', marginLeft:'90%', backgroundColor:'#192039', marginTop:'2%' }} type="submit">ENVIAR</Button>
          
          <br></br>
         </div>
         </Row>
        </Form>
        </div>
        </Container>

        
            );}
export default Main;