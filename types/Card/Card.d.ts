import { CreateElement, RenderContext } from "vue";
/**
 * @props
 * {title:string}
 *
 * @slots
 * {footer}
 * {title}
 * {default}
 *
 */
export declare const Card: {
    functional: boolean;
    render(h: CreateElement, params: RenderContext<{
        title?: string;
    }>): JSX.Element;
};
