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
import { DashboardFornecedor } from "./pages/DashboardFornecedor"
import { RecebiveisList } from "./pages/RecebiveisList"
import { RecebivelDetail } from "./pages/RecebivelDetail"
import { HistoricoAntecipacoes } from "./pages/HistoricoAntecipacoes"
import { PerfilFornecedor } from "./pages/PerfilFornecedor"
import { TeamManagementFornecedor } from "./pages/TeamManagementFornecedor"
import { AdminFornecedoresGlobal } from "./pages/AdminFornecedoresGlobal"
<<<<<<< /Users/joaomoreira/Desktop/Trabalho/ventureon/wireframe-project/src/App.jsx
=======
import { AdminFinanciadoresGlobal } from "./pages/AdminFinanciadoresGlobal"
import { DashboardFinanciadora } from "./pages/DashboardFinanciadora"
import { OportunidadesFinanciadora } from "./pages/OportunidadesFinanciadora"
import { OportunidadeDetail } from "./pages/OportunidadeDetail"
import { PortfolioFinanciadora } from "./pages/PortfolioFinanciadora"
import { PortfolioDetail } from "./pages/PortfolioDetail"
import { HistoricoFinanciadora } from "./pages/HistoricoFinanciadora"
import { AnaliseRiscoFinanciadora } from "./pages/AnaliseRiscoFinanciadora"
import { PerfilFinanciadora } from "./pages/PerfilFinanciadora"
import { TeamManagementFinanciadora } from "./pages/TeamManagementFinanciadora"
>>>>>>> /Users/joaomoreira/.windsurf/worktrees/wireframe-project/wireframe-project-56908c99/src/App.jsx

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
        <Route path="/admin/fornecedores" element={<AdminFornecedoresGlobal />} />
<<<<<<< /Users/joaomoreira/Desktop/Trabalho/ventureon/wireframe-project/src/App.jsx
=======
        <Route path="/admin/financiadores" element={<AdminFinanciadoresGlobal />} />
>>>>>>> /Users/joaomoreira/.windsurf/worktrees/wireframe-project/wireframe-project-56908c99/src/App.jsx
        
        {/* Fornecedor Routes */}
        <Route path="/fornecedor/dashboard" element={<DashboardFornecedor />} />
        <Route path="/fornecedor/recebiveis" element={<RecebiveisList />} />
        <Route path="/fornecedor/recebiveis/:id" element={<RecebivelDetail />} />
        <Route path="/fornecedor/historico" element={<HistoricoAntecipacoes />} />
        <Route path="/fornecedor/perfil" element={<PerfilFornecedor />} />
        <Route path="/fornecedor/equipe" element={<TeamManagementFornecedor />} />
<<<<<<< /Users/joaomoreira/Desktop/Trabalho/ventureon/wireframe-project/src/App.jsx
=======
        
        {/* Financiadora Routes */}
        <Route path="/financiadora/dashboard" element={<DashboardFinanciadora />} />
        <Route path="/financiadora/oportunidades" element={<OportunidadesFinanciadora />} />
        <Route path="/financiadora/oportunidades/:id" element={<OportunidadeDetail />} />
        <Route path="/financiadora/portfolio" element={<PortfolioFinanciadora />} />
        <Route path="/financiadora/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/financiadora/historico" element={<HistoricoFinanciadora />} />
        <Route path="/financiadora/analise" element={<AnaliseRiscoFinanciadora />} />
        <Route path="/financiadora/perfil" element={<PerfilFinanciadora />} />
        <Route path="/financiadora/equipe" element={<TeamManagementFinanciadora />} />
>>>>>>> /Users/joaomoreira/.windsurf/worktrees/wireframe-project/wireframe-project-56908c99/src/App.jsx
      </Routes>
    </BrowserRouter>
  )
}

export default App
