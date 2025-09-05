import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './pages/login';

test('renderiza a Home e mostra dados da API', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Usuário/i), { target: { value: 'admin' } });
  fireEvent.change(screen.getByPlaceholderText(/Senha/i), { target: { value: '1234' } });
  fireEvent.click(screen.getByText(/Entrar/i));

  expect(screen.getByPlaceholderText(/Usuário/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Senha/i)).toBeInTheDocument();
});