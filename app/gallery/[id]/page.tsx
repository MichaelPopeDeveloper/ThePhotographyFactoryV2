"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Photo {
  id: number;
  file_path: string;
}

interface Event {
  client_name: string;
  event_date: string;
}

export default function GalleryPage() {
  const params = useParams();
  const id = params?.id;
  const [event, setEvent] = useState<Event | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/gallery/${id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch gallery');
          }
          return res.json();
        })
        .then(data => {
          setEvent(data.event);
          setPhotos(data.photos);
        })
        .catch(err => {
          console.error(err);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-error">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-text">
          {event?.client_name}'s Gallery
        </h1>
        <p className="text-text-secondary mt-2">
          {event?.event_date && new Date(event.event_date).toLocaleDateString()}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {photos?.map(photo => (
          <div key={photo.id} className="group relative">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img src={photo.file_path} alt="Photo" className="w-full h-full object-center object-cover" />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={`/api/download?url=${encodeURIComponent(photo.file_path)}`}
                download
                className="text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-md"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 