import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ServiceOrder, Team, ServiceType } from "@/types";
import { Phone } from "lucide-react";

interface ServiceOrderFormProps {
  teams: Team[];
  onSubmit: (data: Partial<ServiceOrder>) => void;
}

const ServiceOrderForm = ({ teams, onSubmit }: ServiceOrderFormProps) => {
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [formData, setFormData] = useState<Partial<ServiceOrder>>({
    serviceType: "installation",
    materials: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const serviceTypes: { value: ServiceType; label: string }[] = [
    { value: "installation", label: "Instalação" },
    { value: "new_installation", label: "Nova Instalação" },
    { value: "repair", label: "Reparo" },
    { value: "other", label: "Outro" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Ordem de Serviço</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Nome do Cliente"
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            />
            
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Telefone"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whatsapp"
                  checked={isWhatsApp}
                  onCheckedChange={(checked) => {
                    setIsWhatsApp(!!checked);
                    setFormData({ ...formData, isWhatsApp: !!checked });
                  }}
                />
                <label htmlFor="whatsapp">WhatsApp</label>
              </div>
            </div>

            <Select
              onValueChange={(value) => setFormData({ ...formData, teamId: Number(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma equipe" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id.toString()}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => setFormData({ ...formData, serviceType: value as ServiceType })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Serviço" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder="Endereço completo"
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />

          <Textarea
            placeholder="Lista de materiais (opcional)"
            onChange={(e) => setFormData({ ...formData, materials: e.target.value.split('\n') })}
          />

          <div className="flex justify-end">
            <Button type="submit">Criar Ordem de Serviço</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceOrderForm;