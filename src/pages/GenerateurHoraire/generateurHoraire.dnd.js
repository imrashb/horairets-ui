export const CONGE_DND = 'conge';
export const DND_AVAILABLE = 'DND_AVAILABLE';
export const DND_DISABLED = 'DND_DISABLED';

export const getDragAndDropColor = (isHovering, canDrop) => {
  if (isHovering) {
    if (canDrop) {
      return DND_AVAILABLE;
    }
    return DND_DISABLED;
  }
  return null;
};
