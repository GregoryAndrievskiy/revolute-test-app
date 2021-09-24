import { useState, useCallback, useEffect } from 'react';
import { useQuery as useQueryLib } from 'react-query'

import { Currency } from '../models';

const APP_ID = '3a6f503e28aa47ddb6682031bd78a828';

const UPDATE_INTERVAL = 10000;

const urlCurrencies = new URL('https://openexchangerates.org/api/currencies.json');
urlCurrencies.searchParams.append('app_id', APP_ID);
const fetchCurrencies = async () => await (await fetch(`${urlCurrencies}`)).json();

const urlLatest = new URL('https://openexchangerates.org/api/latest.json');
urlLatest.searchParams.append('app_id', APP_ID);
const fetchLatest = async () => await (await fetch(`${urlLatest}`)).json();

export const useQuery = function (updateNames: (names: Record<Currency, string>) => void, updateRates: (base: Currency, rates: Record<Currency, number>) => void) {
    const [enabled, setEnabled] = useState(true);

    const handleSuccessCurrencies = useCallback(() => setEnabled(false), []);

    const { isLoading: isLoadingCurrencies, data: currenciesData } = useQueryLib('currencies', fetchCurrencies, { enabled, onSuccess: handleSuccessCurrencies });
    const { isLoading: isLoadingRates, data: ratesData } = useQueryLib('latest', fetchLatest, { refetchInterval: UPDATE_INTERVAL });

    useEffect(() => {
        if (!isLoadingCurrencies && currenciesData) {
            updateNames(currenciesData);
        }
    }, [currenciesData, isLoadingCurrencies, updateNames]);

    useEffect(() => {
        if (!isLoadingRates && ratesData) {
            updateRates(ratesData.base, ratesData.rates);
        }
    }, [ratesData, isLoadingRates, updateRates]);
};
