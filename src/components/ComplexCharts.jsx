import { Stack, Typography, Select, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { TodoContext } from "../context/todoContext";

function Statistics() {
  const { todos } = useContext(TodoContext);

  // ✅ Filter states
  
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    difficulty: "",
  });


  // ✅ Calculate filtered percentage
  const matchedCount = todos.filter(
    (t) =>
      (!filters.status || t.status === filters.status) &&
      (!filters.priority || t.priority === filters.priority) &&
      (!filters.difficulty || t.difficulty === filters.difficulty)
  ).length;

  const percentage = todos.length
    ? Math.round((matchedCount / todos.length) * 100)
    : 0;

  const filterData = [
    { label: "مطابقة", value: percentage, color: "#4caf50" },
    { label: "غير مطابقة", value: 100 - percentage, color: "#e0e0e0" },
  ];

  // ✅ You can still keep your previous charts if you like
  return (
    <Stack direction={"column"} spacing={4} alignItems="center" mt={4}>
      {/* ✅ Filter selector section */}
      <Typography variant="h4" textAlign="center">
        إحصائيات مخصصة
      </Typography>

      <Stack direction="row" spacing={2}>
        <Select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          displayEmpty
        >
          <MenuItem value="">كل الحالات</MenuItem>
          <MenuItem value="todo">غير منجزة</MenuItem>
          <MenuItem value="completed">منجزة</MenuItem>
        </Select>

        <Select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          displayEmpty
        >
          <MenuItem value="">كل الأولويات</MenuItem>
          <MenuItem value="high">عالية</MenuItem>
          <MenuItem value="medium">متوسطة</MenuItem>
          <MenuItem value="low">منخفضة</MenuItem>
        </Select>

        <Select
          value={filters.difficulty}
          onChange={(e) =>
            setFilters({ ...filters, difficulty: e.target.value })
          }
          displayEmpty
        >
          <MenuItem value="">كل الصعوبات</MenuItem>
          <MenuItem value="easy">سهلة</MenuItem>
          <MenuItem value="medium">متوسطة</MenuItem>
          <MenuItem value="hard">صعبة</MenuItem>
        </Select>
      </Stack>

      {/* ✅ Donut chart from your component */}
      <Stack direction="column" alignItems="center">
        <Typography variant="h5" textAlign="center">
          نسبة المهام المطابقة
        </Typography>
        <Donut data={filterData} />
        <Typography variant="h6" mt={1}>
          {percentage}%
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Statistics;

// ✅ Reuse your Donut component as before
const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

function Donut({ data }) {
  return (
    <PieChart
      series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: "value" }]}
      {...settings}
    />
  );
}
