import { GetServerSideProps } from "next";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import styles from "./styles.module.css";
import Head from "next/head";

import { getSession } from "next-auth/react";
import TextArea from "@/components/textArea";

import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import { db } from "../../services/firebaseConnection";

import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

import Link from "next/link";

interface HomeProps {
  user: {
    email: string;
  };
}

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  task: string;
  user: string;
}

export default function Dashboard({ user }: HomeProps) {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const taskRef = collection(db, "tasks");
      const q = query(
        taskRef,
        orderBy("created", "desc"),
        // when using where in firebase create an index on bda, create an index desc and asc of every element in where and repite in inverse asc and desc.
        where("user", "==", user?.email)
      );
      // real time
      onSnapshot(q, (snapshot) => {
        let list = [] as TaskProps[];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            task: doc.data().task,
            created: doc.data().created,
            user: doc.data().user,
            public: doc.data().public,
          });
        });
        setTasks(list);
      });
    }

    loadTasks();
  }, [user?.email]);

  function handleChangePublic(e: ChangeEvent<HTMLInputElement>) {
    setPublicTask(e.target.checked);
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    try {
      await addDoc(collection(db, "tasks"), {
        task: input,
        created: new Date(),
        user: user?.email,
        public: publicTask,
      });

      setInput("");
      setPublicTask(false);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async function handleShare(id: string) {
    // auto ctrl c
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );
  }

  async function handleDeleteTask(id: string) {
    const docRef = doc(db, "tasks", id);

    await deleteDoc(docRef);
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
              type="submit"
            >
              Adicionar
            </button>
          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>

          {tasks.map((item) => (
            <article key={item.id} className={styles.task}>
              {item.public && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}> Publico</label>
                  <button
                    className={styles.shareButton}
                    onClick={() => handleShare(item.id)}
                  >
                    <FiShare2 size={22} color="#3183ff" />
                  </button>
                </div>
              )}

              <div className={styles.taskContent}>
                {item.public ? (
                  <Link href={`/task/${item.id}`}>
                    <p>{item.task}</p>
                  </Link>
                ) : (
                  <p>{item.task}</p>
                )}

                <button
                  className={styles.buttonTrash}
                  onClick={() => handleDeleteTask(item.id)}
                >
                  <FaTrash size={24} color="#ea3140" />
                </button>
              </div>
            </article>
          ))}
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
    props: {
      user: {
        // return email of user
        email: session?.user.email,
      },
    },
  };
};
