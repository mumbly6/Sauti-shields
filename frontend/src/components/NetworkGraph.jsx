import { useEffect, useRef } from 'react';
import { Network } from 'vis-network';

// Function to transform threat data into graph data
const generateGraphFromThreats = (threats) => {
    if (!threats || threats.length === 0) {
        return { nodes: [], edges: [] };
    }

    const nodes = [];
    const edges = [];
    const nodeIds = new Map();

    // Create a central node
    nodes.push({ id: 'center', label: 'Threats', color: '#ef4444', size: 30 });
    nodeIds.set('center', 'center');

    threats.forEach(threat => {
        // Add node for the threat itself
        if (!nodeIds.has(threat.id)) {
            nodes.push({ id: threat.id, label: threat.title, color: '#f59e0b' });
            nodeIds.set(threat.id, threat.id);
        }

        // Add node for the category
        if (!nodeIds.has(threat.category)) {
            const categoryId = `cat_${threat.category}`;
            nodes.push({ id: categoryId, label: threat.category, color: '#3b82f6' });
            nodeIds.set(threat.category, categoryId);
        }

        // Create edges
        edges.push({ from: nodeIds.get('center'), to: nodeIds.get(threat.category) });
        edges.push({ from: nodeIds.get(threat.category), to: threat.id });
    });

    return { nodes, edges };
};

export default function NetworkGraph({ data }) {
    const containerRef = useRef(null);
    const networkRef = useRef(null);

    useEffect(() => {
        if (!data || !containerRef.current) return;

        const graphData = generateGraphFromThreats(data);

        const options = {
            physics: { enabled: true, stabilization: { iterations: 200 } },
            interaction: { navigationButtons: true, keyboard: true },
            nodes: {
                shape: 'dot',
                font: { size: 14, color: '#333' },
                borderWidth: 2,
            },
            edges: {
                width: 2,
                color: { color: '#848484', highlight: '#3b82f6' },
            },
        };

        if (networkRef.current) {
            networkRef.current.destroy();
        }
        networkRef.current = new Network(containerRef.current, graphData, options);

    }, [data]); // Re-render when data prop changes

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">🕸️ Threat Connections</h3>
            <div 
                ref={containerRef} 
                className="w-full bg-gray-50 rounded-lg border"
                style={{ height: '500px' }} // Forced height via inline style
            />
        </div>
    );
}