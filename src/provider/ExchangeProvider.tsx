import React, { useReducer, useCallback } from 'react';

import { ExchangeContext } from '../context';
import { initialAccounts } from '../mockData';
import { Currency, Operation, Account, UserAccounts } from '../models';

import { reducer } from '../reducer';
import { init } from '../init';
import { useQuery } from '../hooks';

export enum Actions {
    Active = 'active',
    ChangeActiveAccount = 'changeActiveAccount',
    ChangeActiveAmount = 'changeActiveAmount',
    ChangeAccount = 'changeAccount',
    Exchange = 'exchange',
    ToggleOperation = 'toggleOperation',
    UpdateNames = 'updateNames',
    UpdateRates = 'updateRates',
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
    names?: Record<Currency, string>;
    base?: Currency;
    rates?: Record<Currency, number>;
    amount?: string;
    operation?: Operation;
}

export type Reducer = (state: State, payload: Payload) => void;

export const ExchangeProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialAccounts, init);

    const changeActiveAccount = useCallback((account: Account) => dispatch({ type: Actions.ChangeActiveAccount, account }), []);
    const changeActiveAmmount = useCallback((amount: string) => dispatch({ type: Actions.ChangeActiveAmount, amount }), []);
    const changeAccount = useCallback((account: Account) => dispatch({ type: Actions.ChangeAccount, account }), []);
    const toggleOperation = useCallback(() => dispatch({ type: Actions.ToggleOperation }), []);
    const makeExchange = useCallback(() => dispatch({ type: Actions.Exchange }), []);
    const updateNames = useCallback((names: Record<Currency, string>) => dispatch({ type: Actions.UpdateNames, names }), []);
    const updateRates = useCallback((base: Currency, rates: Record<Currency, number>) => dispatch({ type: Actions.UpdateRates, base, rates }), []);

    useQuery(updateNames, updateRates);

    const value = {
        changeActiveAccount,
        changeActiveAmmount,
        changeAccount,
        toggleOperation,
        makeExchange,
        state,
    };

    return (
        <ExchangeContext.Provider value={value}>
            {children}
        </ExchangeContext.Provider>
    );
};
