import { ArrowLeft } from 'lucide-react'
import Button from '@/components/atoms/Button'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-8xl md:text-9xl font-black primary-gradient-text">404</h1>
        <p className="text-xl text-muted">This page doesn&apos;t exist in our universe.</p>
        <Link to="/">
          <Button variant="primary" size="lg">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
