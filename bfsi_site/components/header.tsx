"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products",
    children: [
      { name: "Savings Accounts", href: "/products/savings-accounts" },
      { name: "Personal Loans", href: "/products/personal-loans" },
      { name: "Home Loans", href: "/products/home-loans" },
      { name: "Insurance Plans", href: "/products/insurance" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Support", href: "/support" },
]

export function Header({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(forceScrolled)

  useEffect(() => {
    if (forceScrolled) {
      setIsScrolled(true)
      return
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [forceScrolled])

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80" 
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}>
              SecureBank
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`flex items-center gap-1 transition-colors duration-300 ${
                      isScrolled 
                        ? "text-muted-foreground hover:text-foreground" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.name} asChild>
                      <Link href={child.href}>{child.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? "text-muted-foreground hover:text-foreground" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button 
            variant="ghost" 
            asChild 
            className={`transition-colors duration-300 ${
              !isScrolled && "text-white hover:text-white hover:bg-white/10"
            }`}
          >
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/products">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className={`transition-colors duration-300 ${
                !isScrolled && "text-white hover:text-white hover:bg-white/10"
              }`}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold text-foreground">SecureBank</span>
              </div>
              <nav className="flex flex-col gap-2">
                {navigation.map((item) =>
                  item.children ? (
                    <div key={item.name} className="flex flex-col gap-1">
                      <span className="px-3 py-2 text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                      <div className="flex flex-col gap-1 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </nav>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/products">Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
