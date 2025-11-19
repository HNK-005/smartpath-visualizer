import { MatrixModel, NodeModel } from '../models';
import { BFSAlgorithm } from '../lib/algorithm/BFSAlgorithm';
import { DFSAlgorithm } from '../lib/algorithm/DFSAlgorithm';
import { DijkstraAlgorithm } from '../lib/algorithm/DijkstraAlgorithm';
import { AStarAlgorithm } from '../lib/algorithm/AStarAlgorithm';
import { PathfindingAlgorithm } from '../lib/algorithm/PathfindingAlgorithm';

type AlgoCtor = new () => PathfindingAlgorithm;

function buildSimpleBoard() {
  const rows = 5;
  const cols = 5;
  const board = new MatrixModel(rows, cols);

  const start = board.getNode(0, 0);
  const end = board.getNode(4, 4);

  start.setStart(true);
  // Dijkstra, A* dùng distance hiện tại làm gScore ban đầu
  start.setDistance(0);

  end.setEnd(true);

  // Tạo vài tường để đảm bảo thuật toán phải "đi vòng"
  board.getNode(0, 1).setWall(true);
  board.getNode(1, 1).setWall(true);
  board.getNode(2, 1).setWall(true);

  // Tạo vài ô có weight > 0
  board.getNode(1, 2).setWeight(5);
  board.getNode(2, 2).setWeight(1);

  return { board, start, end };
}

function computePathCost(path: NodeModel[]): number {
  if (path.length === 0) return Infinity;
  let cost = path[0].getDistance(); // với BFS/DFS sẽ là Infinity nhưng ta chỉ dùng cho Dijkstra/A*
  // Với Dijkstra/A* đã set distance đúng trên end nên để nhất quán
  // sẽ tính lại cost thủ công:
  cost = 0;
  for (let i = 1; i < path.length; i++) {
    const curr = path[i];
    // Mỗi bước: 1 + weight của node hiện tại
    cost += 1 + curr.getWeight();
  }
  return cost;
}

function resetBoardState(board: MatrixModel) {
  for (let r = 0; r < board.getNumRows(); r++) {
    for (let c = 0; c < board.getNumCols(); c++) {
      const node = board.getNode(r, c);
      node.setVisited(false);
      node.setPath(false);
      node.setDistance(node.getIsStart() ? 0 : Infinity);
      node.setHeuristic(0);
      node.setPrevious(null);
    }
  }
}

function commonTestsForAlgo(name: string, Algo: AlgoCtor) {
  describe(name, () => {
    test('finds a path from start to end on simple board', () => {
      const { board, start, end } = buildSimpleBoard();
      const algo = new Algo();

      const result = algo.findPath(board, start, end);

      expect(result.visitedNodesInOrder.length).toBeGreaterThan(0);
      expect(result.shortestPath.length).toBeGreaterThan(0);
      expect(result.shortestPath[0]).toBe(start);
      expect(result.shortestPath[result.shortestPath.length - 1]).toBe(end);

      // Với Dijkstra & A* kiểm tra cost khớp với distance trên end
      if (algo instanceof DijkstraAlgorithm || algo instanceof AStarAlgorithm) {
        const recomputedCost = computePathCost(result.shortestPath);
        expect(end.getDistance()).toBe(recomputedCost);
      }
    });

    test('returns empty path when no route is available', () => {
      const { board, start, end } = buildSimpleBoard();

      // Chặn hoàn toàn đường đi bằng cách dựng tường dọc cột 2
      for (let r = 0; r < board.getNumRows(); r++) {
        board.getNode(r, 2).setWall(true);
      }

      // Reset lại state pathfinding (distance, previous, visited,...)
      resetBoardState(board);

      const algo = new Algo();
      const result = algo.findPath(board, start, end);

      expect(result.shortestPath.length).toBe(0);
      // visited có thể > 0 nhưng không được chứa end
      expect(result.visitedNodesInOrder).not.toContain(end);
    });
  });
}

describe('Pathfinding algorithms', () => {
  commonTestsForAlgo('BFSAlgorithm', BFSAlgorithm);
  commonTestsForAlgo('DFSAlgorithm', DFSAlgorithm);
  commonTestsForAlgo('DijkstraAlgorithm', DijkstraAlgorithm);
  commonTestsForAlgo('AStarAlgorithm', AStarAlgorithm);
});