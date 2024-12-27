# Graph Visualization and Shortest Path App

## Overview
This web application provides an interactive platform for creating and visualizing graphs while computing the shortest paths using Dijkstra's algorithm. It is designed to be intuitive, responsive, and educational, making it ideal for exploring graph theory and understanding pathfinding algorithms.

## Features
- **Dynamic Graph Rendering:** 
  - Create and visualize nodes and edges dynamically.
  - Supports bidirectional links with customizable styles.
  
- **Shortest Path Visualization:** 
  - Computes the shortest path between a start and an end node using Dijkstra's algorithm.
  - Real-time updates for pathfinding results.

- **Interactive UI:** 
  - Allows users to set start and end nodes interactively.
  - Highlights start and end nodes, along with color-coded edges.

- **Responsive Design:** 
  - Built with React-Bootstrap for a clean and modern interface.

## Technologies Used
### Front-End
- **React.js:**
- **D3.js:**
- **React-Bootstrap:**

### Back-End
- **FastAPI:** 

## Getting Started

### Prerequisites
- Node.js
- Python 3.9+

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Adem-Hassen/Dijkstra-ALgorithm-app.git
   cd Dijkstra-ALgorithm-application
   ```

2. Install dependencies for the front-end:
   ```bash
   cd front
   npm install
   ```

3. Set up the back-end environment:
   ```bash
   cd back
   pip install -r requirements.txt
   ```

### Running the App
1. Start the FastAPI back-end server:
   ```bash
   cd back
   uvicorn main:app --reload
   ```

2. Start the React front-end:
   ```bash
   cd front 
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the app.

## How to Use
1. Open the app and define your graph by creating nodes and edges interactively.
2. Select a start node and an end node from the dropdown menus.
3. Click "Start" to visualize the shortest path and its weight.

## Project Structure
```
project-root
├── frontend/   # React front-end
│   ├── src/    # Source files
│   └── public/ # Static assets
├── backend/    # FastAPI back-end
│   ├── main.py # API endpoints and logic
│   └── models/ # Data models and utilities
└── README.md   # Project documentation
```

## Future Enhancements
- Support for additional algorithms (e.g., A* or Bellman-Ford).
- Ability to save and load graph configurations.
- Enhanced graph styling and layout options.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

