export class Heap<T> {
  protected heap: T[];

  constructor(data: T[] = []) {
    this.heap = data;
  }

  getParentIndex(i: number) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChildIndex(i: number) {
    return 2 * i + 1;
  }
  getRightChildIndex(i: number) {
    return 2 * i + 2;
  }

  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  size() {
    return this.heap.length;
  }
}

export class MinHeap<T> extends Heap<T> {
  private comparator: (a: T, b: T) => number;

  constructor(data: T[] = [], comparator: (a: T, b: T) => number) {
    super(data);
    this.comparator = comparator;
    this.buildHeap();
  }

  private buildHeap() {
    for (let i = Math.floor(this.size() / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  insert(value: T) {
    this.heap.push(value);
    this.heapifyUp(this.size() - 1);
  }

  /**
   * Chuẩn MinHeap pop root
   */
  shift(): T | null {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop()!;

    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);

    return root;
  }

  private heapifyUp(i: number) {
    while (i > 0) {
      const parentIndex = this.getParentIndex(i);
      if (this.comparator(this.heap[i], this.heap[parentIndex]) >= 0) break;

      this.swap(i, parentIndex);
      i = parentIndex;
    }
  }

  private heapifyDown(i: number) {
    const size = this.size();

    while (true) {
      const left = this.getLeftChildIndex(i);
      const right = this.getRightChildIndex(i);
      let smallest = i;

      if (
        left < size &&
        this.comparator(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }

      if (
        right < size &&
        this.comparator(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }

      if (smallest === i) break;

      this.swap(i, smallest);
      i = smallest;
    }
  }
}
