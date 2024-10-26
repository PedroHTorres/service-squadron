import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Plus, Settings, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ServiceOrder, ServiceStatus, Team } from "@/types";
import ServiceOrderForm from "@/components/ServiceOrderForm";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [teams] = useState<Team[]>([
    { id: 1, name: "Equipe A" },
    { id: 2, name: "Equipe B" },
  ]);

  const [orders] = useState<ServiceOrder[]>([
    {
      id: 1,
      clientName: "João Silva",
      phone: "11999887766",
      isWhatsApp: true,
      address: "Rua das Flores, 123 - Centro",
      serviceType: "installation",
      status: "open",
      teamId: 1,
      materials: ["Câmera IP", "DVR", "Cabo"],
      observations: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      clientName: "Maria Santos",
      phone: "11988776655",
      isWhatsApp: true,
      address: "Av. Principal, 456 - Jardim América",
      serviceType: "repair",
      status: "waiting_parts",
      teamId: 2,
      materials: ["Fonte 12V", "Conector BNC"],
      observations: "Cliente relatou que câmera não está funcionando",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      clientName: "Carlos Oliveira",
      phone: "11977665544",
      isWhatsApp: true,
      address: "Rua Secundária, 789 - Vila Nova",
      serviceType: "installation",
      status: "open",
      teamId: undefined, // Ordem bônus - sem equipe atribuída
      materials: ["Câmera IP", "Cabo"],
      observations: "Instalação simples",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  // Filtra as ordens baseado no tipo de usuário e equipe
  const filteredOrders = orders.filter(order => {
    if (user?.role === "admin") {
      return true; // Admin vê todas as ordens
    }
    // Equipe vê suas próprias ordens + ordens sem equipe atribuída
    return order.teamId === user?.teamId || order.teamId === undefined;
  });

  const statusData = [
    { name: "Abertas", value: filteredOrders.filter(o => o.status === "open").length },
    { name: "Em Andamento", value: filteredOrders.filter(o => o.status === "in_progress").length },
    { name: "Aguardando Peças", value: filteredOrders.filter(o => o.status === "waiting_parts").length },
    { name: "Cliente Ausente", value: filteredOrders.filter(o => o.status === "client_absent").length },
    { name: "Problemas Pós-visita", value: filteredOrders.filter(o => o.status === "post_visit_issues").length },
  ];

  const handleCreateOrder = (data: Partial<ServiceOrder>) => {
    console.log("Nova ordem:", data);
    setShowNewOrderForm(false);
  };

  const handleWhatsAppClick = (phone: string) => {
    const formattedPhone = phone.replace(/\D/g, "");
    window.open(`https://wa.me/${formattedPhone}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Ordens de Serviço</h1>
          <div className="flex items-center gap-4">
            {user?.role === "admin" && (
              <Button variant="outline" onClick={() => navigate("/settings")}>
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            )}
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
          {user?.role === "admin" && (
            <Button onClick={() => setShowNewOrderForm(!showNewOrderForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Ordem de Serviço
            </Button>
          )}
        </div>

        {showNewOrderForm && user?.role === "admin" && (
          <div className="mb-8">
            <ServiceOrderForm teams={teams} onSubmit={handleCreateOrder} />
          </div>
        )}

        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Status das Ordens</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0066FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium">Ordens de Serviço</h3>
          </div>
          <div className="divide-y">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{order.clientName}</h4>
                    <p className="text-sm text-gray-600">{order.address}</p>
                    <p className="text-sm text-gray-600">
                      Tipo: {order.serviceType} | Status: {order.status}
                    </p>
                    {order.teamId === undefined && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Ordem Bônus Disponível
                      </span>
                    )}
                    {order.materials && order.materials.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Materiais: {order.materials.join(", ")}
                      </p>
                    )}
                    {order.observations && (
                      <p className="text-sm text-gray-600">
                        Observações: {order.observations}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {order.isWhatsApp && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleWhatsAppClick(order.phone)}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;