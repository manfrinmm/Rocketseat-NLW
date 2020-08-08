import React from "react";

import "./styles.css";
import Header from "../../Components/Header";
import TeacherItem from "../../Components/TeacherItem";

const TeacherList: React.FC = () => {
  return (
    <div id="page-teacher-list" className="container">
      <Header title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input type="text" id="subject" />
          </div>

          <div className="input-block">
            <label htmlFor="week_day">Matéria</label>
            <input type="text" id="week_day" />
          </div>

          <div className="input-block">
            <label htmlFor="time">Matéria</label>
            <input type="text" id="time" />
          </div>
        </form>
      </Header>

      <main>
        <TeacherItem />
      </main>
    </div>
  );
};

export default TeacherList;
