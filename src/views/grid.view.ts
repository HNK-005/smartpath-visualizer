export class GridView {
  public readonly rowCount: number = 35;
  public readonly colCount: number = 80;

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

  initialize(): void {
    this.gridContainer.innerHTML = '';
    this.gridContainer.appendChild(this.gridBoard);
    this.render();
  }

  private initBoard(): HTMLElement {
    const boardElement = document.createElement('table');
    boardElement.classList.add('board');
    return boardElement;
  }

  public renderBoard(numRows: number, numCols: number): void {
    const tbody = document.createElement('tbody');

    for (let row = 0; row < numRows; row++) {
      const tableRow = document.createElement('tr');
      tableRow.id = `row-${row}`;
      for (let col = 0; col < numCols; col++) {
        const cell = document.createElement('td');
        cell.id = `${row}-${col}`;
        cell.classList.add('unvisited');
        tableRow.appendChild(cell);
      }
      tbody.appendChild(tableRow);
    }

    this.gridBoard.appendChild(tbody);
  }

  public render(): void {
    this.renderBoard(this.rowCount, this.colCount);
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
