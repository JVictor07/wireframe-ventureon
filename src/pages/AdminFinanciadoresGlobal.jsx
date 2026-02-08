import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  SearchIcon,
  TrendingDownIcon,
  CheckCircle2Icon,
  XCircleIcon,
  EyeIcon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarAdmin } from "@/components/app-sidebar-admin"
import financiadoresData from "@/data/financiadores.json"

const getTipoBadge = (acessoHabilitado) => {
  return acessoHabilitado ? (
    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
      <CheckCircle2Icon className="w-3 h-3 mr-1" />
      Ventureon
    </Badge>
  ) : (
    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
      Cadastrado
    </Badge>
  )
}

const getStatusBadge = (status) => {
  return status === "Ativo" ? (
    <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700">
      <CheckCircle2Icon className="w-3 h-3 mr-1" />
      Ativo
    </Badge>
  ) : (
    <Badge variant="secondary">
      <XCircleIcon className="w-3 h-3 mr-1" />
      Inativo
    </Badge>
  )
}

export function AdminFinanciadoresGlobal() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFinanciadores = financiadoresData.filter(financiador =>
    financiador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    financiador.tipoInstituicao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (financiador.cnpj && financiador.cnpj.includes(searchTerm))
  )

  const formatDate = (dateStr) => {
    if (!dateStr) return "-"
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarAdmin />}
      title="Financiadores"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Financiadores
            </CardTitle>
            <TrendingDownIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financiadoresData.length}</div>
            <p className="text-xs text-muted-foreground">
              Cadastrados na plataforma
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Financiadores Ventureon
            </CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {financiadoresData.filter(f => f.acessoHabilitado).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Com acesso à plataforma
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Apenas Cadastrados
            </CardTitle>
            <XCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {financiadoresData.filter(f => !f.acessoHabilitado).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Sem acesso à plataforma
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ativos
            </CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {financiadoresData.filter(f => f.status === "Ativo").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Financiadores ativos
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Todos os Financiadores</CardTitle>
              <CardDescription>
                Visão global de todos os financiadores cadastrados
              </CardDescription>
            </div>
            <div className="relative w-[300px]">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, CNPJ ou tipo..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Instituição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Taxa Base</TableHead>
                  <TableHead>Prazo Máx.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Acesso Desde</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFinanciadores.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      Nenhum financiador encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFinanciadores.map((financiador) => (
                    <TableRow key={financiador.id}>
                      <TableCell className="font-medium">{financiador.nome}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {financiador.cnpj || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{financiador.tipoInstituicao}</Badge>
                      </TableCell>
                      <TableCell>{getTipoBadge(financiador.acessoHabilitado)}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {financiador.taxaBase}% a.m.
                      </TableCell>
                      <TableCell>{financiador.prazoMaximo}</TableCell>
                      <TableCell>{getStatusBadge(financiador.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(financiador.dataHabilitacao)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {filteredFinanciadores.length} de {financiadoresData.length} financiadores
          </div>
        </CardContent>
      </Card>
    </LayoutWithSidebar>
  )
}
