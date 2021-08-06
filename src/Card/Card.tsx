import {CreateElement, RenderContext} from "vue";
import {resolveClass, resolveStyle} from "../util";
import {setting} from "../setting";

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
export const Card= {
  functional: true,
  render(h:CreateElement,params:RenderContext<{
    title?: string
  }>){
    
    const {slots,data,props}=params;
    const scope=slots();
    const headerExists=props.title || !!scope.title;
    const footerExists=!!scope.footer;
    
    return (
      <div class={resolveClass(data,["yo-card",headerExists?"__withHeader":"__noHeader"])} style={resolveStyle(data)}>
        {headerExists?
          <header>
          {!scope.title?<span class="_header-title">{props.title||''}</span>:null}
          {scope.title}
           </header>
          : null
        }
        <main>
          {scope.default}
        </main>
        {footerExists?<footer style={{textAlign:setting.card.footerAlign}}>
          {scope.footer}
        </footer>:null}
      </div>
    )
  }
}
