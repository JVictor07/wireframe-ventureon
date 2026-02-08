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
  DollarSignIcon,
  TrendingUpIcon,
  CalendarIcon,
  PercentIcon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFinanciadora } from "@/components/app-sidebar-financiadora"
import portfolioData from "@/data/portfolio-financiadora.json"

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

export function HistoricoFinanciadora() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRating, setSelectedRating] = useState("todos")

  const historicoData = portfolioData.filter(p => p.status === "Pago")

  const filteredHistorico = historicoData.filter(op => {
    const matchesSearch = op.numeroNF.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         op.sacado.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = selectedRating === "todos" || op.sacado.rating === selectedRating
    return matchesSearch && matchesRating
  })

  const formatCurrency = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  const totalFinanciado = historicoData.reduce((sum, p) => sum + p.valorFinanciado, 0)
  const totalRecebido = historicoData.reduce((sum, p) => sum + p.valorReceber, 0)
  const totalLucro = totalRecebido - totalFinanciado
  const taxaMedia = historicoData.length > 0 
    ? historicoData.reduce((sum, p) => sum + p.taxaAplicada, 0) / historicoData.length 
    : 0

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFinanciadora />}
      title="Histórico de Operações"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Financiado
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalFinanciado)}</div>
            <p className="text-xs text-muted-foreground">
              Capital investido
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Recebido
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRecebido)}</div>
            <p className="text-xs text-muted-foreground">
              Retorno total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lucro Total
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalLucro)}</div>
            <p className="text-xs text-muted-foreground">
              {((totalLucro / totalFinanciado) * 100).toFixed(2)}% de rentabilidade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa Média
            </CardTitle>
            <PercentIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxaMedia.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              {historicoData.length} operações
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operações Finalizadas</CardTitle>
          <CardDescription>
            Histórico completo de operações pagas
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
            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os ratings</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
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
                  <TableHead>Financiado</TableHead>
                  <TableHead>Taxa</TableHead>
                  <TableHead>Recebido</TableHead>
                  <TableHead>Lucro</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistorico.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground">
                      Nenhuma operação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHistorico.map((operacao) => {
                    const lucro = operacao.valorReceber - operacao.valorFinanciado
                    return (
                      <TableRow key={operacao.id}>
                        <TableCell className="font-medium">{operacao.numeroNF}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{operacao.sacado.nome}</div>
                            <div className="text-xs text-muted-foreground">{operacao.sacado.cnpj}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getRatingBadge(operacao.sacado.rating)}</TableCell>
                        <TableCell>{formatCurrency(operacao.valorFinanciado)}</TableCell>
                        <TableCell className="font-semibold">{operacao.taxaAplicada}%</TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {formatCurrency(operacao.valorReceber)}
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {formatCurrency(lucro)}
                        </TableCell>
                        <TableCell>{formatDate(operacao.dataPagamento)}</TableCell>
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
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {filteredHistorico.length} de {historicoData.length} operações finalizadas
          </div>
        </CardContent>
      </Card>
    </LayoutWithSidebar>
  )
}
