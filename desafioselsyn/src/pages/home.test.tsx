import { render, screen, waitFor } from "@testing-library/react";
import Home from "./home";

const mockApiData = [
  {
    id: 1,
    rastreavel: true,
    tipo: "Carro",
    latitude: -23.5,
    longitude: -46.6,
    velocidade: 80,
    ignicao: true,
    odometro: 1000,
    horimetro: 50,
    dataHora: "2025-09-04T12:00:00Z",
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockApiData),
  })
) as jest.Mock;

describe("Home Page (API)", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("faz requisição à API da Selsyn ao montar", async () => {
    render(<Home />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/api/posicao");
    });
  });

  it("exibe os dados retornados na tabela", async () => {
    render(<Home />);
    expect(await screen.findByText("Carro")).toBeInTheDocument();
    expect(screen.getAllByText("Sim").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("Ver no Google Maps")).toBeInTheDocument();
  });

  it("testa navegação do link para o Google Maps", async () => {
    render(<Home />);
    const link = await screen.findByText("Ver no Google Maps");
    expect(link).toHaveAttribute(
      "href",
      "https://www.google.com/maps?q=-23.5,-46.6"
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
