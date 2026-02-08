import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  TrendingUpIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  BarChart3Icon,
  EditIcon
} from "lucide-react"
import { toast } from "sonner"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFinanciadora } from "@/components/app-sidebar-financiadora"

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

const getRiscoIndicator = (rating) => {
  const config = {
    "A+": { label: "Baixo", color: "text-green-600", icon: CheckCircle2Icon },
    "A": { label: "Baixo", color: "text-blue-600", icon: CheckCircle2Icon },
    "B+": { label: "Médio", color: "text-yellow-600", icon: AlertTriangleIcon },
    "B": { label: "Alto", color: "text-orange-600", icon: AlertTriangleIcon }
  }
  
  const { label, color, icon: Icon } = config[rating] || config["B"]
  
  return (
    <div className={`flex items-center gap-1 ${color}`}>
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

export function AnaliseRiscoFinanciadora() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSacado, setSelectedSacado] = useState(null)
  const [classificacaoRisco, setClassificacaoRisco] = useState({})

  const sacadosData = [
    {
      nome: "Empresa Alpha S.A.",
      cnpj: "11.222.333/0001-44",
      rating: "A+",
      operacoes: 24,
      emAndamento: 8,
      exposicao: 1250000,
      taxaMedia: "2.35",
      pagos: 16
    },
    {
      nome: "Distribuidora Beta Ltda",
      cnpj: "22.333.444/0001-55",
      rating: "A",
      operacoes: 18,
      emAndamento: 5,
      exposicao: 850000,
      taxaMedia: "2.58",
      pagos: 13
    },
    {
      nome: "Indústria Gamma Corp",
      cnpj: "33.444.555/0001-66",
      rating: "B+",
      operacoes: 15,
      emAndamento: 6,
      exposicao: 620000,
      taxaMedia: "3.12",
      pagos: 9
    },
    {
      nome: "Comercial Delta S.A.",
      cnpj: "44.555.666/0001-77",
      rating: "A",
      operacoes: 12,
      emAndamento: 4,
      exposicao: 480000,
      taxaMedia: "2.45",
      pagos: 8
    },
    {
      nome: "Varejo Epsilon Ltda",
      cnpj: "55.666.777/0001-88",
      rating: null,
      operacoes: 8,
      emAndamento: 3,
      exposicao: 320000,
      taxaMedia: "2.89",
      pagos: 5
    },
    {
      nome: "Atacado Zeta S.A.",
      cnpj: "66.777.888/0001-99",
      rating: null,
      operacoes: 6,
      emAndamento: 2,
      exposicao: 180000,
      taxaMedia: "3.05",
      pagos: 4
    },
    {
      nome: "Serviços Omega Corp",
      cnpj: "77.888.999/0001-00",
      rating: null,
      operacoes: 4,
      emAndamento: 1,
      exposicao: 95000,
      taxaMedia: "2.75",
      pagos: 3
    }
  ]

  const handleClassificar = (sacado) => {
    setSelectedSacado(sacado)
    setDialogOpen(true)
  }

  const handleSaveClassificacao = () => {
    if (!selectedSacado) return
    
    const novaClassificacao = document.getElementById("rating-select").value
    setClassificacaoRisco({
      ...classificacaoRisco,
      [selectedSacado.cnpj]: novaClassificacao
    })
    toast.success(`Classificação de risco atualizada para ${selectedSacado.nome}`)
    setDialogOpen(false)
    setSelectedSacado(null)
  }

  const filteredSacados = sacadosData.filter(sacado =>
    sacado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sacado.cnpj.includes(searchTerm)
  )

  const formatCurrency = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  const totalExposicao = sacadosData.reduce((sum, s) => sum + s.exposicao, 0)
  const sacadosAtivos = sacadosData.filter(s => s.emAndamento > 0).length
  const sacadosClassificados = sacadosData.filter(s => s.rating).length
  const ratingMedio = sacadosClassificados > 0 ? "A" : "-"

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFinanciadora />}
      title="Análise de Risco"
    >
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Resumo</CardTitle>
          <CardDescription>
            Resumo dos dados das suas operações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Exposição Total
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExposicao)}</div>
            <p className="text-xs text-muted-foreground">
              Valor em risco
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sacados Ativos
            </CardTitle>
            <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sacadosAtivos}</div>
            <p className="text-xs text-muted-foreground">
              Com operações em andamento
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
            <div className="text-2xl font-bold">{ratingMedio}</div>
            <p className="text-xs text-muted-foreground">
              Qualidade do portfólio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Sacados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sacadosData.length}</div>
            <p className="text-xs text-muted-foreground">
              Cadastrados
            </p>
          </CardContent>
        </Card>
        </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Concentração de Risco</CardTitle>
          <CardDescription>
            Distribuição da exposição por classificação de risco
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { rating: "A+", exposicao: 2850000, percentual: 42.5, qtdSacados: 8 },
              { rating: "A", exposicao: 1950000, percentual: 29.1, qtdSacados: 6 },
              { rating: "B+", exposicao: 1200000, percentual: 17.9, qtdSacados: 4 },
              { rating: "B", exposicao: 700000, percentual: 10.5, qtdSacados: 3 }
            ].map(({ rating, exposicao, percentual, qtdSacados }) => (
              <div key={rating} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Rating {rating}</span>
                  {getRatingBadge(rating)}
                </div>
                <p className="text-2xl font-bold">{formatCurrency(exposicao)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {percentual}% da exposição total
                </p>
                <p className="text-xs text-muted-foreground">
                  {qtdSacados} {qtdSacados === 1 ? 'sacado' : 'sacados'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Análise por Sacado</CardTitle>
          <CardDescription>
            Classifique o risco e acompanhe a exposição de cada pagador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou CNPJ..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sacado</TableHead>
                  <TableHead>Classificação</TableHead>
                  <TableHead>Risco</TableHead>
                  <TableHead>Operações</TableHead>
                  <TableHead>Em Andamento</TableHead>
                  <TableHead>Exposição</TableHead>
                  <TableHead>Taxa Média</TableHead>
                  <TableHead>Pagos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSacados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground">
                      Nenhum sacado encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSacados.map((sacado) => (
                    <TableRow key={sacado.cnpj}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sacado.nome}</div>
                          <div className="text-xs text-muted-foreground">{sacado.cnpj}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {sacado.rating ? (
                          getRatingBadge(sacado.rating)
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-600">
                            Não classificado
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {sacado.rating ? getRiscoIndicator(sacado.rating) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{sacado.operacoes}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sacado.emAndamento}</div>
                          <div className="text-xs text-muted-foreground">operações</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(sacado.exposicao)}
                      </TableCell>
                      <TableCell className="font-medium">{sacado.taxaMedia}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2Icon className="h-4 w-4" />
                          <span className="font-medium">{sacado.pagos}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleClassificar(sacado)}
                        >
                          <EditIcon className="h-4 w-4 mr-1" />
                          Classificar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {filteredSacados.length} de {sacadosData.length} sacados
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Classificar Risco do Sacado</DialogTitle>
            <DialogDescription>
              Defina a classificação de risco para {selectedSacado?.nome}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rating-select">Classificação de Risco</Label>
              <Select defaultValue={selectedSacado?.rating || ""} id="rating-select">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma classificação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">A+</Badge>
                      <span className="text-sm">Risco Muito Baixo</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="A">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">A</Badge>
                      <span className="text-sm">Risco Baixo</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="B+">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">B+</Badge>
                      <span className="text-sm">Risco Médio</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="B">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">B</Badge>
                      <span className="text-sm">Risco Alto</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedSacado && (
              <div className="p-3 border rounded-lg bg-muted">
                <p className="text-sm font-medium mb-2">Informações do Sacado</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Operações:</span>
                    <span className="font-medium">{selectedSacado.operacoes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pagos:</span>
                    <span className="font-medium text-green-600">{selectedSacado.pagos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exposição:</span>
                    <span className="font-medium">{formatCurrency(selectedSacado.exposicao)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveClassificacao}>
              Salvar Classificação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LayoutWithSidebar>
  )
}
