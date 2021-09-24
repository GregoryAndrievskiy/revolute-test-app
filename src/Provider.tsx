import React, { useReducer, useCallback } from 'react';

import { Context } from './Context';
import { initialAccounts } from './mockData';
import { Operation, Account, UserAccounts } from './models';

import { reducer } from './reducer';
import { init } from './init';

export enum Actions {
    Active = 'active',
    ChangeActiveAccount = 'changeActiveAccount',
    ChangeActiveAmount = 'changeActiveAmount',
    ChangeAccount = 'changeAccount',
    Exchange = 'exchange',
    ToggleOperation = 'toggleOperation',
}

export interface ExchangeSide {
    account: Account;
    amount: string;
}

export interface State {
    accounts: UserAccounts;
    active: Account;
    top: ExchangeSide;
    bottom: ExchangeSide;
    operation: Operation;
}

export interface Payload {
    type: Actions;
    account?: Account;
    amount?: string;
    operation?: Operation;
}

export type Reducer = (state: State, payload: Payload) => void;

export const Provider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialAccounts, init);

    const changeActiveAccount = useCallback((account: Account) => dispatch({ type: Actions.ChangeActiveAccount, account }), []);
    const changeActiveAmmount = useCallback((amount: string) => dispatch({ type: Actions.ChangeActiveAmount, amount }), []);
    const changeAccount = useCallback((account: Account) => dispatch({ type: Actions.ChangeAccount, account }), []);
    const toggleOperation = useCallback(() => dispatch({ type: Actions.ToggleOperation }), []);
    const makeExchange = useCallback(() => dispatch({ type: Actions.Exchange }), []);

    const value = {
        changeActiveAccount,
        changeActiveAmmount,
        changeAccount,
        toggleOperation,
        makeExchange,
        state,
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};
