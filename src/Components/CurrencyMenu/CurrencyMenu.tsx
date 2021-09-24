import React, { useState, useCallback, useMemo } from 'react';

import { Content } from '../styled';
import { useExchange } from '../../hooks';
import { Currency } from '../../models';

import { Screen, CurrencySearch, List, ListItem, Label, Dot, Name } from './styled';
import { ArrowLeft } from './ArrowLeft';
import { Close } from './Close';

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
            const value = event.currentTarget.getAttribute('data-currency');
            changeAccount(accounts[value as Currency]);
            onCurrencyChange();
        },
        [changeAccount, onCurrencyChange, accounts]
    );

    const handleClear = useCallback(() => setValue(''), []);

    const filteredAccounts = value ? accountsArray.filter(({ code }) => code.includes(value)) : accountsArray;

    return (
        <Screen>
            <Content>
                <CurrencySearch>
                    <button onClick={handleClose}><ArrowLeft /></button>
                    <input onChange={handleChange} value={value} />
                    <button onClick={handleClear}><Close /></button>
                </CurrencySearch>
                <List>
                    {filteredAccounts.map(({ code, name, balance }) => (
                        <ListItem key={code} data-currency={code} onClick={handleClick}>
                            <Label>{code}<Dot />{balance}</Label>
                            <Name>{name}</Name>
                        </ListItem>
                    ))}
                </List>
            </Content>
        </Screen>
    );
};
