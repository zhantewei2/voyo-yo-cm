import { CreateElement, RenderContext } from "vue";
interface LoaderProps {
    block: boolean;
    loading: boolean;
}
export declare const blockRender: (h: CreateElement, props: LoaderProps) => JSX.Element;
export declare const inlineRender: (h: CreateElement, props: LoaderProps) => JSX.Element;
export declare const Loader: {
    functional: boolean;
    render(h: CreateElement, params: RenderContext<LoaderProps>): JSX.Element;
};
export {};
