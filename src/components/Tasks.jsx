import { Stack } from '@mui/material';
import React, { useState, useContext, useMemo } from 'react';
import Todo from './ToDo';
import Filter from './Filter';
import { TodoContext } from '../context/todoContext';
import { FilterContext } from '../context/FilterContext';
import { getFilterFromLocalStorage } from '../utils/localStorage';

const initialFilters = {
  status: 'all',
  priority: 'all',
  difficulty: 'all',
};

function Tasks() {
  // ✅ Load filters (from localStorage or defaults)
  const currentFilters = getFilterFromLocalStorage() || initialFilters;
  const [filters, setFilters] = useState(currentFilters);

  // ✅ Access todos
  const { todos } = useContext(TodoContext);

  // ✅ Apply filtering logic
  const filteredTodos = useMemo(() => {
    return todos.filter((task) => {
      const matchesStatus =
        filters.status === 'all' || task.status === filters.status;
      const matchesPriority =
        filters.priority === 'all' || task.priority === filters.priority;
      const matchesDifficulty =
        filters.difficulty === 'all' || task.difficulty === filters.difficulty;

      return matchesStatus && matchesPriority && matchesDifficulty;
    });
  }, [todos, filters]);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      <Stack direction="column" gap="1rem">
        {/* ✅ Filter UI */}
        <Filter />

        {/* ✅ Render only filtered tasks */}
        <Stack>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((task) => (
              <Todo key={task.id} task={task} />
            ))
          ) : (
            <p style={{ textAlign: 'center', opacity: 0.6 }}>
              لا توجد مهام مطابقة للفلتر الحالي
            </p>
          )}
        </Stack>
      </Stack>
    </FilterContext.Provider>
  );
}

export default Tasks;
