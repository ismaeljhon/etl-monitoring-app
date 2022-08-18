import { ref } from 'vue';
import { TableColumn } from '../interfaces/theme/table.interface';

export default {};

export const companyColumns = ref<TableColumn[]>([
  {
    name: 'name',
    align: 'center',
    label: 'Name',
    field: 'name',
    sortable: true,
  },
  {
    name: 'code',
    align: 'center',
    label: 'Code',
    field: 'code',
    sortable: true,
  },
  {
    name: 'status',
    align: 'center',
    label: 'Status',
    field: 'status',
    sortable: true,
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Actions',
    field: '',
  },
]);

export const companySyncColumns = ref<TableColumn[]>([
  {
    name: 'name',
    align: 'center',
    label: 'Name',
    field: 'name',
    sortable: true,
  },
  {
    name: 'type',
    align: 'center',
    label: 'Type',
    field: 'type',
    sortable: true,
  },
  {
    name: 'using_sdk',
    align: 'center',
    label: 'SDK',
    field: 'using_sdk',
  },
  {
    name: 'run_command',
    align: 'center',
    label: 'Run Command',
    field: 'run_command',
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Actions',
    field: '',
  },
]);
