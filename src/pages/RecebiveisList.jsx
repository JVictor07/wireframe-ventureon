import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
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
  FilterIcon
} from "lucide-react"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { AppSidebarFornecedor } from "@/components/app-sidebar-fornecedor"
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

export function RecebiveisList() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSacado, setSelectedSacado] = useState("todos")
  const [selectedStatus, setSelectedStatus] = useState("todos")

  const filteredRecebiveis = recebiveisData.filter(rec => {
    const matchesSearch = rec.numeroNF.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rec.sacado.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSacado = selectedSacado === "todos" || rec.sacado === selectedSacado
    const matchesStatus = selectedStatus === "todos" || rec.status === selectedStatus
    return matchesSearch && matchesSacado && matchesStatus
  })

  const formatCurrency = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  const sacadosUnicos = [...new Set(recebiveisData.map(r => r.sacado))]

  return (
    <LayoutWithSidebar 
      sidebar={<AppSidebarFornecedor />}
      title="Recebíveis Disponíveis"
    >
      <Card>
        <CardHeader>
          <CardTitle>Todos os Recebíveis</CardTitle>
          <CardDescription>
            Visualize todos os seus recebíveis de múltiplos sacados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por NF ou sacado..."
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
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="Disponível para Antecipar">Disponível</SelectItem>
                <SelectItem value="Aguardando Aprovação">Aguardando</SelectItem>
                <SelectItem value="Antecipada">Antecipada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NF</TableHead>
                  <TableHead>Sacado</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Emissão</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Dias</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecebiveis.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      Nenhum recebível encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecebiveis.map((recebivel) => (
                    <TableRow key={recebivel.id}>
                      <TableCell className="font-medium">{recebivel.numeroNF}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{recebivel.sacado}</div>
                          <div className="text-xs text-muted-foreground">{recebivel.sacadoCNPJ}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{formatCurrency(recebivel.valor)}</TableCell>
                      <TableCell>{formatDate(recebivel.dataEmissao)}</TableCell>
                      <TableCell>{formatDate(recebivel.dataVencimento)}</TableCell>
                      <TableCell>
                        <span className={recebivel.diasVencimento <= 15 ? "text-red-600 font-semibold" : ""}>
                          {recebivel.diasVencimento} dias
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(recebivel.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/fornecedor/recebiveis/${recebivel.id}`)}
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {filteredRecebiveis.length} de {recebiveisData.length} recebíveis
          </div>
        </CardContent>
      </Card>
    </LayoutWithSidebar>
  )
}
