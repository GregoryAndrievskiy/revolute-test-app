import { Currency, Operation } from "../models";
import { State, ExchangeSide } from '../provider';

export const invertOperation = {
    [Operation.Sell]: Operation.Buy,
    [Operation.Buy]: Operation.Sell,
}

const PRECISION = 2;
const MULTIPLIER = 10 ** PRECISION;

const mutateNumber = (value: number) => Math.round(value * MULTIPLIER);

const calculateRate = (rates: Partial<Record<Currency, number>>, base: Currency, from: Currency, to: Currency): number => {
    if (base === from) {
        return rates[to]!;
    }

    if (base === to) {
        return parseFloat((1! / rates[from]!).toFixed(8));
    }

    const fromCurrecyRate = rates[from];
    const toCurrencyRate = rates[to];

    if (!fromCurrecyRate) {
        throw new Error(`rate ${base}/${from} not found`);
    }

    if (!toCurrencyRate) {
        throw new Error(`rate ${base}/${to} not found`);
    }

    return parseFloat((toCurrencyRate! / fromCurrecyRate!).toFixed(8));
};

export const convert = (rates: Partial<Record<Currency, number>>, base: Currency, from: Currency, to: Currency, amount: string) => {
    const rate = calculateRate(rates, base, from, to);

    if (!rate) {
        throw new Error(`rate ${from}/${to} not found`);
    }

    if (!amount) {
        return ''
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
        active: updatedTop,
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

export const checkExceeded = (isTop: boolean, operation: Operation, balance: number, amount: string) => {
    if (isTop) {
        return operation === Operation.Sell ? balance < parseFloat(amount) : false;
    }

    return operation === Operation.Buy ? balance < parseFloat(amount) : false;
};
