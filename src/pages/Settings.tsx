import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface TeamUser {
  id: number;
  username: string;
  password: string;
  teamId: number;
}

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teams, setTeams] = useState([
    { id: 1, name: "Equipe A" },
    { id: 2, name: "Equipe B" },
  ]);
  const [newTeamName, setNewTeamName] = useState("");
  
  // New state for user management
  const [users, setUsers] = useState<TeamUser[]>([
    { id: 1, username: "team1", password: "team1", teamId: 1 },
  ]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState<number>(1);

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      setTeams([...teams, { id: Date.now(), name: newTeamName.trim() }]);
      setNewTeamName("");
      toast({
        title: "Equipe adicionada",
        description: `A equipe ${newTeamName} foi adicionada com sucesso.`
      });
    }
  };

  const handleRemoveTeam = (id: number) => {
    setTeams(teams.filter(team => team.id !== id));
    setUsers(users.filter(user => user.teamId !== id));
    toast({
      title: "Equipe removida",
      description: "A equipe e seus usuários foram removidos com sucesso."
    });
  };

  const handleAddUser = () => {
    if (newUsername && newPassword && selectedTeamId) {
      const newUser: TeamUser = {
        id: Date.now(),
        username: newUsername,
        password: newPassword,
        teamId: selectedTeamId
      };
      setUsers([...users, newUser]);
      setNewUsername("");
      setNewPassword("");
      toast({
        title: "Usuário adicionado",
        description: `O usuário ${newUsername} foi adicionado com sucesso.`
      });
    }
  };

  const handleRemoveUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "Usuário removido",
      description: "O usuário foi removido com sucesso."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="teams" className="max-w-2xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="teams">Equipes</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Equipes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6">
                  <Input
                    placeholder="Nome da nova equipe"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                  />
                  <Button onClick={handleAddTeam}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-2">
                  {teams.map((team) => (
                    <div
                      key={team.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span>{team.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTeam(team.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Input
                    placeholder="Nome de usuário"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(Number(e.target.value))}
                  >
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                  <Button onClick={handleAddUser} className="md:col-span-2">
                    <Users className="w-4 h-4 mr-2" />
                    Adicionar Usuário
                  </Button>
                </div>

                <div className="space-y-2">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <span className="font-medium">{user.username}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({teams.find(t => t.id === user.teamId)?.name})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;