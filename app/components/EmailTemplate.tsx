import React from 'react';

interface EmailTemplateProps {
  name: string;
  eventDate: string;
  eventType: string;
  notes: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  eventDate,
  eventType,
  notes,
}) => (
  <div>
    <h1>Thank you for your booking request, {name}!</h1>
    <p>We have received your request for a {eventType} on {eventDate}.</p>
    <p>Here are the notes you provided:</p>
    <p>{notes}</p>
    <p>We will get back to you shortly with our availability and pricing.</p>
    <p>Best,</p>
    <p>The TDP Factory Team</p>
  </div>
); 