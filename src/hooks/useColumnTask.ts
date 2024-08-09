import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';
import useTaskStorage from './useTaskStorage';
import { MAX_PER_COLUMN } from '../utils/constants';
import { pickRandomColor } from '../utils/helpers';

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
        title: `New ${column} task`,
        color: pickRandomColor(),
        column,
      };
      return {
        ...allTasks,
        [column]: [newColumnTask, ...columnTasks],
      };
    });
  }, [column, setTasks]);

  return {
    tasks: tasks[column],
    addTask,
  };
};

export default useColumnTasks;
