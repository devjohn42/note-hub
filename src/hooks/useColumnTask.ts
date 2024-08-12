import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';
import useTaskStorage from './useTaskStorage';
import { MAX_PER_COLUMN } from '../utils/constants';
import { columnColors, replaceOnColumn } from '../utils/helpers';

const useColumnTasks = (column: ColumnType) => {
  const [tasks, setTasks] = useTaskStorage();

  const addTask = useCallback(() => {
    console.info(`Adding new task to ${column} type`);

    setTasks((allTasks: any) => {
      const columnTasks = allTasks[column];

      if (columnTasks.length > MAX_PER_COLUMN) {
        console.info('To many tasks');

        return allTasks;
      }

      const newColumnTask: TaskModel = {
        id: uuidv4(),
        title: `New task`,
        color: columnColors[column],
        column,
      };
      return {
        ...allTasks,
        [column]: [newColumnTask, ...columnTasks],
      };
    });
  }, [column, setTasks]);

  const updateTask = useCallback(
    (id: TaskModel['id'], updateTask: Omit<Partial<TaskModel>, 'id'>) => {
      console.info(`Updating task ${id} with ${JSON.stringify(updateTask)}`);

      setTasks((allTasks) => {
        const columnTasks = allTasks[column];

        return {
          ...allTasks,
          [column]: columnTasks.map((task) =>
            task.id === id ? { ...task, ...updateTask } : task,
          ),
        };
      });
    },
    [column, setTasks],
  );

  const deleteTask = useCallback(
    (id: TaskModel['id']) => {
      console.info(`Removing task ${id}...`);

      setTasks((allTasks) => {
        const columnTasks = allTasks[column];

        return {
          ...allTasks,
          [column]: columnTasks.filter((task) => task.id !== id),
        };
      });
    },
    [column, setTasks],
  );

  const dropTask = useCallback(
    (from: ColumnType, id: TaskModel['id']) => {
      setTasks((allTasks) => {
        const fromColumnTasks = allTasks[from];
        const toColumnTasks = allTasks[column];
        const movingTask = fromColumnTasks.find((task) => task.id === id);

        console.info(`Move task ${movingTask?.id} from ${from} to ${column}`);

        if (!movingTask) return allTasks;

        const updatedTask = {
          ...movingTask,
          column,
          color: columnColors[column],
        };

        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [column]: [updatedTask, ...toColumnTasks],
        };
      });
    },
    [column, setTasks],
  );

  const replaceTasks = useCallback(
    (i: number, j: number) => {
      console.info(`Swapping task ${i} with ${j} in ${column} column`);

      setTasks((allTasks) => {
        const columnTasks = allTasks[column];

        return {
          ...allTasks,
          [column]: replaceOnColumn(columnTasks, i, j),
        };
      });
    },
    [column, setTasks],
  );

  return {
    tasks: tasks[column],
    addTask,
    updateTask,
    deleteTask,
    dropTask,
    replaceTasks,
  };
};

export default useColumnTasks;
