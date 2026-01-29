import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  CheckCircle2Icon
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
    prazoMedio: ""
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
      prazoMedio: ""
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
      prazoMedio: sacado.prazoMedio
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (editMode) {
      toast.success("Sacado atualizado com sucesso!")
    } else {
      toast.success("Sacado criado com sucesso!")
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
                  <h1 className="text-2xl font-bold">Gerenciar Sacados</h1>
                  <p className="text-sm text-muted-foreground">Cadastro e gestão de empresas sacadas</p>
                </div>
              </div>
            </div>
            <Button onClick={handleCreate}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Novo Sacado
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sacados Cadastrados</CardTitle>
                <CardDescription>
                  {filteredSacados.length} sacado(s) encontrado(s)
                </CardDescription>
              </div>
              <div className="relative w-[300px]">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou CNPJ..."
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
                      Nenhum sacado encontrado
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(sacado)}
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
              {editMode ? "Editar Sacado" : "Novo Sacado"}
            </DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Atualize as informações do sacado"
                : "Preencha os dados para cadastrar um novo sacado"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Empresa *</Label>
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
              {editMode ? "Salvar Alterações" : "Criar Sacado"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
