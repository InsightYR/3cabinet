import { useState } from 'react';
import { Equipment } from '../types';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Search, Zap, Weight, Ruler } from 'lucide-react';

interface EquipmentCatalogProps {
  equipment: Equipment[];
  categories: string[];
  onDragStart: (equipment: Equipment) => void;
}

export function EquipmentCatalog({ equipment, categories, onDragStart }: EquipmentCatalogProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');

  const filteredEquipment = equipment.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(search.toLowerCase()) ||
                         eq.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Все категории' || eq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col gap-4">
      <div>
        <h2>Каталог оборудования</h2>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск оборудования..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map(cat => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="space-y-3 pb-4">
          {filteredEquipment.map(eq => (
            <div
              key={eq.id}
              draggable
              onDragStart={() => onDragStart(eq)}
              className="group relative p-4 border border-border rounded-lg bg-gradient-to-br from-card to-card/50 hover:border-tech-blue/50 cursor-move transition-all duration-300 touch-manipulation hover:shadow-lg hover:shadow-tech-blue/10 hover:-translate-y-0.5"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-tech-blue/0 to-tech-cyan/0 group-hover:from-tech-blue/5 group-hover:to-tech-cyan/5 transition-all duration-300 pointer-events-none" />
              
              <div className="relative">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="truncate group-hover:text-tech-blue transition-colors">{eq.name}</div>
                    <div className="text-sm text-muted-foreground truncate">{eq.description}</div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="shrink-0 bg-tech-blue/10 text-tech-blue border border-tech-blue/20 group-hover:bg-tech-blue/20 transition-colors"
                  >
                    {eq.units}U
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-tech-orange transition-colors">
                    <Zap className="h-3.5 w-3.5" />
                    <span>{eq.power}W</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-tech-cyan transition-colors">
                    <Weight className="h-3.5 w-3.5" />
                    <span>{eq.weight}кг</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-tech-purple transition-colors">
                    <Ruler className="h-3.5 w-3.5" />
                    <span>{eq.depth}мм</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredEquipment.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Оборудование не найдено
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
