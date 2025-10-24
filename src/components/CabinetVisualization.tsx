import { Cabinet, InstalledEquipment } from '../types';
import { ScrollArea } from './ui/scroll-area';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface CabinetVisualizationProps {
  cabinet: Cabinet;
  installedEquipment: InstalledEquipment[];
  onDrop: (position: number) => void;
  onRemove: (id: string) => void;
  dragOver: number | null;
  setDragOver: (position: number | null) => void;
}

export function CabinetVisualization({
  cabinet,
  installedEquipment,
  onDrop,
  onRemove,
  dragOver,
  setDragOver
}: CabinetVisualizationProps) {
  
  const isPositionOccupied = (position: number): InstalledEquipment | null => {
    return installedEquipment.find(eq => {
      const start = eq.position;
      const end = eq.position + eq.equipment.units - 1;
      return position >= start && position <= end;
    }) || null;
  };

  const getEquipmentAtPosition = (position: number): InstalledEquipment | null => {
    return installedEquipment.find(eq => eq.position === position) || null;
  };

  const handleDragOver = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    setDragOver(position);
  };

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    setDragOver(null);
    onDrop(position);
  };

  const units = Array.from({ length: cabinet.units }, (_, i) => cabinet.units - i);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2>Визуализация шкафа</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Перетащите оборудование в нужную позицию
        </p>
      </div>

      <ScrollArea className="flex-1 border border-tech-blue/30 rounded-lg bg-gradient-to-br from-card/50 to-muted/30 shadow-xl shadow-tech-blue/5">
        <div className="p-4 min-w-[300px] tech-grid">
          {units.map(unitNumber => {
            const occupied = isPositionOccupied(unitNumber);
            const equipment = getEquipmentAtPosition(unitNumber);
            
            if (occupied && !equipment) {
              return null; // Это продолжение оборудования из предыдущей позиции
            }

            return (
              <div
                key={unitNumber}
                onDragOver={(e) => handleDragOver(e, unitNumber)}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => handleDrop(e, unitNumber)}
                className={`
                  relative border-b border-x first:border-t first:rounded-t-lg last:rounded-b-lg
                  transition-all duration-300
                  ${equipment ? 'bg-gradient-to-r from-tech-blue/20 to-tech-cyan/20 border-tech-blue/50 shadow-lg shadow-tech-blue/20' : 'bg-card/80 backdrop-blur-sm border-border'}
                  ${dragOver === unitNumber && !occupied ? 'bg-tech-cyan/30 border-tech-cyan shadow-lg shadow-tech-cyan/30 scale-[1.02]' : ''}
                  ${!equipment ? 'h-[44px]' : ''}
                `}
                style={equipment ? { height: `${equipment.equipment.units * 44}px` } : undefined}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r text-sm ${equipment ? 'bg-tech-blue/20 border-tech-blue/30 text-tech-blue' : 'bg-muted/80 border-border text-muted-foreground'}`}>
                  <span className="font-mono">{unitNumber}U</span>
                </div>
                
                {equipment ? (
                  <div className="absolute left-12 right-0 top-0 bottom-0 p-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-foreground">{equipment.equipment.name}</div>
                      <div className="text-sm text-muted-foreground flex gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-tech-blue" />
                          {equipment.equipment.units}U
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-tech-orange" />
                          {equipment.equipment.power}W
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-tech-cyan" />
                          {equipment.equipment.weight}кг
                        </span>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 shrink-0 hover:bg-destructive/20 hover:text-destructive transition-all"
                      onClick={() => onRemove(equipment.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-muted-foreground/50">
                    {dragOver === unitNumber && (
                      <span className="text-tech-cyan animate-pulse">Отпустите для размещения</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
