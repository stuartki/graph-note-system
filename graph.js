// graph.js

// Import Cytoscape for graph visualization
import cytoscape from 'cytoscape';

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

export default Graph;
