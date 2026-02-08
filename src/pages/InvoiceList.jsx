import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeftIcon,
  PlusIcon,
  SearchIcon,
  FileTextIcon,
  CheckCircle2Icon,
  ClockIcon,
  PlayCircleIcon,
  UploadIcon
} from "lucide-react"
import { ImportCSVDialog } from "@/components/ImportCSVDialog"

export function InvoiceList() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [importDialogOpen, setImportDialogOpen] = useState(false)

  // Mock data - notas fiscais cadastradas
  const invoices = [
    {
      id: "NF-001",
      numero: "12345",
      fornecedor: "Tech Solutions Ltda",
      valor: "R$ 125.000,00",
      vencimento: "2024-03-15",
      dataCadastro: "2024-02-10",
      status: "Cadastrada",
      temOperacao: false
    },
    {
      id: "NF-002",
      numero: "12346",
      fornecedor: "Indústria ABC S.A.",
      valor: "R$ 85.000,00",
      vencimento: "2024-03-20",
      dataCadastro: "2024-02-12",
      status: "Cadastrada",
      temOperacao: false
    },
    {
      id: "NF-003",
      numero: "12347",
      fornecedor: "Distribuidora XYZ",
      valor: "R$ 200.000,00",
      vencimento: "2024-03-25",
      dataCadastro: "2024-02-14",
      status: "Com Operação",
      temOperacao: true
    },
    {
      id: "NF-004",
      numero: "12348",
      fornecedor: "Serviços Corporativos",
      valor: "R$ 50.000,00",
      vencimento: "2024-03-18",
      dataCadastro: "2024-02-15",
      status: "Cadastrada",
      temOperacao: false
    }
  ]

  const filteredInvoices = invoices.filter(invoice =>
    invoice.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateOperation = () => {
    navigate("/sacado/operacao/OP-001")
  }

  const getStatusBadge = (status) => {
    if (status === "Cadastrada") {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          <ClockIcon className="w-3 h-3 mr-1" />
          Cadastrada
        </Badge>
      )
    }
    return (
      <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700">
        <CheckCircle2Icon className="w-3 h-3 mr-1" />
        Com Operação
      </Badge>
    )
  }

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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <FileTextIcon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Notas Fiscais</h1>
                  <p className="text-sm text-muted-foreground">Visualize e gerencie suas notas fiscais cadastradas</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setImportDialogOpen(true)}>
                <UploadIcon className="w-4 h-4 mr-2" />
                Importar CSV
              </Button>
              <Button onClick={() => navigate("/sacado/nota-fiscal")}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Cadastrar Nova NF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Notas Fiscais Cadastradas</CardTitle>
                <CardDescription>
                  {filteredInvoices.length} nota(s) fiscal(is) encontrada(s)
                </CardDescription>
              </div>
              <div className="relative w-[300px]">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número, fornecedor..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Número NF</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      Nenhuma nota fiscal encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.numero}</TableCell>
                      <TableCell>{invoice.fornecedor}</TableCell>
                      <TableCell className="text-right font-semibold">{invoice.valor}</TableCell>
                      <TableCell>{new Date(invoice.vencimento).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right">
                        {!invoice.temOperacao ? (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleCreateOperation(invoice)}
                          >
                            <PlayCircleIcon className="w-4 h-4 mr-1" />
                            Criar Operação
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate("/sacado/operacao/OP-001")}
                          >
                            Ver Operação
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FileTextIcon className="w-4 h-4" />
                Como funciona
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Cadastrada:</strong> Nota fiscal registrada, aguardando criação de operação</li>
                <li>• <strong>Com Operação:</strong> Já existe uma operação vinculada a esta nota fiscal</li>
                <li>• Você pode criar uma operação clicando no botão "Criar Operação"</li>
                <li>• Após criar a operação, você poderá aprová-la e selecionar o financiador</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <ImportCSVDialog 
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        type="notas"
      />
    </div>
  )
}
