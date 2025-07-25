import React from 'react';

export function Gallery() {
  const images = [
    {
      src: "/images/page-photos/CT3A8932.jpg",
      alt: "A beautiful landscape",
    },
    {
      src: "/images/page-photos/CT3A6895.jpg",
      alt: "An abstract composition",
    },
    {
      src: "/images/page-photos/CT3A0390-2.jpg",
      alt: "A serene nature shot",
    },
    {
      src: "/images/page-photos/CT3A7938.jpg",
      alt: "A dynamic action photo",
    },
    {
      src: "/images/page-photos/CT3A0048-3.jpg",
      alt: "A captivating architectural detail",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Work
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            A glimpse into our creative portfolio.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative h-80"
              >
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 