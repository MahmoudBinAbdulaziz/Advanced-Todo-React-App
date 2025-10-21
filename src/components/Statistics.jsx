import { Stack, Typography } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import TaskProgressBar from './Progress';
import { calculteYourProgress } from '../utils/calcStatistics';
import { TodoContext } from '../context/todoContext';
import FilterStatistics from './ComplexCharts';

// 🎨 Unified color palette
const colors = {
  status: { completed: '#0088FE', todo: '#FF8042' },
  priority: { high: '#FF8042', medium: '#FFBB28', low: '#0088FE' },
  difficulty: { easy: '#0088FE', medium: '#FFBB28', hard: '#FF8042' },
};

function Statistics() {
  const { todos } = useContext(TodoContext);

  const { statusData, priorityData, difficultyData } = useMemo(() => {
    if (!todos || todos.length === 0)
      return {
        statusData: [],
        priorityData: [],
        difficultyData: [],
      };

    // ✅ Initialize counters
    const counts = {
      status: { completed: 0, todo: 0 },
      priority: { high: 0, medium: 0, low: 0 },
      difficulty: { easy: 0, medium: 0, hard: 0 },
    };

    // ✅ Single loop for all counts
    for (const t of todos) {
      counts.status[t.status] = (counts.status[t.status] || 0) + 1;
      counts.priority[t.priority] = (counts.priority[t.priority] || 0) + 1;
      counts.difficulty[t.difficulty] = (counts.difficulty[t.difficulty] || 0) + 1;
    }

    return {
      statusData: [
        { label: 'منجزة', value: counts.status.completed || 0, color: colors.status.completed },
        { label: 'غير منجزة', value: counts.status.todo || 0, color: colors.status.todo },
      ],
      priorityData: [
        { label: 'عالية', value: counts.priority.high || 0, color: colors.priority.high },
        { label: 'متوسطة', value: counts.priority.medium || 0, color: colors.priority.medium },
        { label: 'منخفضة', value: counts.priority.low || 0, color: colors.priority.low },
      ],
      difficultyData: [
        { label: 'سهلة', value: counts.difficulty.easy || 0, color: colors.difficulty.easy },
        { label: 'متوسطة', value: counts.difficulty.medium || 0, color: colors.difficulty.medium },
        { label: 'صعبة', value: counts.difficulty.hard || 0, color: colors.difficulty.hard },
      ],
    };
  }, [todos]);

  const completion = calculteYourProgress(todos);

  return (
    <Stack direction="column">
      <Typography variant="h2" marginTop="2rem" textAlign="center">
        الإحصائيات الأساسية
      </Typography>

      <div
        style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <ChartBlock title="الحالة" data={statusData} />
        <ChartBlock title="الأولوية" data={priorityData} />
        <ChartBlock title="الصعوبة" data={difficultyData} />
      </div>
      <Typography variant="h4" marginTop="4rem" textAlign="center">
        الإحصائيات المتقدمة
      </Typography>
      <FilterStatistics tasks={todos} />

      <Typography variant="h2" marginTop="4rem" textAlign="center">
        تقدمي
      </Typography>
      <TaskProgressBar completion={completion} />
    </Stack>
  );
}

export default Statistics;

// 🔹 Reusable chart block
function ChartBlock({ title, data }) {
  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h5" textAlign="center">
        {title}
      </Typography>
      <Donut data={data} />
    </Stack>
  );
}

// 🍩 Donut chart component
export function Donut({ data }) {
  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: true,
  };

  return (
    <PieChart
      series={[
        {
          innerRadius: 50,
          outerRadius: 100,
          data,
          arcLabel: (item) => `${item.value}`,
        },
      ]}
      {...settings}
    />
  );
}
