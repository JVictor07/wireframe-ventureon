import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeftIcon,
  SaveIcon,
  SettingsIcon,
  CheckCircle2Icon,
  BuildingIcon,
  PercentIcon,
  CalendarIcon
} from "lucide-react"
import { toast } from "sonner"
import financiadoresData from "@/data/financiadores.json"

export function ProgramSetup() {
  const navigate = useNavigate()
  const [programName, setProgramName] = useState("Programa Supply Chain Alpha")
  const [paymentTerm, setPaymentTerm] = useState("30")
  const [selectedFinanciadores, setSelectedFinanciadores] = useState(["FIN-001", "FIN-002", "FIN-003"])

  const handleFinanciadorToggle = (finId) => {
    setSelectedFinanciadores(prev => 
      prev.includes(finId) 
        ? prev.filter(id => id !== finId)
        : [...prev, finId]
    )
  }

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!", {
      description: "As alterações foram aplicadas ao programa."
    })
  }

  const activeFinanciadores = financiadoresData.filter(f => f.status === "Ativo")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/sacado/dashboard")}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Configuração do Programa</h1>
                <p className="text-sm text-muted-foreground">Defina as regras do seu programa de Risco Sacado</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Program Identification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                Identificação do Programa
              </CardTitle>
              <CardDescription>
                Informações básicas do seu programa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="program-name">Nome do Programa</Label>
                <Input
                  id="program-name"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  placeholder="Ex: Programa Supply Chain 2024"
                />
                <p className="text-xs text-muted-foreground">
                  Este nome será exibido em todas as operações do programa
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-term" className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Prazo Padrão de Pagamento (dias)
                </Label>
                <Input
                  id="payment-term"
                  type="number"
                  value={paymentTerm}
                  onChange={(e) => setPaymentTerm(e.target.value)}
                  placeholder="30"
                  min="1"
                  max="365"
                />
                <p className="text-xs text-muted-foreground">
                  Prazo médio para pagamento de fornecedores neste programa
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Financial Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PercentIcon className="w-5 h-5" />
                Regras Financeiras
              </CardTitle>
              <CardDescription>
                Diretrizes de governança e controle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2Icon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Aprovação Obrigatória</p>
                    <p className="text-sm text-muted-foreground">
                      Todas as operações requerem aprovação do sacado antes do financiamento
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <CheckCircle2Icon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Transparência de Taxas</p>
                    <p className="text-sm text-muted-foreground">
                      O sacado visualiza todas as propostas de financiadores antes da aprovação
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <CheckCircle2Icon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Rastreabilidade Completa</p>
                    <p className="text-sm text-muted-foreground">
                      Histórico detalhado de todas as ações e decisões em cada operação
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
                <p className="text-sm">
                  <strong>Importante:</strong> Estas regras garantem governança e controle sobre todas as operações do programa, 
                  proporcionando paz de espírito e escalabilidade operacional.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Associated Financiers */}
          <Card>
            <CardHeader>
              <CardTitle>Financiadores Associados</CardTitle>
              <CardDescription>
                Selecione os financiadores que poderão participar das operações deste programa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeFinanciadores.map((fin) => (
                  <div
                    key={fin.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedFinanciadores.includes(fin.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={fin.id}
                        checked={selectedFinanciadores.includes(fin.id)}
                        onCheckedChange={() => handleFinanciadorToggle(fin.id)}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={fin.id}
                          className="font-semibold cursor-pointer"
                        >
                          {fin.nome}
                        </label>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Taxa Base</p>
                            <p className="text-sm font-medium">{fin.taxaBase}% a.m.</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Prazo Máximo</p>
                            <p className="text-sm font-medium">{fin.prazoMaximo}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Tipo</p>
                            <p className="text-sm font-medium">{fin.tipoInstituicao}</p>
                          </div>
                        </div>
                      </div>
                      {selectedFinanciadores.includes(fin.id) && (
                        <Badge variant="default">Selecionado</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                {selectedFinanciadores.length} financiador(es) selecionado(s). 
                Apenas financiadores ativos estão disponíveis para seleção.
              </p>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              As configurações serão aplicadas a todas as novas operações do programa
            </p>
            <Button size="lg" onClick={handleSave}>
              <SaveIcon className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
