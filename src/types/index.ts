export interface Equipment {
  id: string;
  name: string;
  category: string;
  units: number; // количество юнитов высоты
  power: number; // Вт
  weight: number; // кг
  depth: number; // мм
  description: string;
}

export interface Cabinet {
  id: string;
  name: string;
  standard: string;
  units: number; // общее количество юнитов
  width: number; // мм
  depth: number; // мм
  maxWeight: number; // кг
  maxPower: number; // Вт
}

export interface InstalledEquipment {
  id: string;
  equipment: Equipment;
  position: number; // начальная позиция в юнитах (от 1)
}

export interface Project {
  id: string;
  name: string;
  cabinet: Cabinet;
  equipment: InstalledEquipment[];
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  type: 'specification' | 'drawing' | 'wiring' | 'calculation' | 'commercial' | 'notes';
  name: string;
  status: 'ready' | 'generating' | 'pending';
}
