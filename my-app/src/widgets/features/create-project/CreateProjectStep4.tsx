import { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import type { Stimulus } from './types';
import heladosImage from '@/widgets/shared/ui/assets/helados.png';

interface CreateProjectStep4Props {
  stimuli: Stimulus[];
}

// Mock AOIs for demonstration
const mockAOIs = [
  { id: '1', name: 'AOI 1', color: 'bg-blue-500', x: 15, y: 30, width: 35, height: 45 },
  { id: '2', name: 'AOI 2', color: 'bg-green-500', x: 52, y: 35, width: 30, height: 40 },
  { id: '3', name: 'AOI 3', color: 'bg-yellow-500', x: 65, y: 25, width: 28, height: 35 }
];

export const CreateProjectStep4 = ({ stimuli }: CreateProjectStep4Props) => {
  const [openStimulus, setOpenStimulus] = useState<string>(stimuli[0]?.id || '');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Áreas de Interés (AOIs)
        </h3>
        <p className="text-sm text-gray-600">
          Dibuja rectángulos sobre la imagen para delimitar las áreas de interés
        </p>
      </div>

      <div className="space-y-3">
        {stimuli.map((stimulus) => {
          const isOpen = openStimulus === stimulus.id;

          return (
            <div
              key={stimulus.id}
              className="border border-gray-200 rounded-xl bg-white overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setOpenStimulus(isOpen ? '' : stimulus.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">
                  {stimulus.name}
                </span>
                {isOpen ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="pt-4 space-y-4">
                    {/* Image with AOIs */}
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={heladosImage}
                        alt={stimulus.name}
                        className="w-full h-auto"
                      />

                      {/* AOI Rectangles */}
                      {mockAOIs.map((aoi) => {
                        const borderColorMap: Record<string, string> = {
                          'bg-blue-500': '#3b82f6',
                          'bg-green-500': '#22c55e',
                          'bg-yellow-500': '#eab308'
                        };

                        return (
                          <div
                            key={aoi.id}
                            className="absolute border-4"
                            style={{
                              left: `${aoi.x}%`,
                              top: `${aoi.y}%`,
                              width: `${aoi.width}%`,
                              height: `${aoi.height}%`,
                              borderColor: borderColorMap[aoi.color] || '#3b82f6'
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* AOIs List */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">
                        AOIs creadas ({mockAOIs.length})
                      </h4>
                      <div className="space-y-2">
                        {mockAOIs.map((aoi) => (
                          <div
                            key={aoi.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded ${aoi.color}`} />
                              <span className="text-sm font-medium text-gray-900">
                                {aoi.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
