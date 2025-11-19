import { NodeModel } from "../models/node.model";

describe("Node model", () => {
    test("default properties", () => {
        const n = new NodeModel(2, 3);
        expect(n.getRow()).toBe(2);
        expect(n.getCol()).toBe(3);
        expect(n.getIsWall()).toBe(false);
        expect(n.getIsStart()).toBe(false);
        expect(n.getIsEnd()).toBe(false);
        expect(n.getIsVisited()).toBe(false);
        expect(n.getIsPath()).toBe(false);
        expect(n.getWeight()).toBe(0);
        expect(n.getDistance()).toBe(Infinity);
        expect(n.getHeuristic()).toBe(0);
        expect(n.getPrevious()).toBeNull();
    });

    test("setters and getters", () => {
        const a = new NodeModel(0, 0);
        const b = new NodeModel(1, 1);

        a.setWall(true);
        expect(a.getIsWall()).toBe(true);

        a.setStart(true);
        expect(a.getIsStart()).toBe(true);

        a.setEnd(true);
        expect(a.getIsEnd()).toBe(true);

        a.setVisited(true);
        expect(a.getIsVisited()).toBe(true);

        a.setPath(true);
        expect(a.getIsPath()).toBe(true);

        a.setWeight(5);
        expect(a.getWeight()).toBe(5);

        a.setDistance(42);
        expect(a.getDistance()).toBe(42);

        a.setHeuristic(7);
        expect(a.getHeuristic()).toBe(7);

        a.setPrevious(b);
        expect(a.getPrevious()).toBe(b);

        a.setPrevious(null);
        expect(a.getPrevious()).toBeNull();
    });

    test("reset resets full state", () => {
        const n = new NodeModel(0, 0);
        n.setWall(true);
        n.setStart(true);
        n.setEnd(true);
        n.setVisited(true);
        n.setPath(true);
        n.setWeight(10);
        n.setDistance(100);
        n.setHeuristic(50);
        n.setPrevious(new NodeModel(1, 1));

        n.reset();

        expect(n.getIsWall()).toBe(false);
        expect(n.getIsStart()).toBe(false);
        expect(n.getIsEnd()).toBe(false);
        expect(n.getIsVisited()).toBe(false);
        expect(n.getIsPath()).toBe(false);
        expect(n.getWeight()).toBe(0);
        expect(n.getDistance()).toBe(Infinity);
        expect(n.getHeuristic()).toBe(0);
        expect(n.getPrevious()).toBeNull();
    });

    test("resetPathState only resets path-related fields", () => {
        const n = new NodeModel(0, 0);
        n.setWall(true);
        n.setStart(true);
        n.setEnd(true);
        n.setVisited(true);
        n.setPath(true);
        n.setWeight(10);
        n.setDistance(100);
        n.setHeuristic(50);
        n.setPrevious(new NodeModel(1, 1));

        n.resetPathState();

        // path-related
        expect(n.getIsVisited()).toBe(false);
        expect(n.getIsPath()).toBe(false);
        expect(n.getDistance()).toBe(Infinity);
        expect(n.getHeuristic()).toBe(0);
        expect(n.getPrevious()).toBeNull();

        // other flags should stay the same
        expect(n.getIsWall()).toBe(true);
        expect(n.getIsStart()).toBe(true);
        expect(n.getIsEnd()).toBe(true);
        expect(n.getWeight()).toBe(10);
    });
});
