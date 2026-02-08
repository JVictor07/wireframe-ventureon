import { useNavigate, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeftIcon,
  BuildingIcon,
  CalendarIcon,
  DollarSignIcon,
  PackageIcon,
  TrendingUpIcon,
  CheckCircle2Icon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFinanciadora } from "@/components/app-sidebar-financiadora"
import portfolioData from "@/data/portfolio-financiadora.json"

const getStatusBadge = (status) => {
  const variants = {
    "Em Andamento": { variant: "default", className: "bg-green-600 text-white hover:bg-green-700" },
    "Pago": { variant: "default", className: "bg-blue-600 text-white hover:bg-blue-700" }
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

export function PortfolioDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  const operacao = portfolioData.find(op => op.id === id)

  if (!operacao) {
    return (
      <LayoutWithSidebar 
        sidebar={<AppSidebarFinanciadora />}
        title="Operação não encontrada"
      >
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Operação não encontrada</p>
            <div className="flex justify-center mt-4">
              <Button onClick={() => navigate("/financiadora/portfolio")}>
                Voltar para Portfólio
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

  const lucro = operacao.valorReceber - operacao.valorFinanciado

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFinanciadora />}
      title="Detalhe da Operação"
    >
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/financiadora/portfolio")}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Voltar para Portfólio
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{operacao.numeroNF}</CardTitle>
                <CardDescription>Detalhes da Operação Financiada</CardDescription>
              </div>
              {getStatusBadge(operacao.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BuildingIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Sacado (Pagador)</p>
                    <p className="text-sm text-muted-foreground">{operacao.sacado.nome}</p>
                    <p className="text-xs text-muted-foreground">{operacao.sacado.cnpj}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs">Rating:</span>
                      {getRatingBadge(operacao.sacado.rating)}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PackageIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Fornecedor</p>
                    <p className="text-sm text-muted-foreground">{operacao.fornecedor.nome}</p>
                    <p className="text-xs text-muted-foreground">{operacao.fornecedor.cnpj}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSignIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Valor da NF</p>
                    <p className="text-2xl font-bold">{formatCurrency(operacao.valorNF)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Vencimento</p>
                    <p className="text-sm text-muted-foreground">{formatDate(operacao.dataVencimento)}</p>
                    {operacao.status === "Em Andamento" && (
                      <p className="text-xs text-muted-foreground">
                        {operacao.diasRestantes} dias restantes
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes Financeiros</CardTitle>
            <CardDescription>
              Informações da operação de financiamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium">Valor Financiado</p>
                  <p className="text-2xl font-bold mt-2 text-green-600">{formatCurrency(operacao.valorFinanciado)}</p>
                  <p className="text-xs text-muted-foreground">Pago ao fornecedor</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium">Taxa Aplicada</p>
                  <p className="text-2xl font-bold mt-2">{operacao.taxaAplicada}%</p>
                  <p className="text-xs text-muted-foreground">Taxa de desconto</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium">Valor a Receber</p>
                  <p className="text-2xl font-bold mt-2">{formatCurrency(operacao.valorReceber)}</p>
                  <p className="text-xs text-muted-foreground">Do sacado</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg bg-muted">
                  <p className="text-sm font-medium">Lucro da Operação</p>
                  <p className="text-2xl font-bold mt-2 text-green-600">{formatCurrency(lucro)}</p>
                  <p className="text-xs text-muted-foreground">
                    Rentabilidade: {((lucro / operacao.valorFinanciado) * 100).toFixed(2)}%
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-muted">
                  <p className="text-sm font-medium">Data do Financiamento</p>
                  <p className="text-lg font-bold mt-2">{formatDate(operacao.dataFinanciamento)}</p>
                  <p className="text-xs text-muted-foreground">
                    Quando o valor foi liberado
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {operacao.status === "Pago" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2Icon className="h-5 w-5 text-green-600" />
                Operação Finalizada
              </CardTitle>
              <CardDescription>
                Pagamento recebido com sucesso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Data do Pagamento</p>
                    <p className="text-lg font-bold mt-1">{formatDate(operacao.dataPagamento)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Valor Recebido</p>
                    <p className="text-2xl font-bold mt-1 text-green-600">{formatCurrency(operacao.valorReceber)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {operacao.status === "Em Andamento" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5 text-blue-600" />
                Status da Operação
              </CardTitle>
              <CardDescription>
                Aguardando pagamento do sacado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Vencimento</p>
                    <p className="text-lg font-bold mt-1">{formatDate(operacao.dataVencimento)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {operacao.diasRestantes} dias restantes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Valor a Receber</p>
                    <p className="text-2xl font-bold mt-1 text-blue-600">{formatCurrency(operacao.valorReceber)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </LayoutWithSidebar>
  )
}
