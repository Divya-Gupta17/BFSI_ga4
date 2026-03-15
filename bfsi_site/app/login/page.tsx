"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield, Eye, EyeOff, ArrowRight, Lock, Mail, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import AdCarousel from "@/components/ad-carousel"
import { toast } from "sonner"

export default function LoginPage() {
    const router = useRouter()
    const { login, loginWithGoogle } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsSubmitting(true)

        try {
            if (!email || !password) {
                setError("Please fill in all fields")
                return
            }

            await login(email, password)
            toast.success("Login successful!")
            router.push("/products")
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Login failed"
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const mockGoogleUser = {
                sub: `google_${Date.now()}`,
                email: "user@gmail.com",
                name: "Google User",
            }
            await loginWithGoogle(mockGoogleUser)
            toast.success("Google login successful!")
            router.push("/products")
        } catch (err) {
            toast.error("Google login failed")
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Ad Carousel */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden p-8">
                <AdCarousel autoPlayInterval={6000} />
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background lg:w-1/2">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                            <Shield className="h-7 w-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-foreground">SecureBank</span>
                    </div>

                    {/* Header */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
                        <p className="mt-2 text-muted-foreground">Log in to access your SecureBank account</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting}
                                    className="block w-full pl-10 pr-3 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-foreground">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isSubmitting}
                                    className="block w-full pl-10 pr-12 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    disabled={isSubmitting}
                                    className="h-4 w-4 rounded border-input"
                                />
                                <span className="ml-2 text-sm text-foreground">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm font-medium text-primary">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-lg">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Log In
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Login Button */}
                    <Button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isSubmitting}
                        variant="outline"
                        className="w-full py-6 rounded-lg border border-input"
                    >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </Button>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/register" className="font-semibold text-primary hover:text-primary/80">
                                Sign up now
                            </Link>
                        </p>
                    </div>

                    {/* Security Badge */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>Protected by 256-bit SSL encryption</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

