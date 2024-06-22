import { Button } from "@material-tailwind/react";

interface Props {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function SidebarItem({ label, onClick, disabled }: Props) {
  return (
    <li className="hover:bg-gray-100 rounded-lg transition-colors">
      <Button
        variant="text"
        color="gray"
        fullWidth
        disabled={disabled}
        className="justify-start"
        ripple={false}
        onClick={onClick}
      >
        <span className="ml-4 text-gray-800">{label}</span>
      </Button>
    </li>
  );
}
