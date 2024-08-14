export const useDragDisabled = (isEditable) => {
    return {
        pointerEvents: isEditable ? 'none' : 'auto',
        cursor: isEditable ? 'default' : 'grab',
    };
};
