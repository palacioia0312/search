import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-dashboard-2-line',
    subItems: [
      {
        id: 5,
        label: 'MENUITEMS.DASHBOARD.LIST.ECOMMERCE',
        link: '',
        parentId: 2
      },
    ]
  },
  {
    id: 179,
    label: 'MENUITEMS.MULTILEVEL.TEXT',
    icon: 'ri-share-line',
    subItems: [
      {
        id: 180,
        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
        parentId: 179
      },
      {
        id: 181,
        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
        subItems: [
          {
            id: 182,
            label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
            parentId: 181,
          },
          {
            id: 183,
            label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
            parentId: 181,
          }
        ]
      },
    ]
  }

];
