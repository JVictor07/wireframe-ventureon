import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
  ArrowLeftIcon,
  PlusIcon,
  EditIcon,
  SearchIcon,
  BuildingIcon,
  CheckCircle2Icon,
  UserIcon
} from "lucide-react"
import { toast } from "sonner"
import sacadosData from "@/data/sacados.json"

export function AdminSacados() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedSacado, setSelectedSacado] = useState(null)
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    programa: "",
    prazoMedio: "",
    emailAcesso: "",
    nomeAdmin: "",
    telefone: "",
    status: "Ativo"
  })

  const filteredSacados = sacadosData.filter(sacado =>
    sacado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sacado.cnpj.includes(searchTerm)
  )

  const handleCreate = () => {
    setEditMode(false)
    setSelectedSacado(null)
    setFormData({
      nome: "",
      cnpj: "",
      programa: "",
      prazoMedio: "",
      emailAcesso: "",
      nomeAdmin: "",
      telefone: "",
      status: "Ativo"
    })
    setDialogOpen(true)
  }

  const handleEdit = (sacado) => {
    setEditMode(true)
    setSelectedSacado(sacado)
    setFormData({
      nome: sacado.nome,
      cnpj: sacado.cnpj,
      programa: sacado.programa,
      prazoMedio: sacado.prazoMedio,
      emailAcesso: sacado.emailAcesso || "",
      nomeAdmin: sacado.nomeAdmin || "",
      telefone: sacado.telefone || "",
      status: sacado.status || "Ativo"
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (editMode) {
      toast.success("Cliente atualizado com sucesso!")
    } else {
      toast.success("Cliente criado com sucesso!")
    }
    setDialogOpen(false)
  }

  const handleImpersonate = (sacado) => {
    toast.success(`Acessando como ${sacado.nome}...`)
    setTimeout(() => {
      navigate("/sacado/dashboard")
    }, 500)
  }

  const getStatusBadge = (status) => {
    return status === "Ativo" ? (
      <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700">
        <CheckCircle2Icon className="w-3 h-3 mr-1" />
        Ativo
      </Badge>
    ) : (
      <Badge variant="secondary">Inativo</Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin/dashboard")}>
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <BuildingIcon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Gerenciar Clientes</h1>
                  <p className="text-sm text-muted-foreground">Cadastro e gestão de clientes da plataforma</p>
                </div>
              </div>
            </div>
            <Button onClick={handleCreate}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Clientes Cadastrados</CardTitle>
                <CardDescription>
                  {filteredSacados.length} cliente(s) encontrado(s)
                </CardDescription>
              </div>
              <div className="relative w-[300px]">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cliente por nome ou CNPJ..."
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
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Programa</TableHead>
                  <TableHead>Prazo Médio</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSacados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhum cliente encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSacados.map((sacado) => (
                    <TableRow key={sacado.id}>
                      <TableCell className="font-medium">{sacado.nome}</TableCell>
                      <TableCell className="text-muted-foreground">{sacado.cnpj}</TableCell>
                      <TableCell>{sacado.programa}</TableCell>
                      <TableCell>{sacado.prazoMedio}</TableCell>
                      <TableCell>{getStatusBadge(sacado.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(sacado)}
                          >
                            <EditIcon className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleImpersonate(sacado)}
                          >
                            <UserIcon className="w-4 h-4 mr-1" />
                            Acessar
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Editar Cliente" : "Novo Cliente"}
            </DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Atualize as informações do cliente"
                : "Preencha os dados para cadastrar um novo cliente"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Seção: Dados da Empresa */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Dados da Empresa</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Razão Social *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Empresa Alpha S.A."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    placeholder="00.000.000/0001-00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="programa">Nome do Programa *</Label>
                <Input
                  id="programa"
                  value={formData.programa}
                  onChange={(e) => setFormData({ ...formData, programa: e.target.value })}
                  placeholder="Ex: Programa Supply Chain 2024"
                />
                <p className="text-xs text-muted-foreground">
                  Nome que identificará o programa de risco sacado desta empresa
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prazoMedio">Prazo Médio de Pagamento</Label>
                <Input
                  id="prazoMedio"
                  value={formData.prazoMedio}
                  onChange={(e) => setFormData({ ...formData, prazoMedio: e.target.value })}
                  placeholder="Ex: 30 dias"
                />
              </div>
            </div>

            {/* Seção: Acesso e Usuário Administrador */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Acesso à Plataforma</h3>
              <div className="space-y-2">
                <Label htmlFor="emailAcesso">E-mail de Acesso *</Label>
                <Input
                  id="emailAcesso"
                  type="email"
                  value={formData.emailAcesso}
                  onChange={(e) => setFormData({ ...formData, emailAcesso: e.target.value })}
                  placeholder="admin@empresaalpha.com.br"
                />
                <p className="text-xs text-muted-foreground">
                  Este e-mail será usado para login na plataforma
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomeAdmin">Nome do Administrador *</Label>
                <Input
                  id="nomeAdmin"
                  value={formData.nomeAdmin}
                  onChange={(e) => setFormData({ ...formData, nomeAdmin: e.target.value })}
                  placeholder="Ex: João Silva"
                />
                <p className="text-xs text-muted-foreground">
                  Pessoa responsável que terá acesso inicial ao sistema
                </p>
              </div>
              {!editMode && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>ℹ️ Senha inicial:</strong> Será enviada automaticamente para o e-mail cadastrado após a criação do cliente.
                  </p>
                </div>
              )}
            </div>

            {/* Seção: Contato */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Contato</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {editMode && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>ID:</strong> {selectedSacado?.id}
                </p>
                <p className="text-sm mt-1">
                  <strong>Data de Onboarding:</strong>{" "}
                  {selectedSacado?.dataOnboarding && 
                    new Date(selectedSacado.dataOnboarding).toLocaleDateString('pt-BR')
                  }
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {editMode ? "Salvar Alterações" : "Criar Cliente"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
