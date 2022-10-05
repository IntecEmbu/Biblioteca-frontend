import React from 'react'
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
    {
    title: "Página Inicial",
    path: "/home",
    icon: <FaIcons.FaHome/>,
    cName: 'nav-text'
    },

    {
    title: "Livros",
    path: "/livros",
    icon: <FaIcons.FaBook/>,
    cName: 'nav-text'
    },

    {
    title: "Empréstimos",
    path: "/emprestimos",
    icon: <FaIcons.FaBookOpen/>,
    cName: 'nav-text'
    },

    {
    title: "Alunos",
    path: "/alunos",
    icon: <FaIcons.FaUser/>,
    cName: 'nav-text'
    },

    {
    title: "Voluntários",
    path: "/voluntarios",
    icon: <FaIcons.FaHandHoldingHeart/>,
    cName: 'nav-text'
    },

    {
    title: "Relatórios",
    path: "/relatorios",
    icon: <FaIcons.FaTable/>,
    cName: 'nav-text'
    },
]