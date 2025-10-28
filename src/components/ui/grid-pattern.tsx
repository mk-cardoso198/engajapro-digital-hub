import React from 'react';
import { cn } from '@/lib/utils';

export interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: [x: number, y: number][];
  strokeDasharray?: string | number;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  squares = [],
  strokeDasharray = 0,
  className,
  ...props
}: GridPatternProps) {
  const patternId = React.useId();

  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          width={width - 1}
          height={height - 1}
          x={x * width + 1}
          y={y * height + 1}
          strokeWidth={0}
        />
      ))}
    </svg>
  );
}
