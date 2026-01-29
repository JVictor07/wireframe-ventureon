import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  CheckCircle2Icon, 
  ClockIcon, 
  XCircleIcon, 
  SearchIcon,
  TrendingUpIcon,
  AlertCircleIcon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarSacado } from "@/components/app-sidebar-sacado"
import operacoesData from "@/data/operacoes-sacado.json"

const getStatusBadge = (status) => {
  const variants = {
    "Aguardando aprovação": { variant: "default", icon: AlertCircleIcon, className: "bg-yellow-600 text-white hover:bg-yellow-700" },
    "Aprovada": { variant: "default", icon: CheckCircle2Icon, className: "bg-green-600 text-white hover:bg-green-700" },
    "Encerrada": { variant: "secondary", icon: XCircleIcon, className: "" }
  }
  
  const config = variants[status] || { variant: "default", icon: ClockIcon, className: "" }
  const Icon = config.icon
  
  return (
    <Badge variant={config.variant} className={`flex items-center gap-1 w-fit ${config.className}`}>
      <Icon className="w-3 h-3" />
      {status}
    </Badge>
  )
}

const OperationsTable = ({ operations, highlightPending = false }) => {
  const navigate = useNavigate()
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID Operação</TableHead>
          <TableHead>Fornecedor</TableHead>
          <TableHead>Nota Fiscal</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {operations.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
              Nenhuma operação encontrada
            </TableCell>
          </TableRow>
        ) : (
          operations.map((op) => (
            <TableRow 
              key={op.id}
              className={highlightPending && op.status === "Aguardando aprovação" ? "bg-yellow-50/50 dark:bg-yellow-950/10" : ""}
            >
              <TableCell className="font-medium">{op.id}</TableCell>
              <TableCell>{op.fornecedor}</TableCell>
              <TableCell className="text-muted-foreground">{op.notaFiscal}</TableCell>
              <TableCell className="text-right font-semibold">{op.valor}</TableCell>
              <TableCell>{new Date(op.vencimento).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>{getStatusBadge(op.status)}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => navigate(`/sacado/operacao/${op.id}`)}>
                  Ver detalhes
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export function DashboardSacado() {
  const pendentes = operacoesData.filter(op => op.status === "Aguardando aprovação")
  const aprovadas = operacoesData.filter(op => op.status === "Aprovada")
  const encerradas = operacoesData.filter(op => op.status === "Encerrada")

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarSacado />}
      title="Dashboard"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pendentes de Aprovação</CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums flex items-center gap-2">
                {pendentes.length}
                <AlertCircleIcon className="w-6 h-6 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Requerem sua atenção imediata
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Operações Aprovadas</CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums flex items-center gap-2">
                {aprovadas.length}
                <CheckCircle2Icon className="w-6 h-6 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Aguardando financiamento
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Operações Encerradas</CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums flex items-center gap-2">
                {encerradas.length}
                <TrendingUpIcon className="w-6 h-6 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Concluídas com sucesso
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Operations Table with Tabs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Operações</CardTitle>
                <CardDescription>Gerencie e acompanhe suas operações</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar operações..."
                    className="pl-8 w-[250px]"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="todas" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="todas">
                  Todas ({operacoesData.length})
                </TabsTrigger>
                <TabsTrigger value="pendentes">
                  Pendentes ({pendentes.length})
                </TabsTrigger>
                <TabsTrigger value="aprovadas">
                  Aprovadas ({aprovadas.length})
                </TabsTrigger>
                <TabsTrigger value="encerradas">
                  Encerradas ({encerradas.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="todas" className="mt-6">
                <OperationsTable operations={operacoesData} highlightPending={true} />
              </TabsContent>

              <TabsContent value="pendentes" className="mt-6">
                <OperationsTable operations={pendentes} highlightPending={true} />
              </TabsContent>

              <TabsContent value="aprovadas" className="mt-6">
                <OperationsTable operations={aprovadas} />
              </TabsContent>

              <TabsContent value="encerradas" className="mt-6">
                <OperationsTable operations={encerradas} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
    </LayoutWithSidebar>
  )
}
