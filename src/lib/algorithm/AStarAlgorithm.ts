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

    const gScore = new Map<NodeModel, number>();
    const fScore = new Map<NodeModel, number>();
    const inOpenSet = new Set<NodeModel>();

    gScore.set(start, 0);
    fScore.set(start, this.heuristic(start, end));

    const openSet = new MinHeap<NodeModel>(
      [start],
      (a, b) => (fScore.get(a) ?? Infinity) - (fScore.get(b) ?? Infinity),
    );

    inOpenSet.add(start);

    while (openSet.size() > 0) {
      const current = openSet.shift()!;
      inOpenSet.delete(current);
      visitedOrder.push(current);

      if (current === end) {
        return {
          visitedNodesInOrder: visitedOrder,
          shortestPath: this.reconstructPath(end),
        };
      }

      for (const neighbor of this.getNeighbors(current, grid)) {
        if (neighbor.getIsWall()) continue;

        const tentativeG = (gScore.get(current) ?? Infinity) + 1;

        if (tentativeG < (gScore.get(neighbor) ?? Infinity)) {
          neighbor.setPrevious(current);
          gScore.set(neighbor, tentativeG);
          fScore.set(neighbor, tentativeG + this.heuristic(neighbor, end));

          if (!inOpenSet.has(neighbor)) {
            openSet.insert(neighbor);
            inOpenSet.add(neighbor);
          } else {
            openSet.insert(neighbor);
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
