import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColumnType } from '../utils/enums';
import Task from './Task';
import useColumnTasks from '../hooks/useColumnTask';
import useColumnDrop from '../hooks/useColumnDrop';

const ColumnsColorScheme: Record<ColumnType, string> = {
  Todo: '#868686',
  'In Progress': '#84CEE4',
  Completed: '#82C492',
  Paused: '#868FE4',
  Blocked: '#C48289',
};

const Column = ({ column }: { column: ColumnType }) => {
  const { tasks, addTask, updateTask, deleteTask, dropTask, replaceTasks } =
    useColumnTasks(column);

  const { dropRef, isOver } = useColumnDrop(column, dropTask);

  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          bgColor={ColumnsColorScheme[column] + '20'}
          color={ColumnsColorScheme[column]}
        >
          {column}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={'gray.400'}
        bgColor={useColorModeValue('gray.50', 'gray.700')}
        boxShadow={'sm'}
        _hover={{ bgColor: useColorModeValue('gray.100', 'gray.600') }}
        py={2}
        variant="solid"
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon color={'gray.400'} />}
        onClick={addTask}
      />
      <Stack
        ref={dropRef}
        direction="column"
        h={{ base: 300, md: 600, xl: 700 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            index={index}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onDropHover={replaceTasks}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Column;
