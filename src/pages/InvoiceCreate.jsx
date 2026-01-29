import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeftIcon,
  SaveIcon,
  FileTextIcon,
  AlertCircleIcon
} from "lucide-react"
import { toast } from "sonner"
import sacadosData from "@/data/sacados.json"
import fornecedoresData from "@/data/fornecedores.json"

export function InvoiceCreate() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    sacado: "",
    fornecedor: "",
    numeroNF: "",
    valor: "",
    vencimento: ""
  })

  const activeSacados = sacadosData.filter(s => s.status === "Ativo")
  const activeFornecedores = fornecedoresData.filter(f => f.status === "Ativo")

  // Filtrar fornecedores pelo sacado selecionado
  const filteredFornecedores = formData.sacado
    ? activeFornecedores.filter(f => f.sacadoAssociado === formData.sacado)
    : activeFornecedores

  const handleSave = () => {
    if (!formData.sacado || !formData.fornecedor || !formData.numeroNF || !formData.valor || !formData.vencimento) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    toast.success("Nota fiscal cadastrada com sucesso!", {
      description: `NF ${formData.numeroNF} registrada no sistema`
    })

    // Limpar formulário
    setFormData({
      sacado: "",
      fornecedor: "",
      numeroNF: "",
      valor: "",
      vencimento: ""
    })
  }

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
                <FileTextIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Cadastrar Nota Fiscal</h1>
                <p className="text-sm text-muted-foreground">Registro de nota fiscal (pré-operação)</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <div className="space-y-6">
          {/* Important Notice */}
          <Card className="border-yellow-600 bg-yellow-50/50 dark:bg-yellow-950/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900 dark:text-yellow-100">
                    Importante: Apenas Cadastro
                  </p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                    Esta tela registra apenas a nota fiscal no sistema. 
                    Ela <strong>NÃO cria operações automaticamente</strong>. 
                    Após o cadastro, você poderá criar uma operação baseada nesta nota fiscal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Dados da Nota Fiscal</CardTitle>
              <CardDescription>
                Preencha as informações da nota fiscal para cadastro no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sacado">Sacado *</Label>
                  <Select
                    value={formData.sacado}
                    onValueChange={(value) => setFormData({ ...formData, sacado: value, fornecedor: "" })}
                  >
                    <SelectTrigger id="sacado">
                      <SelectValue placeholder="Selecione o sacado" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeSacados.map((sacado) => (
                        <SelectItem key={sacado.id} value={sacado.nome}>
                          {sacado.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Empresa compradora responsável pelo pagamento
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fornecedor">Fornecedor *</Label>
                  <Select
                    value={formData.fornecedor}
                    onValueChange={(value) => setFormData({ ...formData, fornecedor: value })}
                    disabled={!formData.sacado}
                  >
                    <SelectTrigger id="fornecedor">
                      <SelectValue placeholder="Selecione o fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredFornecedores.map((fornecedor) => (
                        <SelectItem key={fornecedor.id} value={fornecedor.nome}>
                          {fornecedor.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {formData.sacado 
                      ? "Fornecedores associados ao sacado selecionado"
                      : "Selecione um sacado primeiro"
                    }
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numeroNF">Número da Nota Fiscal *</Label>
                  <Input
                    id="numeroNF"
                    value={formData.numeroNF}
                    onChange={(e) => setFormData({ ...formData, numeroNF: e.target.value })}
                    placeholder="Ex: NF-12345"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor">Valor da Nota Fiscal *</Label>
                  <Input
                    id="valor"
                    value={formData.valor}
                    onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                    placeholder="Ex: R$ 125.000,00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vencimento">Data de Vencimento *</Label>
                <Input
                  id="vencimento"
                  type="date"
                  value={formData.vencimento}
                  onChange={(e) => setFormData({ ...formData, vencimento: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Data em que o sacado deve efetuar o pagamento
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              * Campos obrigatórios
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/sacado/dashboard")}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <SaveIcon className="w-4 h-4 mr-2" />
                Salvar Nota Fiscal
              </Button>
            </div>
          </div>

          {/* Info Box */}
          <Card className="bg-muted">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Próximos Passos</h3>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Nota fiscal será registrada no sistema</li>
                <li>Você poderá visualizar a nota na lista de notas fiscais</li>
                <li>Criar uma operação baseada nesta nota fiscal</li>
                <li>Aprovar a operação e selecionar o financiador</li>
                <li>Marcar a operação como financiada</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
