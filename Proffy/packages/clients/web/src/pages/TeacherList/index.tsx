import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";

import "./styles.css";
import { api } from "@shared/services";

import Input from "../../Components/Form/Input";
import Select from "../../Components/Form/Select";
import Header from "../../Components/Header";
import TeacherItem, { Teacher } from "../../Components/TeacherItem";

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [formState, setFormState] = useState({
    week_day: 0,
    subject: "",
    time: "",
  });

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      setFormState(state => ({ ...state, [name]: value }));
    },
    [],
  );
  const searchTeachers = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const response = await api.get("/classes", {
          params: formState,
        });

        setTeachers(response.data);

        console.log(response.data);
      } catch (error) {
        alert("Erro ao buscar dados");
      }
    },
    [formState],
  );

  return (
    <div id="page-teacher-list" className="container">
      <Header title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={formState.subject}
            onChange={handleInputChange}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Ciências", label: "Ciências" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
              { value: "Química", label: "Química" },
              { value: "Biologia", label: "Biologia" },
              { value: "História", label: "História" },
              { value: "Geografia", label: "Geografia" },
            ]}
          />

          <Select
            name="week_day"
            label="Dia da semana"
            value={formState.week_day}
            onChange={handleInputChange}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />

          <Input
            name="time"
            label="Hora"
            type="time"
            value={formState.time}
            onChange={handleInputChange}
          />

          <button type="submit">Buscar</button>
        </form>
      </Header>

      <main>
        {teachers.map(teacher => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
