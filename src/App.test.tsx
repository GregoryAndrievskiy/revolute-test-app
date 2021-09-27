import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';

test('renders initial state', () => {
  render(<App />);
  const operationText = screen.getByText('buy USD');
  expect(operationText).toBeInTheDocument();

  const exchangeRateText = screen.getByText('1USD = 0.85EUR');
  expect(exchangeRateText).toBeInTheDocument();

  const topInput = screen.getByTestId('top-container');
  expect(topInput).toBeInTheDocument();
  const topBalance = within(topInput).getByText('Balance 800.77');
  expect(topBalance).toBeInTheDocument();

  const bottomInput = screen.getByTestId('bottom-container');
  expect(bottomInput).toBeInTheDocument();
  const bottomBalance = within(bottomInput).getByText('Balance 150.44');
  expect(bottomBalance).toBeInTheDocument();
});

test('should switch operation correctly:', () => {
  render(<App />);
  const buyText = screen.getByText('buy USD');
  expect(buyText).toBeInTheDocument();

  const switchButton = screen.getByTestId('switch-btn');
  switchButton.click();
  const sellText = screen.getByText('sell USD');
  expect(sellText).toBeInTheDocument();
});

test('should change account correctly:', () => {
  render(<App />);
  const topInput = screen.getByTestId('top-container');
  expect(topInput).toBeInTheDocument();
  const changeAccountBtn = within(topInput).getByTestId('change-account-btn');
  expect(changeAccountBtn).toBeInTheDocument();
  changeAccountBtn.click();

  const currencyList = screen.getByTestId('currenct-list');
  expect(currencyList).toBeInTheDocument();
  const euroCurrencyItem = within(currencyList).getByTestId('EUR-item');
  expect(euroCurrencyItem).toBeInTheDocument();
  euroCurrencyItem.click();

  const operationText = screen.getByText('buy EUR');
  expect(operationText).toBeInTheDocument();

  const changedTopInput = screen.getByTestId('top-container');
  expect(changedTopInput).toBeInTheDocument();
  within(changedTopInput).getByText('Balance 150.44')

  const changedBottomInput = screen.getByTestId('bottom-container');
  expect(changedBottomInput).toBeInTheDocument();
  within(changedBottomInput).getByText('Balance 800.77')
});

test('should filter accounts correctly:', () => {
  render(<App />);
  const topInput = screen.getByTestId('top-container');
  expect(topInput).toBeInTheDocument();
  const changeAccountBtn = within(topInput).getByTestId('change-account-btn');
  expect(changeAccountBtn).toBeInTheDocument();
  changeAccountBtn.click();

  const currencyList = screen.getByTestId('currenct-list');
  expect(currencyList).toBeInTheDocument();
  const currencyItems = within(currencyList).getAllByRole('option');
  expect(currencyItems.length).toEqual(3);

  const currencyInput = screen.getByTestId('currency-input');
  fireEvent.change(currencyInput, { target: { value: 'EUR' } });

  const updatedCurrencyItems = within(currencyList).getAllByRole('option');
  expect(updatedCurrencyItems.length).toEqual(1);
});

test('should make exchange correctly:', () => {
  render(<App />);
  const buyText = screen.getByText('buy USD');
  expect(buyText).toBeInTheDocument();

  const top = screen.getByTestId('top-container');
  expect(top).toBeInTheDocument();
  const topBalance = within(top).getByText('Balance 800.77');
  expect(topBalance).toBeInTheDocument();
  const topInput = within(top).getByTestId('top-input');
  expect(topInput).toBeInTheDocument();

  fireEvent.change(topInput, { target: { value: '100' } });
  const topInputValue = within(top).getByDisplayValue('+100')
  expect(topInputValue).toBeInTheDocument();

  const bottom = screen.getByTestId('bottom-container');
  expect(bottom).toBeInTheDocument();
  const bottomBalance = within(bottom).getByText('Balance 150.44');
  expect(bottomBalance).toBeInTheDocument();
  const bottomInput = within(bottom).getByTestId('bottom-input');
  expect(bottomInput).toBeInTheDocument();
  const bottomInputValue = within(bottom).getByDisplayValue('-85.00')
  expect(bottomInputValue).toBeInTheDocument();

  const confirmBtn = screen.getByTestId('confirm-btn');
  expect(confirmBtn).toBeInTheDocument();
  confirmBtn.click();

  const updatedTopBalance = within(top).getByText('Balance 900.77');
  expect(updatedTopBalance).toBeInTheDocument();

  const updatedBottomBalance = within(bottom).getByText('Balance 65.44');
  expect(updatedBottomBalance).toBeInTheDocument();

  const exceededMessage = within(bottom).getByText('exceeds balance');
  expect(exceededMessage).toBeInTheDocument();
  expect(confirmBtn).toBeDisabled();
});
