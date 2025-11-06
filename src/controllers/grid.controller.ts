import { MatrixModel, NodeModel } from '../models';
import { GridView } from '../views';
import {
  AlgorithmFactory,
  AlgorithmType,
} from '../lib/algorithm/AlgorithmFactory';

export class GridController {
  private model: MatrixModel;
  private view: GridView;
  private startNode: NodeModel | null = null;
  private endNode: NodeModel | null = null;
  private isMousePressed: boolean = false;
  private isVisualization: boolean = false;

  constructor(view: GridView) {
    this.view = view;
    this.model = new MatrixModel(view.rowCount, view.colCount);
    this.view.initialize();
    this.setupHandlers();
    this.initializeStartEndNodes();
  }

  private initializeStartEndNodes(): void {
    const start = { row: 15, col: 30 };
    const end = { row: 15, col: 50 };

    this.startNode = this.model.getNode(start.row, start.col);
    this.startNode.setStart(true);

    this.endNode = this.model.getNode(end.row, end.col);
    this.endNode.setEnd(true);

    this.view.updateNodeClass(
      this.view.getNodeElement(start.row, start.col),
      'start',
    );
    this.view.updateNodeClass(
      this.view.getNodeElement(end.row, end.col),
      'end',
    );
  }

  private setupHandlers(): void {
    const boardElement = this.view.getBoardElement();

    boardElement.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    boardElement.addEventListener('mouseenter', (e) =>
      this.handleMouseEnter(e),
    );
    boardElement.addEventListener('mouseup', () => this.handleMouseUp());
  }

  private handleMouseDown(e: Event): void {
    if (this.isVisualization) return;

    const target = e.target as HTMLElement;
    if (target.tagName === 'TD') {
      const [row, col] = target.id.split('-').map(Number);
      const node = this.model.getNode(row, col);

      if (!node.getIsStart() && !node.getIsEnd()) {
        this.isMousePressed = true;
        this.toggleWall(node, target);
      }
    }
  }

  private handleMouseEnter(e: Event): void {
    if (!this.isMousePressed || this.isVisualization) return;

    const target = e.target as HTMLElement;
    if (target.tagName === 'TD') {
      const [row, col] = target.id.split('-').map(Number);
      const node = this.model.getNode(row, col);

      if (!node.getIsStart() && !node.getIsEnd()) {
        this.toggleWall(node, target);
      }
    }
  }

  private handleMouseUp(): void {
    this.isMousePressed = false;
  }

  private toggleWall(node: NodeModel, element: HTMLElement): void {
    const isWall = !node.getIsWall();
    node.setWall(isWall);
    this.view.updateNodeClass(element, isWall ? 'wall' : 'unvisited');
  }

  public async visualize(algorithmType: AlgorithmType): Promise<void> {
    if (this.isVisualization || !this.startNode || !this.endNode) {
      return;
    }

    this.clearBoard();
    this.isVisualization = true;

    const algorithm = AlgorithmFactory.create(algorithmType);
    const result = algorithm.findPath(this.model, this.startNode, this.endNode);

    await this.animateVisitedNodes(result.visitedNodesInOrder);

    if (result.shortestPath.length > 0) {
      await this.animateShortestPath(result.shortestPath);
    }

    this.isVisualization = false;
  }

  private async animateVisitedNodes(visitedNodes: NodeModel[]): Promise<void> {
    for (let i = 0; i < visitedNodes.length; i++) {
      if (this.isVisualization === false) return;
      await this.delay(10);
      const node = visitedNodes[i];
      const element = this.view.getNodeElement(node.getRow(), node.getCol());
      if (!node.getIsStart() && !node.getIsEnd()) {
        this.view.updateNodeClass(element, 'visited');
      } else {
        this.view.removeNodeClass(element, 'unvisited');
        this.view.addNodeClass(element, 'visited');
      }
    }
  }

  private async animateShortestPath(path: NodeModel[]): Promise<void> {
    for (let i = 0; i < path.length; i++) {
      if (this.isVisualization === false) return;
      await this.delay(50);
      const node = path[i];
      const element = this.view.getNodeElement(node.getRow(), node.getCol());
      if (!node.getIsStart() && !node.getIsEnd()) {
        this.view.updateNodeClass(element, 'shortest-path');
      } else {
        this.view.removeNodeClass(element, 'visited');
        this.view.addNodeClass(element, 'shortest-path');
      }
    }
  }

  public clearWalls(): void {
    for (let row = 0; row < this.model.getNumRows(); row++) {
      for (let col = 0; col < this.model.getNumCols(); col++) {
        const node = this.model.getNode(row, col);
        const element = this.view.getNodeElement(row, col);

        if (node.getIsWall()) {
          node.setWall(false);
          this.view.updateNodeClass(element, 'unvisited');
        }
      }
    }
  }

  public clearPath(): void {
    for (let row = 0; row < this.model.getNumRows(); row++) {
      for (let col = 0; col < this.model.getNumCols(); col++) {
        const node = this.model.getNode(row, col);
        const element = this.view.getNodeElement(row, col);

        node.setDistance(Infinity);
        node.setHeuristic(0);
        node.setPrevious(null);

        if (!node.getIsWall()) {
          this.view.removeNodeClass(element, 'visited');
          this.view.removeNodeClass(element, 'shortest-path');
          this.view.addNodeClass(element, 'unvisited');
        }
      }
    }
  }

  public clearBoard(): void {
    this.clearPath();
  }

  public setIsVisualization(isRunning: boolean): void {
    this.isVisualization = isRunning;
  }

  public getIsVisualization(): boolean {
    return this.isVisualization;
  }

  public getModel(): MatrixModel {
    return this.model;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
