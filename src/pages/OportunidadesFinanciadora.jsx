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
  TrendingUpIcon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFinanciadora } from "@/components/app-sidebar-financiadora"
import oportunidadesData from "@/data/oportunidades-financiadora.json"

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

export function OportunidadesFinanciadora() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRating, setSelectedRating] = useState("todos")

  const filteredOportunidades = oportunidadesData.filter(op => {
    const matchesSearch = op.numeroNF.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         op.sacado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         op.fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = selectedRating === "todos" || op.sacado.rating === selectedRating
    return matchesSearch && matchesRating
  })

  const formatCurrency = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  const totalValor = filteredOportunidades.reduce((sum, op) => sum + op.valor, 0)

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFinanciadora />}
      title="Oportunidades de Financiamento"
    >
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Disponível
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValor)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredOportunidades.length} oportunidades
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rating Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A</div>
            <p className="text-xs text-muted-foreground">
              Qualidade do portfólio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prazo Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60 dias</div>
            <p className="text-xs text-muted-foreground">
              Até vencimento
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Oportunidades</CardTitle>
          <CardDescription>
            Operações aguardando propostas de financiamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por NF, sacado ou fornecedor..."
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
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Dias</TableHead>
                  <TableHead>Interessados</TableHead>
                  <TableHead>Melhor Taxa</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOportunidades.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center text-muted-foreground">
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
                          <div className="text-xs text-muted-foreground">{oportunidade.sacado.cnpj}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{oportunidade.fornecedor.nome}</div>
                          <div className="text-xs text-muted-foreground">{oportunidade.fornecedor.cnpj}</div>
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
                      <TableCell className="text-center">{oportunidade.financiadoresInteressados}</TableCell>
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

          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {filteredOportunidades.length} de {oportunidadesData.length} oportunidades
          </div>
        </CardContent>
      </Card>
    </LayoutWithSidebar>
  )
}
