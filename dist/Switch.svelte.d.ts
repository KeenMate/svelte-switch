type Orientation = 'horizontal' | 'vertical';
interface Props {
    checked?: boolean;
    isDisabled?: boolean;
    orientation?: Orientation;
    size?: number;
    onToggle?: (checked: boolean) => void;
    children?: import('svelte').Snippet<[{
        checked: boolean;
    }]>;
}
declare const Switch: import("svelte").Component<Props, {
    update: (updates: Partial<Pick<Props, "checked" | "isDisabled" | "orientation" | "size">>) => void;
}, "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
