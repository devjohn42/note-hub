import { useLocalStorage } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';

const useTaskStorage = () => {
  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>('tasks', {
    Todo: [
      {
        id: uuidv4(),
        column: ColumnType.TO_DO,
        title: 'Task 1',
        color: '#868686',
      },
    ],
    'In Progress': [
      {
        id: uuidv4(),
        column: ColumnType.IN_PROGRESS,
        title: 'Task 2',
        color: '#84CEE4',
      },
    ],
    Completed: [
      {
        id: uuidv4(),
        column: ColumnType.COMPLETED,
        title: 'Task 4',
        color: '#82C492',
      },
    ],
    Blocked: [
      {
        id: uuidv4(),
        column: ColumnType.BLOCKED,
        title: 'Task 3',
        color: '#C48289',
      },
    ],
  });
};

export default useTaskStorage;
