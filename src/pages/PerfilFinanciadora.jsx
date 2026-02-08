import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFinanciadora } from "@/components/app-sidebar-financiadora"
import { toast } from "sonner"

const mockFinanciadoraData = {
  id: "FIN-001",
  nome: "Banco Financiador A",
  cnpj: "10.111.222/0001-33",
  email: "financiamento@bancoa.com.br",
  telefone: "(11) 3000-1000",
  emailAcesso: "plataforma@bancoa.com.br",
  tipoInstituicao: "Banco",
  taxaBase: 1.2,
  prazoMaximo: "90 dias",
  endereco: {
    logradouro: "Av. Faria Lima, 3000",
    complemento: "10º andar",
    bairro: "Itaim Bibi",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01452-000"
  }
}

export function PerfilFinanciadora() {
  const [formData, setFormData] = useState(mockFinanciadoraData)

  const handleSave = () => {
    toast.success("Perfil atualizado com sucesso!")
  }

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFinanciadora />}
      title="Meu Perfil"
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dados Cadastrais</CardTitle>
            <CardDescription>Informações da instituição financeira</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Razão Social</Label>
                <Input id="nome" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" value={formData.cnpj} disabled className="bg-muted" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Instituição</Label>
                <Input id="tipo" value={formData.tipoInstituicao} onChange={(e) => setFormData({...formData, tipoInstituicao: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailAcesso">Email de Acesso</Label>
                <Input id="emailAcesso" type="email" value={formData.emailAcesso} onChange={(e) => setFormData({...formData, emailAcesso: e.target.value})} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parâmetros de Crédito</CardTitle>
            <CardDescription>Configurações de financiamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="taxaBase">Taxa Base (%)</Label>
                <Input id="taxaBase" type="number" step="0.1" value={formData.taxaBase} onChange={(e) => setFormData({...formData, taxaBase: parseFloat(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prazoMaximo">Prazo Máximo</Label>
                <Input id="prazoMaximo" value={formData.prazoMaximo} onChange={(e) => setFormData({...formData, prazoMaximo: e.target.value})} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </div>
      </div>
    </LayoutWithSidebar>
  )
}
