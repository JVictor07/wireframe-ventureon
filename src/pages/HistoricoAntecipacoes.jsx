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
  TrendingUpIcon,
  CalendarIcon,
  DollarSignIcon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFornecedor } from "@/components/app-sidebar-fornecedor"
import recebiveisData from "@/data/recebiveis-fornecedor.json"

export function HistoricoAntecipacoes() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSacado, setSelectedSacado] = useState("todos")

  const historicoData = recebiveisData.filter(r => r.status === "Antecipada")

  const filteredHistorico = historicoData.filter(rec => {
    const matchesSearch = rec.numeroNF.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rec.sacado.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSacado = selectedSacado === "todos" || rec.sacado === selectedSacado
    return matchesSearch && matchesSacado
  })

  const formatCurrency = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  const sacadosUnicos = [...new Set(historicoData.map(r => r.sacado))]

  const totalAntecipado = historicoData.reduce((sum, r) => sum + (r.valorLiquidoRecebido || 0), 0)
  const totalOriginal = historicoData.reduce((sum, r) => sum + r.valor, 0)
  const totalDesconto = totalOriginal - totalAntecipado
  const taxaMedia = historicoData.length > 0 
    ? historicoData.reduce((sum, r) => sum + r.taxaAplicada, 0) / historicoData.length 
    : 0

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFornecedor />}
      title="Histórico de Antecipações"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Antecipado
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAntecipado)}</div>
            <p className="text-xs text-muted-foreground">
              Valor líquido recebido
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Operações
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{historicoData.length}</div>
            <p className="text-xs text-muted-foreground">
              Antecipações realizadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa Média
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxaMedia.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              Média das taxas aplicadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Descontos
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDesconto)}</div>
            <p className="text-xs text-muted-foreground">
              Custo total das antecipações
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico Completo</CardTitle>
          <CardDescription>
            Todas as antecipações já realizadas
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
            <Select value={selectedSacado} onValueChange={setSelectedSacado}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por sacado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os sacados</SelectItem>
                {sacadosUnicos.map(sacado => (
                  <SelectItem key={sacado} value={sacado}>{sacado}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NF</TableHead>
                  <TableHead>Sacado</TableHead>
                  <TableHead>Valor Original</TableHead>
                  <TableHead>Taxa</TableHead>
                  <TableHead>Valor Recebido</TableHead>
                  <TableHead>Financiador</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistorico.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      Nenhuma antecipação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHistorico.map((recebivel) => (
                    <TableRow key={recebivel.id}>
                      <TableCell className="font-medium">{recebivel.numeroNF}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{recebivel.sacado}</div>
                          <div className="text-xs text-muted-foreground">{recebivel.sacadoCNPJ}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(recebivel.valor)}</TableCell>
                      <TableCell className="font-semibold">{recebivel.taxaAplicada}%</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {formatCurrency(recebivel.valorLiquidoRecebido)}
                      </TableCell>
                      <TableCell>{recebivel.financiadorSelecionado}</TableCell>
                      <TableCell>{formatDate(recebivel.dataAntecipacao)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/fornecedor/recebiveis/${recebivel.id}`)}
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
            Mostrando {filteredHistorico.length} de {historicoData.length} antecipações
          </div>
        </CardContent>
      </Card>
    </LayoutWithSidebar>
  )
}
