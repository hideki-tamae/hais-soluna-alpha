// app/voice/page.tsx

"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// --- 1. Typography Setup ---
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

// --- 2. Scroll Reveal Component ---
function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container")
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, root: scrollContainer, rootMargin: "50px" }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// --- 3. Canvas Particle System ---
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = window.innerWidth
    let height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; life: number }[] = []
    const colors = ['rgba(59, 130, 246, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(236, 72, 153, 0.5)']

    const init = () => {
      canvas.width = width
      canvas.height = height
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 2.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: Math.random() * 100
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life += 0.1

        if (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
          p.x = Math.random() * width
          p.y = Math.random() * height
          p.life = 0
        }

        const currentSize = p.size + Math.sin(p.life * 0.05) * 0.5
        const opacity = 0.3 + Math.sin(p.life * 0.02) * 0.2

        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0, currentSize), 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace('0.5)', `${opacity})`)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-50 mix-blend-screen" />
}

// --- 4. Live Audio Visualizer ---
function LiveAudioVisualizer() {
  return (
    <div className="flex items-end justify-center gap-[3px] h-32 w-full max-w-2xl mx-auto mask-image-gradient">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full bg-[linear-gradient(to_top,#3b82f6,#8b5cf6,#ec4899)]"
          style={{
            height: '15%',
            animation: `equalizer ${0.8 + Math.random() * 0.5}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.04}s`,
            opacity: 0.7
          }}
        />
      ))}
      <style jsx>{`
        @keyframes equalizer {
          0% { height: 15%; opacity: 0.5; filter: brightness(1); }
          100% { height: 75%; opacity: 1; filter: brightness(1.5); box-shadow: 0 0 15px rgba(139, 92, 246, 0.5); }
        }
      `}</style>
    </div>
  )
}

// --- 5. Custom Luxury Icons ---

function HAISLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M50 10 L85 28 L85 58 Q85 80 50 95 Q15 80 15 58 L15 28 Z" fill="url(#logoGrad)" opacity="0.08" />
      <path d="M25 50 L35 50 L40 32 L45 68 L50 42 L55 58 L60 32 L65 50 L75 50" stroke="url(#logoGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
      <circle cx="40" cy="32" r="2.5" fill="#3b82f6" filter="url(#glow)" />
      <circle cx="50" cy="42" r="2.5" fill="#8b5cf6" filter="url(#glow)" />
      <circle cx="60" cy="32" r="2.5" fill="#ec4899" filter="url(#glow)" />
    </svg>
  )
}

function LuxuryCheck({ className = "h-5 w-5", color = "blue" }: { className?: string, color?: "blue" | "green" }) {
  const colors = { blue: ["#3b82f6", "#8b5cf6"], green: ["#22c55e", "#3b82f6"] }
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`checkGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[color][0]} />
          <stop offset="100%" stopColor={colors[color][1]} />
        </linearGradient>
        <filter id={`checkGlow-${color}`}>
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#checkGrad-${color})`} opacity="0.15" />
      <path d="M8 12.5 L10.5 15 L16 9" stroke={`url(#checkGrad-${color})`} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" filter={`url(#checkGlow-${color})`} />
    </svg>
  )
}

