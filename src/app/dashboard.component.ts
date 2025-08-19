import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

function getCurrentUser(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null;
  } catch {
    return null;
  }
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="dashboard-root">
      <aside class="sidebar">
        <div class="sidebar-header">Dashboard</div>
        <nav>
          <ul>
            <li><a routerLink="/dashboard/produit" routerLinkActive="active">Produit</a></li>
            <li><a routerLink="/dashboard/p_pack" routerLinkActive="active">P_PACK</a></li>
            <li><a routerLink="/dashboard/p_detail_pack" routerLinkActive="active">P_DETAIL_PACK</a></li>
            <li><a routerLink="/dashboard/p_pack_service" routerLinkActive="active">P_PACK_SERVICE</a></li>
            <li><a routerLink="/dashboard/p_pack_centre" routerLinkActive="active">P_PACK_CENTRE</a></li>
            <li><a routerLink="/dashboard/centre" routerLinkActive="active">CENTRE</a></li>
            <li><a routerLink="/dashboard/reduction" routerLinkActive="active">Vouchers</a></li>
          </ul>
        </nav>
      </aside>
      <main class="main-content">
        <header class="navbar">
          <div class="navbar-left">
            <span class="navbar-title">Analytics Dashboard</span>
          </div>
          <div class="navbar-right">
            <span class="navbar-user">{{ username }}</span>
            <img src="https://randomuser.me/api/portraits/lego/1.jpg" class="user-avatar" alt="User" />
            <button class="logout-btn" (click)="logout()">Logout</button>
          </div>
        </header>
        <section class="dashboard-cards" *ngIf="isDashboardHome()">
          <div class="card card-metrics">
            <div class="card-row">
              <div class="metric">
                <div class="metric-label">Packs</div>
                <div class="metric-value">{{ stats.packs }}</div>
                <div class="metric-sub">total packs</div>
              </div>
              <div class="metric">
                <div class="metric-label">Produits</div>
                <div class="metric-value">{{ stats.produits }}</div>
                <div class="metric-sub">total produits</div>
              </div>
              <div class="metric">
                <div class="metric-label">Centres</div>
                <div class="metric-value">{{ stats.centres }}</div>
                <div class="metric-sub">total centres</div>
              </div>
              <div class="metric">
                <div class="metric-label">Services</div>
                <div class="metric-value">{{ stats.services }}</div>
                <div class="metric-sub">total services</div>
              </div>
              <div class="metric">
                <div class="metric-label">Detail Packs</div>
                <div class="metric-value">{{ stats.detailPacks }}</div>
                <div class="metric-sub">total details</div>
              </div>
              <div class="metric">
                <div class="metric-label">Vouchers</div>
                <div class="metric-value">{{ stats.vouchers }}</div>
                <div class="metric-sub">total vouchers</div>
              </div>
            </div>
          </div>
        
        
        </section>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: `
    .dashboard-root { display: flex; min-height: 100vh; background: #f7f8fa; }
    .sidebar { width: 220px; background: linear-gradient(180deg, #00c6a7 0%, #1e90ff 100%); color: #fff; padding: 0; display: flex; flex-direction: column; box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1); }
    .sidebar-header { font-size: 1.6rem; font-weight: bold; padding: 2rem 1.5rem 1rem; letter-spacing: 2px; }
    .sidebar nav ul { list-style: none; padding: 0 1.5rem; margin: 0; }
    .sidebar nav ul li { padding: 0.7rem 0; font-size: 1.08rem; opacity: 0.85; cursor: pointer; border-left: 3px solid transparent; transition: background 0.2s, border 0.2s; }
    .sidebar nav ul li.active, .sidebar nav ul li:hover { background: rgba(255, 255, 255, 0.2); border-left: 3px solid #fff; opacity: 1; }
    .sidebar nav ul li a { color: #fff; text-decoration: none; display: block; }
    .main-content { flex: 1; display: flex; flex-direction: column; min-width: 0; }
    .navbar { display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 1.2rem 2rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); margin-bottom: 2rem; }
    .navbar-title { font-size: 1.3rem; font-weight: 600; color: #222; }
    .navbar-user { margin-right: 1rem; font-weight: 500; color: #444; }
    .user-avatar { width: 38px; height: 38px; border-radius: 50%; border: 2px solid #eee; object-fit: cover; }
    .dashboard-cards { display: flex; flex-wrap: wrap; gap: 2rem; padding: 0 2rem 2rem; }
    .card { background: #fff; border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); padding: 1.5rem 2rem; min-width: 320px; flex: 1 1 320px; display: flex; flex-direction: column; margin-bottom: 1rem; }
    .card-metrics .card-row { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2rem; }
    .metric { flex: 1; text-align: left; min-width: 150px; }
    .metric-label { font-size: 1rem; color: #888; margin-bottom: 0.3rem; }
    .metric-value { font-size: 2rem; font-weight: bold; color: #222; }
    .metric-sub { font-size: 0.95rem; color: #888; }
    .card-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; color: #1e90ff; }
    .chart-placeholder { height: 120px; background: repeating-linear-gradient(135deg, #e60000 0 10px, #fff 10px 20px); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 600; font-size: 1.1rem; opacity: 0.7; }
    .card-footer { font-size: 0.98rem; color: #00c6a7; margin-top: 0.5rem; }
    .card-timeline { min-width: 320px; max-width: 400px; }
    .timeline { list-style: none; padding: 0; margin: 0; }
    .timeline li { display: flex; align-items: center; margin-bottom: 0.7rem; font-size: 1rem; color: #444; }
    .timeline .dot { width: 12px; height: 12px; border-radius: 50%; background: #1e90ff; margin-right: 0.7rem; display: inline-block; }
    .timeline-badge { background: #e60000; color: #fff; border-radius: 8px; padding: 0.1rem 0.6rem; font-size: 0.85rem; margin-left: 0.7rem; }
    .timeline-badge.new { background: #1e90ff; }
    .timeline-time { margin-left: auto; color: #888; font-size: 0.95rem; }
    .logout-btn { background: #d9534f; color: white; border: none; border-radius: 4px; padding: 0.4rem 0.8rem; margin-left: 1rem; cursor: pointer; }
  `
})
export class DashboardComponent implements OnInit {
  username = getCurrentUser();
  stats = { packs: 0, produits: 0, centres: 0, services: 0, detailPacks: 0, vouchers: 0 };

  constructor(private router: Router) {}

  ngOnInit() { this.loadStats(); }

  private loadStats() {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};

    const fetchJson = (url: string) => fetch(url, { headers }).then(r => r.ok ? r.json() : []);

    Promise.all([
      fetchJson('/api/packs'),
      fetchJson('/api/produits'),
      fetchJson('/api/centres'),
      fetchJson('/api/pack-services'),
      fetchJson('/api/detail-packs'),
      fetchJson('/api/reductions')
    ]).then(([packs, produits, centres, services, detailPacks, vouchers]) => {
      this.stats = {
        packs: Array.isArray(packs) ? packs.length : 0,
        produits: Array.isArray(produits) ? produits.length : 0,
        centres: Array.isArray(centres) ? centres.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        detailPacks: Array.isArray(detailPacks) ? detailPacks.length : 0,
        vouchers: Array.isArray(vouchers) ? vouchers.length : 0,
      };
    }).catch(() => {
      // keep defaults on failure
    });
  }

  isDashboardHome() { return this.router.url === '/dashboard'; }
  logout() { localStorage.removeItem('token'); window.location.href = '/auth'; }
}