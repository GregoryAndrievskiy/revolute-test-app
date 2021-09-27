import React, { useState, useCallback, useEffect } from 'react';

import { Account, Operation } from '../../models';
import { useExchange } from '../../hooks';
import { checkExceeded } from '../../utils';

import { Wrapper, StartAdornment, ChangeButton, Label, HelperText, InputField } from './styled';
import { ChevronDown } from './ChevronDown';

const operationMap = {
    [Operation.Sell]: '-',
    [Operation.Buy]: '+',
};

const invertedOperationMap = {
    [Operation.Sell]: '+',
    [Operation.Buy]: '-',
};

export interface CurrencyInputProps {
    isTop?: boolean;
    account: Account;
    onAccountChange: (account: Account) => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ isTop = false, account, onAccountChange }) => {
    const { state: { active: { code: activeCode }, operation, top, bottom }, changeActiveAccount, changeActiveAmmount } = useExchange();

    const { code, balance } = account;
    const active = code === activeCode;
    const { amount } = (isTop ? top : bottom);
    const numericAmount = parseFloat(amount);

    const [prefix, setPrefix] = useState(numericAmount > 0 ? operationMap[operation] : '');

    const handleClick = useCallback(() => onAccountChange(account), [onAccountChange, account]);

    const handleAmountChange = useCallback(
        event => {
            const inputValue: string = event.target.value;

            const pureValue = inputValue.replace(/[^0-9.]/g, '').replace(/^0+/, '');

            if (pureValue === '' || parseFloat(pureValue) === 0) {
                changeActiveAmmount('');
                return;
            }

            if (/^\d*[.]{0,1}\d{0,2}$/.test(pureValue)) {
                changeActiveAmmount(pureValue.startsWith('.') ? `0${pureValue}` : pureValue);
            }
        },
        [changeActiveAmmount],
    );

    const handleFocus = useCallback(() => changeActiveAccount(account), [changeActiveAccount, account]);

    useEffect(() => {
        setPrefix(numericAmount > 0 ? (isTop ? operationMap[operation] : invertedOperationMap[operation]) : '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount, operation]);

    return (
        <Wrapper data-testid={isTop ? 'top-container' : 'bottom-container'}>
            <StartAdornment>
                <ChangeButton data-testid="change-account-btn" onClick={handleClick}>
                    {account.code}<ChevronDown />
                </ChangeButton>
                <Label>
                    {`Balance ${balance}`}
                </Label>
            </StartAdornment>
            <InputField data-testid={isTop ? 'top-input' : 'bottom-input'} value={(!active && !amount) ? '' : `${prefix}${amount}`} onChange={handleAmountChange} placeholder="0" type="text" onFocus={handleFocus} />
            <HelperText>
                {checkExceeded(isTop, operation, balance, amount) && 'exceeds balance'}
            </HelperText>
        </Wrapper>
    )
}