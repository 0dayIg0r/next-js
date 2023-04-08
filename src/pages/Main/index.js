import React from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import * as Styled from "./styles";

const Main = () => {
  return (
    <Styled.Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Styled.Form onSubmit={() => {}}>
        <input type="text" placeholder="Adicionar Repositorios" />

        <Styled.Button>
          <FaPlus color="#FFF" size={14}/>
        </Styled.Button>
      </Styled.Form>
    </Styled.Container>
  );
};

export default Main;
