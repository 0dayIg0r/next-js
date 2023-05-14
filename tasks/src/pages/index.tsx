import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from '../styles/Home.module.css'

import backgroundHome from '../../public/assets/background.png'


import {
  collection,
    getDocs
  } from 'firebase/firestore'

  import { db } from "@/services/firebaseConnection";

  interface HomeProps {
    posts: number,
    comments: number
  }

export default function Home({posts, comments}: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefas+ | Organize suas tarefas de forma fácil</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="LOGO"
            src={backgroundHome}
            priority
          />
        </div>
        <h1 className={styles.title}>
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{posts} posts</span>
          </section>

          <section className={styles.box}>
            <span>+{comments} comentários</span>
          </section>
        </div>
      </main>
    </div>
  );
}



export const getStaticProps: GetStaticProps = async () =>{
  
  const commentHef = collection(db, 'comments')
  const postRef = collection(db, 'tasks')

  const commentSnapshopt = await getDocs(commentHef)
  const postSnapshopt = await getDocs(postRef)

  return {
    props:{
      posts: postSnapshopt.size || 0,
      comments: commentSnapshopt.size || 0
    },
    revalidate: 60
  }
}