import { Currency, Account, UserAccounts, Operation } from './models';

import { State } from './provider';

const initRates = {
    EUR: 1.18,
    GBP: 0.73,
    MXN: 20,
};

export const init = (accounts: UserAccounts): State => {
    const [top, bottom] = (Object.entries(accounts) as [Currency, Account][]).reduce<Account[]>((accountsArray, [, account]) => [...accountsArray, account], []);

    return {
        accounts,
        active: top,
        top: { account: top, amount: '' },
        bottom: { account: bottom, amount: '' },
        operation: Operation.Buy,
        rates: initRates,
        base: 'USD',
    };
};
