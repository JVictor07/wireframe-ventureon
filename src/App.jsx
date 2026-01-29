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
import { InvoiceList } from "./pages/InvoiceList"
import { CompanyManagement } from "./pages/CompanyManagement"
import { TeamManagement } from "./pages/TeamManagement"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Sacado Routes */}
        <Route path="/sacado/dashboard" element={<DashboardSacado />} />
        <Route path="/sacado/operacao/:id" element={<OperationDetailSacado />} />
        <Route path="/sacado/programa" element={<ProgramSetup />} />
        <Route path="/sacado/notas-fiscais" element={<InvoiceList />} />
        <Route path="/sacado/nota-fiscal" element={<InvoiceCreate />} />
        <Route path="/sacado/fornecedores" element={<AdminFornecedores />} />
        <Route path="/sacado/financiadores" element={<AdminFinanciadores />} />
        <Route path="/sacado/empresa" element={<CompanyManagement />} />
        <Route path="/sacado/equipe" element={<TeamManagement />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/operacao/:id" element={<OperationDetailAdmin />} />
        <Route path="/admin/sacados" element={<AdminSacados />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
