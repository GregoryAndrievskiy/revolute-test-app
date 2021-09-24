import { Currency } from "./Currency";

export interface Account {
    code: Currency;
    rates: Partial<Record<Currency, number>>;
    balance: number;
}
