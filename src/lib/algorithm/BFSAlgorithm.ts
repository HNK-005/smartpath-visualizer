import { PathfindingAlgorithm } from './PathfindingAlgorithm';
import { MatrixModel, NodeModel } from '../../models';
import { PathfindingResult } from './PathfindingResult';

export class BFSAlgorithm extends PathfindingAlgorithm {
  findPath(
    board: MatrixModel,
    start: NodeModel,
    end: NodeModel,
  ): PathfindingResult {
    const queue: NodeModel[] = [start];
    const visited = new Set<NodeModel>([start]);
    const visitedOrder: NodeModel[] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (current.getIsWall()) continue;
      if (current.getDistance() === Infinity) break;
      if (current.getIsVisited()) continue;

      visitedOrder.push(current);

      if (current === end) {
        return {
          visitedNodesInOrder: visitedOrder,
          shortestPath: this.reconstructPath(end),
        };
      }

      for (const neighbor of this.getNeighbors(current, board)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          neighbor.setPrevious(current);
          neighbor.setDistance(
            current.getDistance() + neighbor.getWeight() + 1,
          );
          queue.push(neighbor);
        }
      }
    }

    return {
      visitedNodesInOrder: visitedOrder,
      shortestPath: [],
    };
  }
}
