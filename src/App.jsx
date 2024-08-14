import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Card from './components/card';
import CustomEdge from './components/CustomEdge';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';

const initialNodes = [
  { id: '1', position: { x: 600, y: 250 }, type: 'card' },
  { id: '2', position: { x: 100, y: 50 }, data: { label: 'Made By' } },
  { id: '3', position: { x: 50, y: 120 }, data: { label: 'Sahil Tyagi' } },
  { id: '4', position: { x: 130, y: 190 }, data: { label: <a className='flex items-center justify-center' href='https://github.com/SahilTyagii'><InsertLinkRoundedIcon />GitHub</a> } }
];
const initialEdges = [
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true }
];

const edgeTypes = {
  custom: CustomEdge
};

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nextNodeId, setNextNodeId] = useState(5);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'custom', markerEndId: 'arrow' }, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNode = {
      id: nextNodeId.toString(),
      position: { x: Math.random() * 1000, y: Math.random() * 500 },
      type: 'card',
    };
    setNodes((nds) => nds.concat(newNode));
    setNextNodeId(nextNodeId + 1);
  };

  const handleDelete = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  const nodeTypes = useMemo(() => ({
    card: (props) => <Card {...props} onDelete={handleDelete} />
  }), [handleDelete]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Controls />
        <MiniMap zoomable pannable />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      
      <button 
        onClick={addNode} 
        className="fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg hover:bg-blue-600 flex items-center"
      >
        <AddCircleRoundedIcon />Add Card
      </button>
    </div>
  );
};

export default App;
