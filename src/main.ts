import './style.css';
import { GridView, NavView } from './views';
import { NavController } from './controllers/nav.controller';
import { GridController } from './controllers/grid.controller';
import { formatData } from './utils/formatData';
import { MatrixModel, NodeModel } from './models';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <nav id="nav-container"></nav>
  <div id="grid-container"></div>
`;

document.addEventListener('DOMContentLoaded', () => {
  const navView = new NavView('nav-container');
  const navController = new NavController(navView);

  const gridView = new GridView('grid-container');
  const gridController = new GridController(gridView);

  const isVisualizing = () => gridController.getIsVisualization();

  const createNodeModel = (node: any) => {
    const n = new NodeModel(node.row, node.col);
    n.setStart(node.isStart);
    n.setWall(node.isWall);
    n.setEnd(node.isEnd);
    n.setVisited(node.isVisited);
    n.setPath(node.isPath);
    n.setDistance(node.distance);
    n.setHeuristic(node.heuristic);
    return n;
  };

  navController.handleVisualize(
    (algorithm) => gridController.visualize(algorithm),
    () => gridController.setIsVisualization(false),
  );

  navController.handleClearWalls(() => {
    if (!isVisualizing()) gridController.clearWalls();
  });
  navController.handleClearPath(() => {
    if (!isVisualizing()) gridController.clearPath();
  });
  navController.handleClearBoard(() => {
    if (!isVisualizing()) gridController.clearBoard();
  });

  navController.handleSaveFile(() => {
    if (isVisualizing()) return '';
    return formatData({
      ...gridController.getModel(),
      startNode: gridController.getStartNode(),
      endNode: gridController.getEndNode(),
    });
  });

  navController.handleOpenFile((content: string) => {
    if (isVisualizing()) return;

    const data = formatData(content, false);

    const model = new MatrixModel(data.numRows, data.numCols);
    model.setNodes(data.nodes.map((row: any) => row.map(createNodeModel)));

    const startNode = createNodeModel(data.startNode);
    const endNode = createNodeModel(data.endNode);

    gridController.resetGrid(
      model,
      startNode,
      endNode,
      data.numRows,
      data.numCols,
    );
  });
});
