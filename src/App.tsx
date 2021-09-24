import React from 'react';

import { ExchangeProvider, QueryProvider } from './provider';
import { Exchange } from './Screens';

const App = () => (
  <QueryProvider>
    <ExchangeProvider >
      <Exchange />
    </ExchangeProvider >
  </QueryProvider>
);


export default App;
