// Expiry timeline chart component
import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useColorModeValue } from '@chakra-ui/react';
import { getDaysUntilExpiry } from '../../utils/helpers';

const ExpiryTimelineChart = ({ items }) => {
  const gridColor = useColorModeValue('#e2e8f0', '#4a5568');
  const textColor = useColorModeValue('#2d3748', '#e2e8f0');

  const expiryData = useMemo(() => {
    const ranges = [
      { label: 'Expired', min: -Infinity, max: 0, color: '#e53e3e' },
      { label: '1-7 days', min: 1, max: 7, color: '#ed8936' },
      { label: '8-30 days', min: 8, max: 30, color: '#d69e2e' },
      { label: '31-90 days', min: 31, max: 90, color: '#38a169' },
      { label: '90+ days', min: 91, max: Infinity, color: '#3182ce' }
    ];

    return ranges.map(range => {
      const count = items.filter(item => {
        const days = getDaysUntilExpiry(item.expiryDate);
        return days >= range.min && days <= range.max;
      }).length;

      return {
        range: range.label,
        count,
        color: range.color
      };
    });
  }, [items]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={expiryData}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis 
          dataKey="range" 
          stroke={textColor}
          fontSize={12}
        />
        <YAxis 
          stroke={textColor}
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: useColorModeValue('white', '#2d3748'),
            border: `1px solid ${gridColor}`,
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Bar 
          dataKey="count" 
          fill="#3182ce"
          name="Number of Items"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpiryTimelineChart;