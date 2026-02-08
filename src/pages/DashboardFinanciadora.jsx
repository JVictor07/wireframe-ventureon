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
  TrendingUpIcon,
  BriefcaseIcon,
  DollarSignIcon,
  PercentIcon,
  EyeIcon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFinanciadora } from "@/components/app-sidebar-financiadora"
import oportunidadesData from "@/data/oportunidades-financiadora.json"
import portfolioData from "@/data/portfolio-financiadora.json"

const getStatusBadge = (status) => {
  const variants = {
    "Aguardando Propostas": { variant: "default", className: "bg-blue-600 text-white hover:bg-blue-700" },
    "Em Andamento": { variant: "default", className: "bg-green-600 text-white hover:bg-green-700" },
    "Pago": { variant: "default", className: "bg-gray-600 text-white hover:bg-gray-700" }
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
    "B+": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "B": "bg-orange-100 text-orange-800 border-orange-300"
  }
  
  return (
    <Badge variant="outline" className={colors[rating] || ""}>
      {rating}
    </Badge>
  )
}

export function DashboardFinanciadora() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRating, setSelectedRating] = useState("todos")

  const filteredOportunidades = oportunidadesData.filter(op => {
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

  const totalOportunidades = oportunidadesData.reduce((sum, op) => sum + op.valor, 0)
  const portfolioAtivo = portfolioData.filter(p => p.status === "Em Andamento")
  const totalPortfolio = portfolioAtivo.reduce((sum, p) => sum + p.valorReceber, 0)
  const taxaMedia = portfolioData.length > 0 
    ? portfolioData.reduce((sum, p) => sum + p.taxaAplicada, 0) / portfolioData.length 
    : 0

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFinanciadora />}
      title="Dashboard"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Oportunidades Disponíveis
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalOportunidades)}</div>
            <p className="text-xs text-muted-foreground">
              {oportunidadesData.length} {oportunidadesData.length === 1 ? 'operação' : 'operações'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Portfólio Ativo
            </CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPortfolio)}</div>
            <p className="text-xs text-muted-foreground">
              {portfolioAtivo.length} {portfolioAtivo.length === 1 ? 'operação' : 'operações'} em andamento
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
              Portfólio atual
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Financiado
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.length}</div>
            <p className="text-xs text-muted-foreground">
              Operações realizadas
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Novas Oportunidades</CardTitle>
          <CardDescription>
            Operações disponíveis para financiamento
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
                <SelectItem value="B">B</SelectItem>
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
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Dias</TableHead>
                  <TableHead>Melhor Taxa</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOportunidades.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      Nenhuma oportunidade encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOportunidades.map((oportunidade) => (
                    <TableRow key={oportunidade.id}>
                      <TableCell className="font-medium">{oportunidade.numeroNF}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{oportunidade.sacado.nome}</div>
                          <div className="text-xs text-muted-foreground">
                            {oportunidade.sacado.historicoOperacoes} ops | {oportunidade.sacado.taxaAdimplencia}% adimplência
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRatingBadge(oportunidade.sacado.rating)}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(oportunidade.valor)}</TableCell>
                      <TableCell>{formatDate(oportunidade.dataVencimento)}</TableCell>
                      <TableCell>
                        <span className={oportunidade.diasVencimento <= 30 ? "text-orange-600 font-semibold" : ""}>
                          {oportunidade.diasVencimento} dias
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {oportunidade.melhorTaxa}%
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/financiadora/oportunidades/${oportunidade.id}`)}
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          Analisar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </LayoutWithSidebar>
  )
}
