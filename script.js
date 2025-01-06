// Initialize Cytoscape graph
const cy = cytoscape({
  container: document.getElementById('graph-container'),
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#0074D9',
        'label': 'data(label)',
        'color': '#fff',
        'text-valign': 'center',
        'text-outline-width': 2,
        'text-outline-color': '#0074D9'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    }
  ],
  layout: {
    name: 'grid', // Initial layout
    fit: true
  }
});

// Counter for node IDs
let nodeIdCounter = 1;

// Add a node to the graph
function addNode() {
  const nodeTitle = document.getElementById('node-title').value.trim();
  const nodeContent = document.getElementById('node-content').value.trim();
  const targetNodeId = document.getElementById('target-node').value.trim();

  if (!nodeTitle) {
    alert('Node Title is required!');
    return;
  }

  // Create a new node
  const newNodeId = `node-${nodeIdCounter++}`;
  cy.add({
    group: 'nodes',
    data: { id: newNodeId, label: nodeTitle, content: nodeContent },
    position: { x: Math.random() * 500, y: Math.random() * 500 }
  });

  // Add an edge if a target node is specified
  if (targetNodeId) {
    const targetNode = cy.getElementById(targetNodeId);
    if (targetNode.length === 0) {
      alert(`Node with ID ${targetNodeId} does not exist!`);
    } else {
      cy.add({
        group: 'edges',
        data: { source: newNodeId, target: targetNodeId }
      });
    }
  }

  // Reset inputs
  document.getElementById('node-title').value = '';
  document.getElementById('node-content').value = '';
  document.getElementById('target-node').value = '';

  // Run layout
  cy.layout({ name: 'cose', animate: true }).run();
}

// Display node content on click
cy.on('tap', 'node', function (evt) {
  const node = evt.target;
  alert(`Node Title: ${node.data('label')}\nContent: ${node.data('content')}`);
});
