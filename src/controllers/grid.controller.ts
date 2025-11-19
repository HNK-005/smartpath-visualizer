import { MatrixModel, NodeModel } from '../models';
import { GridView } from '../views';
import { AlgorithmFactory } from '../lib/algorithm/AlgorithmFactory';
import { delay } from '../utils/delay';
import { MazeRecursiveDivision } from '../lib/algorithm/MazeRecursiveDivision';
import { AlgorithmEnum, DrawModeEnum, SpeedEnum } from '../app.enum';

export class GridController {
  private model: MatrixModel;
  private view: GridView;
  private drawMode: DrawModeEnum;
  private startNode: NodeModel | null = null;
  private endNode: NodeModel | null = null;
  private speed: SpeedEnum = SpeedEnum.MEDIUM;
  private readonly defaultRows: number = 50;
  private readonly defaultCols: number = 96;

  constructor(view: GridView) {
    this.view = view;
    this.drawMode = DrawModeEnum.START;
    this.model = new MatrixModel(this.defaultRows, this.defaultCols);
    this.view.render(this.model);
  }

  public handleReRenderBoard(
    model: MatrixModel,
    startNode: NodeModel | null,
    endNode: NodeModel | null,
  ): void {
    this.model = model;
    this.startNode = startNode;
    this.endNode = endNode;
    this.view.render(model);
    document.dispatchEvent(
      new CustomEvent('board-update', {
        detail: { startNode: this.startNode, endNode: this.endNode },
      }),
    );
  }

  public handleDrawModeChange(): void {
    this.view.bindDrawModeChange((mode: DrawModeEnum) => {
      this.drawMode = mode;
    });
  }

  public handleDrawBoard(): void {
    this.view.bindDrawBoard((row: number, col: number) => {
      const node = this.model.getNode(row, col);
      const listNode: NodeModel[] = [];

      node.reset();
      if (!this.startNode?.getIsStart() && this.startNode === node) {
        this.startNode = null;
      }
      if (!this.endNode?.getIsEnd() && this.endNode === node) {
        this.endNode = null;
      }
      switch (this.drawMode) {
        case DrawModeEnum.START:
          if (this.startNode) {
            this.startNode.reset();
            listNode.push(this.startNode);
          }
          node.setStart(true);
          node.setDistance(1);
          this.startNode = node;
          break;
        case DrawModeEnum.END:
          if (this.endNode) {
            this.endNode.reset();
            listNode.push(this.endNode);
          }
          node.setEnd(true);
          this.endNode = node;
          break;
        case DrawModeEnum.WALL:
          node.setWall(true);
          break;
        case DrawModeEnum.WEIGHT:
          const weightValue = this.view.getWeightElement().dataset.weight
            ? parseInt(this.view.getWeightElement().dataset.weight!, 10)
            : 1;
          node.setWeight(weightValue);
          break;
        case DrawModeEnum.ERASER:
          break;
      }
      document.dispatchEvent(
        new CustomEvent('board-update', {
          detail: { startNode: this.startNode, endNode: this.endNode },
        }),
      );
      listNode.push(node);
      return listNode;
    });
  }

  public handleResetGrid(): void {
    this.model = new MatrixModel(this.defaultRows, this.defaultCols);
    this.view.render(this.model);
    this.startNode = null;
    this.endNode = null;
    document.dispatchEvent(
      new CustomEvent('board-update', {
        detail: { startNode: this.startNode, endNode: this.endNode },
      }),
    );
  }

  public handleClearWeights(): void {
    this.view.bindClearWeights(() => {
      const updatedNodes: NodeModel[] = [];
      for (let row = 0; row < this.model.getNumRows(); row++) {
        for (let col = 0; col < this.model.getNumCols(); col++) {
          const node = this.model.getNode(row, col);

          if (node.getWeight() > 0) {
            node.setWeight(0);
            updatedNodes.push(node);
          }
        }
      }

      return updatedNodes;
    });
  }

