import { useContext } from 'react';

import { Context } from '../Context';
import { Account } from '../models';
import { State } from '../Provider';

export interface UseExchange {
    changeActiveAccount: (account: Account) => void;
    changeActiveAmmount: (ammount: string) => void;
    changeAccount: (ammount: Account) => void;
    toggleOperation: () => void;
    makeExchange: () => void;
    state: State;
}

export const useExchange = function () {
    return useContext(Context);
};
