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
  TrendingDownIcon,
  CheckCircle2Icon,
  XCircleIcon
} from "lucide-react"
import { toast } from "sonner"
import financiadoresData from "@/data/financiadores.json"

export function AdminFinanciadores() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedFinanciador, setSelectedFinanciador] = useState(null)
  const [formData, setFormData] = useState({
    nome: "",
    taxaBase: "",
    prazoMaximo: "",
    tipoInstituicao: "",
    contato: "",
    status: "Ativo"
  })

  const filteredFinanciadores = financiadoresData.filter(financiador =>
    financiador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    financiador.tipoInstituicao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = () => {
    setEditMode(false)
    setSelectedFinanciador(null)
    setFormData({
      nome: "",
      taxaBase: "",
      prazoMaximo: "",
      tipoInstituicao: "",
      contato: "",
      status: "Ativo"
    })
    setDialogOpen(true)
  }

  const handleEdit = (financiador) => {
    setEditMode(true)
    setSelectedFinanciador(financiador)
    setFormData({
      nome: financiador.nome,
      taxaBase: financiador.taxaBase.toString(),
      prazoMaximo: financiador.prazoMaximo,
      tipoInstituicao: financiador.tipoInstituicao,
      contato: financiador.contato,
      status: financiador.status
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (editMode) {
      toast.success("Financiador atualizado com sucesso!")
    } else {
      toast.success("Financiador criado com sucesso!")
    }
    setDialogOpen(false)
  }

  const getStatusBadge = (status) => {
    return status === "Ativo" ? (
      <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700">
        <CheckCircle2Icon className="w-3 h-3 mr-1" />
        Ativo
      </Badge>
    ) : (
      <Badge variant="secondary">
        <XCircleIcon className="w-3 h-3 mr-1" />
        Inativo
      </Badge>
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
                  <TrendingDownIcon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Gerenciar Financiadores</h1>
                  <p className="text-sm text-muted-foreground">Cadastro e gestão de instituições financiadoras</p>
                </div>
              </div>
            </div>
            <Button onClick={handleCreate}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Novo Financiador
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Financiadores Cadastrados</CardTitle>
                <CardDescription>
                  {filteredFinanciadores.length} financiador(es) encontrado(s)
                </CardDescription>
              </div>
              <div className="relative w-[300px]">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou tipo..."
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
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Taxa Base</TableHead>
                  <TableHead>Prazo Máximo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFinanciadores.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhum financiador encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFinanciadores.map((financiador) => (
                    <TableRow key={financiador.id}>
                      <TableCell className="font-medium">{financiador.nome}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{financiador.tipoInstituicao}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {financiador.taxaBase}% a.m.
                      </TableCell>
                      <TableCell>{financiador.prazoMaximo}</TableCell>
                      <TableCell>{getStatusBadge(financiador.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(financiador)}
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

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                ℹ️ Apenas financiadores com status <strong>Ativo</strong> aparecerão nas comparações de operações.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Editar Financiador" : "Novo Financiador"}
            </DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Atualize as informações do financiador"
                : "Preencha os dados para cadastrar um novo financiador"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Instituição *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Banco Financiador A"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Instituição *</Label>
                <Select
                  value={formData.tipoInstituicao}
                  onValueChange={(value) => setFormData({ ...formData, tipoInstituicao: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Banco">Banco</SelectItem>
                    <SelectItem value="Financeira">Financeira</SelectItem>
                    <SelectItem value="Fintech">Fintech</SelectItem>
                    <SelectItem value="Cooperativa">Cooperativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxa">Taxa Base (% a.m.) *</Label>
                <Input
                  id="taxa"
                  type="number"
                  step="0.1"
                  value={formData.taxaBase}
                  onChange={(e) => setFormData({ ...formData, taxaBase: e.target.value })}
                  placeholder="1.5"
                />
                <p className="text-xs text-muted-foreground">
                  Taxa base mensal para cálculo de propostas
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prazo">Prazo Máximo *</Label>
                <Input
                  id="prazo"
                  value={formData.prazoMaximo}
                  onChange={(e) => setFormData({ ...formData, prazoMaximo: e.target.value })}
                  placeholder="Ex: 90 dias"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contato">Email de Contato</Label>
              <Input
                id="contato"
                type="email"
                value={formData.contato}
                onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
                placeholder="operacoes@financiador.com.br"
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
              <p className="text-xs text-muted-foreground">
                Financiadores inativos não aparecerão em novas operações
              </p>
            </div>
            {editMode && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>ID:</strong> {selectedFinanciador?.id}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {editMode ? "Salvar Alterações" : "Criar Financiador"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
