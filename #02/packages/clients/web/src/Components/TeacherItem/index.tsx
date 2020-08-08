import React from "react";

import "./styles.css";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

interface TeacherItemProps {
  avatar_url: string;
  name: string;
}

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://github.com/manfrinmm.png" alt="matheus" />
        <div>
          <strong>MatheusMM</strong>
          <span>Matematica</span>
        </div>
      </header>

      <p>
        aaaaaaaaaaaaaaa <br /> aaaaaaaaaaaa
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 222,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
