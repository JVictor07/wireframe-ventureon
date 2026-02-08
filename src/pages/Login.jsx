import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BuildingIcon } from "lucide-react"

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showError, setShowError] = useState(false)

  const handleLogin = (userType) => {
    if (!email || !password) {
      setShowError(true)
      return
    }
    setShowError(false)
    if (userType === "sacado") {
      navigate("/sacado/dashboard")
    } else if (userType === "admin") {
      navigate("/admin/dashboard")
    } else if (userType === "fornecedor") {
      navigate("/fornecedor/dashboard")
<<<<<<< /Users/joaomoreira/Desktop/Trabalho/ventureon/wireframe-project/src/pages/Login.jsx
=======
    } else if (userType === "financiadora") {
      navigate("/financiadora/dashboard")
>>>>>>> /Users/joaomoreira/.windsurf/worktrees/wireframe-project/wireframe-project-56908c99/src/pages/Login.jsx
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <BuildingIcon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl">Supply Chain Finance</CardTitle>
            <CardDescription className="mt-2">
              Plataforma de Risco Sacado
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {showError && (
            <p className="text-sm text-destructive">
              Por favor, preencha todos os campos
            </p>
          )}

          <div className="space-y-2 pt-2">
            <Button 
              className="w-full" 
              onClick={() => handleLogin("sacado")}
            >
              Entrar como Sacado
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleLogin("fornecedor")}
            >
              Entrar como Fornecedor
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
<<<<<<< /Users/joaomoreira/Desktop/Trabalho/ventureon/wireframe-project/src/pages/Login.jsx
=======
              onClick={() => handleLogin("financiadora")}
            >
              Entrar como Financiadora
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
>>>>>>> /Users/joaomoreira/.windsurf/worktrees/wireframe-project/wireframe-project-56908c99/src/pages/Login.jsx
              onClick={() => handleLogin("admin")}
            >
              Entrar como Admin
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-4">
            Wireframe - Apenas visualização
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
