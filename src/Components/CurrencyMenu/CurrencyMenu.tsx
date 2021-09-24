import React, { useState, useCallback, useMemo } from 'react';

import { Content } from '../styled';
import { useExchange } from '../../hooks';
import { Currency } from '../../models';

export interface CurrencyMenuProps {
    onCurrencyChange: () => void;
}

export const CurrencyMenu: React.FC<CurrencyMenuProps> = ({ onCurrencyChange }) => {
    const [value, setValue] = useState('');
    const { state, changeAccount } = useExchange();
    const { accounts, top, bottom } = state;
    const { account: { code: topCode } } = top;
    const { account: { code: bottomCode } } = bottom;

    const accountsArray = useMemo(
        () => Object
            .entries(accounts).map(([, account]) => account)
            .filter(account => account.code !== topCode && account.code !== bottomCode)
        , [accounts, topCode, bottomCode]);

    const handleClose = useCallback(() => onCurrencyChange(), [onCurrencyChange]);

    const handleChange = useCallback(event => setValue(event.target.value), []);

    const handleClick = useCallback(
        event => {
            const { value } = event.currentTarget;
            changeAccount(accounts[value as Currency]);
            onCurrencyChange();
        },
        [changeAccount, onCurrencyChange, accounts]
    );

    const filteredAccounts = value ? accountsArray.filter(({ code }) => code.includes(value)) : accountsArray;

    return (
        <Content>
            <button onClick={handleClose}>X</button>
            <input onChange={handleChange} value={value} />
            {filteredAccounts.map(({ code }) => <p key={code}><button value={code} onClick={handleClick}>{code}</button></p>)}
        </Content>
    );
};
