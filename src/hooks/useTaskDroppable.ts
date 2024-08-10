import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { ItemType } from '../utils/enums';
import { DragItem, TaskModel } from '../utils/models';
import { useRef } from 'react';

export const useTaskDroppable = <T extends HTMLElement>({
  task,
  index,
  handleDropHover,
}: {
  task: TaskModel;
  index: number;
  handleDropHover: (i: number, j: number) => void;
}) => {
  const ref = useRef<T>(null);

  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: ItemType.Task,
    item: { from: task.column, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [_, drop] = useDrop<DragItem, void, unknown>({
    accept: ItemType.Task,
    hover: (item, monitor) => {
      if (!ref.current) return;

      const draggedItemIndex = item.index;
      const hoveredItemIndex = index;

      if (draggedItemIndex === hoveredItemIndex) return;

      const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex;
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;

      //getting mouse coordinates
      const { y: mouseY } = monitor.getClientOffset() as XYCoord;

      //get hover item rectangle
      const hoveredBoundingRect = ref.current.getBoundingClientRect();

      //get hover item middle height position
      const hoveredMiddleHeight =
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;

      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;
      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;
      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoveredMiddleHeight;

      //only perform the move when the mouse has crossed half of the items height
      //when dragging downwards, only move when the cursor is below 50%
      //when dragging upwards, only move when the cursor is above 50%

      if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) return;
      if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) return;

      //time to actually perform the action
      handleDropHover(draggedItemIndex, hoveredItemIndex);

      //note: we´re mutating the monitor item here!
      //generally it´s better to avoid mutations,
      //but it´s good here for the sake of performance
      //to avoid expensive index searches.
      item.index = hoveredItemIndex;
    },
  });

  drag(drop(ref));

  return {
    ref,
    isDragging,
  };
};
