import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
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
  SearchIcon,
  EyeIcon,
  XCircleIcon,
  FilterIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircle2Icon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarAdmin } from "@/components/app-sidebar-admin"
import operacoesData from "@/data/operacoes-admin.json"

const getStatusBadge = (status) => {
  const variants = {
    "Aguardando aprovação": { variant: "default", className: "bg-yellow-600 text-white hover:bg-yellow-700" },
    "Aprovada pelo sacado": { variant: "default", className: "bg-blue-600 text-white hover:bg-blue-700" },
    "Pronta para financiamento": { variant: "default", className: "bg-purple-600 text-white hover:bg-purple-700" },
    "Financiada": { variant: "default", className: "bg-green-600 text-white hover:bg-green-700" },
    "Encerrada": { variant: "secondary", className: "" }
  }
  
  const config = variants[status] || { variant: "default", className: "" }
  
  return (
    <Badge variant={config.variant} className={`${config.className}`}>
      {status}
    </Badge>
  )
}

export function DashboardAdmin() {
  const navigate = useNavigate()
  const [selectedFilter, setSelectedFilter] = useState("todas")
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState(null)

  const filteredOperations = selectedFilter === "todas" 
    ? operacoesData 
    : operacoesData.filter(op => op.status === selectedFilter)

  const handleCancelClick = (operation) => {
    setSelectedOperation(operation)
    setCancelDialogOpen(true)
  }

  const handleConfirmCancel = () => {
    setCancelDialogOpen(false)
    setSelectedOperation(null)
  }

  const statusCounts = {
    total: operacoesData.length,
    pendentes: operacoesData.filter(op => op.status === "Aguardando aprovação").length,
    aprovadas: operacoesData.filter(op => op.status === "Aprovada pelo sacado").length,
    financiadas: operacoesData.filter(op => op.status === "Financiada").length,
  }

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarAdmin />}
      title="Dashboard"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total de Operações</CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums">
                {statusCounts.total}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Todas as operações ativas
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pendentes</CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums flex items-center gap-2">
                {statusCounts.pendentes}
                <AlertCircleIcon className="w-6 h-6 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Aguardando aprovação
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Aprovadas</CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums flex items-center gap-2">
                {statusCounts.aprovadas}
                <CheckCircle2Icon className="w-6 h-6 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Aprovadas pelo sacado
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Financiadas</CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums flex items-center gap-2">
                {statusCounts.financiadas}
                <TrendingUpIcon className="w-6 h-6 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Operações concluídas
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Operations Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Operações Globais</CardTitle>
                <CardDescription>Gerencie todas as operações da plataforma</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar operações..."
                    className="pl-8 w-[250px]"
                  />
                </div>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-[200px]">
                    <FilterIcon className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="Aguardando aprovação">Pendentes</SelectItem>
                    <SelectItem value="Aprovada pelo sacado">Aprovadas</SelectItem>
                    <SelectItem value="Pronta para financiamento">Prontas</SelectItem>
                    <SelectItem value="Financiada">Financiadas</SelectItem>
                    <SelectItem value="Encerrada">Encerradas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Operação</TableHead>
                  <TableHead>Sacado</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Programa</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOperations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      Nenhuma operação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOperations.map((op) => (
                    <TableRow key={op.id}>
                      <TableCell className="font-medium">{op.id}</TableCell>
                      <TableCell>{op.sacado}</TableCell>
                      <TableCell>{op.fornecedor}</TableCell>
                      <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                        {op.programa}
                      </TableCell>
                      <TableCell className="text-right font-semibold">{op.valor}</TableCell>
                      <TableCell>{new Date(op.vencimento).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{getStatusBadge(op.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/operacao/${op.id}`)}>
                            <EyeIcon className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleCancelClick(op)}
                          >
                            <XCircleIcon className="w-4 h-4 mr-1" />
                            Cancelar
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

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Cancelamento</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar a operação <strong>{selectedOperation?.id}</strong>?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sacado:</span>
                <span className="font-medium">{selectedOperation?.sacado}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fornecedor:</span>
                <span className="font-medium">{selectedOperation?.fornecedor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor:</span>
                <span className="font-medium">{selectedOperation?.valor}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Voltar
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancel}>
              Confirmar Cancelamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LayoutWithSidebar>
  )
}
