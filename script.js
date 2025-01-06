// script.js

// Initialize the Graph instance
const containerId = 'graph-container';
const graph = new Graph(containerId);

// Add event listeners to buttons for interactions
document.getElementById('addNodeButton').addEventListener('click', () => {
    const id = document.getElementById('nodeId').value;
    const label = document.getElementById('nodeLabel').value;

    if (id && label) {
        graph.addNode(id, label);
    } else {
        alert('Please enter both Node ID and Node Label.');
    }
});

document.getElementById('addEdgeButton').addEventListener('click', () => {
    const source = document.getElementById('sourceNodeId').value;
    const target = document.getElementById('targetNodeId').value;

    if (source && target) {
        graph.addEdge(source, target);
    } else {
        alert('Please enter both Source Node ID and Target Node ID.');
    }
});

document.getElementById('searchNodeButton').addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value;

    if (query) {
        const results = graph.searchNode(query);
        if (results.length > 0) {
            alert(`Found nodes: ${results.map(node => node.label).join(', ')}`);
        } else {
            alert('No nodes found matching the query.');
        }
    } else {
        alert('Please enter a search query.');
    }
});

document.getElementById('editNodeButton').addEventListener('click', () => {
    const id = document.getElementById('editNodeId').value;
    const newLabel = document.getElementById('editNodeLabel').value;

    if (id && newLabel) {
        graph.editNode(id, newLabel);
    } else {
        alert('Please enter both Node ID and New Label.');
    }
});

document.getElementById('visualizeButton').addEventListener('click', () => {
    graph.visualize();
});
