import { Currency, Account, UserAccounts, Operation } from './models';

import { State } from './provider';

export const init = (accounts: UserAccounts): State => {
    const [top, bottom] = (Object.entries(accounts) as [Currency, Account][]).reduce<Account[]>((accountsArray, [, account]) => [...accountsArray, account], []);

    return {
        accounts,
        active: top,
        top: { account: top, amount: '' },
        bottom: { account: bottom, amount: '' },
        operation: Operation.Buy,
    };
};
