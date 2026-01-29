import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./pages/Login"
import { DashboardSacado } from "./pages/DashboardSacado"
import { DashboardAdmin } from "./pages/DashboardAdmin"
import { OperationDetailSacado } from "./pages/OperationDetailSacado"
import { OperationDetailAdmin } from "./pages/OperationDetailAdmin"
import { ProgramSetup } from "./pages/ProgramSetup"
import { AdminSacados } from "./pages/AdminSacados"
import { AdminFornecedores } from "./pages/AdminFornecedores"
import { AdminFinanciadores } from "./pages/AdminFinanciadores"
import { InvoiceCreate } from "./pages/InvoiceCreate"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sacado/dashboard" element={<DashboardSacado />} />
        <Route path="/sacado/operacao/:id" element={<OperationDetailSacado />} />
        <Route path="/sacado/programa" element={<ProgramSetup />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/operacao/:id" element={<OperationDetailAdmin />} />
        <Route path="/admin/sacados" element={<AdminSacados />} />
        <Route path="/admin/fornecedores" element={<AdminFornecedores />} />
        <Route path="/admin/financiadores" element={<AdminFinanciadores />} />
        <Route path="/admin/nota-fiscal" element={<InvoiceCreate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
