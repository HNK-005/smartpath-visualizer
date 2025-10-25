import { Node } from "../../models";

export interface PathfindingResult {
    /** Danh sách các node được duyệt theo thứ tự (dùng cho visualizer) */
    visitedNodesInOrder: Node[];

    /** Đường đi ngắn nhất (nếu tìm thấy) */
    shortestPath: Node[];
}
