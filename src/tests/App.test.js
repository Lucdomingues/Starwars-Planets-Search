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

it('Verifica filter number igual a', async () => {
  render(<App />);

  const column = screen.getByTestId('column-filter');
  const condition = screen.getByTestId('comparison-filter')
  const inputNumber = screen.getByRole('spinbutton')

  userEvent.selectOptions(column, ['orbital_period'])
  userEvent.selectOptions(condition, ['igual a'])
  userEvent.type(inputNumber, '304');

  const button = screen.getByTestId('button-filter')
  userEvent.click(button);

  const tattoine = await screen.findByText('Tatooine')
  expect(tattoine).toBeInTheDocument()
})

it('Verifica a funcionalidade remove', () => {
  render(<App />);

  const buttonFinter = screen.getByRole('button', { name: /filtrar/i })

  expect(buttonFinter).toBeInTheDocument();
  userEvent.click(buttonFinter)

  const buttonRemove = screen.getByRole('button', { name: /x/i })

  expect(buttonRemove).toBeInTheDocument();
  userEvent.click(buttonRemove)

  expect(buttonRemove).not.toBeInTheDocument()
})
it('Verifica a funcionalidade remove all', () => {
  render(<App />);

  const buttonFinter = screen.getByRole('button', { name: /filtrar/i })
  const buttonRemoveAll = screen.getByRole('button', { name: /remover filtros/i })

  expect(buttonFinter).toBeInTheDocument();
  userEvent.click(buttonFinter)

  const buttonRemove = screen.getByRole('button', { name: /x/i })

  expect(buttonRemove).toBeInTheDocument();
  userEvent.click(buttonRemoveAll)

  expect(buttonRemove).not.toBeInTheDocument()
})

it('Verifica se ao digitar no input faz a renderização certa', async () => {
  render(<App />);

  const inputName = screen.getByRole('textbox')

  expect(inputName).toBeInTheDocument();

  userEvent.type(inputName, 'Ta')

  const tattoine = await screen.findByText('Tatooine')

  expect(tattoine).toBeInTheDocument();
})

it('Verifica filter number menor que', async () => {
  render(<App />);

  const column = screen.getByTestId('column-filter');
  const condition = screen.getByTestId('comparison-filter')
  const inputNumber = screen.getByRole('spinbutton')

  userEvent.selectOptions(column, ['population'])
  userEvent.selectOptions(condition, ['menor que'])
  userEvent.type(inputNumber, '2000');

  const button = screen.getByTestId('button-filter')
  userEvent.click(button);

  const yavin = await screen.findByText('Yavin IV')
  expect(yavin).toBeInTheDocument()
})

it('Verifica a funcionalidade sort ASC', async () => {
  render(<App />);

  const column = screen.getByTestId('column-sort');
  const condition = screen.getByTestId('column-sort-input-asc')
  const buttonSort = screen.getByTestId('column-sort-button')

  userEvent.selectOptions(column, ['population'])
  userEvent.click(condition)
  userEvent.click(buttonSort)

  const yavin = await screen.findByText('Yavin IV')
  expect(yavin).toBeInTheDocument()
})

it('Verifica a funcionalidade sort DESC', async () => {
  render(<App />);

  const column = screen.getByTestId('column-sort');
  const condition = screen.getByTestId('column-sort-input-desc')
  const buttonSort = screen.getByTestId('column-sort-button')

  userEvent.selectOptions(column, ['population'])
  userEvent.click(condition)
  userEvent.click(buttonSort)

  const coruscant = await screen.findByText('Coruscant')
  expect(coruscant).toBeInTheDocument()
})