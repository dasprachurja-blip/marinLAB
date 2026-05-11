import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import Button from '@/components/atoms/Button'
import { Link } from 'react-router-dom'
import { easing, pageVariants } from '@/animations/motionPresets'

export default function NotFound() {
  return (
    <motion.div
      className="min-h-screen bg-void flex items-center justify-center relative overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="hero-glow z-0" />
      <div className="noise-overlay" />

      <motion.div
        className="text-center space-y-6 relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easing.expoOut, delay: 0.2 }}
      >
        <h1 className="text-8xl md:text-9xl font-display font-semibold text-text-primary/10 tracking-ultra-tight">404</h1>
        <p className="text-lg text-text-secondary">This page doesn&apos;t exist in our universe.</p>
        <Link to="/">
          <Button variant="primary" size="lg">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
