import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  BuildingIcon,
  CheckCircle2Icon,
  SaveIcon
} from "lucide-react"
import { toast } from "sonner"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarSacado } from "@/components/app-sidebar-sacado"

export function CompanyManagement() {
  const [formData, setFormData] = useState({
    nomeEmpresa: "Empresa Alpha S.A.",
    cnpj: "12.345.678/0001-90",
    razaoSocial: "Empresa Alpha Sociedade Anônima",
    inscricaoEstadual: "123.456.789.012",
    endereco: "Av. Paulista, 1000",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100",
    telefone: "(11) 3000-0000",
    email: "contato@alpha.com.br",
    responsavelFinanceiro: "João Silva",
    emailFinanceiro: "joao.silva@alpha.com.br",
    telefoneFinanceiro: "(11) 99999-9999"
  })

  const handleSave = () => {
    toast.success("Informações da empresa atualizadas com sucesso!")
  }

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarSacado />}
      title="Gestão da Empresa"
    >
      <div className="space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <BuildingIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>Informações da Empresa</CardTitle>
                  <CardDescription>Gerencie os dados cadastrais da sua empresa</CardDescription>
                </div>
              </div>
              <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700">
                <CheckCircle2Icon className="w-3 h-3 mr-1" />
                Ativa
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Company Data */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Cadastrais</CardTitle>
            <CardDescription>Informações legais e de identificação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomeEmpresa">Nome Fantasia *</Label>
                <Input
                  id="nomeEmpresa"
                  value={formData.nomeEmpresa}
                  onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="razaoSocial">Razão Social *</Label>
              <Input
                id="razaoSocial"
                value={formData.razaoSocial}
                onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
              <Input
                id="inscricaoEstadual"
                value={formData.inscricaoEstadual}
                onChange={(e) => setFormData({ ...formData, inscricaoEstadual: e.target.value })}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Endereço</h3>
              <div className="space-y-2">
                <Label htmlFor="endereco">Logradouro *</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado *</Label>
                  <Input
                    id="estado"
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
            <CardDescription>Dados para comunicação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone Principal *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail Principal *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Responsável Financeiro</h3>
              <div className="space-y-2">
                <Label htmlFor="responsavelFinanceiro">Nome Completo *</Label>
                <Input
                  id="responsavelFinanceiro"
                  value={formData.responsavelFinanceiro}
                  onChange={(e) => setFormData({ ...formData, responsavelFinanceiro: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emailFinanceiro">E-mail *</Label>
                  <Input
                    id="emailFinanceiro"
                    type="email"
                    value={formData.emailFinanceiro}
                    onChange={(e) => setFormData({ ...formData, emailFinanceiro: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefoneFinanceiro">Telefone *</Label>
                  <Input
                    id="telefoneFinanceiro"
                    value={formData.telefoneFinanceiro}
                    onChange={(e) => setFormData({ ...formData, telefoneFinanceiro: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            <SaveIcon className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </LayoutWithSidebar>
  )
}
