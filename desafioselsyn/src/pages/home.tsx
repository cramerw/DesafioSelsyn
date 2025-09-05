import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ApiItem {
  id: number;
  rastreavel: boolean;
  tipo: string;
  latitude: number;
  longitude: number;
  velocidade: number;
  ignicao: boolean;
  odometro: number;
  horimetro: number;
  dataHora: string;
}

function Home() {
  const [abertoLista, setAbertoLista] = useState(true);
  const [apiData, setApiData] = useState<ApiItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Selsyn - Home";
    setLoading(true);

    fetch('http://localhost:4000/api/posicao')
      .then((res) => {
        if (!res.ok) return res.text().then((text) => { throw new Error(text); });
        return res.json();
      })
      .then((data: ApiItem[]) => setApiData(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
  <main className="min-h-screen bg-[#008DD0] flex items-center justify-center px-2">
  <div className="bg-white rounded-2xl shadow-lg p-10 w-[70%]">
  <section className="w-full mt-3 space-y-6">
        <div>
          <div className="mt-2 mb-3 w-fit">
            <img src="/logo.png" alt="Logo" className="w-32 h-auto mb-4" />
            <h1 className="text-2xl font-bold text-black">Seja Bem-vindo!</h1>
            <hr className="mt-1 bg-[#008DD0] h-0.5" />
          </div>
          <p className="text-md text-gray-700">
            Integração com API da Selsyn Tecnologia.
          </p>
        </div>

            <div className="border border-[#008DD0] rounded-xl p-4 w-full">
              <div className="w-full">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setAbertoLista((prev) => !prev)}
                >
                  <h2 className="text-lg font-medium">Dados da API</h2>
                  {abertoLista ? <ChevronUp /> : <ChevronDown />}
                </div>

                {abertoLista && (
                  <div className="mt-4 space-y-4">
                    {loading && <p>Carregando dados...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {!loading && !error && apiData.length > 0 && (
                      <div className="p-2 bg-gray-100 rounded w-full flex flex-col items-center">
                        <div className="w-full overflow-x-auto">
                          <table className="min-w-[700px] w-full border border-gray-300 text-sm">
                            <thead className="bg-gray-200">
                              <tr>
                                <th className="px-2 py-1">ID</th>
                                <th className="px-2 py-1">Rastreável</th>
                                <th className="px-2 py-1">Tipo</th>
                                <th className="px-2 py-1">Latitude</th>
                                <th className="px-2 py-1">Longitude</th>
                                <th className="px-2 py-1">Velocidade</th>
                                <th className="px-2 py-1">Ignição</th>
                                <th className="px-2 py-1">Odômetro</th>
                                <th className="px-2 py-1">Horímetro</th>
                                <th className="px-2 py-1">Data Hora</th>
                                <th className="px-2 py-1">Mapa</th>
                              </tr>
                            </thead>
                            <tbody>
                              {apiData.map((item) => (
                                <tr key={item.id} className="border-t text-center">
                                  <td className="px-2 py-1 text-center">{item.id}</td>
                                  <td className="px-2 py-1 text-center">{item.rastreavel ? "Sim" : "Não"}</td>
                                  <td className="px-2 py-1 text-center">{item.tipo}</td>
                                  <td className="px-2 py-1 text-center">{item.latitude}</td>
                                  <td className="px-2 py-1 text-center">{item.longitude}</td>
                                  <td className="px-2 py-1 text-center">{item.velocidade}</td>
                                  <td className="px-2 py-1 text-center">{item.ignicao ? "Sim" : "Não"}</td>
                                  <td className="px-2 py-1 text-center">{item.odometro}</td>
                                  <td className="px-2 py-1 text-center">{item.horimetro}</td>
                                  <td className="px-2 py-1 text-center">
                                    {new Date(item.dataHora).toLocaleString("pt-BR")}
                                  </td>
                                  <td className="px-2 py-1 text-center">
                                    <a
                                      href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      Ver no Google Maps
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {!loading && !error && apiData.length === 0 && (
                      <p>Nenhum dado disponível.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
      </section>
      </div>
    </main>
  );
}

export default Home;