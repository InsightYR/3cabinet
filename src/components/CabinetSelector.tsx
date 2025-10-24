import { Cabinet } from '../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CabinetSelectorProps {
  cabinets: Cabinet[];
  selectedCabinet: Cabinet;
  onSelectCabinet: (cabinet: Cabinet) => void;
}

export function CabinetSelector({ cabinets, selectedCabinet, onSelectCabinet }: CabinetSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block">Тип шкафа</label>
      <Select
        value={selectedCabinet.id}
        onValueChange={(value) => {
          const cabinet = cabinets.find(c => c.id === value);
          if (cabinet) onSelectCabinet(cabinet);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {cabinets.map(cabinet => (
            <SelectItem key={cabinet.id} value={cabinet.id}>
              {cabinet.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="grid grid-cols-2 gap-2 p-4 bg-gradient-to-br from-muted/50 to-transparent border border-tech-blue/20 rounded-lg">
        <div className="text-sm">
          <div className="text-muted-foreground">Стандарт</div>
          <div className="text-tech-blue font-mono mt-0.5">{selectedCabinet.standard}</div>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Юниты</div>
          <div className="text-tech-cyan font-mono mt-0.5">{selectedCabinet.units}U</div>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Размер</div>
          <div className="text-tech-purple font-mono mt-0.5">{selectedCabinet.width}×{selectedCabinet.depth} мм</div>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Макс. вес</div>
          <div className="text-tech-orange font-mono mt-0.5">{selectedCabinet.maxWeight} кг</div>
        </div>
      </div>
    </div>
  );
}
