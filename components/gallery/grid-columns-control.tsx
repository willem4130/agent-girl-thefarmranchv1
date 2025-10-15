'use client';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Minus, Plus } from 'lucide-react';

interface GridColumnsControlProps {
  columns: number;
  onColumnsChange: (columns: number) => void;
  minColumns?: number;
  maxColumns?: number;
  className?: string;
}

export function GridColumnsControl({
  columns,
  onColumnsChange,
  minColumns = 1,
  maxColumns = 8,
  className
}: GridColumnsControlProps) {
  const handleDecrement = () => {
    onColumnsChange(Math.max(minColumns, columns - 1));
  };

  const handleIncrement = () => {
    onColumnsChange(Math.min(maxColumns, columns + 1));
  };

  return (
    <Card className={`glass p-4 space-y-3 ${className || ''}`}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Grid Size</Label>
        <span className="text-sm font-semibold text-blue-600 tabular-nums">
          {columns} {columns === 1 ? 'column' : 'columns'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={columns <= minColumns}
          className="h-8 w-8 shrink-0"
          aria-label="Decrease columns"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </Button>

        <Slider
          value={[columns]}
          onValueCommit={([value]) => onColumnsChange(value)}
          min={minColumns}
          max={maxColumns}
          step={1}
          className="flex-1"
          aria-label="Grid columns"
          aria-valuetext={`${columns} ${columns === 1 ? 'column' : 'columns'}`}
        />

        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={columns >= maxColumns}
          className="h-8 w-8 shrink-0"
          aria-label="Increase columns"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      {/* Visual grid indicator */}
      <div className="flex gap-1">
        {Array.from({ length: maxColumns }).map((_, i) => (
          <div
            key={i}
            className={`h-6 flex-1 rounded border-2 transition-all ${
              i < columns
                ? 'border-blue-600 bg-blue-50 scale-105'
                : 'border-gray-200 bg-gray-50 opacity-40'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quick presets */}
      <div className="flex gap-1 text-xs">
        {[
          { value: 6, label: 'Small' },
          { value: 4, label: 'Medium' },
          { value: 2, label: 'Large' },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onColumnsChange(value)}
            className={`flex-1 px-2 py-1 rounded transition-colors ${
              columns === value
                ? 'bg-blue-600 text-white font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label={`Set to ${value} columns (${label})`}
          >
            {label}
          </button>
        ))}
      </div>
    </Card>
  );
}
