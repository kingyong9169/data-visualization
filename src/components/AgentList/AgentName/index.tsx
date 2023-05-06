import $ from './style.module.scss';

type Props = {
  name: string;
  isSelected: boolean;
  onChange: (name: string) => void;
};

export default function AgentName(props: Props) {
  const { name, isSelected, onChange } = props;
  return (
    <button
      type="button"
      aria-label={`에이전트 ${name} 선택 버튼`}
      className={`${$['name']} ${isSelected && $['name-clicked']}`}
      onClick={() => onChange(name)}
    >
      {name}
    </button>
  );
}
