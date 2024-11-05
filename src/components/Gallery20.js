import React, { useEffect, useState } from 'react';
import { Cloudinary } from 'cloudinary-core';

const cloudinary = new Cloudinary({ cloud_name: 'dstywrq5n' });

const GalleryWithIcons = () => {
  const [images, setImages] = useState([]);
  const iconUrl = 'https://res.cloudinary.com/dstywrq5n/image/upload/v1730001008/moldura_u3r2hx.png'; // URL completa do ícone PNG

  useEffect(() => {
    // Aqui você pode chamar sua API da Cloudinary para buscar imagens
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/images');
        const data = await response.json();
        setImages(data); // Assumindo que `resources` contém URLs das imagens
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      }
    };

    fetchImages();
  }, []);

  const handleDownload = (imageUrl) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    const icon = new Image();
    
    image.crossOrigin = 'anonymous';
    icon.crossOrigin = 'anonymous';

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);

      icon.onload = () => {
        //const iconSize = Math.min(image.width, image.height); // Tamanho do ícone proporcional
        context.drawImage(icon, 0, 0, image.width, image.height);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'Aventura-dos-Brinquedos-2024.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      icon.src = iconUrl;
    };

    image.src = imageUrl;
  };

  return (
    <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <img
            src={cloudinary.url(image.public_id, { format: 'jpg', width: 300, crop: 'scale' })}
            alt={`Imagem ${index + 1}`}
            className="w-full h-auto"
          />
          <button
            onClick={() => handleDownload(cloudinary.url(image.public_id))}
            className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold transition-opacity"
          >
            Baixar
          </button>
        </div>
      ))}
    </div>
  );
};

export default GalleryWithIcons;