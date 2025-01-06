// script.js
import Graph from './graph.js';

// Initialize graph instance
const containerId = 'graph-container';
const graph = new Graph(containerId);

// Add event listeners for controls
const addNodeButton = document.getElementById('addNodeButton');
const addEdgeButton = document.getElementById('addEdgeButton');
const searchNodeButton = document.getElementById('searchNodeButton');
const editNodeButton = document.getElementById('editNodeButton');
const visualizeButton = document.getElementById('visualizeButton');

addNodeButton.addEventListener('click', () => {
    const id = document.getElementById('nodeId').value;
    const label = document.getElementById('nodeLabel').value;
    if (id && label) {
        graph.addNode(id, label);
    } else {
        alert('Please provide both Node ID and Label.');
    }
});

addEdgeButton.addEventListener('click', () => {
    const source = document.getElementById('sourceNodeId').value;
    const target = document.getElementById('targetNodeId').value;
    if (source && target) {
        graph.addEdge(source, target);
    } else {
        alert('Please provide both Source and Target Node IDs.');
    }
});

searchNodeButton.addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value;
    const results = graph.searchNode(query);
    if (results.length > 0) {
        alert(`Found nodes: ${results.map(node => node.label).join(', ')}`);
    } else {
        alert('No nodes found matching your query.');
    }
});

editNodeButton.addEventListener('click', () => {
    const id = document.getElementById('editNodeId').value;
    const newLabel = document.getElementById('editNodeLabel').value;
    if (id && newLabel) {
        graph.editNode(id, newLabel);
    } else {
        alert('Please provide both Node ID and New Label.');
    }
});

visualizeButton.addEventListener('click', () => {
    graph.visualize();
});
