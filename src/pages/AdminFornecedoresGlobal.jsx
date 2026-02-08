import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  SearchIcon,
  EyeIcon,
  UserIcon,
  PackageIcon,
  CheckCircle2Icon,
  XCircleIcon,
  TrendingUpIcon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarAdmin } from "@/components/app-sidebar-admin"
import { toast } from "sonner"
import fornecedoresData from "@/data/fornecedores-admin.json"

const getStatusAcessoBadge = (acessoHabilitado) => {
  return acessoHabilitado 
    ? <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
        <CheckCircle2Icon className="h-3 w-3 mr-1" />
        Habilitado
      </Badge>
    : <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
        <XCircleIcon className="h-3 w-3 mr-1" />
        Desabilitado
      </Badge>
}

const getStatusAtividadeBadge = (status) => {
  return status === "Ativo" 
    ? <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Ativo</Badge>
    : <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Inativo</Badge>
}

export function AdminFornecedoresGlobal() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSacado, setSelectedSacado] = useState("todos")
  const [selectedAcesso, setSelectedAcesso] = useState("todos")
  const [selectedAtividade, setSelectedAtividade] = useState("todos")

  const filteredFornecedores = fornecedoresData.filter(fornecedor => {
    const matchesSearch = fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fornecedor.cnpj.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSacado = selectedSacado === "todos" || 
                         fornecedor.sacadosAssociados.includes(selectedSacado)
    const matchesAcesso = selectedAcesso === "todos" || 
                         (selectedAcesso === "habilitado" && fornecedor.acessoHabilitado) ||
                         (selectedAcesso === "desabilitado" && !fornecedor.acessoHabilitado)
    const matchesAtividade = selectedAtividade === "todos" || 
                            fornecedor.statusAtividade === selectedAtividade
    return matchesSearch && matchesSacado && matchesAcesso && matchesAtividade
  })

  const formatCurrency = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "-"
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  const sacadosUnicos = [...new Set(fornecedoresData.flatMap(f => f.sacadosAssociados))]

  const totalFornecedores = fornecedoresData.length
  const fornecedoresComAcesso = fornecedoresData.filter(f => f.acessoHabilitado).length
  const fornecedoresAtivos = fornecedoresData.filter(f => f.statusAtividade === "Ativo").length
  const taxaAdocao = totalFornecedores > 0 ? (fornecedoresComAcesso / totalFornecedores * 100).toFixed(1) : 0

  const handleImpersonar = (fornecedor) => {
    if (fornecedor.acessoHabilitado) {
      toast.success(`Impersonando ${fornecedor.nome}`)
      setTimeout(() => {
        navigate("/fornecedor/dashboard")
      }, 1000)
    } else {
      toast.error("Este fornecedor não possui acesso habilitado")
    }
  }

  const handleDesabilitarAcesso = (fornecedor) => {
    toast.success(`Acesso desabilitado para ${fornecedor.nome}`)
  }

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarAdmin />}
      title="Gestão de Fornecedores"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Fornecedores
            </CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFornecedores}</div>
            <p className="text-xs text-muted-foreground">
              Cadastrados na plataforma
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Com Acesso Habilitado
            </CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fornecedoresComAcesso}</div>
            <p className="text-xs text-muted-foreground">
              Podem acessar a plataforma
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Fornecedores Ativos
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fornecedoresAtivos}</div>
            <p className="text-xs text-muted-foreground">
              Com operações recentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Adoção
            </CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxaAdocao}%</div>
            <p className="text-xs text-muted-foreground">
              Fornecedores com acesso
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Fornecedores</CardTitle>
          <CardDescription>
            Visão consolidada de fornecedores de todos os sacados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou CNPJ..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedSacado} onValueChange={setSelectedSacado}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por sacado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os sacados</SelectItem>
                {sacadosUnicos.map(sacado => (
                  <SelectItem key={sacado} value={sacado}>{sacado}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedAcesso} onValueChange={setSelectedAcesso}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status de acesso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="habilitado">Habilitado</SelectItem>
                <SelectItem value="desabilitado">Desabilitado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedAtividade} onValueChange={setSelectedAtividade}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Atividade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Sacados</TableHead>
                  <TableHead>Acesso</TableHead>
                  <TableHead>Atividade</TableHead>
                  <TableHead>Última Operação</TableHead>
                  <TableHead>Total Ops</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFornecedores.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      Nenhum fornecedor encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFornecedores.map((fornecedor) => (
                    <TableRow key={fornecedor.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{fornecedor.nome}</div>
                          <div className="text-xs text-muted-foreground">{fornecedor.cnpj}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {fornecedor.sacadosAssociados.map((sacado, idx) => (
                            <div key={idx} className="text-muted-foreground">
                              {sacado}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusAcessoBadge(fornecedor.acessoHabilitado)}</TableCell>
                      <TableCell>{getStatusAtividadeBadge(fornecedor.statusAtividade)}</TableCell>
                      <TableCell>{formatDate(fornecedor.ultimaOperacao)}</TableCell>
                      <TableCell className="font-medium">{fornecedor.totalOperacoes}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(fornecedor.valorTotalOperacoes)}</TableCell>
                      <TableCell className="text-right">
                        {fornecedor.acessoHabilitado && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleImpersonar(fornecedor)}
                          >
                            <UserIcon className="h-4 w-4 mr-1" />
                            Impersonar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {filteredFornecedores.length} de {fornecedoresData.length} fornecedores
          </div>
        </CardContent>
      </Card>
    </LayoutWithSidebar>
  )
}
