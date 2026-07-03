import Container from '@/components/Container';
import { STATS } from '@/constants/stats';
import { COMPANY } from '@/constants/company';
import StatCard from '@/components/StatCard';

export default function AboutPage() {
  return (
    <>
      <section className="px-8 py-12">
        <Container>
        <h1 className="text-3xl font-bold text-secondary mb-6">О компании</h1>
        <div className="max-w-2xl flex flex-col gap-4 text-sm text-gray-700 leading-relaxed">
          <p>
            {COMPANY.name} работает в сфере строительства и ремонта в {COMPANY.region}.
            Выполняем строительство каркасных и блочных домов под ключ, фундаментные и земляные работы,
            а также предоставляем в аренду спецтехнику с оператором.
          </p>
          <p>
            За плечами команды {COMPANY.experience} опыта в строительстве. Работаем как с частными
            клиентами, так и с юридическими лицами, по наличному и безналичному расчёту.
          </p>
          <p>
            Наша компания является торговым партнёром и дистрибьютором заводов строительных материалов,
            что позволяет предлагать честные цены без наценки посредников.
          </p>
        </div>
        </Container>
      </section>

      <section className="px-8 py-16 bg-secondary">
        <Container>
        <h2 className="text-2xl font-bold text-white mb-8">{COMPANY.name} в цифрах</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
        </Container>
      </section>

      <section className="px-8 py-16">
        <Container>
        <h2 className="text-2xl font-bold text-secondary mb-6">Условия работы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMPANY.paymentOptions.map((option) => (
            <div key={option} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-sm text-secondary">{option}</span>
            </div>
          ))}
        </div>
        </Container>
      </section>
    </>
  );
}