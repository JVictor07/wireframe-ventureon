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
  SearchIcon,
  EyeIcon,
  BriefcaseIcon,
  DollarSignIcon,
  CalendarIcon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFinanciadora } from "@/components/app-sidebar-financiadora"
import portfolioData from "@/data/portfolio-financiadora.json"

const getStatusBadge = (status) => {
  const variants = {
    "Em Andamento": { variant: "default", className: "bg-green-600 text-white hover:bg-green-700" },
    "Pago": { variant: "default", className: "bg-blue-600 text-white hover:bg-blue-700" },
    "Atrasado": { variant: "default", className: "bg-red-600 text-white hover:bg-red-700" }
  }
  
  const config = variants[status] || { variant: "default", className: "" }
  
  return (
    <Badge variant={config.variant} className={`${config.className}`}>
      {status}
    </Badge>
  )
}

const getRatingBadge = (rating) => {
  const colors = {
    "A+": "bg-green-100 text-green-800 border-green-300",
    "A": "bg-blue-100 text-blue-800 border-blue-300",
    "B+": "bg-yellow-100 text-yellow-800 border-yellow-300"
  }
  
  return (
    <Badge variant="outline" className={colors[rating] || ""}>
      {rating}
    </Badge>
  )
}

export function PortfolioFinanciadora() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("todos")

  const filteredPortfolio = portfolioData.filter(op => {
    const matchesSearch = op.numeroNF.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         op.sacado.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "todos" || op.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const formatCurrency = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  const emAndamento = portfolioData.filter(p => p.status === "Em Andamento")
  const totalReceber = emAndamento.reduce((sum, p) => sum + p.valorReceber, 0)
  const totalFinanciado = portfolioData.reduce((sum, p) => sum + p.valorFinanciado, 0)
  const taxaMedia = portfolioData.length > 0 
    ? portfolioData.reduce((sum, p) => sum + p.taxaAplicada, 0) / portfolioData.length 
    : 0

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFinanciadora />}
      title="Meu Portfólio"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              A Receber
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalReceber)}</div>
            <p className="text-xs text-muted-foreground">
              {emAndamento.length} operações ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Financiado
            </CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalFinanciado)}</div>
            <p className="text-xs text-muted-foreground">
              Histórico completo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa Média
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxaMedia.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              Rentabilidade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Operações
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.length}</div>
            <p className="text-xs text-muted-foreground">
              Total realizadas
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operações do Portfólio</CardTitle>
          <CardDescription>
            Acompanhamento de todas as operações financiadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por NF ou sacado..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NF</TableHead>
                  <TableHead>Sacado</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Valor NF</TableHead>
                  <TableHead>Taxa</TableHead>
                  <TableHead>Financiado</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPortfolio.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground">
                      Nenhuma operação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPortfolio.map((operacao) => (
                    <TableRow key={operacao.id}>
                      <TableCell className="font-medium">{operacao.numeroNF}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{operacao.sacado.nome}</div>
                          <div className="text-xs text-muted-foreground">{operacao.sacado.cnpj}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getRatingBadge(operacao.sacado.rating)}</TableCell>
                      <TableCell>{formatCurrency(operacao.valorNF)}</TableCell>
                      <TableCell className="font-semibold">{operacao.taxaAplicada}%</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {formatCurrency(operacao.valorFinanciado)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{formatDate(operacao.dataVencimento)}</div>
                          {operacao.status === "Em Andamento" && (
                            <div className="text-xs text-muted-foreground">
                              {operacao.diasRestantes} dias restantes
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(operacao.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/financiadora/portfolio/${operacao.id}`)}
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {filteredPortfolio.length} de {portfolioData.length} operações
          </div>
        </CardContent>
      </Card>
    </LayoutWithSidebar>
  )
}
