import React from 'react';
import { EventCreator } from './EventCreator';
import { EventList } from './EventList';

export function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <EventCreator />
          <EventList />
        </div>
      </main>
    </div>
  );
} 