import { MatrixModel, NodeModel } from '../models';
import { GridView, NodeEnum } from '../views';
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
  private readonly defaultRows: number = 35;
  private readonly defaultCols: number = 80;
  private readonly limitRows: number = 100;
  private readonly limitCols: number = 100;

  constructor(view: GridView) {
    this.view = view;
    this.model = new MatrixModel(this.defaultRows, this.defaultCols);
    this.initializeStartEndNodes({ row: 15, col: 30 }, { row: 15, col: 50 });
    this.view.initialize(this.model);
    this.setupHandlers();
  }

  public resetGrid(
    model: MatrixModel,
    startNode: NodeModel,
    endNode: NodeModel,
    rows: number,
    cols: number,
  ): void {
    if (rows > this.limitRows || cols > this.limitCols) {
      throw new Error(
        `Grid size exceeds limit of ${this.limitRows} rows and ${this.limitCols} columns.`,
      );
    }
    this.model = model;
    this.startNode = startNode;
    this.endNode = endNode;
    this.initializeStartEndNodes(
      { row: startNode.getRow(), col: startNode.getCol() },
      { row: endNode.getRow(), col: endNode.getCol() },
    );
    this.view.initialize(this.model);
  }

  private initializeStartEndNodes(
    start: { row: number; col: number },
    end: { row: number; col: number },
  ): void {
    this.startNode = this.model.getNode(start.row, start.col);
    this.startNode.setStart(true);

    this.endNode = this.model.getNode(end.row, end.col);
    this.endNode.setEnd(true);
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
    this.view.updateNodeClass(
      element,
      isWall ? NodeEnum.WALL : NodeEnum.UNVISITED,
    );
  }

  public async visualize(algorithmType: AlgorithmType): Promise<void> {
    if (this.isVisualization || !this.startNode || !this.endNode) {
      return;
    }

    this.clearPath();
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

      node.setVisited(true);

      const element = this.view.getNodeElement(node.getRow(), node.getCol());

      if (!node.getIsStart() && !node.getIsEnd()) {
        this.view.updateNodeClass(element, NodeEnum.VISITED);
      } else {
        this.view.removeNodeClass(element, NodeEnum.UNVISITED);
        this.view.addNodeClass(element, NodeEnum.VISITED);
      }
      node.setVisited(true);
    }
  }

  private async animateShortestPath(path: NodeModel[]): Promise<void> {
    for (let i = 0; i < path.length; i++) {
      if (this.isVisualization === false) return;
      await this.delay(50);
      const node = path[i];

      node.setPath(true);

      const element = this.view.getNodeElement(node.getRow(), node.getCol());
      if (!node.getIsStart() && !node.getIsEnd()) {
        this.view.updateNodeClass(element, NodeEnum.SHORTEST_PATH);
      } else {
        this.view.removeNodeClass(element, NodeEnum.VISITED);
        this.view.addNodeClass(element, NodeEnum.SHORTEST_PATH);
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

          this.view.updateNodeClass(element, NodeEnum.UNVISITED);
        }
      }
    }
  }

  public clearPath(): void {
    for (let row = 0; row < this.model.getNumRows(); row++) {
      for (let col = 0; col < this.model.getNumCols(); col++) {
        const node = this.model.getNode(row, col);
        const element = this.view.getNodeElement(row, col);

        node.setVisited(false);
        node.setPath(false);
        node.setDistance(Infinity);
        node.setHeuristic(0);
        node.setPrevious(null);

        if (!node.getIsWall()) {
          this.view.removeNodeClass(element, NodeEnum.VISITED);
          this.view.removeNodeClass(element, NodeEnum.SHORTEST_PATH);
          this.view.addNodeClass(element, NodeEnum.UNVISITED);
        }
      }
    }
  }

  public clearBoard(): void {
    this.clearWalls();
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

  public getStartNode(): NodeModel | null {
    return this.startNode;
  }

  public getEndNode(): NodeModel | null {
    return this.endNode;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
