const sharp = require('sharp');
const fs = require('fs');

async function generateIcons() {
  try {
    // Gerar ícone 192x192
    await sharp({
      create: {
        width: 192,
        height: 192,
        channels: 4,
        background: { r: 102, g: 126, b: 234, alpha: 1 }
      }
    })
    .png()
    .toFile('icon-192.png');
    
    console.log('✅ icon-192.png criado');

    // Gerar ícone 512x512
    await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 102, g: 126, b: 234, alpha: 1 }
      }
    })
    .png()
    .toFile('icon-512.png');
    
    console.log('✅ icon-512.png criado');
  } catch (error) {
    console.error('Erro ao gerar ícones:', error);
  }
}

generateIcons();
