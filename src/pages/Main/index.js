import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import * as Styled from "./styles";

import api from "../../services/api";

const Main = () => {
  const [repo, setRepo] = useState("");
  const [repoArray, setRepoArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
// AULA 22

      async function submit() {
        setLoading(true);

        try {

          if (repo === '') {
            throw new Error('Digite o nome do repositorio.')
          }

          const res = await api.get(`repos/${repo}`);

          const hasRepo = repoArray.find(r => r.name === repo)

          if(hasRepo){
            throw new Error('Esse repositorio já está adicionado.')
          }

          const data = {
            name: res.data.full_name,
          };

          setRepoArray([...repoArray, data]);

          setRepo("");
        } catch (e) {
          console.log(e.message);
        } finally {
          setLoading(false)
        }
      }

      submit();
    },
    [repo, repoArray]
  );


  const handleDelete = useCallback((r) => {
    const findRepo = repoArray.filter(repo => repo.name !== r)

    setRepoArray(findRepo)
  }, [repoArray])

  return (
    <Styled.Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Styled.Form onSubmit={handleSubmit}>
        <input
          t
          ype="text"
          placeholder="Adicionar Repositorios"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
        />

        <Styled.Button loading={loading ? 1 : 0}>
          {
            loading ? (
              <FaSpinner color="#FFF" size={14}
              />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )
          }
        </Styled.Button>
      </Styled.Form>


      <Styled.List>
        {
          repoArray.map(r => (
            <li key={r.name}>
              <span>
                <Styled.DeleteButton onClick={() => handleDelete(r.name)}>
                  <FaTrash size={14} />
                </Styled.DeleteButton>
                {r.name}
              </span>
              <a >
                <FaBars size={20} />
              </a>
            </li>
          ))
        }
      </Styled.List>
    </Styled.Container>
  );
};



export default Main;
