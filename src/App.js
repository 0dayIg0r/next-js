import React from "react";

import * as S from "./styles";

const App = () => {
  return (
    <S.Container>
      <S.Head>
        <S.Title>Projeto Styled</S.Title>
      </S.Head>

      <S.Welcome color={'#FF00FF'} width={36}>
        BEM VINDO
      </S.Welcome>
    </S.Container>
  );
};

export default App;
