import { GetServerSideProps } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.css";
import Head from "next/head";

import { getSession } from "next-auth/react";
import TextArea from "@/components/textArea";

import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);

  function handleChangePublic(e: ChangeEvent<HTMLInputElement>) {
    setPublicTask(e.target.checked);
  }

  function handleRegisterTask(e: FormEvent) {
    e.preventDefault();

    if (input === "") return;
    console.log(input)
    alert('ok')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Painel de tarefas</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>

            <form onSubmit={handleRegisterTask}>
              <TextArea
                placeholder="Digite sua tarefa"
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
              />
            </form>
            <div className={styles.checkBoxArea}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={publicTask}
                onChange={handleChangePublic}
              />
              <label>Deixar tarefa publica?</label>
            </div>
            <button 
            className={styles.button} 
            onClick={handleRegisterTask}
            type="submit">
              Adicionar
            </button>
          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>

          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}> Publico</label>
              <button className={styles.shareButton}>
                <FiShare2 size={22} color="#3183ff" />
              </button>
            </div>

            <div className={styles.taskContent}>
              <p>Minha primeira tarefa de exemplo</p>

              <button className={styles.buttonTrash}>
                <FaTrash size={24} color="#ea3140" />
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
