import React from "react";

import * as S from "./styles";

const App = () => {
  return (
    <S.Container>
      <S.Head>
        <S.Title>Projeto Styled</S.Title>
      </S.Head>

      <S.Welcome cor="#00FF00" width={2}>
        BEM VINDO AO SISTEMA
      </S.Welcome>
    </S.Container>
  );
};

export default App;
