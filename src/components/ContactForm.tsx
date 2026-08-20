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
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-bold text-secondary mb-1.5">Заявка отправлена</p>
        <p className="text-sm text-gray-500">Мы перезвоним вам в течение 24 часов.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 flex flex-col gap-4">
      <div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]">
              <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange('name')}
            className={`w-full h-12 pl-11 pr-4 rounded-xl border text-sm bg-gray-50/50 outline-none transition-colors focus:bg-white focus:ring-2 ${
              errors.name
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                : 'border-gray-200 focus:border-primary focus:ring-primary/10'
            }`}
          />
        </div>
        {errors.name && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.name}</p>}
      </div>

      <div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]">
              <path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3c1.2.4 2.5.6 3.9.6a1.2 1.2 0 0 1 1.2 1.2V20a1.2 1.2 0 0 1-1.2 1.2C10.9 21.2 2.8 13.1 2.8 3.5A1.2 1.2 0 0 1 4 2.3h3.3a1.2 1.2 0 0 1 1.2 1.2c0 1.4.2 2.7.6 3.9a1.2 1.2 0 0 1-.3 1.2L6.6 10.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </span>
          <input
            type="tel"
            placeholder="+375 (29) 123-45-67"
            value={formData.phone}
            onChange={handleChange('phone')}
            className={`w-full h-12 pl-11 pr-4 rounded-xl border text-sm bg-gray-50/50 outline-none transition-colors focus:bg-white focus:ring-2 ${
              errors.phone
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                : 'border-gray-200 focus:border-primary focus:ring-primary/10'
            }`}
          />
        </div>
        {errors.phone && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.phone}</p>}
      </div>

      <div>
        <div className="relative">
          <select
            value={formData.service}
            onChange={handleChange('service')}
            className={`w-full h-12 pl-4 pr-10 rounded-xl border text-sm bg-gray-50/50 outline-none appearance-none transition-colors focus:bg-white focus:ring-2 ${
              formData.service ? 'text-secondary' : 'text-gray-400'
            } ${
              errors.service
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                : 'border-gray-200 focus:border-primary focus:ring-primary/10'
            }`}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {errors.service && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.service}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="h-12 mt-1 bg-primary text-white font-semibold text-sm rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0 shadow-sm shadow-primary/30 flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          'Отправка...'
        ) : (
          <>
            Отправить заявку
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="text-xs text-red-500 text-center">Не удалось отправить. Попробуйте ещё раз.</p>
      )}
    </form>
  );
};

export default ContactForm;