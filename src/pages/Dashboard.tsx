import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Plus, Settings } from "lucide-react";

const Dashboard = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Ordens de Serviço</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.location.href = "/settings"}>
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button variant="ghost" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Bem-vindo, {user?.name}
          </h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Ordem de Serviço
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-medium text-gray-600 mb-2">Ordens Abertas</h3>
            <p className="text-3xl font-bold text-primary">12</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-medium text-gray-600 mb-2">Em Andamento</h3>
            <p className="text-3xl font-bold text-secondary">5</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-medium text-gray-600 mb-2">Concluídas Hoje</h3>
            <p className="text-3xl font-bold text-gray-900">8</p>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Ordens Recentes</h3>
          <div className="text-gray-600 text-center py-8">
            Carregando ordens de serviço...
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;