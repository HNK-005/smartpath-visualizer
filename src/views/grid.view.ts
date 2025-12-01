import { DrawModeEnum, NodeTypeEnum } from '../app.enum';
import { IconEnum } from '../app.enum';
import { MatrixModel, NodeModel } from '../models';

export class GridView {
  private board: HTMLElement;
  private drawToolbar: HTMLElement;
  private countVisitedNodes: HTMLSpanElement;
  private countPathNodes: HTMLSpanElement;
  private totalPathCost: HTMLSpanElement;
  private executionTime: HTMLSpanElement;
  private modeInputs: NodeListOf<HTMLInputElement>;

  constructor() {
    this.board = document.getElementById('board') as HTMLElement;
    this.drawToolbar = document.getElementById('draw-toolbar') as HTMLElement;
    this.modeInputs = this.drawToolbar.querySelectorAll(
      'input[id^="mode-"]',
    ) as NodeListOf<HTMLInputElement>;
    this.countVisitedNodes = document.getElementById(
      'count-visited-nodes',
    ) as HTMLSpanElement;
    this.countPathNodes = document.getElementById(
      'count-path-length',
    ) as HTMLSpanElement;
    this.totalPathCost = document.getElementById(
      'count-total-path-cost',
    ) as HTMLSpanElement;
    this.executionTime = document.getElementById(
      'count-execution-time',
    ) as HTMLSpanElement;
    this.handleToolbarToggle();
  }

  public getTypeNode(node: NodeModel): string {
    if (node.getIsStart()) return NodeTypeEnum.START;
    if (node.getIsEnd()) return NodeTypeEnum.END;
    if (node.getIsWall()) return NodeTypeEnum.WALL;
    if (node.getWeight() >= 1) return NodeTypeEnum.WEIGHT;
    if (node.getIsVisited()) return NodeTypeEnum.VISITED;
    if (node.getIsPath()) return NodeTypeEnum.PATH;
    return NodeTypeEnum.UNVISITED;
  }

  public render(matrix: MatrixModel): void {
    this.board.innerHTML = '';
    matrix.getNodes().forEach((row, rowIndex) => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('flex');

      row.forEach((node, colIndex) => {
        const cell = document.createElement('div');
        cell.id = `cell`;
        cell.dataset.row = rowIndex.toString();
        cell.dataset.col = colIndex.toString();
        const type = this.getTypeNode(node);
        if (type === NodeTypeEnum.WEIGHT) {
          cell.dataset.weight = node.getWeight().toString();
        }
        cell.dataset.type = type;

        rowElement.appendChild(cell);
      });
      this.board.appendChild(rowElement);
    });
  }

  public bindDrawModeChange(handle: (mode: DrawModeEnum) => void): void {
    this.modeInputs.forEach((input) => {
      input.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.checked) {
          const selectedMode = target.id as DrawModeEnum;
          handle(selectedMode);
        }
      });
    });
  }

  public bindDrawBoard(
    handle: (row: number, col: number) => NodeModel[],
  ): void {
    this.board.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target && target.id === 'cell') {
        const row = parseInt(target.dataset.row as string, 10);
        const col = parseInt(target.dataset.col as string, 10);
        const node = handle(row, col);
        node.forEach((node) => {
          const targetNode = this.getNodeElement(node.getRow(), node.getCol());
          const type = this.getTypeNode(node);
          if (type === NodeTypeEnum.WEIGHT) {
            targetNode.dataset.weight = node.getWeight().toString();
          }
          targetNode.dataset.type = type;
        });
      }
    });
  }

  private handleToolbarToggle(): void {
    const toggleToolbarButton = this.drawToolbar.querySelector(
      '#toggle-toolbar',
    ) as HTMLButtonElement;
    const drawMode = this.drawToolbar.querySelector(
      '#draw-mode',
    ) as HTMLDivElement;

    toggleToolbarButton.addEventListener('click', () => {
      drawMode.hidden = !drawMode.hidden;

      const svg = toggleToolbarButton.querySelector(
        'svg path',
      ) as SVGPathElement;
      if (svg === null) return;
      if (drawMode.hidden) {
        // mũi sang trái
        svg.setAttribute('d', IconEnum.CHEVRON_LEFT);
      } else {
        // mũi sang phải
        svg.setAttribute('d', IconEnum.CHEVRON_RIGHT);
      }
    });
  }

  public bindUpdateBoard(node: NodeModel): void {
    const type = this.getTypeNode(node);
    const targetNode = this.getNodeElement(node.getRow(), node.getCol());
    if (type === NodeTypeEnum.WEIGHT) {
      targetNode.dataset.weight = node.getWeight().toString();
    }
    targetNode.dataset.type = type;
  }

  public bindSetWeightMode(handle: () => number): void {
    const node = this.getWeightElement();

    node.dataset.weight = handle().toString();
  }

  public bindClearPath(handle: () => NodeModel[]): void {
    const nodes = handle();
    nodes.forEach((node) => {
      const targetNode = this.getNodeElement(node.getRow(), node.getCol());
      const type = this.getTypeNode(node);
      if (type === NodeTypeEnum.WEIGHT) {
        targetNode.dataset.weight = node.getDistance().toString();
      }
      targetNode.dataset.type = type;
    });
  }

  public bindClearWeights(handle: () => NodeModel[]): void {
    const nodes = handle();
    nodes.forEach((node) => {
      const targetNode = this.getNodeElement(node.getRow(), node.getCol());
      const type = this.getTypeNode(node);
      targetNode.dataset.type = type;
    });
  }

  public bindClearWalls(handle: () => NodeModel[]): void {
    const nodes = handle();
    nodes.forEach((node) => {
      const targetNode = this.getNodeElement(node.getRow(), node.getCol());
      const type = this.getTypeNode(node);
      if (type === NodeTypeEnum.WEIGHT) {
        targetNode.dataset.weight = node.getDistance().toString();
      }
      targetNode.dataset.type = type;
    });
  }

  public resetCounters(): void {
    this.updateCountPathNodes(0);
    this.updateCountVisitedNodes(0);
    this.updateTotalPathCost(0);
    this.updateExecutionTime(0);
  }

  public updateCountVisitedNodes(count: number): void {
    this.countVisitedNodes.innerText = count.toString();
  }

  public updateCountPathNodes(count: number): void {
    this.countPathNodes.innerText = count.toString();
  }

  public updateTotalPathCost(cost: number): void {
    this.totalPathCost.innerText = cost.toString();
  }

  public updateExecutionTime(time: number): void {
    this.executionTime.innerText = time.toString();
  }

  public getBoardElement(): HTMLElement {
    return this.board;
  }

  public getModeInputs(): NodeListOf<HTMLInputElement> {
    return this.modeInputs;
  }

  public getNodeElement(row: number, col: number): HTMLElement {
    return this.board.querySelector(
      `div[id="cell"][data-row="${row}"][data-col="${col}"]`,
    ) as HTMLElement;
  }

  public getWeightElement(): HTMLSpanElement {
    const weightNode = this.drawToolbar.querySelector(
      'label[for="mode-weight"] span[data-type="weight"]',
    ) as HTMLSpanElement;
    return weightNode;
  }

  public getCountVisitedNodes(): HTMLSpanElement {
    return this.countVisitedNodes;
  }

  public getCountPathNodes(): HTMLSpanElement {
    return this.countPathNodes;
  }

  public getTotalPathCost(): HTMLSpanElement {
    return this.totalPathCost;
  }

  public getExecutionTime(): HTMLSpanElement {
    return this.executionTime;
  }
}
