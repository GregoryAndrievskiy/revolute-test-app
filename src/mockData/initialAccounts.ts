import { UserAccounts } from "../models";


export const initialAccounts: UserAccounts = {
    USD: {
        code: 'USD',
        rates: { EUR: 0.9, GBP: 0.8 },
        balance: 800.77,
    },
    EUR: {
        code: 'EUR',
        rates: { USD: 1.11, GBP: 0.88 },
        balance: 150.44,
    },
    GBP: {
        code: 'GBP',
        rates: { USD: 1.25, EUR: 1.125 },
        balance: 200.05,
    },
};
