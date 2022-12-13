import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/Modal.css";
import "../../../styles/Botoes.css";
import api from "../../../service/api.js";
import { Spinner } from 'react-bootstrap';
import {utils, writeFile} from 'xlsx';

function Index() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const [type, setType] = useState("inventory");
  const [returned, setReturned] = useState(true);

  async function download(){
    setIsDisabled(true);
    let response
    let filename
    const date = new Date().toLocaleDateString().split('/').join('-')

    if(type === "lending"){
      response = await api.get(`/report/generator/lending?returned=${returned}`)
      filename = `emprestimos_${date}.xlsx`
    } else if(type === "inventory"){
      response = await api.get(`/report/generator/book`)
      filename = `inventario.xlsx`
    }

    const wb = utils.book_new()
    wb.Props = {
      Title: filename,
      author: "Biblioteca de Embu das Artes",
      createdDate: date
    }

    wb.SheetNames.push(filename)
    wb.Sheets[filename] = utils.json_to_sheet(response.data)
    writeFile(wb, filename)

    setIsDisabled(false);
  }

  return (
    <>
      <button className="btn-cadastrar" onClick={handleShow}>
        Baixar Relatório
      </button>

      <Modal centered show={show}>
        <Modal.Header>
          <Modal.Title>Baixar Relatório</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Tipo</label>
                <select className="tipo-pesquisa"
                  value={type}
                  onChange={(e) => setType(e.target.value)}>
                  <option value={"inventory"}>Inventário</option>
                  <option value={"lending"}>Empréstimos</option>
                </select>
              </div>
              {type === "lending" && (
                <div className="input-box-modal">
                  <label>Retornados</label>
                  <select className="tipo-pesquisa"
                    value={returned}
                    onChange={(e) => setReturned(e.target.value)}>
                    <option value={true}>Sim</option>
                    <option value={false}>Não</option>
                  </select>
                </div>
              )}
            </div>
          </form>
          {isDisabled && (
            <div className="loading-modal">
              <Spinner animation="border" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cancelar-modal" onClick={handleClose}>
            Cancelar
          </button>
          <button
            className="btn-cadastrar-modal"
            type="submit"
            onClick={download}
            disabled={isDisabled}
          >
            Baixar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Index;