import { NodeModel } from "../../models";

export interface PathfindingResult {
    /** Danh sách các node được duyệt theo thứ tự */
    visitedNodesInOrder: NodeModel[];

    /** Đường đi ngắn nhất (nếu tìm thấy) */
    shortestPath: NodeModel[];
}
