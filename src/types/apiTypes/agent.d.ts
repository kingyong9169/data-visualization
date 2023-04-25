declare namespace res {
  type AgentCommon = {
    pcode: number;
    oids: number[];
    type: string;
    stime: number;
    etime: number;
    interval: number;
    timeMerge: string;
  };
  type AgentData = [number, number];
  type IndividualAgentDataDetail = {
    oname: string;
    oid: number;
    series: AgentData[];
  };
  type IndividualAgentData = { objects: IndividualAgentDataDetail[] };
  type IndividualAgent = AgentCommon & IndividualAgentData;

  type AverageAgentData = { series: AgentData[]; objectMerge: string };
  type AverageAgent = AgentCommon & AverageAgentData;
}
