import React, { useState, useCallback } from 'react';

import { Account, Currency, Operation, UserAccounts } from '../../models';
import { CurrencyMenu, CurrencyInput, Screen, Content, OperationSwitcher, } from '../../Components';
import { useExchange } from '../../hooks';
import { checkExceeded } from '../../utils';

import { Info, Action, Rate, ConfirmButton } from './styled';
import { ChartLine } from './ChartLine';

export interface ExchangeProps {
    accounts: UserAccounts;
    onExchange: ({ sell, buy, amount }: { sell: Currency; buy: Currency; amount: number, operation: Operation }) => void;
    onRecalculate: ({ from, to, amount }: { from: Currency, to: Currency, amount: number }) => number;
}

export const Exchange: React.FC = () => {
    const [accountToChange, setAccountToChange] = useState<Account>();

    const { state, toggleOperation, makeExchange } = useExchange();

    const { operation, top, bottom } = state;

    const handleAccountChange = useCallback((account?: Account) => setAccountToChange(account), [setAccountToChange]);

    if (!!accountToChange) {
        return <CurrencyMenu onCurrencyChange={handleAccountChange} />;
    }

    const exceededBalance = checkExceeded(true, operation, top.account?.balance, top.amount) || checkExceeded(false, operation, bottom.account.balance, bottom.amount);

    return (
        <Screen>
            <Content>
                <Info>
                    <Action>
                        {operation}
                    </Action>
                    <Rate>
                        <ChartLine />
                        {top.account.code} = {top.account.rates[bottom.account.code]}{bottom.account.code}
                    </Rate>
                </Info>
                <CurrencyInput isTop account={top.account} onAccountChange={handleAccountChange} />
                <OperationSwitcher operation={operation} onToggleOperation={toggleOperation} />
                <CurrencyInput account={bottom.account} onAccountChange={handleAccountChange} />
                <ConfirmButton onClick={makeExchange} disabled={exceededBalance || !top.amount || !bottom.amount}>
                    {operation} {top.account.code} for {bottom.account.code}
                </ConfirmButton>
            </Content>
        </Screen>
    );
};
