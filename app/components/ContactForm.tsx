"use client";

import React, { useState } from 'react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [notes, setNotes] = useState('');

  const eventTypes = [
    'Wedding',
    'Corporate Event',
    'Portrait Session',
    'Family Photoshoot',
    'Product Photography',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { name, email, eventDate, eventType, notes };
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a backend server
    alert('Thank you for your booking request! We will get back to you shortly.');
    // Reset form
    setName('');
    setEmail('');
    setEventDate('');
    setEventType('');
    setNotes('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if ('id' in e.target && 'value' in e.target) {
      const { id, value } = e.target;
      switch (id) {
        case 'name':
          setName(value as string);
          break;
        case 'email':
          setEmail(value as string);
          break;
        case 'event-date':
          setEventDate(value as string);
          break;
        case 'event-type':
          setEventType(value as string);
          break;
        case 'notes':
          setNotes(value as string);
          break;
      }
    }
  };

  return (
    <section id="contact-section" className="bg-background-subtle py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-text sm:text-4xl">
            Book Your Photoshoot
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-text-secondary mx-auto">
            Tell us about your event and we'll get back to you with our availability and pricing.
          </p>
        </div>
        <div className="bg-background shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="event-date" className="block text-sm font-medium text-text">Event Date</label>
                <input
                  type="date"
                  id="event-date"
                  value={eventDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="event-type" className="block text-sm font-medium text-text">Type of Event</label>
                <select
                  id="event-type"
                  value={eventType}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-background border-border focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option value="" disabled>Select an event type</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="notes" className="block text-sm font-medium text-text">Additional Notes</label>
              <textarea
                id="notes"
                value={notes}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              ></textarea>
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 