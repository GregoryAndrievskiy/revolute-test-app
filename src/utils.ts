import { Account, Currency, Operation, UserAccounts } from "./models";
import { State, ExchangeSide } from './provider';

export const invertOperation = {
    [Operation.Sell]: Operation.Buy,
    [Operation.Buy]: Operation.Sell,
}

const PRECISION = 2;
const MULTIPLIER = 10 ** PRECISION;

export const mutateNumber = (value: number) => Math.round(value * MULTIPLIER);

export const convert = (acitveAccount: Account, passiveAccount: Account, amount: string) => {
    if (!amount) {
        return amount;
    }

    const { rates, } = acitveAccount;
    const { code } = passiveAccount;
    const rate = rates[code];

    if (!rate) {
        throw new Error(`rate ${acitveAccount.code}/${code} not found`);
    }

    const numericAmount = parseFloat(amount);
    const mutatedAmount = mutateNumber(numericAmount);
    const mutatedRate = mutateNumber(rate);
    const mutatedNumericResult = Math.round(mutatedAmount * mutatedRate);
    const numericResult = Math.round(mutatedNumericResult / MULTIPLIER) / MULTIPLIER;

    return numericResult.toFixed(2);
};

const makeOperation = (
    operation: Operation,
    side: ExchangeSide,
) => {
    const { account, amount } = side;
    const { balance } = account;

    const mutatedBalance = mutateNumber(balance);
    const numericAmount = parseFloat(amount);
    const mutatedAmount = mutateNumber(numericAmount);
    const mutatedNumericResult = Math.round(
        operation === Operation.Sell
            ? mutatedBalance - mutatedAmount
            : mutatedBalance + mutatedAmount
    );

    return {
        ...account,
        balance: Number((mutatedNumericResult / MULTIPLIER).toFixed(2)),
    };
};

export const exchange = (state: State) => {
    const { accounts, top, bottom, operation } = state;
    const updatedTop = makeOperation(operation, top);
    const updatedBottom = makeOperation(invertOperation[operation], bottom);

    return {
        ...state,
        top: {
            ...top,
            account: updatedTop
        },
        bottom: {
            ...bottom,
            account: updatedBottom
        },
        accounts: {
            ...accounts,
            [top.account.code]: updatedTop,
            [bottom.account.code]: updatedBottom,
        },
    };
};

export const updateNames = (names: Record<Currency, string>, state: State) => {
    return {
        ...state,
        accounts: Object.entries(state.accounts)
            .reduce((newAccounts, [currency, account]) => ({
                ...newAccounts,
                [currency]: {
                    ...account,
                    name: names[currency as Currency],
                }
            }), {} as UserAccounts),
    };
};

export const updateRates = (base: Currency, rates: Record<Currency, number>, state: State) => {
    const newRates = {
        ...state,
        top: {
            ...state.top,
            account: {
                ...state.top.account,
                rates: Object.entries(state.top.account.rates).reduce((newRates, [rateCurrency]) => ({
                    ...newRates,
                    [rateCurrency]: getRatesWithBase(base, state.top.account.code, rateCurrency as Currency, rates)
                }), {}),
            }
        },
        bottom: {
            ...state.bottom,
            account: {
                ...state.bottom.account,
                rates: Object.entries(state.bottom.account.rates).reduce((newRates, [rateCurrency]) => ({
                    ...newRates,
                    [rateCurrency]: getRatesWithBase(base, state.bottom.account.code, rateCurrency as Currency, rates)
                }), {}),
            },
        },
        accounts: Object.entries(state.accounts)
            .reduce((newAccounts, [currency, account]) => ({
                ...newAccounts,
                [currency]: {
                    ...account,
                    rates: Object.entries(account.rates).reduce((newRates, [rateCurrency]) => ({
                        ...newRates,
                        [rateCurrency]: getRatesWithBase(base, currency as Currency, rateCurrency as Currency, rates)
                    }), {}),
                }
            }), {} as UserAccounts),
    };

    return newRates;
};

const getRatesWithBase = (base: Currency, currency: Currency, toCurrency: Currency, rates: Record<Currency, number>) => {
    if (base === currency) {
        return rates[toCurrency];
    }

    const currecyRate = rates[currency];
    const toCurrencyRate = rates[toCurrency];

    return parseFloat((toCurrencyRate / currecyRate).toFixed(8));
};

export const checkExceeded = (isTop: boolean, operation: Operation, balance: number, amount: string) => {
    if (isTop) {
        return operation === Operation.Sell ? balance < parseFloat(amount) : false;
    }

    return operation === Operation.Buy ? balance < parseFloat(amount) : false;
};
