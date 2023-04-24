declare namespace res {
  type HeapData = {
    oid: number;
    oname: string;
    heap_use: string;
  };
  type Heap = {
    pcode: number;
    stime: number;
    etime: number;
    timeMerge: string;
    unit: string;
    data: HeapData[];
  };
}
