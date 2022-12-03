import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Sobre.css";
import Card from "../components/Cards/Sobre";
import * as FaIcons from "react-icons/fa";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Sobre() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="Navbar-link item-nav">
          <Link to="/sobre" id="link-navbar" className="link-navbar-sair">
            Sobre
          </Link>
        </div>
        <div className="Navbar-link item-nav">
          <Link to="/login" id="link-navbar" className="link-navbar-sair">
            Entrar
          </Link>
        </div>
      </div>

    <div className="pagina-container">

      <div className="desktop">
        <div className="container-sobre">
          <Card 
          position={false}
          img={(<img src={require("../images/estress.png")} />)}/>

          <Card 
          position={true}
          img={(<img src={require("../images/meeting.png")} />)}/>

          <Card 
          position={false}
          img={(<img src={require("../images/library.png")} />)}/>
        </div>
      </div>

      <div className="carta-container">
        <p id="titulo-carta">CARTA ABERTA</p>
        <div className="carta">
          <p className="texto-carta">
          Quando assumi o projeto Biblioteca Ativa em março de 2022 me deparei com vários desafios
          entre eles organização, ambientação, equipe e o maior de todos, o sistema.
          </p>
          <p className="texto-carta">
            Esse problema atrapalhava muito a logística do espaço, pois a biblioteca contava com um
            sistema complexo, com centenas de campos que não fazíamos ideia de como preencher, um
            sistema confuso, com navegação confusa, difícil de encontrar os campos, não sabíamos onde
            encontrar as informações necessárias para todos os campos, era impossível fazer inventário pois
            os relatórios não se conversavam, os empréstimos de livros não eram confiáveis, muitos livros
            emprestados voltavam para o estoque virtual antes do prazo determinado de forma automática
            e isso trazia uma inconsistência para o nosso estoque, uma situação que um profissional de
            logística pode claramente definir como aterrorizante.
          </p>
          <p className="texto-carta">
            Cadastrar os exemplares era uma tarefa dificílima, exigia os conhecimentos de um profissional
            bibliotecário, profissional esse que a Biblioteca já possuiu no passado mas não se faz mais
            presente, o sistema não permitia que os livros fossem cadastrados com esses campos sem
            preenchimento total, o que tornava a tarefa quase impossível em algumas situações.
          </p>
          <p className="texto-carta">
            A falta de cadastro dos livros era um problema, deixávamos de emprestar exemplares por falta
            de cadastro, além de uma tarefa complexa, demorávamos horas para encontrar todas as
            informações em várias tabelas diferentes e a partir daí, efetuar o cadastro. Por esse motivo o
            prazo mínimo que podíamos oferecer para um usuário para que ele pudesse retirar um livro não
            cadastrado era de uma semana, esse era o tempo que demorávamos para levantar todas as
            informações e cadastrar o exemplar. 
          </p>
          <p className="texto-carta">
            Outro grande problema é que o antigo sistema não tinha um instalador, ou seja, éramos
            dependentes de uma única máquina, antiga, que poderia parar a qualquer momento, e que
            parou.
          </p>
          <p className="texto-carta">
            Em determinado momento não tínhamos mais a máquina onde o sistema estava instalado, não
            tínhamos o sistema em nenhum outro lugar da escola, simplesmente não tínhamos como saber
            o que estava emprestado, o que estava em estoque, não tínhamos mais nenhuma informação,
            a saída foi voltar a emprestar os livros como se fazia na Biblioteca de Alexandria, com as
            informações registradas em papiro. 
          </p>
          <p className="texto-carta">
            Quando a professora Aline Francisca, gentilmente ofereceu a equipe para desenvolver um
            trabalho para a criação de um novo sistema, prontamente aceitamos, essa seria a peça final para
            consertar definitivamente o estoque da biblioteca, e deixar o espaço com o seu funcionamento
            entregando 100% da sua capacidade. 
          </p>
          <p className="texto-carta">
            O grupo de TCC começou o trabalho a todo vapor, frequentando a biblioteca quase que
            diariamente, procurando saber todos os detalhes do antigo sistema para iniciar os trabalhos da
            construção do novo sistema, liderados pelo aluno Pedro Fonseca que foi o mais presente em
            todo o projeto, realizava reuniões semanais para os aprimoramentos mantendo uma
            comunicação constante com os professores coordenadores do espaço para desenvolver o
            sistema mais assertivo para as nossas necessidades.
          </p>
          <p className="texto-carta">
            No domingo dia 20 de de novembro de 2022 recebi com alegria a notícia de que o sistema estava
            pronto para entrar em operação.
          </p>
          <p className="texto-carta">
            No dia 22 de novembro juntamente com a equipe do terceiro módulo de logística matutino e do
            segundo módulo de logística noturno, iniciamos o inventário e o cadastro dos livros no novo
            sistema.
          </p>
          <p className="texto-carta">
            Com o empenho dos alunos do terceiro módulo de desenvolvimento de sistemas eu tinha
            certeza que os resultados seriam excelentes, o que eu não sabia é que o resultado superaria
            qualquer expectativa.
          </p>
          <p className="texto-carta">
            Em um só dia conseguimos cadastrar a incrível quantidade de 373 livros com 25 pessoas
            trabalhando ao mesmo tempo no período da manhã e 23 pessoas trabalhando ao mesmo tempo
            no período da noite, em um sistema mobile, auto explicativo, trabalhando online, coordenados
            pelo professor de logística em atividade de sala, utilizando um sistema que foi criado de forma
            personalizada para o ambiente.
          </p>
          <p className="texto-carta">
            Um sistema fácil de mexer, fácil de entender, visualmente bonito que possibilita o cadastro de
            livros, colaboradores, usuários de forma prática e rápida de qualquer lugar da escola.
          </p>
          <p className="texto-carta">
            Eu como professor coordenador do projeto biblioteca ativa 2022 deixo o meu agradecimento
            especial à professora Aline Francisca que coordenou o projeto Biblitec com maestria, e aos
            alunos do 3° módulo de DS de 2022 que trabalharam com garra e empenho.
          </p>
          <p className="texto-carta">
            O sistema Biblitec foi, a cereja do bolo para o projeto biblioteca ativa 2022, trazendo inovação
            e mobilidade, é com ele que as atividades da biblioteca da Etec de Embu das Artes serão
            promissoras no ano de 2023. 
          </p>
          <p className="texto-carta">
            Parabéns a todos os envolvidos.
          </p>
          <p className="assinatura-carta">
            <a href="https://www.linkedin.com/in/rafael-ferracini-vieira-b54349115/" target="_blank">
              Professor: Rafael Ferracini
            </a>
          </p>
        </div>
      </div>
    </div>

    <div className="footer">
        <ul class="icons">
            <li>
              <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Visite nosso Back-end!</Tooltip>}
              >
                <a href="https://github.com/IntecEmbu/Biblioteca-backend" target="_blank">
                  <FaIcons.FaGithub />
                </a>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Visite nosso Front-end!</Tooltip>}
              >
                <a href="https://github.com/IntecEmbu/Biblioteca-frontend" target="_blank">
                  <FaIcons.FaGithub />
                </a>
              </OverlayTrigger>
            </li>
            {/* <li>
              <a href="#"><FaIcons.FaInstagram /></a>
            </li> */}
        </ul>
    </div>
    </>
  )
}

export default Sobre