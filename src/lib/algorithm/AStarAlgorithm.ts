import { PathfindingAlgorithm } from './PathfindingAlgorithm';
import { MatrixModel, NodeModel } from '../../models';
import { PathfindingResult } from './PathfindingResult';
import { MinHeap } from '../data-structure/Heap';

export class AStarAlgorithm extends PathfindingAlgorithm {
  private heuristic(a: NodeModel, b: NodeModel): number {
    return (
      Math.abs(a.getRow() - b.getRow()) + Math.abs(a.getCol() - b.getCol())
    );
  }

  findPath(
    grid: MatrixModel,
    start: NodeModel,
    end: NodeModel,
  ): PathfindingResult {
    const visitedOrder: NodeModel[] = [];

    const closedSet = new Set<NodeModel>();

    const unvisited = new MinHeap<NodeModel>(
      [start],
      (a, b) => a.getHeuristic() - b.getHeuristic(),
    );

    unvisited.insert(start);

    while (unvisited.size() > 0) {
      const current = unvisited.shift()!;

      if (current.getIsWall()) continue;
      if (current.getDistance() === Infinity) break;
      if (current.getIsVisited()) continue;

      closedSet.add(current);
      visitedOrder.push(current);

      if (current === end) {
        return {
          visitedNodesInOrder: visitedOrder,
          shortestPath: this.reconstructPath(end),
        };
      }

      for (const neighbor of this.getNeighbors(current, grid)) {
        if (closedSet.has(neighbor)) continue;

        const newDist = current.getDistance() + neighbor.getWeight() + 1;

        if (newDist < neighbor.getDistance()) {
          neighbor.setPrevious(current);
          neighbor.setDistance(newDist);
          neighbor.setHeuristic(newDist + this.heuristic(neighbor, end));

          if (!unvisited.contains(neighbor)) {
            unvisited.insert(neighbor);
          } else {
            unvisited.decreaseKey(neighbor);
          }
        }
      }
    }

    return {
      visitedNodesInOrder: visitedOrder,
      shortestPath: [],
    };
  }
}
