import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AtSign, Lock, LogIn } from "lucide-react";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Selsyn - Login";
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        if (data.username !== "admin" || data.password !== "1234") {
          setError({
            username: data.username !== "admin" ? "Credenciais inválidas." : "",
            password: data.password !== "1234" ? "Credenciais inválidas." : "",
          });
        } else {
          setError({ username: "", password: "" });
          navigate("/home"); 
        }
        setProcessing(false);
        resolve();
      }, 500);
    });
  };

  return (
    <div className="min-h-screen bg-[#008DD0] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <img src="/logo.png" alt="Logo" className="w-32 h-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
        </div>

        <form className="flex flex-col gap-5" onSubmit={submit}>
          <div className="relative">
            <AtSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              required
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              placeholder="Usuário"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:border-[#008DD0] focus:ring-1 focus:ring-[#008DD0] outline-none text-gray-800"
            /> 
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Senha"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:border-[#008DD0] focus:ring-1 focus:ring-[#008DD0] outline-none text-gray-800"
            />
          </div>
            {(error.username && <div className="text-red-500 text-sm">{error.username}</div>) || (error.password && <div className="text-red-500 text-sm">{error.password}</div>)}
          <button
            type="submit"
            className="mt-2 w-full flex items-center justify-center gap-2 bg-[#008DD0] hover:bg-[#145F7F] text-white font-medium py-2 rounded-lg transition disabled:opacity-70"
            disabled={processing}
          >
            {processing && (
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12a10 10 0 0 1 10-10" />
              </svg>
            )}
            Entrar
            <LogIn size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
