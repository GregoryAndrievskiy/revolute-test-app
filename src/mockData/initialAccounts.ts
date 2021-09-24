import { UserAccounts } from "../models";


export const initialAccounts: UserAccounts = {
    USD: {
        code: 'USD',
        rates: { EUR: 0.85, GBP: 0.73, MXN: 20 },
        balance: 800.77,
    },
    EUR: {
        code: 'EUR',
        name: 'Euro',
        rates: { USD: 1.18, GBP: 0.86, MXN: 23.6 },
        balance: 150.44,
    },
    GBP: {
        code: 'GBP',
        rates: { USD: 1.37, EUR: 1.16, MXN: 27.4 },
        balance: 200.05,
    },
    MXN: {
        code: 'MXN',
        rates: { USD: 0.05, EUR: 0.04, GBP: 0.03 },
        balance: 300,
    },
};
