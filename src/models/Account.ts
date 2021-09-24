import { Currency } from "./Currency";

export interface Account {
    code: Currency;
    name?: string;
    rates: Partial<Record<Currency, number>>;
    balance: number;
}
