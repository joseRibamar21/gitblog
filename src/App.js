import React from 'react';

import Routes from './router';
import GlobalStyle from './styles/global'

export default function App(){
  return(
    <React.Fragment>
    <GlobalStyle/>
    <Routes/>
    </React.Fragment>
  );
}