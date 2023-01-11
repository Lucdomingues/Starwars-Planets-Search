import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

it('Verifica filter number', async () => {
  render(<App />);

  const column = screen.getByTestId('column-filter');
  const condition = screen.getByTestId('comparison-filter')
  const inputNumber = screen.getByRole('spinbutton')

  userEvent.selectOptions(column, ['orbital_period'])
  userEvent.selectOptions(condition, ['igual a'])
  userEvent.type(inputNumber, '304');

  const button = screen.getByTestId('button-filter')
  userEvent.click(button);

  const tatooine = await screen.getByRole('cell', { name: /tatooine/i });
  expect(tatooine).toBeInTheDocument()
})