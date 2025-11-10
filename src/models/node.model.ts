export class NodeModel {
  private row: number;
  private col: number;
  private isWall: boolean = false;
  private isStart: boolean = false;
  private isEnd: boolean = false;
  private isVisited: boolean = false;
  private isPath: boolean = false;
  private distance: number = Infinity;
  private heuristic: number = 0;
  private previous: NodeModel | null = null;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  public getRow(): number {
    return this.row;
  }

  public getCol(): number {
    return this.col;
  }

  public setWall(isWall: boolean): void {
    this.isWall = isWall;
  }

  public getIsWall(): boolean {
    return this.isWall;
  }

  public setStart(isStart: boolean): void {
    this.isStart = isStart;
  }

  public getIsStart(): boolean {
    return this.isStart;
  }

  public setEnd(isEnd: boolean): void {
    this.isEnd = isEnd;
  }

  public getIsEnd(): boolean {
    return this.isEnd;
  }

  public setDistance(distance: number): void {
    this.distance = distance;
  }
  public getDistance(): number {
    return this.distance;
  }

  public setHeuristic(heuristic: number): void {
    this.heuristic = heuristic;
  }
  public getHeuristic(): number {
    return this.heuristic;
  }

  public setPrevious(node: NodeModel | null): void {
    this.previous = node;
  }
  public getPrevious(): NodeModel | null {
    return this.previous;
  }

  public setVisited(isVisited: boolean): void {
    this.isVisited = isVisited;
  }

  public getIsVisited(): boolean {
    return this.isVisited;
  }

  public setPath(isPath: boolean): void {
    this.isPath = isPath;
  }

  public getIsPath(): boolean {
    return this.isPath;
  }
}
