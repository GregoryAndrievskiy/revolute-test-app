import { createContext } from 'react';

import { UseExchange } from '../hooks';

const initValue = {} as UseExchange;

export const ExchangeContext = createContext(initValue);
