declare namespace res {
  type AgentTemplate = {
    pcode: number;
    oids: number[];
    type: string;
    stime: number;
    etime: number;
    interval: number;
  };
  type AgentData = [number, number];
  type IndividualAgentData = {
    oname: string;
    oid: number;
    series: AgentData[];
  };
  type IndividualAgent = AgentTemplate & { objects: IndividualAgentData[] };
  type AverageAgentData = AgentTemplate & { series: AgentData[] };
}
