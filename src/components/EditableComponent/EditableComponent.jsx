import { Edit, EditOff } from '@mui/icons-material';
import EditableComponentWrapper from './EditableComponent.styles';

function EditableComponent({
  displayComponent,
  editComponent,
  width = '128px',
  height = '64px',
  isEditing,
  setEditing,
}) {
  return (
    <EditableComponentWrapper style={{ minWidth: width, minHeight: height }}>
      {isEditing ? editComponent : displayComponent}
      {isEditing ? <EditOff onClick={() => setEditing(!isEditing)} /> : <Edit onClick={() => setEditing(!isEditing)} />}
    </EditableComponentWrapper>
  );
}

export default EditableComponent;
