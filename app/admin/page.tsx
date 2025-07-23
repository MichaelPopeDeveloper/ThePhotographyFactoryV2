"use client";

import React, { useState } from 'react';
import { AdminLogin } from '../components/AdminLogin.tsx';
import { Dashboard } from '../components/Dashboard.tsx';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        const data = await response.json();
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login request failed:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
} 