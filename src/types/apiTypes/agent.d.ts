declare namespace res {
  // TODO: 타입 체크 라이브러리 마이그레이션하는 상황일 때, 예외 발생할 수 있음
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