const Icons = {
  Alert: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="alertGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444"/><stop offset="100%" stopColor="#f97316"/></linearGradient>
        <filter id="alertGlow"><feGaussianBlur stdDeviation="2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="12" cy="12" r="10" stroke="url(#alertGrad)" strokeWidth="2" fill="none" opacity="0.5" filter="url(#alertGlow)"/>
      <path d="M12 7v6M12 17.01l.01-.011" stroke="url(#alertGrad)" strokeWidth="2.5" strokeLinecap="round" filter="url(#alertGlow)"/>
    </svg>
  ),
  Trending: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trendGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316"/><stop offset="100%" stopColor="#eab308"/></linearGradient>
        <filter id="trendGlow"><feGaussianBlur stdDeviation="2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M22 12 l-8.5 8.5 -5 -5 -6.5 6.5" stroke="url(#trendGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#trendGlow)"/>
      <path d="M16 12h6v6" stroke="url(#trendGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#trendGlow)"/>
    </svg>
  ),
  Users: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="usersGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#eab308"/><stop offset="100%" stopColor="#ef4444"/></linearGradient>
        <filter id="usersGlow"><feGaussianBlur stdDeviation="2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="9" cy="7" r="4" stroke="url(#usersGrad)" strokeWidth="2" fill="none" filter="url(#usersGlow)"/>
      <path d="M15 13 a4 4 0 0 1 0 8" stroke="url(#usersGrad)" strokeWidth="2" fill="none" strokeLinecap="round" filter="url(#usersGlow)"/>
      <path d="M2 21 a8 8 0 0 1 14 0" stroke="url(#usersGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#usersGlow)"/>
    </svg>
  ),
  Mic: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="micGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient>
        <filter id="micGlow"><feGaussianBlur stdDeviation="2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect x="9" y="2" width="6" height="12" rx="3" stroke="url(#micGrad)" strokeWidth="2" fill="none" filter="url(#micGlow)"/>
      <path d="M5 10 v2 a7 7 0 0 0 14 0 v-2" stroke="url(#micGrad)" strokeWidth="2" fill="none" strokeLinecap="round" filter="url(#micGlow)"/>
      <line x1="12" y1="19" x2="12" y2="22" stroke="url(#micGrad)" strokeWidth="2" strokeLinecap="round" filter="url(#micGlow)"/>
    </svg>
  ),
  Brain: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#ec4899"/></linearGradient>
        <filter id="brainGlow"><feGaussianBlur stdDeviation="2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M12 4 C 14 4, 15 6, 15 8 C 15 10, 14 11, 13 11 C 15 11, 17 12, 17 15 C 17 18, 15 20, 12 20" stroke="url(#brainGrad)" strokeWidth="2" fill="none" strokeLinecap="round" filter="url(#brainGlow)"/>
      <path d="M12 4 C 10 4, 9 6, 9 8 C 9 10, 10 11, 11 11 C 9 11, 7 12, 7 15 C 7 18, 9 20, 12 20" stroke="url(#brainGrad)" strokeWidth="2" fill="none" strokeLinecap="round" filter="url(#brainGlow)"/>
      <path d="M12 11 V 20" stroke="url(#brainGrad)" strokeWidth="2" fill="none" strokeLinecap="round" filter="url(#brainGlow)" opacity="0.5"/>
    </svg>
  ),
  Target: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22c55e"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
        <filter id="targetGlow"><feGaussianBlur stdDeviation="2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="12" cy="12" r="10" stroke="url(#targetGrad)" strokeWidth="2" fill="none" filter="url(#targetGlow)" opacity="0.5"/>
      <circle cx="12" cy="12" r="6" stroke="url(#targetGrad)" strokeWidth="2" fill="none" filter="url(#targetGlow)"/>
      <circle cx="12" cy="12" r="2" fill="url(#targetGrad)" filter="url(#targetGlow)"/>
    </svg>
  ),
  LineChart: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#22c55e"/></linearGradient>
        <filter id="chartGlow"><feGaussianBlur stdDeviation="2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M3 21 h 18" stroke="url(#chartGrad)" strokeWidth="2" strokeLinecap="round" filter="url(#chartGlow)" opacity="0.5"/>
      <path d="M3 16 L 9 10 L 13 14 L 21 6" stroke="url(#chartGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#chartGlow)"/>
    </svg>
  )
}

