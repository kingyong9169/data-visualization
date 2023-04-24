declare namespace res {
  type AgentTemplate<T> = {
    pcode: number;
    type: string;
    stime: number;
    etime: number;
    interval: number;
    data: T;
  };
  type AgentData = [number, number];
  type IndividualAgentData = {
    oname: string;
    oid: number;
    data: AgentData[];
  };
  type IndividualAgent = AgentTemplate<IndividualAgentData[]>;
  type AverageAgentData = AgentTemplate<AgentData[]> & { op: string };
}
