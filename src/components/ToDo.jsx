import {
  Delete,
  Edit,
  TaskAlt,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import {
  Card,
  IconButton,
  Stack,
  Typography,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/todoContext';
import AddTask from './AddTask';
import { addTasksToLocalStorage } from '../utils/localStorage';

function Todo({ task }) {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState(task);
  const { todos, setTodos } = useContext(TodoContext);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkHandler = () => {
    const newTask = {
      ...task,
      status: task.status === 'completed' ? 'todo' : 'completed',
    };
    const newTasks = todos.map((e) => (e.id === task.id ? newTask : e));
    addTasksToLocalStorage(newTasks);
    setTodos(newTasks);
  };

  const deleteHandler = () => {
    const newTasks = todos.filter((e) => e.id !== task.id);
    addTasksToLocalStorage(newTasks);
    setTodos(newTasks);
  };

  // ---------- palette tuned to match card (#4DA8DA) ----------
  const palette = {
    card: {
      default: '#E5D0AC', 
      done: '#a5d6a7', // light green for completed
      textOnCard: '#26577C',
    },
    status: {
      completedBg: '#2e7d32',
      todoBg: '#ffb74d',
      textOnStatus: '#fff',
    },
    priority: {
      highBg: '#d84315', // deep orange/red
      mediumBg: '#ffb300', // amber
      lowBg: '#0288d1', // blue (matches card)
      textOnPriority: '#fff',
    },
    difficulty: {
      easyBg: '#2e7d32', // green
      mediumBg: '#f9a825', // yellow
      hardBg: '#c62828', // red
      textOnDifficulty: '#fff',
    },
  };

  const getStatusChip = (status) => {
    if (status === 'completed')
      return {
        label: 'منجزة',
        sx: {
          bgcolor: palette.status.completedBg,
          color: palette.status.textOnStatus,
          fontWeight: 600,
          borderRadius: '12px',
        },
      };
    return {
      label: 'غير منجزة',
      sx: {
        bgcolor: palette.status.todoBg,
        color: '#222',
        fontWeight: 600,
        borderRadius: '12px',
      },
    };
  };

  const getPriorityChip = (priority) => {
    switch (priority) {
      case 'high':
        return {
          label: 'أولوية: عالية',
          sx: {
            bgcolor: palette.priority.highBg,
            color: palette.priority.textOnPriority,
            fontWeight: 600,
            borderRadius: '12px',
          },
        };
      case 'medium':
        return {
          label: 'أولوية: متوسطة',
          sx: {
            bgcolor: palette.priority.mediumBg,
            color: '#222',
            fontWeight: 600,
            borderRadius: '12px',
          },
        };
      case 'low':
      default:
        return {
          label: 'أولوية: منخفضة',
          sx: {
            bgcolor: palette.priority.lowBg,
            color: palette.priority.textOnPriority,
            fontWeight: 600,
            borderRadius: '12px',
          },
        };
    }
  };

  const getDifficultyChip = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return {
          label: 'صعوبة: سهلة',
          sx: {
            bgcolor: palette.difficulty.easyBg,
            color: palette.difficulty.textOnDifficulty,
            fontWeight: 600,
            borderRadius: '12px',
          },
        };
      case 'medium':
        return {
          label: 'صعوبة: متوسطة',
          sx: {
            bgcolor: palette.difficulty.mediumBg,
            color: '#222',
            fontWeight: 600,
            borderRadius: '12px',
          },
        };
      case 'hard':
      default:
        return {
          label: 'صعوبة: صعبة',
          sx: {
            bgcolor: palette.difficulty.hardBg,
            color: palette.difficulty.textOnDifficulty,
            fontWeight: 600,
            borderRadius: '12px',
          },
        };
    }
  };

  const statusChip = getStatusChip(task.status);
  const priorityChip = getPriorityChip(task.priority);
  const difficultyChip = getDifficultyChip(task.difficulty);

  return (
    <Card
      sx={{
        width: '96%',
        borderRadius: '1rem',
        mb: 2,
        mx: 'auto',
        px: 2,
        py: 1.25,
        bgcolor: task.status === 'completed' ? palette.card.done : palette.card.default,
        color: palette.card.textOnCard,
        fontWeight: 700,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      elevation={2}
    >
      {/* Left: name and chips */}
      <Stack direction="column" spacing={1} sx={{ ml: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '28rem',
          }}
        >
          {task.name}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 0.25 }}>
          <Chip label={statusChip.label} size="small" sx={statusChip.sx} />
          <Chip label={priorityChip.label} size="small" sx={priorityChip.sx} />
          <Chip label={difficultyChip.label} size="small" sx={difficultyChip.sx} />
        </Stack>
      </Stack>

      {/* Right: action buttons */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{
          bgcolor: 'white',
          border: '2px solid #FFD66B',
          borderRadius: '1.5rem',
          p: 0.5,
        }}
      >
        <IconButton
          onClick={checkHandler}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.08)',
            bgcolor: task.status === 'completed' ? '#e8f5e9' : '#ffffff',
          }}
          aria-label={task.status === 'completed' ? 'Unmark complete' : 'Mark complete'}
        >
          {task.status === 'completed' ? (
            <TaskAlt sx={{ color: palette.status.completedBg }} />
          ) : (
            <RadioButtonUnchecked sx={{ color: palette.status.todoBg }} />
          )}
        </IconButton>

        <IconButton
          onClick={handleClickOpen}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid #4DA8DA',
            bgcolor: '#fff',
          }}
          color="primary"
        >
          <Edit />
        </IconButton>

        <IconButton
          onClick={deleteHandler}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid #ED3500',
            bgcolor: '#fff',
          }}
          color="error"
        >
          <Delete />
        </IconButton>
      </Stack>

      {/* Edit dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <AddTask task={task} setTask={setTodo} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button
            onClick={() => {
              const newTask = { ...todo };
              const newTasks = todos.map((e) => (e.id === task.id ? newTask : e));
              addTasksToLocalStorage(newTasks);
              setTodos(newTasks);
              handleClose();
            }}
            autoFocus
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Todo;
