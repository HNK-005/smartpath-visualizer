import { MatrixModel, NodeModel } from '../models';

export enum NodeEnum {
  START = 'start',
  END = 'end',
  WALL = 'wall',
  VISITED = 'visited',
  UNVISITED = 'unvisited',
  SHORTEST_PATH = 'shortest-path',
}
export class GridView {
  private gridContainer: HTMLElement;
  private gridBoard: HTMLElement;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id ${containerId} not found`);
    }
    this.gridContainer = container;
    this.gridBoard = this.initBoard();
  }

  initialize(matrix: MatrixModel): void {
    this.gridContainer.innerHTML = '';
    this.gridContainer.appendChild(this.gridBoard);
    this.render(matrix);
  }

  private initBoard(): HTMLElement {
    const boardElement = document.createElement('table');
    boardElement.classList.add('board');
    return boardElement;
  }

  public classNode(node: NodeModel): string {
    const listClass = [];
    if (node.getIsStart()) listClass.push(NodeEnum.START);
    if (node.getIsEnd()) listClass.push(NodeEnum.END);
    if (node.getIsWall()) listClass.push(NodeEnum.WALL);
    if (node.getIsVisited()) listClass.push(NodeEnum.VISITED);
    else listClass.push(NodeEnum.UNVISITED);
    if (node.getIsPath()) listClass.push(NodeEnum.SHORTEST_PATH);
    return listClass.join(' ');
  }

  public renderBoard(matrix: MatrixModel): void {
    const tbody = document.createElement('tbody');

    matrix.getNodes().forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      row.forEach((node, colIndex) => {
        const td = document.createElement('td');
        td.id = `${rowIndex}-${colIndex}`;
        td.className = this.classNode(node);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    this.gridBoard.innerHTML = '';

    this.gridBoard.appendChild(tbody);
  }

  public render(matrix: MatrixModel): void {
    this.renderBoard(matrix);
  }

  public getBoardElement(): HTMLElement {
    return this.gridBoard;
  }

  public getNodeElement(row: number, col: number): HTMLElement {
    return this.gridBoard.querySelector(
      `td[id="${row}-${col}"]`,
    ) as HTMLElement;
  }

  public updateNodeClass(element: HTMLElement, className: string): void {
    element.className = '';
    this.addNodeClass(element, className);
  }

  public addNodeClass(element: HTMLElement, className: string): void {
    element.classList.add(className);
  }

  public removeNodeClass(element: HTMLElement, className: string): void {
    element.classList.remove(className);
  }
}
