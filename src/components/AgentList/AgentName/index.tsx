import { AgentListItem } from '../AgentListProvider';

import $ from './style.module.scss';

type Props = {
  data: AgentListItem;
  isSelected: boolean;
  onChange: (name: AgentListItem) => void;
};

export default function AgentName(props: Props) {
  const { data, isSelected, onChange } = props;
  return (
    <button
      type="button"
      aria-label={`에이전트 ${data.oname} 선택 버튼`}
      className={`${$['name']} ${isSelected && $['name-clicked']}`}
      onClick={() => onChange(data)}
    >
      {data.oname}
    </button>
  );
}
