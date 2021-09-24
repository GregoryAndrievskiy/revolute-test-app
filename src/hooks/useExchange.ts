import { useContext } from 'react';

import { ExchangeContext } from '../context';
import { Account } from '../models';
import { State } from '../provider';

export interface UseExchange {
    changeActiveAccount: (account: Account) => void;
    changeActiveAmmount: (ammount: string) => void;
    changeAccount: (ammount: Account) => void;
    toggleOperation: () => void;
    makeExchange: () => void;
    state: State;
}

export const useExchange = function () {
    return useContext(ExchangeContext);
};
