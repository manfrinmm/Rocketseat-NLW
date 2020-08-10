import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { api } from "@shared/services";

import warningIcon from "../../assets/images/icons/warning.svg";
import Input from "../../Components/Form/Input";
import Select from "../../Components/Form/Select";
import Textarea from "../../Components/Form/Textarea";
import Header from "../../Components/Header";

import "./styles.css";

const TeacherForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    avatar_url: "",
    whatsapp: "",
    bio: "",
    subject: "",
    cost: "",
  });

  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: "",
      to: "",
    },
  ]);

  const history = useHistory();

  const handleInputChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = event.target;

      console.log({ [name]: value });
      setFormState(state => ({ ...state, [name]: value }));
    },
    [],
  );

  const setScheduleItemValue = useCallback(
    (indexOfItem: number, field: string, value: string) => {
      const newArray = scheduleItems.map((scheduleItem, index) => {
        if (indexOfItem === index) {
          return { ...scheduleItem, [field]: value };
        }

        return scheduleItem;
      });

      setScheduleItems(newArray);
    },
    [scheduleItems],
  );

  const handleCreateClass = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const response = await api.post("/classes", {
          ...formState,
          schedule: scheduleItems,
        });

        console.log(response.data);

        alert("Cadastro realizado com sucesso");

        history.push("/");
      } catch (error) {
        alert("Erro ao realizar cadastro");
      }
    },
    [formState, history, scheduleItems],
  );

  const handleAddNewScheduleItem = useCallback(() => {
    setScheduleItems(state => [...state, { week_day: 0, from: "", to: "" }]);
  }, []);

  return (
    <div id="page-teacher-form" className="container">
      <Header
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={formState.name}
              onChange={handleInputChange}
            />
            <Input
              name="avatar_url"
              label="Avatar URL"
              value={formState.avatar_url}
              onChange={handleInputChange}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={formState.whatsapp}
              onChange={handleInputChange}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={formState.bio}
              onChange={handleInputChange}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

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
            <Input
              name="cost"
              label="Custo de sua hora por aula"
              value={formState.cost}
              onChange={handleInputChange}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={handleAddNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((schedule, index) => (
              <div key={schedule.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={schedule.week_day}
                  onChange={e => {
                    setScheduleItemValue(index, e.target.name, e.target.value);
                  }}
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
                  name="from"
                  label="Das"
                  type="time"
                  value={schedule.from}
                  onChange={e => {
                    setScheduleItemValue(index, e.target.name, e.target.value);
                  }}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={schedule.to}
                  onChange={e => {
                    setScheduleItemValue(index, e.target.name, e.target.value);
                  }}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
