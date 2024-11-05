import React, { useRef, useState, useEffect } from "react";
import { Cloudinary } from "cloudinary-core";

// Configuração do Cloudinary
const cloudinary = new Cloudinary({ cloud_name: "dstywrq5n" });

// Lista de IDs das imagens no Cloudinary
const imageIds = [
  "sample",
    "sample2",
    "teste/o8njput1iukkf0hing2j",
    "teste/ngvja6erjp9x3zik04il",
    "teste/gbqhq15koxrmqcfoem6n",
    "teste/utkrmtegijgyjqdccxot",
    "teste/nm2hjilqctq0mn9yjgto",
    "",
    "",
  // Substitua com os IDs das suas imagens
];

const ImageGallery = () => {
  const canvasRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // URL da moldura em PNG
  const frameUrl = cloudinary.url("https://res.cloudinary.com/dstywrq5n/image/upload/v1730001008/moldura_u3r2hx.png", { format: "png" });

  // Função para desenhar a imagem com a moldura
  const drawImageWithFrame = async (imgId) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // URL da imagem principal no Cloudinary
    const imgUrl = cloudinary.url(imgId, { format: "jpg" });

    // Carregar a imagem principal
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imgUrl;

    // Carregar a moldura em PNG
    const frame = new Image();
    frame.crossOrigin = "anonymous";
    frame.src = frameUrl;

    image.onload = () => {
      // Ajusta o tamanho do canvas ao tamanho da imagem principal
      canvas.width = image.width;
      canvas.height = image.height;

      // Desenha a imagem principal no canvas
      ctx.drawImage(image, 0, 0);

      // Quando a moldura carregar, desenha a moldura sobre a imagem
      frame.onload = () => {
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
      };

      frame.onerror = () => {
        console.error("Erro ao carregar a moldura");
      };
    };

    image.onerror = () => {
      console.error(`Erro ao carregar a imagem principal com ID: ${imgId}`);
    };
  };

  // Função para baixar a imagem combinada (imagem + moldura)
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    link.download = `imagem-com-moldura-${currentImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Função para avançar para a próxima imagem da galeria
  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % imageIds.length;
    setCurrentImageIndex(nextIndex);
    drawImageWithFrame(imageIds[nextIndex]);
  };

  // Carregar a primeira imagem quando o componente montar
  useEffect(() => {
    drawImageWithFrame(imageIds[currentImageIndex]);
  }, [currentImageIndex]);

  return (
    <div className="text-center">
    <canvas ref={canvasRef} className="border mb-4" />
    <div className="flex justify-center space-x-4">
      <button
        onClick={() => drawImageWithFrame(imageIds[currentImageIndex])}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Exibir Moldura
      </button>
      <button
        onClick={handleDownload}
        className="bg-green-500 text-white p-2 rounded"
      >
        Baixar
      </button>
      <button
        onClick={handleNextImage}
        className="bg-gray-500 text-white p-2 rounded"
      >
        Próxima Imagem
      </button>
    </div>
  </div>
);
};

export default ImageGallery;