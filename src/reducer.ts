import { State, Actions, Payload } from './provider';
import { invertOperation, convert, exchange } from './utils';

enum invertInput {
    top = 'bottom',
    bottom = 'top',
}

export const reducer = (state: State, payload: Payload) => {
    const { active, top, operation } = state;
    const { account: { code: topCode } } = top;
    const isTopActive = topCode === active.code;
    const activeKey = isTopActive ? 'top' : 'bottom';
    const passiveKey = invertInput[activeKey];
    const activeAccount = state[activeKey].account;
    const passiveAccount = state[passiveKey].account;

    switch (payload.type) {
        case Actions.ChangeActiveAccount:
            return {
                ...state,
                active: payload.account!,
            };
        case Actions.ChangeActiveAmount:
            return {
                ...state,
                [activeKey]: {
                    ...state[activeKey],
                    amount: payload.amount!,
                },
                [passiveKey]: {
                    ...state[passiveKey],
                    amount: convert(state.rates, state.base, activeAccount.code, passiveAccount.code, payload.amount!),
                }
            };
        case Actions.ChangeAccount:
            if (payload.account!.code === passiveAccount.code) {
                return {
                    ...state,
                    active: {
                        ...passiveAccount,
                        amount: '',
                    },
                    [activeKey]: {
                        account: passiveAccount,
                        amount: '',
                    },
                    [passiveKey]: {
                        account: activeAccount,
                        amount: '',
                    },
                };
            }

            return {
                ...state,
                active: payload.account!,
                [activeKey]: {
                    account: payload.account!,
                    amount: '',
                },
                [passiveKey]: {
                    ...state[passiveKey],
                    amount: '',
                },
            };
        case Actions.Exchange:
            return exchange(state);
        case Actions.ToggleOperation:
            return {
                ...state,
                operation: invertOperation[operation],
            };
        case Actions.UpdateNames:
            return {
                ...state,
                names: payload.names!,
            };
        case Actions.UpdateRates:
            return {
                ...state,
                rates: payload.rates!,
                base: payload.base!,
            };
        default:
            return state;
    }
}