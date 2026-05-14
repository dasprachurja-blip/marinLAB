import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import Button from '@/components/atoms/Button'
import AmbientOrbs from '@/components/ui/AmbientOrbs'
import { easing, viewportOnce, pageVariants } from '@/animations/motionPresets'

const projects = [
  {
    id: 'quantos',
    title: 'Quantos Dashboard',
    tag: 'FINTECH · UI/UX · FRONTEND',
    year: '2024',
    image: '/portfolio_quantos.jpg',
    alt: 'Minimalist fintech dashboard with dark theme and data visualizations',
    color: '#4D9EFF',
    featured: true,
    desc: 'A comprehensive financial analytics dashboard designed for institutional traders. Dark-mode-first with real-time data visualization.',
  },
  {
    id: 'lumina',
    title: 'Lumina Cloud',
    tag: 'SAAS · FULL-STACK · DESIGN',
    year: '2024',
    image: '/portfolio_lumina.jpg',
    alt: 'Modern SaaS platform with architectural aesthetic',
    color: '#8B5CF6',
    featured: true,
    desc: 'Cloud infrastructure management platform with a clean, architectural UI. Built for scale with real-time monitoring.',
  },
  {
    id: 'nexus',
    title: 'Nexus Health',
    tag: 'HEALTHCARE · BRANDING · WEB',
    year: '2025',
    image: '/portfolio_quantos.jpg',
    alt: 'Healthcare platform with clean clinical design',
    color: '#10B981',
    featured: false,
    desc: 'A patient-centered healthcare platform bridging clinical efficiency with compassionate design.',
  },
  {
    id: 'meridian',
    title: 'Meridian Studio',
    tag: 'CREATIVE AGENCY · PORTFOLIO',
    year: '2025',
    image: '/portfolio_lumina.jpg',
    alt: 'Creative agency portfolio with cinematic visuals',
    color: '#F59E0B',
    featured: false,
    desc: 'An award-worthy portfolio for a creative agency, featuring immersive scroll animations and editorial typography.',
  },
]

function FeaturedCard({ project, index }) {
  const cardRef = useRef(null)
  const imageRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    const img = imageRef.current
    if (!card || !img) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    img.style.transform = `scale(1.05) translate(${x * -12}px, ${y * -12}px)`
  }

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1) translate(0, 0)'
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/[0.04] hover:border-accent/15 transition-colors duration-600"
      style={{ aspectRatio: '16/9' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: easing.expoOut, delay: index * 0.15 }}
    >
      <img
        ref={imageRef}
        src={project.image}
        alt={project.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-cinema"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Year badge */}
      <div className="absolute top-6 right-6 z-10">
        <span className="text-[11px] text-text-tertiary/70 font-display tracking-wide">{project.year}</span>
      </div>

      {/* Arrow indicator */}
      <div className="absolute top-6 left-6 z-10 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-expo group-hover:border-accent/30 bg-void/50 backdrop-blur-sm">
        <ArrowUpRight className="w-4 h-4 text-accent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
        <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-600 ease-expo">
          <p className="text-[10px] font-medium tracking-label uppercase text-accent/80 mb-3">{project.tag}</p>
          <h3 className="font-display font-semibold text-text-primary tracking-tight mb-2" style={{ fontSize: 'clamp(24px, 3vw, 48px)' }}>
            {project.title}
          </h3>
          <p className="text-sm text-text-secondary/60 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.desc}</p>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-cinema origin-center" />
    </motion.div>
  )
}

function CompactCard({ project, index }) {
  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/[0.04] hover:border-accent/15 transition-colors duration-500"
      style={{ aspectRatio: '4/3' }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: easing.expoOut, delay: index * 0.1 }}
    >
      <img
        src={project.image}
        alt={project.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-600 ease-cinema group-hover:scale-[1.04]"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500" />

      <div className="absolute top-5 right-5 z-10">
        <span className="text-[10px] text-text-tertiary/60 font-display tracking-wide">{project.year}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="text-[9px] font-medium tracking-label uppercase text-accent/70 mb-2">{project.tag}</p>
        <h3 className="text-lg md:text-xl font-display font-semibold text-text-primary tracking-tight mb-1">{project.title}</h3>
        <p className="text-xs text-text-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400">{project.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Work() {
  const navigate = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <motion.main
      className="bg-abyss overflow-x-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />

      <PageHero
        label="SELECTED WORK"
        title={<>Crafted with<br /><span className="text-text-tertiary">obsession.</span></>}
        subtitle="A curated selection of projects where strategy, design, and engineering converge into exceptional digital products."
      >
        {/* Page navigation buttons */}
        <div className="flex items-center gap-4 mt-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/services')}>
            <ArrowLeft className="w-3.5 h-3.5" /> Services
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/contact')}>
            Contact <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </PageHero>

      {/* Featured Projects — Large Cinematic Cards */}
      <section className="py-20 md:py-32 bg-abyss">
        <div className="section-container space-y-10">
          {featured.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="section-container">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/6 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: easing.cinema }}
          style={{ transformOrigin: 'center' }}
        />
      </div>

      {/* More Projects — Compact Grid */}
      <section className="py-20 md:py-32 bg-abyss">
        <div className="section-container">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: easing.expoOut }}
          >
            <span className="section-label">MORE PROJECTS</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((project, i) => (
              <CompactCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 bg-surface relative overflow-hidden">
        <AmbientOrbs />
        <div className="noise-overlay" />
        <div className="section-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easing.expoOut }}
            className="space-y-8"
          >
            <h2 className="font-display font-semibold tracking-super-tight text-text-primary leading-ultra-tight" style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}>
              Your project<br /><span className="text-text-tertiary">could be next.</span>
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto text-lg">
              Let's create something that makes your competitors nervous.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
                Start a Project <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="lg" onClick={() => navigate('/')}>
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
