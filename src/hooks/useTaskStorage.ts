import { useLocalStorage } from 'usehooks-ts';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';

const useTaskStorage = () => {
  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>('tasks', {
    Todo: [],
    'In Progress': [],
    Completed: [],
    Paused: [],
    Blocked: [],
  });
};

export default useTaskStorage;
