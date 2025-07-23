import React from 'react';
import { Header } from './components/Header.tsx'
import { Hero } from './components/Hero.tsx'
import { Gallery } from './components/Gallery.tsx'
import { ContactForm } from './components/ContactForm.tsx'
import { Footer } from './components/Footer.tsx'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main>
        <Hero />
        <Gallery />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
} 