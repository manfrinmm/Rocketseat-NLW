import React, { useCallback } from "react";

import "./styles.css";
import { api } from "@shared/services";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar_url: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const { id, subject, cost, name, avatar_url, whatsapp, bio } = teacher;

  const createNewConnection = useCallback(() => {
    api.post("/connections", {
      user_id: id,
    });
  }, [id]);

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar_url} alt={name} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>
            {Intl.NumberFormat("pt-br", {
              currency: "BRL",
              style: "currency",
            }).format(cost)}
          </strong>
        </p>
        <a
          href={`https://api.whatsapp.com/send?phone=${whatsapp}`}
          target="__blank"
          onClick={createNewConnection}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
