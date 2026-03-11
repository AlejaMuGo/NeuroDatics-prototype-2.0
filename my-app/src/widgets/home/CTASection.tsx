import { Button } from '@/widgets/shared/ui/atoms/Button';

export const CTASection = () => {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Comienza tu análisis ahora
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-8">
          Crea tu primer proyecto y descubre las métricas profesionales sobre el comportamiento y
          las respuestas neurofisiológicas de tus usuarios.
        </p>
        
        {/* CTA Button */}
        <Button 
          variant="primary"
          className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
        >
          Ir a proyectos
        </Button>
      </div>
    </section>
  );
};
