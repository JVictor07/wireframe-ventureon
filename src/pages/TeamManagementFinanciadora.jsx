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
  SearchIcon,
  ShieldCheckIcon
} from "lucide-react"
import { toast } from "sonner"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFinanciadora } from "@/components/app-sidebar-financiadora"

const mockTeamMembers = [
  {
    id: 1,
    nome: "Ricardo Santos",
    email: "ricardo.santos@bancoa.com.br",
    role: "Gestor de Crédito",
    status: "Ativo",
    dataAdicao: "2024-01-10"
  },
  {
    id: 2,
    nome: "Mariana Costa",
    email: "mariana.costa@bancoa.com.br",
    role: "Analista de Risco",
    status: "Ativo",
    dataAdicao: "2024-01-15"
  },
  {
    id: 3,
    nome: "Paulo Ferreira",
    email: "paulo.ferreira@bancoa.com.br",
    role: "Operador",
    status: "Ativo",
    dataAdicao: "2024-02-01"
  }
]

const roleOptions = [
  { 
    value: "Gestor de Crédito", 
    label: "Gestor de Crédito", 
    description: "Acesso total, pode aprovar propostas e gerenciar equipe" 
  },
  { 
    value: "Analista de Risco", 
    label: "Analista de Risco", 
    description: "Pode analisar oportunidades e enviar propostas" 
  },
  { 
    value: "Operador", 
    label: "Operador", 
    description: "Pode visualizar portfólio e acompanhar operações" 
  },
  { 
    value: "Visualizador", 
    label: "Visualizador", 
    description: "Apenas visualização de dados" 
  }
]

const getRoleBadge = (role) => {
  const variants = {
    "Gestor de Crédito": "default",
    "Analista de Risco": "secondary",
    "Operador": "outline",
    "Visualizador": "outline"
  }
  return <Badge variant={variants[role] || "default"}>{role}</Badge>
}

const getStatusBadge = (status) => {
  return status === "Ativo" 
    ? <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Ativo</Badge>
    : <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Inativo</Badge>
}

export function TeamManagementFinanciadora() {
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
    setFormData({ nome: "", email: "", role: "" })
  }

  const handleRemove = (member) => {
    toast.success(`${member.nome} removido da equipe`)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFinanciadora />}
      title="Gestão de Equipe"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Membros da Equipe</CardTitle>
              <CardDescription>
                Gerencie as permissões dos membros da sua equipe
              </CardDescription>
            </div>
            <Button onClick={handleCreate}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Adicionar Membro
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Adição</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Nenhum membro encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.nome}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{getRoleBadge(member.role)}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>{formatDate(member.dataAdicao)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(member)}
                          >
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(member)}
                          >
                            <Trash2Icon className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            {filteredMembers.length} {filteredMembers.length === 1 ? 'membro' : 'membros'}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Perfis e Permissões</CardTitle>
          <CardDescription>
            Entenda o que cada perfil pode fazer na plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roleOptions.map((role) => (
              <div key={role.value} className="flex items-start gap-3 p-3 border rounded-lg">
                <ShieldCheckIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{role.label}</p>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Editar Membro" : "Adicionar Novo Membro"}
            </DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Atualize as informações do membro da equipe" 
                : "Adicione um novo membro à sua equipe"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                placeholder="Ex: João Silva"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="joao.silva@bancoa.com.br"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Perfil</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
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
