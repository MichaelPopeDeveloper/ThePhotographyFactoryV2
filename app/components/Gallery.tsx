import React from 'react';

export function Gallery() {
  const images = [
    {
      src: "https://picsum.photos/id/1018/1000/600",
      alt: "A beautiful mountain landscape",
    },
    {
      src: "https://picsum.photos/id/1015/1000/600",
      alt: "A serene lake surrounded by mountains",
    },
    {
      src: "https://picsum.photos/id/1019/1000/600",
      alt: "A person walking on a path in the woods",
    },
    {
      src: "https://picsum.photos/id/1025/1000/600",
      alt: "A majestic lion",
    },
    {
      src: "https://picsum.photos/id/10/1000/600",
      alt: "A stunning view of a valley",
    },
    {
      src: "https://picsum.photos/id/20/1000/600",
      alt: "A field of vibrant flowers",
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
                className="group relative"
              >
                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 