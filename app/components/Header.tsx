import React from 'react';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                src="/images/logos/logo.png"
                alt="The Photo Factory Logo"
                width={120}
                height={45}
              />
            </div>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#gallery-section" className="text-gray-500 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Gallery
              </a>
              <a href="#contect-section" className="text-gray-500 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-primary-600 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 