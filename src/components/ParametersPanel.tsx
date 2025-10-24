import { Cabinet, InstalledEquipment } from '../types';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { AlertTriangle, Zap, Weight, Ruler } from 'lucide-react';

interface ParametersPanelProps {
  cabinet: Cabinet;
  installedEquipment: InstalledEquipment[];
}

export function ParametersPanel({ cabinet, installedEquipment }: ParametersPanelProps) {
  const totalPower = installedEquipment.reduce((sum, eq) => sum + eq.equipment.power, 0);
  const totalWeight = installedEquipment.reduce((sum, eq) => sum + eq.equipment.weight, 0);
  const usedUnits = installedEquipment.reduce((sum, eq) => sum + eq.equipment.units, 0);
  const equipmentCount = installedEquipment.length;

  const powerPercent = (totalPower / cabinet.maxPower) * 100;
  const weightPercent = (totalWeight / cabinet.maxWeight) * 100;
  const unitsPercent = (usedUnits / cabinet.units) * 100;

  const hasWarning = powerPercent > 90 || weightPercent > 90 || unitsPercent > 100;

  return (
    <div className="space-y-4">
      <div>
        <h3>Итоговые параметры</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Установлено единиц: {equipmentCount}
        </p>
      </div>

      {hasWarning && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Превышены допустимые параметры шкафа
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-5">
        <div className="space-y-3 p-4 rounded-lg border border-tech-orange/30 bg-gradient-to-br from-tech-orange/5 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-tech-orange/20">
                <Zap className="h-4 w-4 text-tech-orange" />
              </div>
              <span className="text-sm">Энергопотребление</span>
            </div>
            <span className="text-sm font-mono">
              <span className="text-tech-orange">{totalPower}</span> / {cabinet.maxPower} Вт
            </span>
          </div>
          <Progress 
            value={Math.min(powerPercent, 100)} 
            className={`h-2 ${powerPercent > 90 ? '[&>div]:bg-destructive [&>div]:shadow-lg [&>div]:shadow-destructive/50' : '[&>div]:bg-tech-orange [&>div]:shadow-lg [&>div]:shadow-tech-orange/50'}`}
          />
          <div className="text-xs text-muted-foreground text-right font-mono">
            {powerPercent.toFixed(1)}% использовано
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-lg border border-tech-cyan/30 bg-gradient-to-br from-tech-cyan/5 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-tech-cyan/20">
                <Weight className="h-4 w-4 text-tech-cyan" />
              </div>
              <span className="text-sm">Нагрузка</span>
            </div>
            <span className="text-sm font-mono">
              <span className="text-tech-cyan">{totalWeight.toFixed(1)}</span> / {cabinet.maxWeight} кг
            </span>
          </div>
          <Progress 
            value={Math.min(weightPercent, 100)}
            className={`h-2 ${weightPercent > 90 ? '[&>div]:bg-destructive [&>div]:shadow-lg [&>div]:shadow-destructive/50' : '[&>div]:bg-tech-cyan [&>div]:shadow-lg [&>div]:shadow-tech-cyan/50'}`}
          />
          <div className="text-xs text-muted-foreground text-right font-mono">
            {weightPercent.toFixed(1)}% использовано
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-lg border border-tech-blue/30 bg-gradient-to-br from-tech-blue/5 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-tech-blue/20">
                <Ruler className="h-4 w-4 text-tech-blue" />
              </div>
              <span className="text-sm">Занятость</span>
            </div>
            <span className="text-sm font-mono">
              <span className="text-tech-blue">{usedUnits}</span> / {cabinet.units} U
            </span>
          </div>
          <Progress 
            value={Math.min(unitsPercent, 100)}
            className={`h-2 ${unitsPercent > 100 ? '[&>div]:bg-destructive [&>div]:shadow-lg [&>div]:shadow-destructive/50' : '[&>div]:bg-tech-blue [&>div]:shadow-lg [&>div]:shadow-tech-blue/50'}`}
          />
          <div className="text-xs text-muted-foreground text-right font-mono">
            {unitsPercent.toFixed(1)}% занято
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-4 bg-gradient-to-br from-tech-purple/10 to-transparent border border-tech-purple/30 rounded-lg">
          <div className="text-sm text-muted-foreground">Свободно</div>
          <div className="text-2xl text-tech-purple font-mono mt-1">{cabinet.units - usedUnits}U</div>
        </div>
        <div className="p-4 bg-gradient-to-br from-tech-green/10 to-transparent border border-tech-green/30 rounded-lg">
          <div className="text-sm text-muted-foreground">Резерв мощности</div>
          <div className="text-2xl text-tech-green font-mono mt-1">{Math.max(0, cabinet.maxPower - totalPower)}Вт</div>
        </div>
      </div>
    </div>
  );
}
