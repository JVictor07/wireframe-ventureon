import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeftIcon,
  BuildingIcon,
  CalendarIcon,
  DollarSignIcon,
  TrendingDownIcon,
  CheckCircle2Icon,
  ClockIcon,
  AlertTriangleIcon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFornecedor } from "@/components/app-sidebar-fornecedor"
import { ConfirmationModal } from "@/components/ConfirmationModal"
import { toast } from "sonner"
import recebiveisData from "@/data/recebiveis-fornecedor.json"

const getStatusBadge = (status) => {
  const variants = {
    "Disponível para Antecipar": { variant: "default", className: "bg-green-600 text-white hover:bg-green-700" },
    "Aguardando Aprovação": { variant: "default", className: "bg-yellow-600 text-white hover:bg-yellow-700" },
    "Antecipada": { variant: "default", className: "bg-blue-600 text-white hover:bg-blue-700" }
  }
  
  const config = variants[status] || { variant: "default", className: "" }
  
  return (
    <Badge variant={config.variant} className={`${config.className}`}>
      {status}
    </Badge>
  )
}

export function RecebivelDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [selectedFinanciador, setSelectedFinanciador] = useState(null)

  const recebivel = recebiveisData.find(r => r.id === id)

  if (!recebivel) {
    return (
      <LayoutWithSidebar 
        sidebar={<AppSidebarFornecedor />}
        title="Recebível não encontrado"
      >
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Recebível não encontrado</p>
            <div className="flex justify-center mt-4">
              <Button onClick={() => navigate("/fornecedor/recebiveis")}>
                Voltar para Recebíveis
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

  const handleSolicitarAntecipacao = (financiador) => {
    setSelectedFinanciador(financiador)
    setConfirmModalOpen(true)
  }

  const handleConfirmAntecipacao = () => {
    toast.success(`Solicitação de antecipação enviada com ${selectedFinanciador.nome}`)
    setConfirmModalOpen(false)
    setTimeout(() => {
      navigate("/fornecedor/recebiveis")
    }, 1500)
  }

  const melhorTaxa = recebivel.financiadoresDisponiveis?.reduce((min, f) => 
    f.taxa < min.taxa ? f : min
  , recebivel.financiadoresDisponiveis[0])

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFornecedor />}
      title="Detalhe do Recebível"
    >
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/fornecedor/recebiveis")}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Voltar para Recebíveis
        </Button>
      </div>


      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{recebivel.numeroNF}</CardTitle>
                <CardDescription>Detalhes da Nota Fiscal</CardDescription>
              </div>
              {getStatusBadge(recebivel.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BuildingIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Sacado</p>
                    <p className="text-sm text-muted-foreground">{recebivel.sacado}</p>
                    <p className="text-xs text-muted-foreground">{recebivel.sacadoCNPJ}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSignIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Valor da NF</p>
                    <p className="text-2xl font-bold">{formatCurrency(recebivel.valor)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Data de Emissão</p>
                    <p className="text-sm text-muted-foreground">{formatDate(recebivel.dataEmissao)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClockIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Vencimento</p>
                    <p className="text-sm text-muted-foreground">{formatDate(recebivel.dataVencimento)}</p>
                    <p className="text-xs text-muted-foreground">
                      {recebivel.diasVencimento} dias restantes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {recebivel.status === "Antecipada" && (
          <Card>
            <CardHeader>
              <CardTitle>Informações da Antecipação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium">Financiador</p>
                  <p className="text-sm text-muted-foreground">{recebivel.financiadorSelecionado}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Taxa Aplicada</p>
                  <p className="text-sm text-muted-foreground">{recebivel.taxaAplicada}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Valor Líquido Recebido</p>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(recebivel.valorLiquidoRecebido)}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div>
                <p className="text-sm font-medium">Data da Antecipação</p>
                <p className="text-sm text-muted-foreground">{formatDate(recebivel.dataAntecipacao)}</p>
              </div>
            </CardContent>
          </Card>
        )}

      

        {recebivel.status !== "Antecipada" && recebivel.financiadoresDisponiveis && (
          <Card>
            <CardHeader>
              <CardTitle>Opções de Financiadores</CardTitle>
              <CardDescription>
                Compare as taxas e escolha a melhor opção para antecipar
              </CardDescription>
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangleIcon className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-900">Isso é possível?</p>
                    <p className="text-sm text-red-800 mt-1">
                      Verificar se o fornecedor na hora de antecipar pode escolher as taxas ou é o Sacado quem escolhe no momento de criar a operação
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Financiador</TableHead>
                      <TableHead>Taxa</TableHead>
                      <TableHead>Valor Líquido</TableHead>
                      <TableHead>Desconto</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recebivel.financiadoresDisponiveis.map((financiador) => {
                      const isMelhorTaxa = financiador.id === melhorTaxa?.id
                      const desconto = recebivel.valor - financiador.valorLiquido
                      
                      return (
                        <TableRow key={financiador.id} className={isMelhorTaxa ? "bg-green-50" : ""}>
                          <TableCell className="font-medium">
                            {financiador.nome}
                            {isMelhorTaxa && (
                              <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-300">
                                Melhor Taxa
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="font-semibold">{financiador.taxa}%</TableCell>
                          <TableCell className="font-semibold text-green-600">
                            {formatCurrency(financiador.valorLiquido)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatCurrency(desconto)}
                          </TableCell>
                          <TableCell className="text-right">
                            {recebivel.status === "Disponível para Antecipar" ? (
                              <Button
                                size="sm"
                                variant={isMelhorTaxa ? "default" : "outline"}
                                onClick={() => handleSolicitarAntecipacao(financiador)}
                              >
                                <TrendingDownIcon className="h-4 w-4 mr-1" />
                                Solicitar
                              </Button>
                            ) : (
                              <Badge variant="secondary">Aguardando</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <ConfirmationModal
        open={confirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        onConfirm={handleConfirmAntecipacao}
        title="Confirmar Solicitação de Antecipação"
        description={
          selectedFinanciador ? (
            <div className="space-y-2">
              <p>Você está prestes a solicitar a antecipação do recebível:</p>
              <div className="bg-muted p-3 rounded-md space-y-1 text-sm">
                <p><strong>NF:</strong> {recebivel.numeroNF}</p>
                <p><strong>Valor:</strong> {formatCurrency(recebivel.valor)}</p>
                <p><strong>Financiador:</strong> {selectedFinanciador.nome}</p>
                <p><strong>Taxa:</strong> {selectedFinanciador.taxa}%</p>
                <p className="text-green-600 font-semibold">
                  <strong>Valor Líquido:</strong> {formatCurrency(selectedFinanciador.valorLiquido)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                A solicitação será enviada para aprovação do sacado.
              </p>
            </div>
          ) : null
        }
        confirmText="Confirmar Solicitação"
        cancelText="Cancelar"
      />
    </LayoutWithSidebar>
  )
}
