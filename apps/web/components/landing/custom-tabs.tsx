'use client';

import { Badge } from '@workspace/ui/components/badge';
import { useState, useRef, useEffect } from 'react';

export function CustomTabs({
  tabs,
  onChange,
}: {
  tabs: { id: number; name: string; active: boolean }[];
  onChange: (value: number) => any;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const overviewElement = tabRefs.current[0];
      if (overviewElement) {
        const { offsetLeft, offsetWidth } = overviewElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    });
  }, []);

  return (
    <div className='relative w-full'>
      {/* Hover Highlight */}
      <div
        className='absolute h-[30px] transition-all duration-300 ease-out bg-white rounded-[6px] flex items-center'
        style={{
          ...hoverStyle,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
      />

      {/* Active Indicator */}
      <div
        className='absolute bottom-[-6px] h-[2px] bg-primary transition-all duration-300 ease-out'
        style={activeStyle}
      />

      {/* Tabs */}
      <div className='relative flex space-x-[6px] items-center'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            ref={(el: any) => (tabRefs.current[index] = el)}
            className={`w-full px-3 py-4 transition-colors duration-300 h-[30px] ${
              index === activeIndex ? 'text-text' : 'text-muted-foreground'
            } ${tab?.active && 'cursor-pointer'}`}
            onMouseEnter={() => {
              tab?.active && setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              tab?.active && setHoveredIndex(null);
            }}
            onClick={() => {
              if (tab?.active) {
                onChange(index);
                setActiveIndex(index);
              }
            }}
            aria-disabled={tab?.active}
          >
            <div className='flex items-center justify-center gap-2 h-full text-sm font-semibold'>
              {tab?.name} {!tab?.active && <Badge variant='outline'>Soon</Badge>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
