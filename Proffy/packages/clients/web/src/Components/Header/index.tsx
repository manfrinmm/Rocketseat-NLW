import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import backIcon from "../../assets/images/icons/back.svg";
import logoIcon from "../../assets/images/logo.svg";

interface HeaderProps {
  title: string;
  description?: string;
}

const Header: React.FC<HeaderProps> = ({ title, description, children }) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>

        <img src={logoIcon} alt="Proffy" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>

        {description && <p>{description}</p>}
        {children}
      </div>
    </header>
  );
};

export default Header;
