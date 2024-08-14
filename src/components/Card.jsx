import { useCallback, useEffect, useRef, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useDragDisabled } from "../hooks/hooks";

const handleStyle = { left: 10 };

const Card = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState("Card content");
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef(null);

  const dragStyle = useDragDisabled(isEditable);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const previewText = value.substring(0, 40);
  const fullText = value;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
    }
  }, [value, isExpanded]);

  return (
    <div style={dragStyle} className="rounded-lg border-gray-400 border-2 m-2 p-2 bg-pink-100 flex flex-col justify-center hover:shadow-xl shadow-lg">
      <Handle type="target" position={Position.Top} style={handleStyle} />
      <textarea
        ref={textareaRef}
        style={dragStyle}
        className="outline-none bg-inherit text-2xl font-semibold text-gray-700 text-center resize-none"
        value={isExpanded ? fullText : `${previewText}...`}
        onChange={(e) => setValue(e.target.value)}
        onDoubleClick={() => {
          setIsEditable(true);
          setIsExpanded(true);
        }}
        onBlur={() => {
          setIsEditable(false);
        }}
        readOnly={!isEditable}
      />
      <Handle type="source" position={Position.Bottom} id="a" />
      <button
        className="mt-2 bg-inherit p-2 rounded-md border-2 border-green-500 w-28 m-auto hover:bg-green-500 text-gray-400 hover:text-white font-semibold"
        onClick={toggleExpand}
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </div>
  );
};

export default Card;
