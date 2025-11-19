import './style.css';
import { GridView, NavView } from './views';
import { NavController } from './controllers/nav.controller';
import { GridController } from './controllers/grid.controller';
import { PauseableAsync } from './utils/pause';
import { AlgorithmEnum, IconEnum, SpeedEnum } from './app.enum';
import { MatrixModel, NodeModel } from './models';
import { formatData } from './utils/formatData';

import app from './app.html?raw';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = app;

document.addEventListener('DOMContentLoaded', () => {
  const navView = new NavView();
  const navController = new NavController(navView);

  const gridView = new GridView();
  const gridController = new GridController(gridView);

  const visualize = async (task: PauseableAsync, algorithm: AlgorithmEnum) => {
    document.dispatchEvent(new Event('visualization-start'));
    await gridController.visualize(algorithm, task.pausePoint.bind(task));
  };

  let task: PauseableAsync = new PauseableAsync(() =>
    visualize(task, navView.getSelectAlgorithm().value as AlgorithmEnum),
  );

  const innerHTMLRun = navView.getBtnRun().innerHTML;
  const innerHTMLPause = navView.getBtnPause().innerHTML;
  const innerHTMLCountVisitedNodes = gridView.getCountVisitedNodes().innerHTML;
  const innerHTMLCountPathLength = gridView.getCountPathNodes().innerHTML;
  const innerHTMLTotalPathCost = gridView.getTotalPathCost().innerHTML;
  const innerHTMLExecutionTime = gridView.getExecutionTime().innerHTML;

  const buttonRun = navView.getBtnRun();
  const buttonPause = navView.getBtnPause();
  const buttonResetGrid = navView.getBtnResetGrid();
  const buttonClearPath = navView.getBtnClearPath();
  const buttonClearWalls = navView.getBtnClearWalls();
  const buttonGenerateMaze = navView.getBtnGenerateMaze();
  const board = gridView.getBoardElement();
  const selcetAlgorithm = navView.getSelectAlgorithm();
  const weight = gridView.getWeightElement();
  const modeInputs = gridView.getModeInputs();
  const countVisitedNodes = gridView.getCountVisitedNodes();
  const countPathLength = gridView.getCountPathNodes();
  const totalPathCost = gridView.getTotalPathCost();
  const executionTime = gridView.getExecutionTime();

  gridController.handleDrawModeChange();
  gridController.handleDrawBoard();
  gridController.handleCounts();
  navController.hanldeSelectWeightChange();
  navController.handleSelectAlgorithmChange();
  navController.handleSelectSpeedChange();
  navController.handleButtonRunClick(() => {
    task.start();
  });
  navController.handleButtonPauseClick(() => {
    if (!task.getIsPaused()) {
      task.pause();
      selcetAlgorithm.disabled = false;
      buttonResetGrid.disabled = false;
      buttonPause.querySelector('svg path')!.setAttribute('d', IconEnum.PLAY);
    } else {
      task.resume();
      selcetAlgorithm.disabled = true;
      buttonResetGrid.disabled = true;
      buttonPause.querySelector('svg path')!.setAttribute('d', IconEnum.PAUSE);
    }
  });
  navController.handleButtonResetGridClick(() => {
    document.dispatchEvent(new Event('visualization-end'));
    gridController.handleResetGrid();
  });
  navController.handleButtonClearPathClick(() => {
    gridController.handleClearPath();
  });

  navController.handleButtonClearWallsClick(() => {
    gridController.handleClearWalls();
  });

  navController.handleButtonGenerateMazeClick(() => {
    gridController.handleClearPath();
    gridController.handleClearWalls();
    gridController.generateMaze();
  });

  document.addEventListener('weight-change', (e: any) => {
    const weightValue = e.detail.weight as number;
    weight.dataset.weight = weightValue.toString();
  });

  document.addEventListener('algorithm-change', (e: any) => {
    const algorithm = e.detail.algorithm as AlgorithmEnum;
    task = new PauseableAsync(() => visualize(task, algorithm));
    const weightLabel = document.querySelector(
      'label[for="mode-weight"]',
    )! as HTMLElement;

    if (
      algorithm == AlgorithmEnum.DIJKSTRA ||
      algorithm == AlgorithmEnum.ASTAR
    ) {
      weightLabel.style.display = 'block';
    } else {
      weightLabel.style.display = 'none';
      const startMode = modeInputs.item(0) as HTMLInputElement;
      startMode.checked = true;
      startMode.dispatchEvent(new Event('change'));
    }

    document.dispatchEvent(new Event('visualization-end'));
  });

  document.addEventListener('speed-change', (e: any) => {
    const speed = e.detail.speed as SpeedEnum;
    gridController.setSpeed(speed);
  });

  document.addEventListener('board-update', (e: any) => {
    const startNode = e.detail.startNode as NodeModel;
    const endNode = e.detail.endNode as NodeModel;
    if (startNode && endNode) {
      navView.getBtnRun().disabled = false;
      navView.getBtnGenerateMaze().disabled = false;
    } else {
      navView.getBtnRun().disabled = true;
      navView.getBtnGenerateMaze().disabled = true;
    }
  });

  document.addEventListener('visualization-start', () => {
    board.style.pointerEvents = 'none';
    buttonRun.textContent = 'Running...';
    buttonRun.disabled = true;
    buttonPause.disabled = false;
    buttonResetGrid.disabled = true;
    buttonClearPath.disabled = true;
    buttonClearWalls.disabled = true;
    buttonGenerateMaze.disabled = true;
    selcetAlgorithm.disabled = true;
    countVisitedNodes.innerHTML = innerHTMLCountVisitedNodes;
    countPathLength.innerHTML = innerHTMLCountPathLength;
    totalPathCost.innerHTML = innerHTMLTotalPathCost;
    executionTime.innerHTML = innerHTMLExecutionTime;
    if (
      selcetAlgorithm.value === AlgorithmEnum.DFS ||
      selcetAlgorithm.value === AlgorithmEnum.BFS
    ) {
      gridController.handleClearWeights();
    }
    gridController.handleClearPath();
  });

  document.addEventListener('visualization-end', () => {
    document.dispatchEvent(
      new CustomEvent('board-update', {
        detail: {
          startNode: gridController.getStartNode(),
          endNode: gridController.getEndNode(),
        },
      }),
    );
    buttonPause.disabled = true;
    buttonRun.innerHTML = innerHTMLRun;
    buttonPause.innerHTML = innerHTMLPause;
    board.style.pointerEvents = 'auto';
    selcetAlgorithm.disabled = false;
    buttonResetGrid.disabled = false;
    buttonClearPath.disabled = false;
    buttonClearWalls.disabled = false;
    buttonGenerateMaze.disabled = false;
  });

  const createNodeModel = (node: any) => {
    const n = new NodeModel(node.row, node.col);
    n.setStart(node.isStart);
    n.setWall(node.isWall);
    n.setWeight(node.weight);
    n.setEnd(node.isEnd);
    n.setVisited(node.isVisited);
    n.setPath(node.isPath);
    n.setDistance(node.distance ?? Infinity);
    n.setHeuristic(node.heuristic);
    return n;
  };

  navController.handleButtonExportFile(() => {
    return formatData({
      ...gridController.getModel(),
      startNode: gridController.getStartNode(),
      endNode: gridController.getEndNode(),
    });
  });

  navController.handleButtonImportFile((content: string) => {
    const data = formatData(content, false);
    const model = new MatrixModel(data.numRows, data.numCols);
    model.setNodes(data.nodes.map((row: any) => row.map(createNodeModel)));
    const startNode = model.getNode(data.startNode.row, data.startNode.col);
    const endNode = model.getNode(data.endNode.row, data.endNode.col);
    gridController.handleReRenderBoard(model, startNode, endNode);
  });
});
