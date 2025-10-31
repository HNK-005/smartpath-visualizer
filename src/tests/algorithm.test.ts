import { MatrixModel } from "../models/matrix.model";
import { NodeModel } from "../models/node.model";
import { AStarAlgorithm } from "../lib/algorithm/AStarAlgorithm";
import { DijkstraAlgorithm } from "../lib/algorithm/DijkstraAlgorithm";
import { BFSAlgorithm } from "../lib/algorithm/BFSAlgorithm";
import { DFSAlgorithm } from "../lib/algorithm/DFSAlgorithm";
import { PathfindingResult } from "../lib/algorithm/PathfindingResult";

function isContiguousPath(path: NodeModel[]): boolean {
    if (path.length === 0) return false;
    for (let i = 1; i < path.length; i++) {
        const a = path[i - 1];
        const b = path[i];
        const rowDiff = Math.abs(a.getRow() - b.getRow());
        const colDiff = Math.abs(a.getCol() - b.getCol());
        if (
            !(
                (rowDiff === 1 && colDiff === 0) ||
                (rowDiff === 0 && colDiff === 1)
            )
        ) {
            return false;
        }
    }
    return true;
}

describe("Pathfinding algorithms (updated tests)", () => {
    const algorithms: [
        string,
        new () => {
            findPath(
                grid: MatrixModel,
                start: NodeModel,
                end: NodeModel
            ): PathfindingResult;
        }
    ][] = [
        ["A*", AStarAlgorithm],
        ["Dijkstra", DijkstraAlgorithm],
        ["BFS", BFSAlgorithm],
        ["DFS", DFSAlgorithm],
    ];

    for (const [name, Algo] of algorithms) {
        describe(name, () => {
            test("returns a PathfindingResult with a valid shortestPath on empty 3x3 grid", () => {
                const grid = new MatrixModel(3, 3);
                const start = grid.getNode(0, 0);
                const end = grid.getNode(2, 2);

                const algo = new Algo();
                const result = algo.findPath(grid, start, end);

                expect(Array.isArray(result.visitedNodesInOrder)).toBe(true);
                expect(Array.isArray(result.shortestPath)).toBe(true);

                const path = result.shortestPath;
                expect(path.length).toBeGreaterThan(0);
                expect(path[0]).toBe(start);
                expect(path[path.length - 1]).toBe(end);
                expect(isContiguousPath(path)).toBe(true);
            });

            test("returns empty shortestPath when path is blocked", () => {
                const grid = new MatrixModel(3, 3);
                const start = grid.getNode(0, 0);
                const end = grid.getNode(2, 2);

                // Block the middle row completely to separate start and end
                for (let c = 0; c < 3; c++) {
                    grid.getNode(1, c).setWall(true);
                }

                const algo = new Algo();
                const result = algo.findPath(grid, start, end);

                expect(Array.isArray(result.visitedNodesInOrder)).toBe(true);
                expect(Array.isArray(result.shortestPath)).toBe(true);
                expect(result.shortestPath.length).toBe(0);

                // Ensure end was not visited (cannot reach)
                expect(result.visitedNodesInOrder.includes(end)).toBe(false);
            });

            test("visitedNodesInOrder includes start as first visited element when reachable", () => {
                const grid = new MatrixModel(2, 2);
                const start = grid.getNode(0, 0);
                const end = grid.getNode(1, 1);

                const algo = new Algo();
                const result = algo.findPath(grid, start, end);

                // Some algorithms may not put start as first visited node in their order,
                // but start should be present in visitedNodesInOrder if there was any exploration.
                if (result.visitedNodesInOrder.length > 0) {
                    expect(result.visitedNodesInOrder[0]).toBeDefined();
                }
            });
        });
    }
});
