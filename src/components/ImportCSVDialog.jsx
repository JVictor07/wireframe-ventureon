import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  UploadIcon,
  FileTextIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  DownloadIcon
} from "lucide-react"
import { toast } from "sonner"

export function ImportCSVDialog({ open, onOpenChange, type = "notas", onImport }) {
  const [file, setFile] = useState(null)
  const [importing, setImporting] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
    } else {
      toast.error("Por favor, selecione um arquivo CSV válido")
    }
  }

  const handleImport = async () => {
    if (!file) {
      toast.error("Por favor, selecione um arquivo CSV")
      return
    }

    setImporting(true)
    
    // Simular processamento
    setTimeout(() => {
      const randomSuccess = Math.floor(Math.random() * 50) + 50
      const randomErrors = Math.floor(Math.random() * 10)
      
      toast.success(`Importação concluída!`, {
        description: `${randomSuccess} registros importados com sucesso. ${randomErrors > 0 ? `${randomErrors} erros encontrados.` : ''}`
      })
      
      setImporting(false)
      setFile(null)
      onOpenChange(false)
      
      if (onImport) {
        onImport({ success: randomSuccess, errors: randomErrors })
      }
    }, 2000)
  }

  const handleDownloadTemplate = () => {
    let csvContent = ""
    let filename = ""

    if (type === "notas") {
      csvContent = "numero_nf,fornecedor_cnpj,fornecedor_nome,valor,data_emissao,data_vencimento,descricao\n"
      csvContent += "NF-2024-001,12.345.678/0001-90,Fornecedor Exemplo LTDA,15000.00,2024-01-15,2024-03-15,Produtos diversos\n"
      csvContent += "NF-2024-002,98.765.432/0001-10,Outro Fornecedor SA,25000.00,2024-01-20,2024-03-20,Serviços prestados"
      filename = "template_notas_fiscais.csv"
    } else {
      csvContent = "cnpj,nome,email,telefone,endereco,cidade,estado,cep\n"
      csvContent += "12.345.678/0001-90,Fornecedor Exemplo LTDA,contato@fornecedor.com.br,(11) 98765-4321,Rua Exemplo 123,São Paulo,SP,01234-567\n"
      csvContent += "98.765.432/0001-10,Outro Fornecedor SA,vendas@outrofornecedor.com.br,(11) 91234-5678,Av. Teste 456,São Paulo,SP,04567-890"
      filename = "template_fornecedores.csv"
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success("Template baixado com sucesso!")
  }

  const getTitle = () => {
    return type === "notas" ? "Importar Notas Fiscais" : "Importar Fornecedores"
  }

  const getDescription = () => {
    return type === "notas" 
      ? "Faça upload de um arquivo CSV com as notas fiscais para importação em massa"
      : "Faça upload de um arquivo CSV com os fornecedores para importação em massa"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Template Download */}
          <div className="p-4 border rounded-lg bg-muted">
            <div className="flex items-start gap-3">
              <FileTextIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Baixe o template CSV</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use nosso template para garantir que seu arquivo está no formato correto
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={handleDownloadTemplate}
                >
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Baixar Template
                </Button>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="csv-file">Arquivo CSV</Label>
            <div className="flex items-center gap-3">
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={importing}
              />
              {file && (
                <CheckCircle2Icon className="h-5 w-5 text-green-600 flex-shrink-0" />
              )}
            </div>
            {file && (
              <p className="text-xs text-muted-foreground">
                Arquivo selecionado: {file.name}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-medium">Instruções importantes:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>O arquivo deve estar no formato CSV (separado por vírgulas)</li>
                  <li>A primeira linha deve conter os cabeçalhos das colunas</li>
                  <li>Use o template fornecido para garantir o formato correto</li>
                  <li>Certifique-se de que os dados estão completos e válidos</li>
                  {type === "notas" && (
                    <>
                      <li>Valores devem usar ponto como separador decimal (ex: 1500.00)</li>
                      <li>Datas devem estar no formato YYYY-MM-DD</li>
                    </>
                  )}
                  {type === "fornecedores" && (
                    <>
                      <li>CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX</li>
                      <li>Email deve ser válido</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={importing}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleImport}
            disabled={!file || importing}
          >
            {importing ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Importando...
              </>
            ) : (
              <>
                <UploadIcon className="h-4 w-4 mr-2" />
                Importar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
