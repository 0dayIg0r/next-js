import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import styles from "./styles.module.css";
import { GetServerSideProps } from "next";

import { db } from "@/services/firebaseConnection";
import {
  doc,
  collection,
  query,
  getDoc,
  addDoc,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import TextArea from "@/components/textArea";
import { FaTrash } from "react-icons/fa";

interface TaskProps {
  item: {
    task: string;
    created: string;
    public: boolean;
    user: string;
    taskId: string;
  };
  allComments: commentProps[];
}

interface commentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
}
export default function Task({ item, allComments }: TaskProps) {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [comments, setComments] = useState<commentProps[]>(allComments || []);

  async function handleComment(e: FormEvent) {
    e.preventDefault();

    if (input === "") return;

    if (!session?.user?.email || !session.user.name) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user.email,
        name: session?.user.name,
        taskId: item?.taskId,
      });

      const data = {
        id: docRef.id,
        comment: input,
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item.taskId,
      };

      setComments((oldItems) => [...oldItems, data]);

      setInput("");
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async function handleDeleteComment(id: string) {
    try {
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);

      const deletComement = comments.filter((item) => item.id !== id);

      setComments(deletComement);
    } catch (e: any) {
      console.log(e.message);
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>
      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>{item.task}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Comentar</h2>

        <form onSubmit={handleComment}>
          <TextArea
            placeholder="Digite seu comentário"
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
          />

          <button className={styles.button} disabled={!session?.user}>
            Enviar
          </button>
        </form>
      </section>

      <section className={styles.commentsContainer}>
        <h2>Todos os comentários</h2>
        {comments.length === 0 && <span>Nenhum comentário</span>}
        {comments.map((item) => (
          <article key={item.id} className={styles.comment}>
            <div className={styles.headComment}>
              <label className={styles.commentsLabel}>{item.name}</label>
              {item.user === session?.user?.email && (
                <button className={styles.buttonTrash}>
                  <FaTrash
                    size={18}
                    color="#EA3140"
                    onClick={() => handleDeleteComment(item.id)}
                  />
                </button>
              )}
            </div>
            <p>{item.comment}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const docRef = doc(db, "tasks", id);

  const q = query(collection(db, "comments"), where("taskId", "==", id));
  const snapshopComments = await getDocs(q);

  let allComments: commentProps[] = [];

  snapshopComments.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      taskId: doc.data().taskId,
    });
  });

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const miliseconds = snapshot.data()?.created?.seconds * 1000;

  const task = {
    task: snapshot.data()?.task,
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id,
  };
  console.log(snapshot.data);
  return {
    props: {
      item: task,
      allComments: allComments,
    },
  };
};
