import { CreateElement, RenderContext, VNode } from "vue";
/**
 * Group
 * 如果 grid 不存在则响应式设置 grid.
 * @props {grid}
 */
export declare const Group: {
    functional: boolean;
    render(h: CreateElement, params: RenderContext<{
        grid?: number;
    }>): VNode;
};
/**
 * Cell
 * @props
 *  important :boolean 红星标记
 *  label :string label值
 *  span :number 占据位置 默认1
 *  color : Colors 字体颜色 默认为undefined
 * @slots
 *  {prefix}前置插槽
 *  {suffix}后置
 *  {default}默认
 */
export declare const Cell: {
    functional: boolean;
    render(h: CreateElement, params: RenderContext<{
        label?: string;
        span?: number;
        important?: boolean;
        color?: string;
    }>): JSX.Element;
};