export default function VoiceHealthLP() {
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 20)
  }

  return (
    <div 
      id="scroll-container"
      onScroll={handleScroll}
      className={`fixed inset-0 z-[100] overflow-y-auto bg-[#000000] text-white antialiased ${inter.variable} ${mono.variable} font-sans`}
    >
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] opacity-20" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(30, 64, 175, 0.2) 0%, transparent 70%)', animation: 'pulse-slow 8s ease-in-out infinite alternate' }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")` }} />
      </div>

      <ParticleCanvas />

      <style jsx global>{`
        @keyframes pulse-slow { 0% { opacity: 0.2; transform: scale(1); } 100% { opacity: 0.3; transform: scale(1.05); } }
        .mask-image-gradient { mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); }
        .text-balance { text-wrap: balance; }
      `}</style>

      {/* Header - HAIS Only */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-700 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/[0.05]' : 'bg-transparent py-4'}`}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <HAISLogo className="h-8 w-8" />
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-light tracking-[0.2em] text-white">HAIS</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-white/60 backdrop-blur-sm">Voice β</span>
              </div>
            </div>
            
            <nav className="hidden items-center gap-8 md:flex">
              {['課題', '解決策', '検証', '料金'].map((item, i) => (
                <Link key={i} href={`#${['problem', 'solution', 'data', 'pricing'][i]}`} className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 hover:text-white">
                  {item}
                </Link>
              ))}
            </nav>

            <Button asChild size="sm" className="group relative overflow-hidden border-0 bg-white text-black px-5 py-4 text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] rounded-full">
              <Link href="#contact">無料で始める</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Background Video Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <video autoPlay loop muted playsInline className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-screen object-cover">
              <source src="/3.mp4" type="video/mp4" />
            </video>
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-12">
            <div className="mx-auto max-w-4xl text-center">
              <ScrollReveal>
                <div className="mb-10 flex justify-center">
                  <div className="inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 backdrop-blur-xl">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75 duration-1500" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                    </span>
                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-blue-200">先着5社限定 · 完全無料トライアル</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <h1 className="mb-8 text-balance">
                  <span className="block font-light leading-none tracking-tight text-white/50" style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)' }}>
                    言葉は装える。
                  </span>
                  <span className="mt-2 block bg-gradient-to-r from-blue-200 via-blue-400 to-purple-400 bg-clip-text font-light leading-none tracking-tight text-transparent pb-2" style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}>
                    声色は、真実を語る。
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed tracking-wide text-white/60 md:text-xl text-balance">
                  「大丈夫です」と言った社員が、翌月退職する。<br />
                  <span className="text-white/90 font-medium">1人あたり¥450万の損失を、音声AIで防ぐ。</span>
                </p>
              </ScrollReveal>

              <ScrollReveal delay={600} className="mb-12">
                <LiveAudioVisualizer />
              </ScrollReveal>

              <ScrollReveal delay={800}>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  {/* 3ヶ月無料で試す -> #contact */}
                  <Button asChild size="lg" className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wide shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-105 text-xs uppercase">
                    <Link href="#contact" className="flex items-center gap-2">3ヶ月無料で試す <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 px-8 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all text-xs uppercase font-medium">
                    <Link href="#solution">仕組みを見る</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative border-y border-white/[0.06] bg-black/30 backdrop-blur-md">
          <div className="mx-auto max-w-[1200px] px-6 py-16">
            <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
              {[
                { val: "89", unit: "%", label: "離職予測精度", col: "blue", icon: Icons.LineChart },
                { val: "¥450", unit: "万", label: "1人の離職コスト", col: "purple", icon: Icons.Trending },
                { val: "14", unit: "日", label: "検知リードタイム", col: "pink", icon: Icons.Alert },
                { val: "60", unit: "秒", label: "1日の記録時間", col: "green", icon: Icons.Mic },
              ].map((stat, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="flex flex-col items-center group">
                    <stat.icon className={`h-10 w-10 mb-4 text-${stat.col}-400 opacity-80 group-hover:opacity-100 transition-opacity`} />
                    <div className="mb-1 font-mono font-light tracking-tighter transition-transform duration-500 group-hover:scale-105" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                      <span className={`text-${stat.col}-400`}>{stat.val}</span>
                      <span className={`text-xl text-${stat.col}-400/60`}>{stat.unit}</span>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="relative py-24">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollReveal className="mb-16 text-center">
              <h2 className="font-light leading-tight tracking-tight text-balance" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                <span className="text-white/40">なぜ、</span><span className="text-white">優秀な人材ほど</span><br />
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">突然いなくなる</span><span className="text-white/40">のか？</span>
              </h2>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-6 md:grid-rows-2">
              <ScrollReveal className="md:col-span-4 md:row-span-2">
                <div className="group relative h-full overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-8 backdrop-blur-xl transition-all hover:bg-white/[0.05] hover:border-white/10">
                  <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red-500/10 blur-[80px] transition-opacity group-hover:opacity-100 opacity-40" />
                  <Icons.Alert className="mb-6 h-12 w-12" />
                  <h3 className="mb-3 text-xl font-light">1on1では見抜けない</h3>
                  <p className="text-base text-white/60 leading-relaxed">上司の前では「問題ありません」。でも実際は限界寸前。<span className="text-white/90 font-medium">表面的な対話では、本音は拾えません。</span></p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} className="md:col-span-2">
                <div className="group h-full overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-xl hover:bg-white/[0.05]">
                  <Icons.Trending className="mb-4 h-10 w-10" />
                  <h3 className="mb-2 text-lg font-light">アンケートは機能しない</h3>
                  <p className="text-sm text-white/60">回答率30%、しかも建前ばかり。疲弊した人ほど書きません。</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="md:col-span-2">
                <div className="group h-full overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-xl hover:bg-white/[0.05]">
                  <Icons.Users className="mb-4 h-10 w-10" />
                  <h3 className="mb-2 text-lg font-light">離職の連鎖</h3>
                  <p className="text-sm text-white/60">1人の退職がチーム崩壊の引き金に。採用コストは年収の200%以上。</p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={300} className="mt-6">
              <div className="rounded-[2rem] border border-red-500/10 bg-red-950/10 p-6 backdrop-blur-xl flex items-start gap-5">
                <Icons.Alert className="h-8 w-8 shrink-0 mt-1" />
                <p className="text-white/70 text-sm leading-relaxed">
                  厚生労働省の調査：メンタルヘルス不調による休職者の<span className="font-mono font-bold text-red-300"> 63% </span>が「誰にも相談していなかった」。
                  既存の施策では<span className="font-mono font-bold text-red-300"> 手遅れ </span>なのです。
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="relative py-24 border-y border-white/[0.05] bg-black/20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollReveal className="mb-16 text-center">
              <h2 className="mb-6 font-light leading-tight tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                声が明かす、<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">隠された真実</span>
              </h2>
              <p className="text-white/60 text-balance max-w-2xl mx-auto">
                言葉ではなく、<span className="text-blue-300 font-medium">声色・速度・間・トーン</span>を解析。意識的にコントロールできない音響サインから予兆を検知します。
              </p>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-3 mb-16">
              {[
                { icon: Icons.Mic, title: "1. 話す", sub: "30秒", desc: "スマホに向かって、今日の出来事を話すだけ。", col: "blue" },
                { icon: Icons.Brain, title: "2. AI解析", sub: "3秒", desc: "ピッチ・テンポ・エネルギーを抽出し過去と比較。", col: "purple" },
                { icon: Icons.Target, title: "3. 早期介入", sub: "自動", desc: "閾値を下回ったらアラート。匿名性を担保。", col: "green" }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 150}>
                  <div className={`group relative h-full overflow-hidden rounded-[2.5rem] border border-${item.col}-500/10 bg-gradient-to-b from-white/[0.02] to-transparent p-8 transition-all hover:border-${item.col}-500/20 hover:bg-white/[0.04]`}>
                    <item.icon className={`h-12 w-12 mb-6 text-${item.col}-400`} />
                    <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-white/90">{item.title} <span className="text-white/50">({item.sub})</span></h3>
                    <p className="text-white/60 leading-relaxed text-sm">{item.desc}</p>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,_${item.col === 'blue' ? 'rgba(59,130,246,0.08)' : item.col === 'purple' ? 'rgba(168,85,247,0.08)' : 'rgba(34,197,94,0.08)'},_transparent_60%)]`} />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Dashboard UI */}
            <ScrollReveal>
              <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-10 backdrop-blur-2xl">
                <div className="mb-8 text-center">
                  <h3 className="text-xl font-light">リアルタイム解析</h3>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 mt-2">DASHBOARD PREVIEW</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-black/30 border border-white/5 p-6 flex items-center justify-between group hover:border-green-500/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                      <div>
                        <p className="font-medium text-sm">Engineering Manager A</p>
                        <p className="font-mono text-[9px] text-white/40 tracking-wider">STATUS: HEALTHY</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-green-400 font-mono">82</p>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] bg-black/30 border border-red-500/20 p-6 flex items-center justify-between relative overflow-hidden group hover:border-red-500/40 transition-all">
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
                      <div>
                        <p className="font-medium text-sm">Product Manager B</p>
                        <p className="font-mono text-[9px] text-red-300/60 tracking-wider">STATUS: WARNING</p>
                      </div>
                    </div>
                    <div className="text-right relative z-10">
                      <p className="text-2xl font-light text-red-400 font-mono">42</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Scientific Validation - REWRITTEN WITH MEDICAL EVIDENCE & POLYVAGAL THEORY */}
        <section id="data" className="relative py-24">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollReveal className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <Icons.Brain className="h-4 w-4 text-blue-400" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">Scientific Validation</span>
              </div>
              <h2 className="font-light leading-tight tracking-tight text-balance" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                声帯は、<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">脳の自律神経システム（迷走神経）の末端器官である。</span>
              </h2>
            </ScrollReveal>

            <div className="grid gap-10 md:grid-cols-2 items-center">
              <ScrollReveal>
                <div className="space-y-8">
                <p className="text-white/70 leading-relaxed text-lg">
                    人間は「笑顔」や「言葉」を意識的にコントロールし、演技することができます。
                    しかし、声帯を制御する「反回神経」は、脳神経である「迷走神経」から直接分岐しており、意思による完全な制御は不可能です。
                    <br /><br />
                    実際、メンタルヘルス研究の世界的権威、スティーファン・ポージェス博士が提唱した『ポリヴェーガル理論（多重迷走神経理論）』においても、声の抑揚は自律神経の状態を直接反映する「社会性エンゲージメントシステム」の一部と定義されています。
                    <br /><br />
                    脳が過度なストレスを感じると、本人の意思とは無関係に、声帯筋に微細な震え（マイクロトレマー）が生じます。HAISは、この「制御できない真実の信号」を捉えるのです。
                    </p>
                                    <div className="space-y-4">
                    <div className="rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-6 flex gap-5 backdrop-blur-xl hover:bg-white/[0.04] transition-all">
                      <Icons.LineChart className="h-10 w-10 shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">89%の予測精度</h4>
                        <p className="text-sm text-white/60 leading-relaxed">退職2週間前には、自律神経の乱れが「音響的特徴」として有意に現れます。</p>
                      </div>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-6 flex gap-5 backdrop-blur-xl hover:bg-white/[0.04] transition-all">
                      <Icons.Brain className="h-10 w-10 shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">言葉を超えた検知</h4>
                        <p className="text-sm text-white/60 leading-relaxed">「大丈夫です」という言葉の裏にある、拒絶反応や無力感をバイオマーカーとして検知します。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-8 backdrop-blur-2xl">
                  <h4 className="mb-6 font-mono text-xs uppercase tracking-[0.15em] text-white/80">主な解析指標</h4>
                  <div className="space-y-5">
                    {[
                      { label: "基本周波数（F0）変動", val: "High", col: "blue" },
                      { label: "発話速度・ポーズ長", val: "High", col: "purple" },
                      { label: "音響エネルギー", val: "High", col: "pink" },
                      { label: "ケプストラム係数", val: "Medium", col: "green" }
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-white/60">{item.label}</span>
                          <span className={`font-mono font-medium text-${item.col}-300`}>{item.val}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className={`h-full rounded-full bg-gradient-to-r from-${item.col}-500 to-${item.col}-400`} style={{ width: item.val === 'High' ? '85%' : '60%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 font-mono text-[9px] text-white/30">※ 解析結果は統計的傾向であり、医学的診断ではありません。</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="relative py-24 border-t border-white/[0.05] bg-black/20">
          <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
            <ScrollReveal className="mb-16 text-center">
              <h2 className="mb-4 font-light leading-tight tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                まずは無料で、<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">組織を守る</span>
              </h2>
              <p className="text-white/60 text-sm">β版につき、先着5社限定で3ヶ月間完全無料</p>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2">
              <ScrollReveal>
                <div className="h-full rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:bg-white/[0.04] hover:border-white/20 group">
                  <h3 className="text-lg font-light text-white/90">β版（無料）</h3>
                  <div className="my-6 font-mono text-5xl font-light text-blue-300">¥0</div>
                  <ul className="space-y-3 mb-8">
                    {['音声解析・スコアリング', 'リアルタイムダッシュボード', 'アラート通知', '匿名化オプション'].map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <LuxuryCheck color="green" className="h-5 w-5" /> {feat}
                      </li>
                    ))}
                  </ul>
                  {/* 今すぐ始める -> #contact */}
                  <Button asChild className="w-full h-12 rounded-full bg-white text-black hover:bg-white/90 font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                    <Link href="#contact">今すぐ始める</Link>
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-blue-500/20 bg-gradient-to-b from-blue-900/10 to-purple-900/5 p-8 backdrop-blur-xl group hover:border-blue-500/30 transition-all">
                  <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-blue-600/80 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">2026 Q2</div>
                  <h3 className="text-lg font-light text-white/90">Enterprise</h3>
                  <div className="my-6 font-mono text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Call</div>
                  <ul className="space-y-3 mb-8">
                    {['オンプレミス導入', '既存HRシステム連携', '専任CSM・技術サポート', 'SLA保証・損害保険'].map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <LuxuryCheck color="blue" className="h-5 w-5" /> {feat}
                      </li>
                    ))}
                  </ul>
                  {/* 導入のご相談 -> #contact, 白背景で見やすく */}
                  <a 
                    href="#contact" 
                    className="flex items-center justify-center w-full h-12 rounded-full bg-white text-gray-900 font-bold text-xs uppercase tracking-widest transition-all hover:bg-gray-100 hover:scale-[1.02] border border-gray-200"
                  >
                    導入のご相談
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative py-24 border-t border-white/[0.05]">
          <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
            <ScrollReveal>
              <h2 className="mb-10 font-light leading-none tracking-tight text-balance" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                離職の連鎖を、<br /><span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">今日から止める</span>
              </h2>
              <div className="flex flex-col gap-3 max-w-sm mx-auto">
                {/* 面談予約 -> Calendly */}
                <Button asChild size="lg" className="h-14 w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-xs uppercase tracking-[0.15em] shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(139,92,246,0.6)]">
                  <a href="https://calendly.com/tamatixyan/30min?month=2026-02" target="_blank" rel="noopener noreferrer">
                    面談を予約する (15分) <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
              <p className="mt-10 text-[9px] text-white/30 font-mono">
                ※ 面談予約の完了をもって、<TermsModal />に同意したものとみなされます。
              </p>
            </ScrollReveal>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] bg-black py-12">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <HAISLogo className="h-6 w-6" />
              <span className="text-sm font-light tracking-[0.2em] text-white/80">HAIS</span>
            </div>
            
            <div className="flex gap-8 text-[10px] text-white/40 uppercase tracking-widest font-mono">
              <TermsModal />
              {/* Privacy Modal Link */}
              <PrivacyModal />
            </div>

            <p className="text-[9px] text-white/30 uppercase tracking-widest font-mono">© 2026 ACES CARE HUB JAPAN.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TermsModal() {
  return (
    <Dialog>
      <DialogTrigger className="underline hover:text-white cursor-pointer transition-colors">利用規約(β版)</DialogTrigger>
      {/* ↓ z-[200] を追加し、メインコンテンツ(z-[100])より手前に表示 */}
      <DialogContent className="z-[200] bg-black/90 border-white/10 backdrop-blur-xl text-white max-w-xl max-h-[80vh] overflow-y-auto p-8 rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-xl font-light tracking-tight mb-2">利用規約</DialogTitle>
          <DialogDescription className="text-white/50 text-sm">HAIS Voice Health (Beta) 利用規約</DialogDescription>
        </DialogHeader>
        <div className="text-sm text-white/60 space-y-4 py-6 leading-relaxed">
          <p>1. 本サービスは開発中のベータ版であり、現状有姿（As-Is）で提供されます。運営者は、本サービスの利用に起因するいかなる損害（データの喪失、業務の中断、精神的苦痛、機会損失、経済的損害を含むがこれに限らない）について、一切の責任を負いません。</p>
          <p>2. 本サービスによる解析結果は統計的な傾向を示す参考情報であり、医師の診断や医療行為に代わるものではありません。心身の不調を感じた場合は、専門医療機関を受診してください。</p>
          <p>3. ユーザーは、本サービスを不正な目的（他者の監視、差別、ハラスメント等）で利用してはなりません。</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PrivacyModal() {
  return (
    <Dialog>
      <DialogTrigger className="underline hover:text-white cursor-pointer transition-colors">Privacy</DialogTrigger>
      {/* ↓ z-[200] を追加し、メインコンテンツ(z-[100])より手前に表示 */}
      <DialogContent className="z-[200] bg-black/90 border-white/10 backdrop-blur-xl text-white max-w-xl max-h-[80vh] overflow-y-auto p-8 rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-xl font-light tracking-tight mb-2">プライバシーポリシー</DialogTitle>
          <DialogDescription className="text-white/50 text-sm">個人情報の取り扱いについて</DialogDescription>
        </DialogHeader>
        <div className="text-sm text-white/60 space-y-4 py-6 leading-relaxed">
          <p><strong>1. 音声データの取り扱い</strong><br/>
          取得した音声データは、特徴量抽出（AI解析）を行った後、即座に不可逆的なデータ形式に変換されるか、暗号化して保存されます。解析目的以外で音声を聞くことはありません。</p>
          
          <p><strong>2. 匿名性の確保</strong><br/>
          組織向けレポートにおいては、個人が特定されないよう統計処理を施したデータのみを提供します（ただし、生命の危険が予見される緊急時を除く）。</p>
          
          <p><strong>3. 第三者提供の禁止</strong><br/>
          法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}