import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About TDP Factory</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A showcase of modern web development using Deno, Next.js, and Tailwind CSS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To demonstrate the power and flexibility of combining Deno's secure runtime 
              with Next.js's powerful framework and Tailwind CSS's utility-first styling.
            </p>
          </div>

          <div className="card">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              Creating modern, performant, and beautiful web applications that leverage 
              the best of modern web technologies.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 