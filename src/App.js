import React, { useEffect, useState } from 'react'
import './styles.css'
// https://sujeitoprogramador.com/rn-api/?api=posts

const App = () => {

  const [nutri, setNutri] = useState([])

  useEffect(() => {
    function loadApi() {
      let url = 'https://sujeitoprogramador.com/rn-api/?api=posts'
      fetch(url)
        .then((r) => r.json())
        .then((json) => {

          setNutri(json)
        })

    }
    loadApi()
  }, [])


  return (
    <div className='container'>
      <header>
        <strong>React Nutri</strong>
      </header>

      {nutri.map((item) => {
        return (
          <article key={item.id} className='post'>

            <strong className='title'>{item.titulo}</strong>

            <img src={item.capa} alt={item.title}  className='cover'/>

            <p className='subtitle'>
              {item.subtitulo}
            </p>

            <a className='button'>Acessar</a>
          </article>
        )
      })}

    </div>
  )
}

export default App
