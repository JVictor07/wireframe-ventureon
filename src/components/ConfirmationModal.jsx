import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

/**
 * Componente reutilizável de modal de confirmação
 * 
 * @param {boolean} open - Estado de abertura do modal
 * @param {function} onOpenChange - Callback para mudança de estado
 * @param {string} title - Título do modal
 * @param {string} description - Descrição/mensagem do modal
 * @param {React.ReactNode} children - Conteúdo adicional (opcional)
 * @param {function} onConfirm - Callback ao confirmar
 * @param {function} onCancel - Callback ao cancelar (opcional)
 * @param {string} confirmText - Texto do botão de confirmação (padrão: "Confirmar")
 * @param {string} cancelText - Texto do botão de cancelar (padrão: "Cancelar")
 * @param {string} variant - Variante do botão de confirmação ("default" | "destructive")
 * @param {React.ReactNode} icon - Ícone para exibir no título (opcional)
 */
export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  icon
}) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    onOpenChange(false)
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={icon ? "flex items-center gap-2" : ""}>
            {icon}
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children && (
          <div className="py-4">
            {children}
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
