import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  BuildingIcon,
  MailIcon,
  PhoneIcon,
  CreditCardIcon,
  CheckCircle2Icon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFornecedor } from "@/components/app-sidebar-fornecedor"
import { toast } from "sonner"

const mockFornecedorData = {
  id: "FOR-001",
  nome: "Fornecedor ABC Ltda",
  cnpj: "12.345.678/0001-90",
  email: "contato@fornecedorabc.com.br",
  telefone: "(11) 3456-7890",
  emailAcesso: "acesso@fornecedorabc.com.br",
  endereco: {
    logradouro: "Av. Paulista, 1000",
    complemento: "Sala 501",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100"
  },
  dadosBancarios: {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12345-6",
    tipoConta: "Conta Corrente"
  },
  sacadosRelacionados: [
    { nome: "Empresa Alpha S.A.", cnpj: "11.222.333/0001-44", status: "Ativo" },
    { nome: "Empresa Beta Corp", cnpj: "22.333.444/0001-55", status: "Ativo" }
  ]
}

export function PerfilFornecedor() {
  const [formData, setFormData] = useState(mockFornecedorData)

  const handleSave = () => {
    toast.success("Perfil atualizado com sucesso!")
  }

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFornecedor />}
      title="Meu Perfil"
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dados Cadastrais</CardTitle>
            <CardDescription>
              Informações básicas da empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Razão Social</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Comercial</Label>
                <div className="relative">
                  <MailIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-8"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <div className="relative">
                  <PhoneIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="telefone"
                    className="pl-8"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAcesso">Email de Acesso à Plataforma</Label>
              <div className="relative">
                <MailIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="emailAcesso"
                  type="email"
                  className="pl-8"
                  value={formData.emailAcesso}
                  onChange={(e) => setFormData({...formData, emailAcesso: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
            <CardDescription>
              Endereço da sede da empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="logradouro">Logradouro</Label>
                <Input
                  id="logradouro"
                  value={formData.endereco.logradouro}
                  onChange={(e) => setFormData({
                    ...formData, 
                    endereco: {...formData.endereco, logradouro: e.target.value}
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  value={formData.endereco.complemento}
                  onChange={(e) => setFormData({
                    ...formData, 
                    endereco: {...formData.endereco, complemento: e.target.value}
                  })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  value={formData.endereco.bairro}
                  onChange={(e) => setFormData({
                    ...formData, 
                    endereco: {...formData.endereco, bairro: e.target.value}
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={formData.endereco.cidade}
                  onChange={(e) => setFormData({
                    ...formData, 
                    endereco: {...formData.endereco, cidade: e.target.value}
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  value={formData.endereco.estado}
                  onChange={(e) => setFormData({
                    ...formData, 
                    endereco: {...formData.endereco, estado: e.target.value}
                  })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={formData.endereco.cep}
                onChange={(e) => setFormData({
                  ...formData, 
                  endereco: {...formData.endereco, cep: e.target.value}
                })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dados Bancários</CardTitle>
            <CardDescription>
              Informações para recebimento das antecipações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="banco">Banco</Label>
                <Input
                  id="banco"
                  value={formData.dadosBancarios.banco}
                  onChange={(e) => setFormData({
                    ...formData, 
                    dadosBancarios: {...formData.dadosBancarios, banco: e.target.value}
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipoConta">Tipo de Conta</Label>
                <Input
                  id="tipoConta"
                  value={formData.dadosBancarios.tipoConta}
                  onChange={(e) => setFormData({
                    ...formData, 
                    dadosBancarios: {...formData.dadosBancarios, tipoConta: e.target.value}
                  })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="agencia">Agência</Label>
                <Input
                  id="agencia"
                  value={formData.dadosBancarios.agencia}
                  onChange={(e) => setFormData({
                    ...formData, 
                    dadosBancarios: {...formData.dadosBancarios, agencia: e.target.value}
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conta">Conta</Label>
                <Input
                  id="conta"
                  value={formData.dadosBancarios.conta}
                  onChange={(e) => setFormData({
                    ...formData, 
                    dadosBancarios: {...formData.dadosBancarios, conta: e.target.value}
                  })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sacados Relacionados</CardTitle>
            <CardDescription>
              Empresas compradoras com quem você tem relacionamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.sacadosRelacionados.map((sacado, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <BuildingIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{sacado.nome}</p>
                      <p className="text-sm text-muted-foreground">{sacado.cnpj}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                    <CheckCircle2Icon className="h-3 w-3 mr-1" />
                    {sacado.status}
                  </Badge>
                </div>
              ))}
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
