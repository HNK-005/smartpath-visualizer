export enum NodeTypeEnum {
  START = 'start',
  END = 'end',
  WALL = 'wall',
  VISITED = 'visited',
  WEIGHT = 'weight',
  UNVISITED = 'unvisited',
  PATH = 'path',
}

export enum AlgorithmEnum {
  BFS = 'BFS',
  DFS = 'DFS',
  DIJKSTRA = 'Dijkstra',
  ASTAR = 'A*',
}

export enum DrawModeEnum {
  START = 'mode-start',
  END = 'mode-end',
  WALL = 'mode-wall',
  WEIGHT = 'mode-weight',
  ERASER = 'mode-eraser',
}

export enum SpeedEnum {
  SLOW = 50,
  MEDIUM = 20,
  FAST = 5,
}

export enum WeightEnum {
    LOW = 1,
    MEDIUM = 5,
    HIGH = 10,
}

export enum IconEnum {
  PLAY = 'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z',
  PAUSE = 'M15.75 5.25v13.5m-7.5-13.5v13.5',
  CHEVRON_LEFT = 'M15.75 19.5 8.25 12l7.5-7.5',
  CHEVRON_RIGHT = 'm8.25 4.5 7.5 7.5-7.5 7.5',
}
