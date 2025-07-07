// Stock levels chart component
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useColorModeValue } from '@chakra-ui/react';

const StockLevelsChart = ({ data }) => {
  const gridColor = useColorModeValue('#e2e8f0', '#4a5568');
  const textColor = useColorModeValue('#2d3748', '#e2e8f0');

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis 
          dataKey="date" 
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
        <Line
          type="monotone"
          dataKey="totalStock"
          stroke="#3182ce"
          strokeWidth={3}
          name="Total Stock"
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="lowStock"
          stroke="#ed8936"
          strokeWidth={2}
          name="Low Stock"
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="outOfStock"
          stroke="#e53e3e"
          strokeWidth={2}
          name="Out of Stock"
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockLevelsChart;