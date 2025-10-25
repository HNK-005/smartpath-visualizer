import { PathfindingAlgorithm } from "./PathfindingAlgorithm";
import { BFSAlgorithm } from "./BFSAlgorithm";
import { DFSAlgorithm } from "./DFSAlgorithm";
import { DijkstraAlgorithm } from "./DijkstraAlgorithm";
import { AStarAlgorithm } from "./AStarAlgorithm";

export type AlgorithmType = "BFS" | "DFS" | "Dijkstra" | "A*";

export class AlgorithmFactory {
  public static create(type: AlgorithmType): PathfindingAlgorithm {
    switch (type) {
      case "BFS":
        return new BFSAlgorithm();
      case "DFS":
        return new DFSAlgorithm();
      case "Dijkstra":
        return new DijkstraAlgorithm();
      case "A*":
        return new AStarAlgorithm();
      default:
        throw new Error(`Thuật toán '${type}' không được hỗ trợ.`);
    }
  }
}
