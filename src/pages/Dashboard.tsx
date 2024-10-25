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

  const [orders] = useState<ServiceOrder[]>([]);

  const statusData = [
    { name: "Abertas", value: orders.filter(o => o.status === "open").length },
    { name: "Em Andamento", value: orders.filter(o => o.status === "in_progress").length },
    { name: "Aguardando Peças", value: orders.filter(o => o.status === "waiting_parts").length },
    { name: "Cliente Ausente", value: orders.filter(o => o.status === "client_absent").length },
    { name: "Problemas Pós-visita", value: orders.filter(o => o.status === "post_visit_issues").length },
  ];

  const handleCreateOrder = (data: Partial<ServiceOrder>) => {
    // Aqui você implementaria a lógica para salvar a ordem
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
            <Button variant="outline" onClick={() => navigate("/settings")}>
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
          <Button onClick={() => setShowNewOrderForm(!showNewOrderForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Ordem de Serviço
          </Button>
        </div>

        {showNewOrderForm && (
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
            {orders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{order.clientName}</h4>
                    <p className="text-sm text-gray-600">{order.address}</p>
                    <p className="text-sm text-gray-600">
                      Tipo: {order.serviceType} | Status: {order.status}
                    </p>
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