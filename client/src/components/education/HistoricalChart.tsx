import { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';

interface HistoricalChartProps {
  data: { time: string; open: number; high: number; low: number; close: number }[];
  markers?: { time: string; position: 'aboveBar' | 'belowBar'; color: string; shape: 'arrowUp' | 'arrowDown'; text: string }[];
}

export function HistoricalChart({ data, markers = [] }: HistoricalChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748b', // text-slate-500
      },
      grid: {
        vertLines: { color: 'rgba(100, 116, 139, 0.1)' }, // border/60
        horzLines: { color: 'rgba(100, 116, 139, 0.1)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        timeVisible: true,
        borderColor: 'rgba(100, 116, 139, 0.2)',
      },
      rightPriceScale: {
        borderColor: 'rgba(100, 116, 139, 0.2)',
      }
    });

    chart.timeScale().fitContent();

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981', // emerald-500
      downColor: '#ef4444', // red-500
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    candlestickSeries.setData(data);

    if (markers.length > 0) {
      // @ts-ignore lightweight-charts typings can be strict about time format
      candlestickSeries.setMarkers(markers);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, markers]);

  return (
    <div className="w-full relative rounded-xl overflow-hidden border border-border/60 bg-background/50">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
}
