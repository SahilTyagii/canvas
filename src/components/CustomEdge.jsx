/* eslint-disable react/prop-types */
import { getBezierPath } from '@xyflow/react';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEndId
}) => {
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        d={path}
        className="react-flow__edge-path"
        markerEnd={markerEndId ? `url(#${markerEndId})` : undefined}
      />
      <defs>
        <marker
          id={markerEndId}
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="3"
          orient="auto"
          fill="#000"
        >
          <path d="M0,0 L0,6 L9,3 z" />
        </marker>
      </defs>
    </>
  );
};

export default CustomEdge;
