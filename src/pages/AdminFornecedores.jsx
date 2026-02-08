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
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeftIcon,
  PlusIcon,
  EditIcon,
  SearchIcon,
  PackageIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  UploadIcon
} from "lucide-react"
import { toast } from "sonner"
import { ImportCSVDialog } from "@/components/ImportCSVDialog"
import fornecedoresData from "@/data/fornecedores.json"
import sacadosData from "@/data/sacados.json"

export function AdminFornecedores() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedFornecedor, setSelectedFornecedor] = useState(null)
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    sacadoAssociado: "",
    email: "",
    telefone: "",
    acessoHabilitado: false,
    emailAcesso: ""
  })

  const filteredFornecedores = fornecedoresData.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.cnpj.includes(searchTerm) ||
    fornecedor.sacadoAssociado.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = () => {
    setEditMode(false)
    setSelectedFornecedor(null)
    setFormData({
      nome: "",
      cnpj: "",
      sacadoAssociado: "",
      email: "",
      telefone: "",
      acessoHabilitado: false,
      emailAcesso: ""
    })
    setDialogOpen(true)
  }

  const handleEdit = (fornecedor) => {
    setEditMode(true)
    setSelectedFornecedor(fornecedor)
    setFormData({
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj,
      sacadoAssociado: fornecedor.sacadoAssociado,
      email: fornecedor.email,
      telefone: fornecedor.telefone,
      acessoHabilitado: fornecedor.acessoHabilitado || false,
      emailAcesso: fornecedor.emailAcesso || ""
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (editMode) {
      if (formData.acessoHabilitado && selectedFornecedor && !selectedFornecedor.acessoHabilitado) {
        toast.success("Fornecedor atualizado e acesso habilitado com sucesso!")
      } else {
        toast.success("Fornecedor atualizado com sucesso!")
      }
    } else {
      toast.success("Fornecedor criado com sucesso!")
      if (formData.acessoHabilitado) {
        toast.info("Credenciais de acesso enviadas para o email do fornecedor")
      }
    }
    setDialogOpen(false)
  }

  const getAcessoBadge = (acessoHabilitado) => {
    return acessoHabilitado ? (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
        <CheckCircle2Icon className="w-3 h-3 mr-1" />
        Acesso Ativo
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
        <XCircleIcon className="w-3 h-3 mr-1" />
        Sem Acesso
      </Badge>
    )
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
              <Button variant="ghost" size="sm" onClick={() => navigate("/sacado/dashboard")}>
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <PackageIcon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Gerenciar Fornecedores</h1>
                  <p className="text-sm text-muted-foreground">Cadastro e gestão de fornecedores</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setImportDialogOpen(true)}>
                <UploadIcon className="w-4 h-4 mr-2" />
                Importar CSV
              </Button>
              <Button onClick={handleCreate}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Novo Fornecedor
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Fornecedores Cadastrados</CardTitle>
                <CardDescription>
                  {filteredFornecedores.length} fornecedor(es) encontrado(s)
                </CardDescription>
              </div>
              <div className="relative w-[300px]">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CNPJ ou sacado..."
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
                  <TableHead>Sacado Associado</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Acesso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFornecedores.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      Nenhum fornecedor encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFornecedores.map((fornecedor) => (
                    <TableRow key={fornecedor.id}>
                      <TableCell className="font-medium">{fornecedor.nome}</TableCell>
                      <TableCell className="text-muted-foreground">{fornecedor.cnpj}</TableCell>
                      <TableCell>{fornecedor.sacadoAssociado}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{fornecedor.email}</div>
                          <div className="text-muted-foreground">{fornecedor.telefone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getAcessoBadge(fornecedor.acessoHabilitado)}</TableCell>
                      <TableCell>{getStatusBadge(fornecedor.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(fornecedor)}
                        >
                          <EditIcon className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
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
              {editMode ? "Editar Fornecedor" : "Novo Fornecedor"}
            </DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Atualize as informações do fornecedor"
                : "Preencha os dados para cadastrar um novo fornecedor"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Fornecedor *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Fornecedor ABC Ltda"
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
              <Label htmlFor="sacado">Sacado Associado *</Label>
              <Select
                value={formData.sacadoAssociado}
                onValueChange={(value) => setFormData({ ...formData, sacadoAssociado: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sacado" />
                </SelectTrigger>
                <SelectContent>
                  {sacadosData.filter(s => s.status === "Ativo").map((sacado) => (
                    <SelectItem key={sacado.id} value={sacado.nome}>
                      {sacado.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Fornecedor será vinculado a este sacado para operações
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contato@fornecedor.com.br"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(00) 0000-0000"
                />
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Permitir Acesso à Plataforma</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilite para que o fornecedor possa acessar e gerenciar seus recebíveis
                  </p>
                </div>
                <Switch
                  checked={formData.acessoHabilitado}
                  onCheckedChange={(checked) => setFormData({ ...formData, acessoHabilitado: checked })}
                />
              </div>
              
              {formData.acessoHabilitado && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <div className="space-y-2">
                    <Label htmlFor="emailAcesso">Email de Acesso *</Label>
                    <Input
                      id="emailAcesso"
                      type="email"
                      value={formData.emailAcesso}
                      onChange={(e) => setFormData({ ...formData, emailAcesso: e.target.value })}
                      placeholder="acesso@fornecedor.com.br"
                    />
                    <p className="text-xs text-muted-foreground">
                      Este email será usado para login na plataforma
                    </p>
                  </div>
                  
                  {!editMode && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm text-blue-800">
                        ℹ️ Uma senha temporária será gerada e enviada para o email de acesso
                      </p>
                    </div>
                  )}
                  
                  {editMode && selectedFornecedor && !selectedFornecedor.acessoHabilitado && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800">
                        ✓ Ao salvar, o fornecedor receberá credenciais de acesso por email
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {editMode && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>ID:</strong> {selectedFornecedor?.id}
                </p>
                {selectedFornecedor?.acessoHabilitado && (
                  <p className="text-sm mt-2">
                    <strong>Data de Habilitação:</strong> {selectedFornecedor?.dataHabilitacao ? new Date(selectedFornecedor.dataHabilitacao).toLocaleDateString('pt-BR') : '-'}
                  </p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {editMode ? "Salvar Alterações" : "Criar Fornecedor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ImportCSVDialog 
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        type="fornecedores"
      />
    </div>
  )
}
