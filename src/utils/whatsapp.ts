import { CartItem } from '@/types';

// Configurações do WhatsApp
export const WHATSAPP_CONFIG = {
  // Substitua pelo número real da loja (formato: código do país + DDD + número)
  phoneNumber: '5511956792908', // Exemplo: Brasil (55) + São Paulo (11) + número
  businessName: 'Respawn Adega',
  businessAddress: 'Rua das Bebidas, 123 - Centro, São Paulo - SP',
  businessHours: 'Segunda a Sexta: 8h às 22h | Sábado: 8h às 20h',
};

// Função para formatar preço
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

// Função para gerar mensagem do pedido
export const generateOrderMessage = (
  items: CartItem[],
  totalPrice: number,
  customerInfo?: {
    name?: string;
    address?: string;
    phone?: string;
  }
): string => {
  const itemsList = items.map(item => {
    const itemTotal = item.product.price * item.quantity;
    return `• ${item.product.name}\n  Qtd: ${item.quantity}x | Preço: ${formatPrice(item.product.price)} | Subtotal: ${formatPrice(itemTotal)}`;
  }).join('\n\n');

  const total = formatPrice(totalPrice);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  let message = `🛒 *NOVO PEDIDO - ${WHATSAPP_CONFIG.businessName}*\n\n`;

  if (customerInfo?.name) {
    message += `👤 *Cliente:* ${customerInfo.name}\n`;
  }

  if (customerInfo?.phone) {
    message += `📱 *Telefone:* ${customerInfo.phone}\n`;
  }

  if (customerInfo?.address) {
    message += `📍 *Endereço:* ${customerInfo.address}\n`;
  }

  message += `\n📦 *ITENS DO PEDIDO:*\n\n${itemsList}\n\n`;
  message += `📊 *RESUMO:*\n`;
  message += `• Total de itens: ${itemCount}\n`;
  message += `• Valor total: ${total}\n\n`;
  message += `⏰ *Horário do pedido:* ${new Date().toLocaleString('pt-BR')}\n\n`;
  message += `✅ Gostaria de confirmar este pedido!\n\n`;
  message += `📍 *Endereço da loja:* ${WHATSAPP_CONFIG.businessAddress}\n`;
  message += `🕒 *Horário de funcionamento:* ${WHATSAPP_CONFIG.businessHours}`;

  return message;
};

// Função para abrir WhatsApp com mensagem
export const sendWhatsAppMessage = (message: string): void => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;

  // Abrir em nova aba
  window.open(whatsappUrl, '_blank');
};

// Função para gerar mensagem de contato simples
export const generateContactMessage = (
  name: string,
  email: string,
  subject: string,
  message: string
): string => {
  return `📞 *CONTATO - ${WHATSAPP_CONFIG.businessName}*\n\n` +
    `👤 *Nome:* ${name}\n` +
    `📧 *Email:* ${email}\n` +
    `📋 *Assunto:* ${subject}\n\n` +
    `💬 *Mensagem:*\n${message}\n\n` +
    `⏰ *Enviado em:* ${new Date().toLocaleString('pt-BR')}`;
};

// Função para validar número de WhatsApp
export const isValidWhatsAppNumber = (number: string): boolean => {
  // Remove todos os caracteres não numéricos
  const cleanNumber = number.replace(/\D/g, '');

  // Verifica se tem pelo menos 10 dígitos (DDD + número)
  // e no máximo 15 dígitos (padrão internacional)
  return cleanNumber.length >= 10 && cleanNumber.length <= 15;
};

// Função para formatar número de telefone brasileiro
export const formatBrazilianPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.length === 11) {
    // Celular: (XX) 9XXXX-XXXX
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 10) {
    // Fixo: (XX) XXXX-XXXX
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  return phone;
};

