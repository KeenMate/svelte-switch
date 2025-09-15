type Direction = 'horizontal' | 'vertical';
interface Props {
    checked?: boolean;
    disabled?: boolean;
    direction?: Direction;
    size?: number;
    onToggle?: (checked: boolean) => void;
    children?: import('svelte').Snippet<[{
        checked: boolean;
    }]>;
}
declare const Switch: import("svelte").Component<Props, {}, "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
