import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
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
  EditIcon,
  SendIcon,
  BanIcon
} from "lucide-react"
import operacaoData from "@/data/operacao-detalhada.json"

export function OperationDetailAdmin() {
  const navigate = useNavigate()
  const [selectedFinanciador, setSelectedFinanciador] = useState(operacaoData.financiadorSelecionado)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleSelectFinanciador = () => {
    setConfirmAction("select")
    setConfirmDialogOpen(true)
  }

  const handleMarkReady = () => {
    setConfirmAction("ready")
    setConfirmDialogOpen(true)
  }

  const handleMarkFinanced = () => {
    setConfirmAction("financed")
    setConfirmDialogOpen(true)
  }

  const handleCancel = () => {
    setConfirmAction("cancel")
    setConfirmDialogOpen(true)
  }

  const handleConfirm = () => {
    setConfirmDialogOpen(false)
    setConfirmAction(null)
  }

  const getStatusBadge = (status) => {
    const variants = {
      "Aguardando aprovação": { className: "bg-yellow-600 text-white hover:bg-yellow-700" },
      "Aprovada pelo sacado": { className: "bg-blue-600 text-white hover:bg-blue-700" },
      "Pronta para financiamento": { className: "bg-purple-600 text-white hover:bg-purple-700" },
      "Financiada": { className: "bg-green-600 text-white hover:bg-green-700" },
      "Encerrada": { className: "bg-gray-600 text-white hover:bg-gray-700" }
    }
    
    const config = variants[status] || { className: "" }
    
    return (
      <Badge className={config.className}>
        {status}
      </Badge>
    )
  }

  const getDialogContent = () => {
    switch (confirmAction) {
      case "select":
        return {
          title: "Selecionar Financiador",
          description: `Confirmar seleção do financiador para a operação ${operacaoData.id}?`,
          icon: CheckCircle2Icon,
          iconColor: "text-blue-500",
          confirmText: "Confirmar Seleção",
          variant: "default"
        }
      case "ready":
        return {
          title: "Marcar como Pronta",
          description: `Marcar operação ${operacaoData.id} como pronta para financiamento?`,
          icon: SendIcon,
          iconColor: "text-purple-500",
          confirmText: "Confirmar",
          variant: "default"
        }
      case "financed":
        return {
          title: "Marcar como Financiada",
          description: `Confirmar que a operação ${operacaoData.id} foi financiada?`,
          icon: CheckCircle2Icon,
          iconColor: "text-green-500",
          confirmText: "Confirmar Financiamento",
          variant: "default"
        }
      case "cancel":
        return {
          title: "Cancelar Operação",
          description: `Tem certeza que deseja cancelar a operação ${operacaoData.id}? Esta ação não pode ser desfeita.`,
          icon: XCircleIcon,
          iconColor: "text-destructive",
          confirmText: "Confirmar Cancelamento",
          variant: "destructive"
        }
      default:
        return {}
    }
  }

  const dialogContent = getDialogContent()
  const DialogIcon = dialogContent.icon

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin/dashboard")}>
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-2xl font-bold">{operacaoData.id}</h1>
                <p className="text-sm text-muted-foreground">Controle Operacional</p>
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
            {/* Editable Invoice Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileTextIcon className="w-5 h-5" />
                    Dados da Nota Fiscal
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <EditIcon className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancelar" : "Editar"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fornecedor">Fornecedor</Label>
                        <Input id="fornecedor" defaultValue={operacaoData.fornecedor.nome} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input id="cnpj" defaultValue={operacaoData.fornecedor.cnpj} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nf">Número da NF</Label>
                        <Input id="nf" defaultValue={operacaoData.notaFiscal.numero} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="valor">Valor Bruto</Label>
                        <Input id="valor" defaultValue={operacaoData.notaFiscal.valorBruto} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emissao">Data de Emissão</Label>
                        <Input id="emissao" type="date" defaultValue={operacaoData.notaFiscal.dataEmissao} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vencimento">Vencimento</Label>
                        <Input id="vencimento" type="date" defaultValue={operacaoData.notaFiscal.vencimento} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Input id="descricao" defaultValue={operacaoData.notaFiscal.descricao} />
                    </div>
                    <Button className="w-full">
                      Salvar Alterações
                    </Button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </CardContent>
            </Card>

            {/* Financing Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDownIcon className="w-5 h-5" />
                  Seleção de Financiador
                </CardTitle>
                <CardDescription>
                  Escolha o financiador para esta operação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {operacaoData.financiadores.map((fin) => (
                    <div
                      key={fin.id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedFinanciador === fin.id
                          ? 'border-primary bg-primary/5'
                          : fin.isLowestRate
                          ? 'border-green-600 bg-green-50/50 dark:bg-green-950/10'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedFinanciador(fin.id)}
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
                            {selectedFinanciador === fin.id && (
                              <Badge variant="default">
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
                <CardTitle>Ações Administrativas</CardTitle>
                <CardDescription>
                  Controle o fluxo da operação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={handleSelectFinanciador}
                  disabled={!selectedFinanciador}
                >
                  <CheckCircle2Icon className="w-4 h-4 mr-2" />
                  Selecionar Financiador
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleMarkReady}
                >
                  <SendIcon className="w-4 h-4 mr-2" />
                  Marcar como Pronta
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleMarkFinanced}
                >
                  <CheckCircle2Icon className="w-4 h-4 mr-2" />
                  Marcar como Financiada
                </Button>
                <Separator />
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleCancel}
                >
                  <BanIcon className="w-4 h-4 mr-2" />
                  Cancelar Operação
                </Button>
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

            {/* Program & Sacado Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BuildingIcon className="w-4 h-4" />
                  Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Sacado</p>
                  <p className="text-sm font-medium">{operacaoData.sacado.nome}</p>
                  <p className="text-xs text-muted-foreground">{operacaoData.sacado.cnpj}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">Programa</p>
                  <p className="text-sm font-medium">{operacaoData.programa}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {DialogIcon && <DialogIcon className={`w-5 h-5 ${dialogContent.iconColor}`} />}
              {dialogContent.title}
            </DialogTitle>
            <DialogDescription>
              {dialogContent.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Operação:</span>
                <span className="font-medium">{operacaoData.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fornecedor:</span>
                <span className="font-medium">{operacaoData.fornecedor.nome}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valor:</span>
                <span className="font-medium">{operacaoData.notaFiscal.valorBruto}</span>
              </div>
              {confirmAction === "select" && selectedFinanciador && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Financiador:</span>
                  <span className="font-medium">
                    {operacaoData.financiadores.find(f => f.id === selectedFinanciador)?.nome}
                  </span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant={dialogContent.variant}
              onClick={handleConfirm}
            >
              {dialogContent.confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
