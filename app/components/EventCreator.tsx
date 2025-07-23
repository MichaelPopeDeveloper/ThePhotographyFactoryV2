"use client";

import React, { useState } from 'react';

interface CreatedEvent {
  shareable_link_id: string;
}

export function EventCreator() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdEvent, setCreatedEvent] = useState<CreatedEvent | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('clientName', clientName);
    formData.append('clientEmail', clientEmail);
    formData.append('eventDate', eventDate);
    formData.append('eventType', eventType);
    formData.append('notes', notes);
    photos.forEach(photo => {
      formData.append('photos', photo);
    });

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setCreatedEvent(data.event);
        // Reset form fields
        setClientName('');
        setClientEmail('');
        setEventDate('');
        setEventType('');
        setNotes('');
        setPhotos([]);
        // Consider a more subtle notification than alert
      } else {
        const error = await response.json();
        alert(`Error creating event: ${error.message}`);
      }
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg max-w-4xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">New Photoshoot</h2>
      <p className="text-gray-500 mb-8">Fill in the details to create a new event gallery.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Client Name" value={clientName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientName(e.target.value)} required className="input-field" />
          <input type="email" placeholder="Client Email" value={clientEmail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientEmail(e.target.value)} className="input-field" />
          <input type="date" placeholder="Event Date" value={eventDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventDate(e.target.value)} required className="input-field" />
          <input type="text" placeholder="Event Type (e.g., Wedding, Portrait)" value={eventType} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventType(e.target.value)} required className="input-field" />
        </div>
        
        <textarea 
          placeholder="Add any relevant notes..." 
          value={notes} 
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)} 
          className="input-field w-full" 
          rows={5}
        ></textarea>

        <div>
          <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                  <span>Upload files</span>
                  <input id="file-upload" name="file-upload" type="file" multiple onChange={handlePhotoChange} className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              {photos.length > 0 && <p className="text-sm text-green-600 pt-2">{photos.length} file(s) selected</p>}
            </div>
          </div>
        </div>
        
        <button type="submit" disabled={isSubmitting} className="w-full btn-primary text-lg">
          {isSubmitting ? 'Creating Event...' : 'Create & Get Shareable Link'}
        </button>
      </form>

      {createdEvent && (
        <div className="mt-8 p-5 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">🎉 Event Created Successfully!</h3>
          <p className="text-green-700 mt-1">Share this secure link with your client:</p>
          <div className="mt-3 flex items-center bg-white p-2 rounded-md border">
            <a
              href={`/gallery/${createdEvent.shareable_link_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline flex-grow"
            >
              {typeof window !== 'undefined' && `${window.location.origin}/gallery/${createdEvent.shareable_link_id}`}
            </a>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && navigator.clipboard) {
                  navigator.clipboard.writeText(`${window.location.origin}/gallery/${createdEvent.shareable_link_id}`);
                }
              }}
              className="ml-4 px-3 py-1.5 text-sm text-white bg-primary-600 hover:bg-primary-700 rounded-md"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Add a generic style for inputs to reduce repetition
const styles = `
.input-style {
  @apply mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm;
}
.btn-primary {
  @apply w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500;
}
`;

// Inject styles into the head
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
} 