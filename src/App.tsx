import React from 'react';

import { Provider } from './Provider';
import { AppScreen } from './Components';
import { Exchange } from './Screens';

const App = () => (
  <Provider >
    <AppScreen>
      <Exchange />
    </AppScreen>
  </Provider >
);


export default App;
