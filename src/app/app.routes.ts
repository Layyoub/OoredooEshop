import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth', loadComponent: () => import('./auth.component').then(m => m.AuthComponent) },
  { path: 'dashboard', loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    children: [
      { path: 'produit', loadComponent: () => import('./produit-crud.component').then(m => m.ProduitCrudComponent) },
      { path: 'p_pack', loadComponent: () => import('./p-pack-crud.component').then(m => m.PPackCrudComponent) },
      { path: 'p_detail_pack', loadComponent: () => import('./p-detail-pack-crud.component').then(m => m.PDetailPackCrudComponent) },
      { path: 'p_pack_service', loadComponent: () => import('./p-pack-service-crud.component').then(m => m.PPackServiceCrudComponent) },
      { path: 'p_pack_centre', loadComponent: () => import('./p-pack-centre-crud.component').then(m => m.PPackCentreCrudComponent) },
      { path: 'centre', loadComponent: () => import('./centre-crud.component').then(m => m.CentreCrudComponent) },
      { path: 'reduction', loadComponent: () => import('./reduction-crud.component').then(m => m.ReductionCrudComponent) },
    ]
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];
