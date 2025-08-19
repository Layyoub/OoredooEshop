import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PDetailPack {
  id?: number;
  packId?: number;
  produitId?: number;
  description?: string;
  produitIds?: string[];
  serviceIds?: number[];
  numOrd?: number;
  codProd?: string;
  datMaj?: string;
  desProd?: string;
  tmCode?: number;
  pattern?: string;
}

interface Pack { id: number; nomOffre: string; }
interface Produit { codeProduit: string; desStorecash?: string; }
interface PPackService { id: number; serviceName?: string; name?: string; } // add name here

@Component({
  selector: 'app-p-detail-pack-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>P_DETAIL_PACK Management</h2>
      <button class="add-button" (click)="openAddModal()">+ Add Detail</button>
      <div class="detail-cards">
        <div class="detail-card" *ngFor="let detail of details">
          <div class="detail-header">
            <span class="pack-label">Pack:</span>
            <span class="pack-value">{{ getPackName(detail.packId) }}</span>
          </div>
          <div class="detail-section">
            <span class="section-label">Produits:</span>
            <span class="badge-list">
              <span class="badge" *ngFor="let name of getProduitNames(detail.produitIds).split(', ')">{{ name }}</span>
            </span>
          </div>
          <div class="detail-section">
            <span class="section-label">Services:</span>
            <span class="badge-list">
              <span class="badge service" *ngFor="let name of getServiceNames(detail.serviceIds).split(', ')">{{ name }}</span>
            </span>
          </div>
          <div class="detail-section">
            <span class="section-label">Description:</span>
            <span class="desc-value">{{ detail.description }}</span>
          </div>
          <div class="detail-section">
            <span class="section-label">Order #:</span>
            <span class="desc-value">{{ detail.numOrd !== undefined ? detail.numOrd : '-' }}</span>
          </div>
          <div class="detail-section">
            <span class="section-label">Product Code:</span>
            <span class="desc-value">{{ detail.codProd || '-' }}</span>
          </div>
          <div class="detail-section">
            <span class="section-label">Last Modified:</span>
            <span class="desc-value">{{ detail.datMaj || '-' }}</span>
          </div>
          <div class="detail-section">
            <span class="section-label">Product Desc:</span>
            <span class="desc-value">{{ detail.desProd || '-' }}</span>
          </div>
          <div class="detail-section">
            <span class="section-label">TM Code:</span>
            <span class="desc-value">{{ detail.tmCode !== undefined ? detail.tmCode : '-' }}</span>
          </div>
          <div class="detail-section">
            <span class="section-label">Pattern:</span>
            <span class="desc-value">{{ detail.pattern || '-' }}</span>
          </div>
          <div class="detail-actions">
            <button (click)="openEditModal(detail)" class="btn edit">Edit</button>
            <button (click)="deleteDetail(detail.id)" class="btn delete">Delete</button>
          </div>
        </div>
      </div>
      <!-- Modal Form -->
      <div class="modal" *ngIf="showModal">
        <div class="modal-content">
          <h3>{{ editMode ? 'Edit Detail' : 'Add Detail' }}</h3>
          <form (ngSubmit)="saveDetail()">
            <label>Pack:
              <select [(ngModel)]="currentDetail.packId" name="packId" required>
                <option value="" disabled selected>Select a pack</option>
                <option *ngFor="let pack of packs" [ngValue]="pack.id">{{ pack.nomOffre }}</option>
              </select>
            </label>
            <label>Produits:
              <select multiple [(ngModel)]="currentDetail.produitIds" name="produitIds" required>
                <option *ngFor="let prod of produits" [ngValue]="prod.codeProduit">{{ prod.desStorecash || prod.codeProduit }}</option>
              </select>
              <small>Select one or more products</small>
            </label>
            <label>Services:
              <select multiple [(ngModel)]="currentDetail.serviceIds" name="serviceIds">
                <option *ngFor="let serv of services" [ngValue]="serv.id">{{ serv.serviceName || serv.name || serv.id }}</option>
              </select>
              <small>(Optional) Select one or more services</small>
            </label>
            <label>Description:
              <input [(ngModel)]="currentDetail.description" name="description" placeholder="Description (optional)" />
            </label>
            <label>Order Number:
              <input [(ngModel)]="currentDetail.numOrd" name="numOrd" type="number" placeholder="Order Number" />
            </label>
            <label>Product Code:
              <input [(ngModel)]="currentDetail.codProd" name="codProd" placeholder="Product Code" />
            </label>
            <label>Last Modified Date:
              <input [(ngModel)]="currentDetail.datMaj" name="datMaj" type="date" placeholder="YYYY-MM-DD" />
            </label>
            <label>Product Description:
              <input [(ngModel)]="currentDetail.desProd" name="desProd" placeholder="Product Description" />
            </label>
            <label>TM Code:
              <input [(ngModel)]="currentDetail.tmCode" name="tmCode" type="number" placeholder="TM Code" />
            </label>
            <label>Pattern:
              <input [(ngModel)]="currentDetail.pattern" name="pattern" placeholder="Pattern" />
            </label>
            <div class="modal-actions">
              <button type="submit" class="btn save" [disabled]="!isFormValid">Save</button>
              <button type="button" class="btn cancel" (click)="closeModal()">Cancel</button>
            </div>
          </form>
          <div class="error-msg" *ngIf="errorMsg">{{ errorMsg }}</div>
        </div>
      </div>
    </div>
    <style>
      body, .container {
        background: #f7f8fa;
      }
      .add-button {
        margin-bottom: 1.5rem;
        background-color: #1e90ff;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
      }
      .detail-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
      }
      .detail-card {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 4px 16px #0001;
        padding: 2rem 2.5rem;
        width: 350px;
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        transition: box-shadow 0.2s;
      }
      .detail-card:hover {
        box-shadow: 0 8px 32px #0002;
      }
      .detail-header {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #1e90ff;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .pack-label {
        font-weight: 500;
        color: #555;
      }
      .pack-value {
        font-weight: 700;
        color: #222;
      }
      .detail-section {
        margin-bottom: 0.8rem;
        width: 100%;
        display: flex;
        align-items: center;
      }
      .section-label {
        font-weight: 500;
        color: #888;
        margin-right: 0.5rem;
        min-width: 90px;
        display: inline-block;
      }
      .badge-list {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 0.3rem;
      }
      .badge {
        background: #e3f2fd;
        color: #1976d2;
        border-radius: 12px;
        padding: 0.2rem 0.7rem;
        font-size: 0.95em;
        font-weight: 500;
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
        display: inline-block;
      }
      .badge.service {
        background: #f3e5f5;
        color: #8e24aa;
      }
      .desc-value {
        color: #444;
        font-size: 1em;
        margin-left: 0.3rem;
      }
      .detail-actions {
        margin-top: 1.2rem;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
      }
      .btn {
        padding: 0.5rem 1.3rem;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        font-weight: 500;
        font-size: 1em;
      }
      .edit {
        background-color: #f0ad4e;
        color: white;
      }
      .delete {
        background-color: #f44336;
        color: white;
      }
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
        text-align: left;
      }
      form label {
        display: block;
        margin-bottom: 1rem;
      }
      input, textarea, select {
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.3rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .modal-actions {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
      }
      .save {
        background-color: #28a745;
        color: white;
      }
      .cancel {
        background-color: #6c757d;
        color: white;
      }
      .error-msg {
        color: red;
        margin-top: 1rem;
      }
      input.invalid {
        border: 1.5px solid #d9534f;
        background: #fff0f0;
      }
    </style>
  `
})
export class PDetailPackCrudComponent implements OnInit {
  details: PDetailPack[] = [];
  packs: Pack[] = [];
  produits: Produit[] = [];
  services: PPackService[] = [];
  showModal = false;
  editMode = false;
  currentDetail: any = { produitIds: [], serviceIds: [] };
  errorMsg = '';
  formTouched = false;

  get isFormValid() {
    return this.currentDetail.packId && (this.currentDetail.produitIds.length > 0 || this.currentDetail.serviceIds.length > 0);
  }

  ngOnInit() {
    this.fetchDetails();
    this.fetchPacks();
    this.fetchProduits();
    this.fetchServices();
  }

  fetchDetails() {
    const token = localStorage.getItem('token');
    fetch('/api/detail-packs', { headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch details'))
      .then(data => this.details = data)
      .catch(err => this.errorMsg = err);
  }

  fetchPacks() {
    const token = localStorage.getItem('token');
    fetch('/api/packs', { headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
      .then(res => res.ok ? res.json() : [])
      .then(data => this.packs = data);
  }
  fetchProduits() {
    const token = localStorage.getItem('token');
    fetch('/api/produits', { headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
      .then(res => res.ok ? res.json() : [])
      .then(data => this.produits = data);
  }
  fetchServices() {
    const token = localStorage.getItem('token');
    fetch('/api/pack-services', { headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
      .then(res => res.ok ? res.json() : [])
      .then(data => this.services = data);
  }

  openAddModal() {
    this.editMode = false;
    this.currentDetail = { produitIds: [], serviceIds: [] };
    this.showModal = true;
    this.errorMsg = '';
    this.formTouched = false;
  }

  openEditModal(detail: PDetailPack) {
    this.editMode = true;
    this.currentDetail = { ...detail, produitIds: detail.produitIds ? detail.produitIds : [], serviceIds: detail.serviceIds ? detail.serviceIds : [] };
    this.showModal = true;
    this.errorMsg = '';
    this.formTouched = false;
  }

  closeModal() {
    this.showModal = false;
    this.errorMsg = '';
  }

  saveDetail() {
    this.formTouched = true;
    if (!this.isFormValid) {
      this.errorMsg = 'Pack, and at least one product or service, are required.';
      return;
    }
    const url = this.editMode && this.currentDetail.id ? `/api/detail-packs/${this.currentDetail.id}` : '/api/detail-packs';
    const method = this.editMode && this.currentDetail.id ? 'PUT' : 'POST';
    const token = localStorage.getItem('token');
    const payload = {
      packId: this.currentDetail.packId,
      produitIds: this.currentDetail.produitIds,
      serviceIds: this.currentDetail.serviceIds,
      description: this.currentDetail.description,
      numOrd: this.currentDetail.numOrd,
      codProd: this.currentDetail.codProd,
      datMaj: this.currentDetail.datMaj,
      desProd: this.currentDetail.desProd,
      tmCode: this.currentDetail.tmCode,
      pattern: this.currentDetail.pattern
    };
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.ok ? res.json() : res.text().then(text => Promise.reject(text)))
      .then(() => { this.fetchDetails(); this.closeModal(); })
      .catch(err => this.errorMsg = err);
  }

  deleteDetail(id?: number) {
    const token = localStorage.getItem('token');
    if (id && confirm('Delete this detail?')) {
      fetch(`/api/detail-packs/${id}`, { method: 'DELETE', headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
        .then(() => this.fetchDetails());
    }
  }

  getPackName(id: number | undefined) {
    const pack = this.packs.find(p => p.id === id);
    return pack ? pack.nomOffre : id;
  }
  getProduitNames(ids: string[] = []) {
    return ids.map(code => {
      const prod = this.produits.find(p => p.codeProduit === code);
      return prod ? (prod.desStorecash || prod.codeProduit) : code;
    }).join(', ');
  }
  getServiceNames(ids: number[] = []) {
    return ids.map(id => {
      const serv = this.services.find(s => s.id === id);
      return serv ? (serv.name || serv.serviceName || serv.id) : id;
    }).join(', ');
  }
}
