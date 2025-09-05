import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./login";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Login Page", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it("renderiza inputs, botão e título", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Usuário/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("exibe alerta para credenciais inválidas", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/Usuário/i), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/credenciais inválidas/i).length).toBeGreaterThan(0);
    });
  });

  it("navega para a página de boas-vindas com credenciais válidas", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/Usuário/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/home");
    });
  });
});
