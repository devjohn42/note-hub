import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, Textarea, useColorModeValue } from '@chakra-ui/react';
import { TaskModel } from '../utils/models';
import { useEffect, useRef, ChangeEvent } from 'react';
import { useTaskDroppable } from '../hooks/useTaskDroppable';

type TaskProps = {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel['id'], updateTask: TaskModel) => void;
  onDelete: (id: TaskModel['id']) => void;
  onDropHover: (i: number, j: number) => void;
};

const Task = ({
  index,
  task,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
  onDropHover: handleDropHover,
}: TaskProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { ref, isDragging } = useTaskDroppable<HTMLDivElement>({
    task,
    index,
    handleDropHover,
  });

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    handleUpdate(task.id, { ...task, title: newTitle });
  };

  const handleDeleteTask = () => {
    handleDelete(task.id);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight)}px`; // Set height based on content
    }
  }, [task.title]);
  return (
    <Box
      ref={ref}
      as="div"
      role="group"
      position="relative"
      rounded="lg"
      border="none"
      w="auto"
      pl={3}
      pr={7}
      pt={3}
      pb={1}
      boxShadow="xl"
      cursor="grab"
      bgColor={task.color}
      opacity={isDragging ? 0.5 : 1}
    >
      <IconButton
        position="absolute"
        top={1}
        right={-1}
        zIndex={100}
        aria-label="delete-task"
        size="md"
        colorScheme="solid"
        color="gray.700"
        icon={<DeleteIcon />}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        onClick={handleDeleteTask}
      />
      <Textarea
        ref={textareaRef}
        defaultValue={task.title}
        fontWeight="semibold"
        cursor="inherit"
        border="none"
        p={2}
        resize="none"
        h="auto"
        focusBorderColor="transparent"
        color={useColorModeValue('#2D2F2F', '#e3edf7')}
        onChange={handleTitleChange}
      />
    </Box>
  );
};

export default Task;
