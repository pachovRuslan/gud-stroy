'use client';

import React, { useState } from 'react';

type FormData = {
  name: string;
  phone: string;
  service: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const SERVICE_OPTIONS = [
  { value: '', label: 'Выберите услугу' },
  { value: 'frame-houses', label: 'Строительство каркасных домов' },
  { value: 'block-houses', label: 'Строительство домов из блоков' },
  { value: 'foundation', label: 'Фундаментные работы' },
  { value: 'pile-drilling', label: 'Бурение свай' },
  { value: 'excavator-rental', label: 'Аренда мини-экскаватора' },
  { value: 'other', label: 'Другое' },
];

const PHONE_REGEX = /^(\+375|80)\s?\(?\d{2}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Укажите ваше имя';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Имя слишком короткое';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Укажите номер телефона';
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'Формат: +375 (29) 123-45-67';
  }

  if (!data.service) {
    errors.service = 'Выберите услугу';
  }

  return errors;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', service: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    try {
      // TODO: заменить на реальный вызов API, когда появится бэкенд
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setFormData({ name: '', phone: '', service: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <p className="font-semibold text-secondary mb-1">Заявка отправлена</p>
        <p className="text-sm text-gray-600">Мы перезвоним вам в течение 24 часов.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-4">
      <div>
        <input
          type="text"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={handleChange('name')}
          className={`w-full h-11 px-3 rounded border text-sm ${
            errors.name ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="tel"
          placeholder="+375 (29) 123-45-67"
          value={formData.phone}
          onChange={handleChange('phone')}
          className={`w-full h-11 px-3 rounded border text-sm ${
            errors.phone ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      <div>
        <select
          value={formData.service}
          onChange={handleChange('service')}
          className={`w-full h-11 px-3 rounded border text-sm bg-white ${
            errors.service ? 'border-red-400' : 'border-gray-300'
          }`}
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="h-11 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-all disabled:opacity-60"
      >
        {status === 'submitting' ? 'Отправка...' : 'Отправить заявку'}
      </button>

      {status === 'error' && (
        <p className="text-xs text-red-500 text-center">Не удалось отправить. Попробуйте ещё раз.</p>
      )}
    </form>
  );
};

export default ContactForm;