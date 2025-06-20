'use client';

import { useState } from 'react';
import { CustomerInfo } from '@/types';

interface AddressFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void;
  onCancel: () => void;
  initialData?: CustomerInfo;
}

const BRAZILIAN_STATES = [
  { code: 'AC', name: 'Acre' },
  { code: 'AL', name: 'Alagoas' },
  { code: 'AP', name: 'Amapá' },
  { code: 'AM', name: 'Amazonas' },
  { code: 'BA', name: 'Bahia' },
  { code: 'CE', name: 'Ceará' },
  { code: 'DF', name: 'Distrito Federal' },
  { code: 'ES', name: 'Espírito Santo' },
  { code: 'GO', name: 'Goiás' },
  { code: 'MA', name: 'Maranhão' },
  { code: 'MT', name: 'Mato Grosso' },
  { code: 'MS', name: 'Mato Grosso do Sul' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'PA', name: 'Pará' },
  { code: 'PB', name: 'Paraíba' },
  { code: 'PR', name: 'Paraná' },
  { code: 'PE', name: 'Pernambuco' },
  { code: 'PI', name: 'Piauí' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'RN', name: 'Rio Grande do Norte' },
  { code: 'RS', name: 'Rio Grande do Sul' },
  { code: 'RO', name: 'Rondônia' },
  { code: 'RR', name: 'Roraima' },
  { code: 'SC', name: 'Santa Catarina' },
  { code: 'SP', name: 'São Paulo' },
  { code: 'SE', name: 'Sergipe' },
  { code: 'TO', name: 'Tocantins' },
];

export default function AddressForm({ onSubmit, onCancel, initialData }: AddressFormProps) {
  const [formData, setFormData] = useState<CustomerInfo>({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    address: {
      street: initialData?.address.street || '',
      number: initialData?.address.number || '',
      complement: initialData?.address.complement || '',
      neighborhood: initialData?.address.neighborhood || '',
      city: initialData?.address.city || '',
      state: initialData?.address.state || '',
      zipCode: initialData?.address.zipCode || '',
      reference: initialData?.address.reference || '',
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Máscaras para telefone e CEP
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return value;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'phone') {
      value = formatPhone(value);
    } else if (field === 'address.zipCode') {
      value = formatZipCode(value);
    }

    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Limpar erro quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validações obrigatórias
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone deve ter pelo menos 10 dígitos';
    }

    if (!formData.address.street.trim()) {
      newErrors['address.street'] = 'Rua é obrigatória';
    }

    if (!formData.address.number.trim()) {
      newErrors['address.number'] = 'Número é obrigatório';
    }

    if (!formData.address.neighborhood.trim()) {
      newErrors['address.neighborhood'] = 'Bairro é obrigatório';
    }

    if (!formData.address.city.trim()) {
      newErrors['address.city'] = 'Cidade é obrigatória';
    }

    if (!formData.address.state) {
      newErrors['address.state'] = 'Estado é obrigatório';
    }

    if (!formData.address.zipCode.trim()) {
      newErrors['address.zipCode'] = 'CEP é obrigatório';
    } else if (formData.address.zipCode.replace(/\D/g, '').length !== 8) {
      newErrors['address.zipCode'] = 'CEP deve ter 8 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simular delay de processamento
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="h-full flex flex-col bg-white" style={{ height: '100dvh' }}>
      {/* Header - Fixed */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-amber-600 to-orange-600">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          📍 Endereço de Entrega
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-white hover:text-amber-200 transition-colors rounded-full hover:bg-white hover:bg-opacity-20"
          aria-label="Voltar"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Form Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Dados Pessoais */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              👤 Dados Pessoais
            </h3>

            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Digite seu nome completo"
              />
              {errors.name && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone/WhatsApp *
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base ${errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="(11) 99999-9999"
                maxLength={15}
              />
              {errors.phone && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              🏠 Endereço de Entrega
            </h3>

            {/* CEP */}
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                CEP *
              </label>
              <input
                type="text"
                id="zipCode"
                value={formData.address.zipCode}
                onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base ${errors['address.zipCode'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="12345-678"
                maxLength={9}
              />
              {errors['address.zipCode'] && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors['address.zipCode']}</p>
              )}
            </div>

            {/* Rua e Número */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                  Rua/Avenida *
                </label>
                <input
                  type="text"
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
                  className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base ${errors['address.street'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Nome da rua"
                />
                {errors['address.street'] && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors['address.street']}</p>
                )}
              </div>

              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                  Número *
                </label>
                <input
                  type="text"
                  id="number"
                  value={formData.address.number}
                  onChange={(e) => handleInputChange('address.number', e.target.value)}
                  className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base ${errors['address.number'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="123"
                />
                {errors['address.number'] && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors['address.number']}</p>
                )}
              </div>
            </div>

            {/* Complemento */}
            <div>
              <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">
                Complemento
              </label>
              <input
                type="text"
                id="complement"
                value={formData.address.complement}
                onChange={(e) => handleInputChange('address.complement', e.target.value)}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
                placeholder="Apto, bloco, casa, etc. (opcional)"
              />
            </div>

            {/* Bairro */}
            <div>
              <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                Bairro *
              </label>
              <input
                type="text"
                id="neighborhood"
                value={formData.address.neighborhood}
                onChange={(e) => handleInputChange('address.neighborhood', e.target.value)}
                className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base ${errors['address.neighborhood'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Nome do bairro"
              />
              {errors['address.neighborhood'] && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors['address.neighborhood']}</p>
              )}
            </div>

            {/* Cidade e Estado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade *
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                  className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base ${errors['address.city'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Nome da cidade"
                />
                {errors['address.city'] && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors['address.city']}</p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado *
                </label>
                <select
                  id="state"
                  value={formData.address.state}
                  onChange={(e) => handleInputChange('address.state', e.target.value)}
                  className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base ${errors['address.state'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <option value="">Selecione o estado</option>
                  {BRAZILIAN_STATES.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors['address.state'] && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors['address.state']}</p>
                )}
              </div>
            </div>

            {/* Referência */}
            <div>
              <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1">
                Ponto de Referência
              </label>
              <input
                type="text"
                id="reference"
                value={formData.address.reference}
                onChange={(e) => handleInputChange('address.reference', e.target.value)}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
                placeholder="Ex: Próximo ao mercado, portão azul (opcional)"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Footer - Fixed */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4 sm:p-6 bg-white">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Salvar Endereço
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-3">
          * Campos obrigatórios
        </p>
      </div>
    </div>
  );
}

