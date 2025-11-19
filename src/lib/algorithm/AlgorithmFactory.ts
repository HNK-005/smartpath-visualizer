import { PathfindingAlgorithm } from './PathfindingAlgorithm';
import { BFSAlgorithm } from './BFSAlgorithm';
import { DFSAlgorithm } from './DFSAlgorithm';
import { DijkstraAlgorithm } from './DijkstraAlgorithm';
import { AStarAlgorithm } from './AStarAlgorithm';
import { AlgorithmEnum } from '../../app.enum';

export class AlgorithmFactory {
  public static create(type: AlgorithmEnum): PathfindingAlgorithm {
    switch (type) {
      case AlgorithmEnum.BFS:
        return new BFSAlgorithm();
      case AlgorithmEnum.DFS:
        return new DFSAlgorithm();
      case AlgorithmEnum.DIJKSTRA:
        return new DijkstraAlgorithm();
      case AlgorithmEnum.ASTAR:
        return new AStarAlgorithm();
      default:
        throw new Error(`Thuật toán '${type}' không được hỗ trợ.`);
    }
  }
}
