import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeftIcon,
  BuildingIcon,
  CalendarIcon,
  DollarSignIcon,
  TrendingUpIcon,
  CheckCircle2Icon,
  PackageIcon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFinanciadora } from "@/components/app-sidebar-financiadora"
import { toast } from "sonner"
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

export function OportunidadeDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [taxaProposta, setTaxaProposta] = useState("")

  const oportunidade = oportunidadesData.find(op => op.id === id)

  if (!oportunidade) {
    return (
      <LayoutWithSidebar 
        sidebar={<AppSidebarFinanciadora />}
        title="Oportunidade não encontrada"
      >
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Oportunidade não encontrada</p>
            <div className="flex justify-center mt-4">
              <Button onClick={() => navigate("/financiadora/oportunidades")}>
                Voltar para Oportunidades
              </Button>
            </div>
          </CardContent>
        </Card>
      </LayoutWithSidebar>
    )
  }

  const formatCurrency = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  const calcularValorLiquido = (valor, taxa) => {
    const taxaDecimal = taxa / 100
    return valor * (1 - taxaDecimal)
  }

  const handleEnviarProposta = () => {
    if (!taxaProposta || parseFloat(taxaProposta) <= 0) {
      toast.error("Por favor, informe uma taxa válida")
      return
    }
    toast.success("Proposta enviada com sucesso!")
    setTimeout(() => {
      navigate("/financiadora/oportunidades")
    }, 1500)
  }

  const valorLiquidoProposta = taxaProposta ? calcularValorLiquido(oportunidade.valor, parseFloat(taxaProposta)) : 0

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFinanciadora />}
      title="Análise de Oportunidade"
    >
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/financiadora/oportunidades")}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Voltar para Oportunidades
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{oportunidade.numeroNF}</CardTitle>
                <CardDescription>Detalhes da Oportunidade de Financiamento</CardDescription>
              </div>
              <Badge variant="default" className="bg-blue-600 text-white">
                {oportunidade.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BuildingIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Sacado (Pagador)</p>
                    <p className="text-sm text-muted-foreground">{oportunidade.sacado.nome}</p>
                    <p className="text-xs text-muted-foreground">{oportunidade.sacado.cnpj}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs">Rating:</span>
                      {getRatingBadge(oportunidade.sacado.rating)}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PackageIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Fornecedor</p>
                    <p className="text-sm text-muted-foreground">{oportunidade.fornecedor.nome}</p>
                    <p className="text-xs text-muted-foreground">{oportunidade.fornecedor.cnpj}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSignIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Valor da NF</p>
                    <p className="text-2xl font-bold">{formatCurrency(oportunidade.valor)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Vencimento</p>
                    <p className="text-sm text-muted-foreground">{formatDate(oportunidade.dataVencimento)}</p>
                    <p className="text-xs text-muted-foreground">
                      {oportunidade.diasVencimento} dias restantes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Análise de Risco do Sacado</CardTitle>
            <CardDescription>
              Histórico e performance do pagador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium">Histórico de Operações</p>
                <p className="text-2xl font-bold mt-2">{oportunidade.sacado.historicoOperacoes}</p>
                <p className="text-xs text-muted-foreground">Operações anteriores</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium">Taxa de Adimplência</p>
                <p className="text-2xl font-bold mt-2 text-green-600">{oportunidade.sacado.taxaAdimplencia}%</p>
                <p className="text-xs text-muted-foreground">Pagamentos em dia</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium">Rating de Crédito</p>
                <div className="mt-2">
                  {getRatingBadge(oportunidade.sacado.rating)}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Classificação de risco</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competição</CardTitle>
            <CardDescription>
              Outras financiadoras interessadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium">Financiadoras Interessadas</p>
                <p className="text-2xl font-bold mt-2">{oportunidade.financiadoresInteressados}</p>
                <p className="text-xs text-muted-foreground">Propostas concorrentes</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium">Melhor Taxa Atual</p>
                <p className="text-2xl font-bold mt-2 text-green-600">{oportunidade.melhorTaxa}%</p>
                <p className="text-xs text-muted-foreground">Taxa mais competitiva</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enviar Proposta</CardTitle>
            <CardDescription>
              Informe sua taxa para financiar esta operação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taxa">Taxa Proposta (%)</Label>
                  <Input
                    id="taxa"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 2.5"
                    value={taxaProposta}
                    onChange={(e) => setTaxaProposta(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Melhor taxa atual: {oportunidade.melhorTaxa}%
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Valor Líquido ao Fornecedor</Label>
                  <div className="p-3 border rounded-lg bg-muted">
                    <p className="text-2xl font-bold">
                      {taxaProposta ? formatCurrency(valorLiquidoProposta) : "-"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Desconto: {taxaProposta ? formatCurrency(oportunidade.valor - valorLiquidoProposta) : "-"}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {taxaProposta && parseFloat(taxaProposta) < oportunidade.melhorTaxa && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2Icon className="h-4 w-4" />
                      Sua taxa é mais competitiva!
                    </div>
                  )}
                  {taxaProposta && parseFloat(taxaProposta) > oportunidade.melhorTaxa && (
                    <div className="flex items-center gap-2 text-orange-600">
                      <TrendingUpIcon className="h-4 w-4" />
                      Sua taxa está acima da melhor oferta
                    </div>
                  )}
                </div>
                <Button onClick={handleEnviarProposta} disabled={!taxaProposta}>
                  Enviar Proposta
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWithSidebar>
  )
}
