import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao sistema de ordens de serviço",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
            alt="Security Logo" 
            className="h-16 w-16 object-cover rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="text-gray-600">Sistema de Ordens de Serviço</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;