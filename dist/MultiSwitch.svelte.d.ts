type Orientation = 'horizontal' | 'vertical';
interface StepStyle {
    backgroundColor?: string;
    thumbColor?: string;
    borderColor?: string;
}
interface Props {
    selectedIndex?: number;
    isDisabled?: boolean;
    orientation?: Orientation;
    size?: number;
    stepsCount?: number;
    stepStyles?: StepStyle[];
    onStepChange?: (index: number) => void;
    children?: import('svelte').Snippet<[{
        selectedIndex: number;
        stepIndex: number;
        isSelected: boolean;
    }]>;
}
declare const MultiSwitch: import("svelte").Component<Props, {}, "selectedIndex">;
type MultiSwitch = ReturnType<typeof MultiSwitch>;
export default MultiSwitch;
