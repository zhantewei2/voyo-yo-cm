import Vue, { CreateElement, VNode } from "vue";
import { TableColumn } from "element-ui";
interface TableColumnCustomer extends TableColumn {
    template?: (h: CreateElement) => VNode;
}
export default class Table extends Vue {
    columns: TableColumnCustomer[];
    loading: boolean;
    handleColumnTemplate: (h: CreateElement, column: any) => (slotArgs: any) => any;
}
export {};
