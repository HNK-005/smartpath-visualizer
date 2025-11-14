import { PathfindingAlgorithm } from './PathfindingAlgorithm';
import { MatrixModel, NodeModel } from '../../models';
import { PathfindingResult } from './PathfindingResult';
import { MinHeap } from '../data-structure/Heap';

export class DijkstraAlgorithm extends PathfindingAlgorithm {
  findPath(
    board: MatrixModel,
    start: NodeModel,
    end: NodeModel,
  ): PathfindingResult {
    const visitedOrder: NodeModel[] = [];
    const unvisited = new MinHeap<NodeModel>(
      [],
      (a, b) => a.getDistance() - b.getDistance(),
    );
    start.setDistance(0);
    for (let r = 0; r < board.getNumRows(); r++) {
      for (let c = 0; c < board.getNumCols(); c++) {
        unvisited.insert(board.getNode(r, c));
      }
    }
    while (unvisited.size() > 0) {
      const current = unvisited.shift()!;
      if (current.getIsWall()) continue;
      if (current.getDistance() === Infinity) break;
      if (current.getIsVisited()) continue;

      current.setVisited(true);
      visitedOrder.push(current);
      if (current === end) {
        return {
          visitedNodesInOrder: visitedOrder,
          shortestPath: this.reconstructPath(end),
        };
      }

      for (const neighbor of this.getNeighbors(current, board)) {
        const newDist = current.getDistance() + 1;

        if (newDist < neighbor.getDistance()) {
          neighbor.setDistance(newDist);
          neighbor.setPrevious(current);
          unvisited.insert(neighbor);
        }
      }
    }

    return {
      visitedNodesInOrder: visitedOrder,
      shortestPath: [],
    };
  }
}
