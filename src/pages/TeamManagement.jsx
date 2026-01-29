import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  PlusIcon,
  EditIcon,
  Trash2Icon,
  UsersIcon,
  SearchIcon,
  ShieldCheckIcon
} from "lucide-react"
import { toast } from "sonner"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarSacado } from "@/components/app-sidebar-sacado"

const mockTeamMembers = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@alpha.com.br",
    role: "Administrador Financeiro",
    status: "Ativo",
    dataAdicao: "2024-01-15"
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@alpha.com.br",
    role: "Aprovador",
    status: "Ativo",
    dataAdicao: "2024-02-10"
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro.costa@alpha.com.br",
    role: "Operador",
    status: "Ativo",
    dataAdicao: "2024-03-05"
  },
  {
    id: 4,
    nome: "Ana Oliveira",
    email: "ana.oliveira@alpha.com.br",
    role: "Visualizador",
    status: "Ativo",
    dataAdicao: "2024-03-20"
  }
]

const roleOptions = [
  { value: "Administrador Financeiro", label: "Administrador Financeiro", description: "Acesso total ao sistema" },
  { value: "Aprovador", label: "Aprovador", description: "Pode aprovar e rejeitar operações" },
  { value: "Operador", label: "Operador", description: "Pode criar e gerenciar operações" },
  { value: "Visualizador", label: "Visualizador", description: "Apenas visualização" }
]

export function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    role: ""
  })

  const filteredMembers = mockTeamMembers.filter(member =>
    member.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = () => {
    setEditMode(false)
    setFormData({
      nome: "",
      email: "",
      role: ""
    })
    setDialogOpen(true)
  }

  const handleEdit = (member) => {
    setEditMode(true)
    setFormData({
      nome: member.nome,
      email: member.email,
      role: member.role
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (editMode) {
      toast.success("Membro atualizado com sucesso!")
    } else {
      toast.success("Membro adicionado com sucesso!")
    }
    setDialogOpen(false)
  }

  const handleDelete = (member) => {
    toast.success(`${member.nome} removido da equipe`)
  }

  const getRoleBadge = (role) => {
    const variants = {
      "Administrador Financeiro": "bg-purple-600 text-white hover:bg-purple-700",
      "Aprovador": "bg-blue-600 text-white hover:bg-blue-700",
      "Operador": "bg-green-600 text-white hover:bg-green-700",
      "Visualizador": "bg-gray-600 text-white hover:bg-gray-700"
    }
    
    return (
      <Badge className={variants[role] || ""}>
        {role}
      </Badge>
    )
  }

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarSacado />}
      title="Gestão de Equipe"
    >
      <div className="space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <UsersIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>Gerenciamento de Equipe</CardTitle>
                  <CardDescription>Gerencie usuários e permissões da sua empresa</CardDescription>
                </div>
              </div>
              <Button onClick={handleCreate}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Adicionar Membro
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Roles Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheckIcon className="w-5 h-5" />
              Perfis de Acesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roleOptions.map((role) => (
                <div key={role.value} className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    {getRoleBadge(role.value)}
                  </div>
                  <p className="text-xs text-muted-foreground">{role.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Members Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Membros da Equipe</CardTitle>
                <CardDescription>
                  {filteredMembers.length} membro(s) encontrado(s)
                </CardDescription>
              </div>
              <div className="relative w-[300px]">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Adição</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhum membro encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.nome}</TableCell>
                      <TableCell className="text-muted-foreground">{member.email}</TableCell>
                      <TableCell>{getRoleBadge(member.role)}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700">
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(member.dataAdicao).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(member)}
                          >
                            <EditIcon className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(member)}
                          >
                            <Trash2Icon className="w-4 h-4 mr-1" />
                            Remover
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Editar Membro" : "Adicionar Membro"}
            </DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Atualize as informações do membro da equipe"
                : "Preencha os dados para adicionar um novo membro"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: João Silva"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail Corporativo *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="joao.silva@empresa.com.br"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Perfil de Acesso *</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um perfil" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div>
                        <div className="font-medium">{role.label}</div>
                        <div className="text-xs text-muted-foreground">{role.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {!editMode && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Um e-mail de convite será enviado para o endereço informado com instruções de acesso.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {editMode ? "Salvar Alterações" : "Adicionar Membro"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LayoutWithSidebar>
  )
}
