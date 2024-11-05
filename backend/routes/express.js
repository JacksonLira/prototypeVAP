const cloudinary = require('cloudinary').v2;

// Configuração da Cloudinary com as credenciais da sua conta
cloudinary.config({
  cloud_name: 'dstywrq5n', // Substitua pelo seu cloud_name
  api_key: '686772967893685', // Substitua pelo seu API key
  api_secret: '7nqwAgQm4-K9JsH6ONjvGvipZLk' // Substitua pelo seu API secret
});

// Função para buscar imagens da galeria
const getImages = async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'dia19', // Filtra por uma pasta específica se necessário
      max_results: 30 // Número máximo de imagens a serem retornadas
    });
    res.json(result.resources); // Retorna as imagens como uma resposta JSON
  } catch (error) {
    console.error('Erro ao buscar imagens da Cloudinary:', error);
    res.status(500).json({ error: 'Erro ao buscar imagens' });
  }
};

module.exports = getImages;