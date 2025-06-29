import { CartItem, CustomerInfo } from '@/types';

// Configurações do WhatsApp
export const WHATSAPP_CONFIG = {
  phoneNumber: '551111932925684',
  businessName: "RespawN'Adega",
  businessAddress: 'Rua Renê Juste, 57 - Jardim Zilda 04856-385',
  businessHours: '24 horas',
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
  customerInfo?: CustomerInfo
): string => {
  const itemsList = items.map(item => {
    const itemTotal = item.product.price * item.quantity;
    return `• ${item.product.name}\n  Qtd: ${item.quantity}x | Preço: ${formatPrice(item.product.price)} | Subtotal: ${formatPrice(itemTotal)}`;
  }).join('\n\n');

  const total = formatPrice(totalPrice);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  let message = `🛒 *NOVO PEDIDO - ${WHATSAPP_CONFIG.businessName}*\n\n`;

  // Informações do cliente
  if (customerInfo) {
    message += `👤 *DADOS DO CLIENTE:*\n`;
    message += `• Nome: ${customerInfo.name}\n`;
    message += `• Telefone: ${customerInfo.phone}\n\n`;

    message += `📍 *ENDEREÇO DE ENTREGA:*\n`;
    message += `• ${customerInfo.address.street}, ${customerInfo.address.number}`;
    if (customerInfo.address.complement) {
      message += `, ${customerInfo.address.complement}`;
    }
    message += `\n`;
    message += `• ${customerInfo.address.neighborhood}\n`;
    message += `• ${customerInfo.address.city} - ${customerInfo.address.state}\n`;
    message += `• CEP: ${customerInfo.address.zipCode}\n`;
    if (customerInfo.address.reference) {
      message += `• Referência: ${customerInfo.address.reference}\n`;
    }
    message += `\n`;
  }

  message += `📦 *ITENS DO PEDIDO:*\n\n${itemsList}\n\n`;
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

