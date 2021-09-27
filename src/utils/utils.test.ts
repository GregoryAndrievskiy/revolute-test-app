import { Account, Currency, Operation, UserAccounts } from '../models';
import { convert, exchange, checkExceeded } from './utils';

const BASE = 'USD' as Currency;

const RATES = {
    'EUR': 2,
    'GBP': 7,
}

const USD_ACCOUNT = {
    code: 'USD',
    balance: 200,
} as Account;

const EUR_ACCOUNT = {
    code: 'EUR',
    balance: 100,
} as Account;

const STATE = {
    accounts: {
        'USD': USD_ACCOUNT,
        'EUR': EUR_ACCOUNT,
    } as UserAccounts,
    rates: RATES,
    base: BASE,
    active: USD_ACCOUNT,
    top: {
        amount: '100',
        account: USD_ACCOUNT,
    },
    bottom: {
        amount: '200',
        account: EUR_ACCOUNT,
    },
    operation: Operation.Sell,
};

describe('utils', () => {
    it('convert should convert correctly', () => {
        const amount = convert(RATES, BASE, 'EUR', 'GBP', '900.00');

        expect(amount).toBe('3150.00');
    });

    it('exchange should make correct exchange operation', () => {
        const updatedState = exchange(STATE);

        expect(updatedState).toMatchObject({
            ...STATE,
            accounts: {
                ...STATE.accounts,
                'USD': {
                    code: 'USD',
                    balance: 100,
                },
                'EUR': {
                    code: 'EUR',
                    balance: 300,
                },
            },
            active: {
                code: 'USD',
                balance: 100,
            },
            top: {
                amount: '100',
                account: {
                    code: 'USD',
                    balance: 100,
                },
            },
            bottom: {
                amount: '200',
                account: {
                    code: 'EUR',
                    balance: 300,
                },
            },
        });
    });

    it('checkExceeded should make correct check', () => {
        const result = checkExceeded(true, Operation.Sell, 100, '150');

        expect(result).toBeTruthy();
    });
});
