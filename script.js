// script.js

// graph.js

// Include Cytoscape via a global script tag
// This assumes Cytoscape is loaded from the CDN in index.html
class Graph {
    constructor(containerId) {
        this.nodes = {}; // Store nodes by their ID
        this.edges = []; // Store edges as {source, target}
        this.cy = cytoscape({
            container: document.getElementById(containerId), // Container for visualization
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#0074D9',
                        'label': 'data(label)',
                        'color': '#fff',
                        'text-valign': 'center',
                        'text-outline-width': 2,
                        'text-outline-color': '#0074D9',
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                    }
                }
            ],
            layout: {
                name: 'grid', // Initial layout
                fit: true,
            }
        });
    }

    addNode(id, label) {
        if (this.nodes[id]) {
            alert(`Node with ID ${id} already exists.`);
            return;
        }

        this.nodes[id] = { id, label };
        this.cy.add({
            group: 'nodes',
            data: { id, label }
        });

        // Clear input fields
        document.getElementById('nodeId').value = '';
        document.getElementById('nodeLabel').value = '';
    }

    addEdge(sourceId, targetId) {
        if (!this.nodes[sourceId] || !this.nodes[targetId]) {
            alert('Both source and target nodes must exist before adding an edge.');
            return;
        }

        this.edges.push({ source: sourceId, target: targetId });
        this.cy.add({
            group: 'edges',
            data: { source: sourceId, target: targetId }
        });
    }

    searchNode(query) {
        return Object.values(this.nodes).filter(node => node.label.toLowerCase().includes(query.toLowerCase()));
    }

    editNode(id, newLabel) {
        if (!this.nodes[id]) {
            alert(`Node with ID ${id} does not exist.`);
            return;
        }

        this.nodes[id].label = newLabel;
        const cyNode = this.cy.getElementById(id);
        if (cyNode) {
            cyNode.data('label', newLabel);
        }
    }

    visualize() {
        this.cy.layout({
            name: 'cose',
            animate: true,
        }).run();
    }

    printGraph() {
        console.log("Nodes:", this.nodes);
        console.log("Edges:", this.edges);
    }
}

// Expose the Graph class globally for use in other scripts
window.Graph = Graph;

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
