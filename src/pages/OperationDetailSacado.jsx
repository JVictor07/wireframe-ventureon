import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  ArrowLeftIcon,
  CheckCircle2Icon,
  XCircleIcon,
  TrendingDownIcon,
  CalendarIcon,
  BuildingIcon,
  FileTextIcon,
  DollarSignIcon,
  ClockIcon,
  StarIcon,
  HandshakeIcon
} from "lucide-react"
import { toast } from "sonner"
import operacaoData from "@/data/operacao-detalhada.json"

export function OperationDetailSacado() {
  const navigate = useNavigate()
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedFinancier, setSelectedFinancier] = useState(null)
  const [financeDialogOpen, setFinanceDialogOpen] = useState(false)

  const handleApprove = () => {
    toast.success("Operação aprovada com sucesso!")
    setApproveDialogOpen(false)
  }

  const handleReject = () => {
    toast.error("Operação rejeitada")
    setRejectDialogOpen(false)
  }

  const handleSelectFinancier = (financier) => {
    setSelectedFinancier(financier)
    toast.success(`Financiador ${financier.nome} selecionado`)
  }

  const handleMarkAsFinanced = () => {
    if (!selectedFinancier) {
      toast.error("Selecione um financiador primeiro")
      return
    }
    setFinanceDialogOpen(true)
  }

  const confirmFinance = () => {
    toast.success("Operação marcada como financiada!")
    setFinanceDialogOpen(false)
  }

  const getStatusBadge = (status) => {
    const variants = {
      "Aguardando aprovação": { className: "bg-yellow-600 text-white hover:bg-yellow-700" },
      "Aprovada": { className: "bg-green-600 text-white hover:bg-green-700" },
      "Rejeitada": { className: "bg-red-600 text-white hover:bg-red-700" }
    }
    
    const config = variants[status] || { className: "" }
    
    return (
      <Badge className={config.className}>
        {status}
      </Badge>
    )
  }

  const canTakeAction = operacaoData.status === "Aguardando aprovação"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/sacado/dashboard")}>
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-2xl font-bold">{operacaoData.id}</h1>
                <p className="text-sm text-muted-foreground">Detalhes da Operação</p>
              </div>
            </div>
            <div>
              {getStatusBadge(operacaoData.status)}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileTextIcon className="w-5 h-5" />
                  Detalhes da Nota Fiscal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Fornecedor</p>
                    <p className="font-semibold">{operacaoData.fornecedor.nome}</p>
                    <p className="text-sm text-muted-foreground">{operacaoData.fornecedor.cnpj}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Número da NF</p>
                    <p className="font-semibold">{operacaoData.notaFiscal.numero}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <DollarSignIcon className="w-4 h-4" />
                      Valor Bruto
                    </p>
                    <p className="text-2xl font-bold text-primary">{operacaoData.notaFiscal.valorBruto}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      Vencimento
                    </p>
                    <p className="text-lg font-semibold">
                      {new Date(operacaoData.notaFiscal.vencimento).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Descrição</p>
                  <p className="text-sm">{operacaoData.notaFiscal.descricao}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Data de Emissão</p>
                  <p className="text-sm font-medium">
                    {new Date(operacaoData.notaFiscal.dataEmissao).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Financing Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDownIcon className="w-5 h-5" />
                  Comparação de Financiadores
                </CardTitle>
                <CardDescription>
                  Propostas recebidas para esta operação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {operacaoData.financiadores.map((fin) => (
                    <div
                      key={fin.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedFinancier?.id === fin.id
                          ? 'border-primary bg-primary/5'
                          : fin.isLowestRate
                          ? 'border-green-600 bg-green-50/50 dark:bg-green-950/10'
                          : 'border-border bg-card'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{fin.nome}</p>
                            {fin.isLowestRate && (
                              <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700">
                                <StarIcon className="w-3 h-3 mr-1" />
                                Menor Taxa
                              </Badge>
                            )}
                            {selectedFinancier?.id === fin.id && (
                              <Badge variant="default" className="bg-primary text-white">
                                Selecionado
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-4 mt-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Taxa</p>
                              <p className="text-lg font-bold text-primary">{fin.taxa}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Valor Líquido</p>
                              <p className="font-semibold">{fin.valorLiquido}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Prazo</p>
                              <p className="font-medium">{fin.prazo}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button
                              size="sm"
                              variant={selectedFinancier?.id === fin.id ? "default" : "outline"}
                              onClick={() => handleSelectFinancier(fin)}
                              className="w-full"
                            >
                              {selectedFinancier?.id === fin.id ? "Selecionado" : "Selecionar"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
                <CardDescription>
                  {canTakeAction ? "Tome uma decisão sobre esta operação" : "Gerencie o financiamento"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {canTakeAction ? (
                  <>
                    <Button 
                      className="w-full" 
                      onClick={() => setApproveDialogOpen(true)}
                    >
                      <CheckCircle2Icon className="w-4 h-4 mr-2" />
                      Aprovar Operação
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => setRejectDialogOpen(true)}
                    >
                      <XCircleIcon className="w-4 h-4 mr-2" />
                      Rejeitar Operação
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-muted rounded-lg text-sm">
                      {selectedFinancier ? (
                        <div>
                          <p className="font-semibold">Financiador Selecionado:</p>
                          <p className="text-muted-foreground">{selectedFinancier.nome}</p>
                          <p className="text-primary font-bold mt-1">Taxa: {selectedFinancier.taxa}%</p>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Selecione um financiador abaixo</p>
                      )}
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleMarkAsFinanced}
                      disabled={!selectedFinancier}
                    >
                      <HandshakeIcon className="w-4 h-4 mr-2" />
                      Marcar como Financiada
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Operation History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  Histórico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {operacaoData.historico.map((item, index) => (
                    <div key={index} className="relative pl-6 pb-4 last:pb-0">
                      {index !== operacaoData.historico.length - 1 && (
                        <div className="absolute left-2 top-2 bottom-0 w-px bg-border" />
                      )}
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm font-semibold">{item.evento}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.data).toLocaleString('pt-BR')}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.responsavel}
                        </p>
                        {item.detalhes && (
                          <p className="text-xs mt-1">{item.detalhes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Program Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BuildingIcon className="w-4 h-4" />
                  Programa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">{operacaoData.programa}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {operacaoData.sacado.nome}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Approve Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2Icon className="w-5 h-5 text-green-500" />
              Confirmar Aprovação
            </DialogTitle>
            <DialogDescription>
              Você está prestes a aprovar a operação <strong>{operacaoData.id}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fornecedor:</span>
                <span className="font-medium">{operacaoData.fornecedor.nome}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valor:</span>
                <span className="font-medium">{operacaoData.notaFiscal.valorBruto}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Melhor Taxa:</span>
                <span className="font-medium text-green-600">
                  {operacaoData.financiadores.find(f => f.isLowestRate)?.taxa}%
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Ao aprovar, a operação seguirá para seleção de financiador.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleApprove}>
              Confirmar Aprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircleIcon className="w-5 h-5 text-destructive" />
              Confirmar Rejeição
            </DialogTitle>
            <DialogDescription>
              Você está prestes a rejeitar a operação <strong>{operacaoData.id}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div className="p-4 bg-destructive/10 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fornecedor:</span>
                <span className="font-medium">{operacaoData.fornecedor.nome}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valor:</span>
                <span className="font-medium">{operacaoData.notaFiscal.valorBruto}</span>
              </div>
            </div>
            <p className="text-sm text-destructive font-medium">
              ⚠️ Esta ação não pode ser desfeita. A operação será cancelada.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Confirmar Rejeição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Finance Confirmation Dialog */}
      <Dialog open={financeDialogOpen} onOpenChange={setFinanceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HandshakeIcon className="w-5 h-5 text-green-500" />
              Confirmar Financiamento
            </DialogTitle>
            <DialogDescription>
              Você está prestes a marcar a operação <strong>{operacaoData.id}</strong> como financiada.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Financiador:</span>
                <span className="font-medium">{selectedFinancier?.nome}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxa:</span>
                <span className="font-medium text-green-600">{selectedFinancier?.taxa}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valor Líquido:</span>
                <span className="font-medium">{selectedFinancier?.valorLiquido}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Esta ação marcará a operação como concluída no sistema.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFinanceDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmFinance}>
              Confirmar Financiamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
