import { Equipment, Cabinet } from '../types';

export const mockCabinets: Cabinet[] = [
  {
    id: 'cab-1',
    name: 'Шкаф 42U 600x800',
    standard: '19" RACK',
    units: 42,
    width: 600,
    depth: 800,
    maxWeight: 800,
    maxPower: 3500
  },
  {
    id: 'cab-2',
    name: 'Шкаф 27U 600x600',
    standard: '19" RACK',
    units: 27,
    width: 600,
    depth: 600,
    maxWeight: 500,
    maxPower: 2000
  },
  {
    id: 'cab-3',
    name: 'Шкаф 47U 800x1000',
    standard: '19" RACK',
    units: 47,
    width: 800,
    depth: 1000,
    maxWeight: 1200,
    maxPower: 5000
  },
  {
    id: 'cab-4',
    name: 'Шкаф 18U 600x600',
    standard: '19" RACK',
    units: 18,
    width: 600,
    depth: 600,
    maxWeight: 300,
    maxPower: 1500
  }
];

export const mockEquipment: Equipment[] = [
  {
    id: 'eq-1',
    name: 'Коммутатор Cisco 2960',
    category: 'Сетевое оборудование',
    units: 1,
    power: 45,
    weight: 3.2,
    depth: 250,
    description: '24-port Gigabit Switch'
  },
  {
    id: 'eq-2',
    name: 'Сервер Dell R740',
    category: 'Серверы',
    units: 2,
    power: 750,
    weight: 28.5,
    depth: 650,
    description: '2U Rack Server'
  },
  {
    id: 'eq-3',
    name: 'Патч-панель 24 порта',
    category: 'Пассивное оборудование',
    units: 1,
    power: 0,
    weight: 1.5,
    depth: 150,
    description: 'Cat6 UTP 24-port'
  },
  {
    id: 'eq-4',
    name: 'ИБП APC Smart-UPS 1500',
    category: 'Электропитание',
    units: 2,
    power: 0,
    weight: 35,
    depth: 450,
    description: '1500VA/1000W UPS'
  },
  {
    id: 'eq-5',
    name: 'Роутер Cisco ISR 4321',
    category: 'Сетевое оборудование',
    units: 1,
    power: 90,
    weight: 5.8,
    depth: 400,
    description: 'Integrated Services Router'
  },
  {
    id: 'eq-6',
    name: 'Сервер HP ProLiant DL360',
    category: 'Серверы',
    units: 1,
    power: 500,
    weight: 18.2,
    depth: 700,
    description: '1U Rack Server'
  },
  {
    id: 'eq-7',
    name: 'PDU управляемый 8 розеток',
    category: 'Электропитание',
    units: 1,
    power: 0,
    weight: 2.8,
    depth: 450,
    description: 'Power Distribution Unit'
  },
  {
    id: 'eq-8',
    name: 'Коммутатор HP 5130 48G',
    category: 'Сетевое оборудование',
    units: 1,
    power: 55,
    weight: 4.5,
    depth: 300,
    description: '48-port Gigabit L3 Switch'
  },
  {
    id: 'eq-9',
    name: 'KVM переключатель 16 портов',
    category: 'Периферия',
    units: 1,
    power: 15,
    weight: 2.1,
    depth: 300,
    description: '16-port KVM Switch'
  },
  {
    id: 'eq-10',
    name: 'Сервер Supermicro 4U',
    category: 'Серверы',
    units: 4,
    power: 1200,
    weight: 45,
    depth: 750,
    description: '4U Storage Server'
  },
  {
    id: 'eq-11',
    name: 'Полка кабельная 1U',
    category: 'Пассивное оборудование',
    units: 1,
    power: 0,
    weight: 1.2,
    depth: 200,
    description: 'Cable Management Panel'
  },
  {
    id: 'eq-12',
    name: 'Вентиляторный блок 1U',
    category: 'Охлаждение',
    units: 1,
    power: 120,
    weight: 3.5,
    depth: 250,
    description: 'Fan Tray Unit'
  }
];

export const categories = [
  'Все категории',
  'Серверы',
  'Сетевое оборудование',
  'Электропитание',
  'Пассивное оборудование',
  'Охлаждение',
  'Периферия'
];
