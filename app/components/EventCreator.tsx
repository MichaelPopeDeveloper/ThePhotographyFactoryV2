"use client";

import React, { useState } from 'react';
import { type PutBlobResult } from '@vercel/blob';

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
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploading(true);

    const uploadedPhotoUrls: string[] = [];
    for (const photo of photos) {
      const response = await fetch(`/api/upload?filename=${photo.name}`, {
        method: 'POST',
        body: photo,
      });
      const newBlob = (await response.json()) as PutBlobResult;
      uploadedPhotoUrls.push(newBlob.url);
    }

    setUploading(false);

    const eventData = {
      clientName,
      clientEmail,
      eventDate,
      eventType,
      notes,
      photoUrls: uploadedPhotoUrls,
    };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const data = await response.json();
        setCreatedEvent(data.event);
        setClientName('');
        setClientEmail('');
        setEventDate('');
        setEventType('');
        setNotes('');
        setPhotos([]);
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
          <input type="text" placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <input type="email" placeholder="Client Email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <input type="date" placeholder="Event Date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <input type="text" placeholder="Event Type (e.g., Wedding, Portrait)" value={eventType} onChange={(e) => setEventType(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        
        <textarea 
          placeholder="Add any relevant notes..." 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        
        <button type="submit" disabled={isSubmitting || uploading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg">
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {uploading ? 'Uploading...' : 'Creating Event...'}
            </>
          ) : (
            'Create & Get Shareable Link'
          )}
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
                if (navigator.clipboard) {
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