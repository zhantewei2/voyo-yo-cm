<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-6-17 13:4:39
-->
<script lang="tsx">
import Vue, { CreateElement, VNode } from "vue";
import { Component, Prop } from "vue-property-decorator";
//@ts-ignore
import { TableColumn } from "element-ui";
interface TableColumnCustomer extends TableColumn {
  template?: (h: CreateElement) => VNode;
}

@Component({
  render(this: Table, h: CreateElement) {
    return (
      <article class="rel p-3">
        {h(
          "el-table",
          {
            on: this.$listeners,
            props: this.$attrs,
          },
          [
            this.columns
              ? this.columns.map((column) => {
                  return h(
                    "el-table-column",
                    {
                      props: {...column,template: undefined},
                    },
                    [
                      column.template
                        ? this.handleColumnTemplate(h, column)
                        : null as any,
                    ],
                  );
                })
              : null,
            this.$slots.default,
          ],
        )}
        <yo-loader block="true" loading={this.loading} />
      </article>
    );
  },
})
export default class Table extends Vue {
  @Prop({}) columns: TableColumnCustomer[];
  @Prop({}) loading: boolean;
  handleColumnTemplate =
    (h: CreateElement, column: TableColumn) => (slotArgs: any) => column.template(h, slotArgs);
}
</script>
<style scoped lang="scss"></style>