  public handleClearPath(): void {
    this.view.bindClearPath(() => {
      const updatedNodes: NodeModel[] = [];
      for (let row = 0; row < this.model.getNumRows(); row++) {
        for (let col = 0; col < this.model.getNumCols(); col++) {
          const node = this.model.getNode(row, col);

          if (
            node.getIsVisited() ||
            node.getIsPath() ||
            node.getDistance() !== Infinity ||
            node.getHeuristic() !== 0 ||
            node.getPrevious() !== null
          ) {
            node.resetPathState();
            if (node === this.startNode) {
              node.setDistance(1);
            }
            updatedNodes.push(node);
          }
        }
      }

      return updatedNodes;
    });
  }

  public handleClearWalls(): void {
    this.view.bindClearWalls(() => {
      const updatedNodes: NodeModel[] = [];
      for (let row = 0; row < this.model.getNumRows(); row++) {
        for (let col = 0; col < this.model.getNumCols(); col++) {
          const node = this.model.getNode(row, col);

          if (node.getIsWall()) {
            node.setWall(false);
            updatedNodes.push(node);
          }
        }
      }

      return updatedNodes;
    });
  }

  public handleCounts(): void {
    document.addEventListener('node-visited', (e: any) => {
      const countNode = e.detail.countNode as number;
      this.view.updateCountVisitedNodes(countNode);
    });

    document.addEventListener('node-path', (e: any) => {
      const countNode = e.detail.countNode as number;
      this.view.updateCountPathNodes(countNode);
    });

    document.addEventListener('visualization-end', (e: any) => {
      if (e.detail) {
        const totalPathCost = e.detail.totalPathCost as number;
        const executionTime = e.detail.executionTime as number;
        this.view.updateTotalPathCost(totalPathCost);
        this.view.updateExecutionTime(executionTime);
      }
    });
  }

  public async visualize(
    algorithmType: AlgorithmEnum,
    pausePoint: () => Promise<void>,
  ): Promise<void> {
    if (!this.startNode || !this.endNode) {
      return;
    }

    const time = Date.now();

    const algorithm = AlgorithmFactory.create(algorithmType);
    const result = algorithm.findPath(this.model, this.startNode, this.endNode);

    await this.animateVisitedNodes(result.visitedNodesInOrder, pausePoint);

    if (result.shortestPath.length > 0) {
      await this.animateShortestPath(result.shortestPath, pausePoint);
    }
    document.dispatchEvent(
      new CustomEvent('visualization-end', {
        detail: {
          totalPathCost: this.endNode.getDistance(),
          executionTime: Date.now() - time,
        },
      }),
    );
  }

  private async animateVisitedNodes(
    visitedNodes: NodeModel[],
    pausePoint: () => Promise<void>,
  ): Promise<void> {
    for (let i = 0; i < visitedNodes.length; i++) {
      await pausePoint();
      await delay(this.speed);

      const node = visitedNodes[i];

      document.dispatchEvent(
        new CustomEvent('node-visited', {
          detail: { countNode: i + 1 },
        }),
      );

      if (node.getIsStart() || node.getIsEnd()) continue;
      node.reset();
      node.setVisited(true);
      this.view.bindUpdateBoard(node);
    }
  }

  private async animateShortestPath(
    path: NodeModel[],
    pausePoint: () => Promise<void>,
  ): Promise<void> {
    for (let i = 0; i < path.length; i++) {
      await pausePoint();
      await delay(this.speed * 1.5);
      const node = path[i];

      document.dispatchEvent(
        new CustomEvent('node-path', {
          detail: { countNode: i + 1 },
        }),
      );

      if (node.getIsStart() || node.getIsEnd()) continue;
      node.reset();
      node.setPath(true);
      this.view.bindUpdateBoard(node);
    }
  }

  public setDrawMode(mode: DrawModeEnum): void {
    this.drawMode = mode;
  }

  public setSpeed(speed: SpeedEnum): void {
    this.speed = speed;
  }

  public generateMaze(): void {
    if (!this.startNode || !this.endNode) return;
    const maze = new MazeRecursiveDivision(this.model);
    maze.generate(this.startNode, this.endNode);

    for (let r = 0; r < this.model.getNumRows(); r++) {
      for (let c = 0; c < this.model.getNumCols(); c++) {
        const node = this.model.getNode(r, c);
        this.view.bindUpdateBoard(node);
      }
    }
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
}
