// Category distribution chart component
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { useColorModeValue, HStack, VStack, Text, Box } from '@chakra-ui/react';
import { CHART_COLORS } from '../../utils/constants';

const CategoryDistributionChart = ({ data }) => {
  const gridColor = useColorModeValue('#e2e8f0', '#4a5568');
  const textColor = useColorModeValue('#2d3748', '#e2e8f0');

  const colors = [
    CHART_COLORS.primary,
    CHART_COLORS.secondary,
    CHART_COLORS.accent,
    CHART_COLORS.success,
    CHART_COLORS.warning,
    CHART_COLORS.error,
    '#9f7aea',
    '#38b2ac',
    '#ed64a6',
    '#4fd1c7',
    '#fc8181'
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <VStack spacing="6">
      <HStack spacing="8" align="start" width="full">
        {/* Pie Chart */}
        <Box flex="1">
          <Text fontSize="md" fontWeight="semibold" mb="4">
            Items Distribution
          </Text>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Bar Chart */}
        <Box flex="1">
          <Text fontSize="md" fontWeight="semibold" mb="4">
            Quantity by Category
          </Text>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="name" 
                stroke={textColor}
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke={textColor}
                fontSize={10}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: useColorModeValue('white', '#2d3748'),
                  border: `1px solid ${gridColor}`,
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="total" fill={CHART_COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </HStack>

      {/* Legend */}
      <HStack wrap="wrap" spacing="4" justify="center">
        {data.map((item, index) => (
          <HStack key={item.name} spacing="2">
            <Box
              w="3"
              h="3"
              bg={colors[index % colors.length]}
              borderRadius="full"
            />
            <Text fontSize="sm">
              {item.name} ({item.value})
            </Text>
          </HStack>
        ))}
      </HStack>
    </VStack>
  );
};

export default CategoryDistributionChart;