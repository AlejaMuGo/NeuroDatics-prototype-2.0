'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/providers/AuthProvider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export function SignUpPage() {
  const { signInWithGoogle, signInWithGitHub, signUpWithEmail, loading } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (!acceptedTerms) {
      setError('Debes aceptar los términos y condiciones')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setIsSubmitting(true)

    const { error } = await signUpWithEmail(email, password, fullName)
    
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    
    setIsSubmitting(false)
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-muted/30 px-4">
        <div className="bg-card rounded-2xl shadow-sm border border-border p-8 sm:p-10 w-full max-w-md flex flex-col items-center gap-6 text-center">
          <div className="w-14 h-14 bg-foreground rounded-xl flex items-center justify-center">
            <img 
              src="/assets/NeuroDatics-logo.svg" 
              alt="NeuroDatics Logo" 
              className="h-8 w-8 invert" 
            />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">¡Cuenta creada!</h1>
          <p className="text-muted-foreground">
            Hemos enviado un correo de verificación a <strong className="text-foreground">{email}</strong>. 
            Por favor, revisa tu bandeja de entrada y confirma tu cuenta.
          </p>
          <Link href="/login">
            <Button className="h-11">Ir a iniciar sesión</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-muted/30 px-4 py-8">
      <div className="bg-card rounded-2xl shadow-sm border border-border p-8 sm:p-10 w-full max-w-md flex flex-col items-center gap-6">
        {/* Logo and Header */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 bg-foreground rounded-xl flex items-center justify-center">
            <img 
              src="/assets/NeuroDatics-logo.svg" 
              alt="NeuroDatics Logo" 
              className="h-8 w-8 invert" 
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Crear cuenta
            </h1>
            <p className="text-sm text-muted-foreground mt-2 text-balance">
              Regístrate para comenzar a analizar bioseñales en tus proyectos de neuromarketing.
            </p>
          </div>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Juan Pérez"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="nombre@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
              Acepto los{' '}
              <Link href="/terms" className="text-foreground hover:underline font-medium">
                Términos y Condiciones
              </Link>{' '}
              y la{' '}
              <Link href="/privacy" className="text-foreground hover:underline font-medium">
                Política de Privacidad
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Crear cuenta
          </Button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            O regístrate con
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* OAuth Buttons */}
        <div className="w-full flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={signInWithGoogle}
            disabled={loading}
            className="flex-1 h-11 gap-2"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={signInWithGitHub}
            disabled={loading}
            className="flex-1 h-11 gap-2"
          >
            <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </Button>
        </div>

        {/* Login Link */}
        <p className="text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="font-medium text-foreground hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
