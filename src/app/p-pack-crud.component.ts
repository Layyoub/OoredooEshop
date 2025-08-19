import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Produit {
  codeProduit: string;
  desStorecash?: string;
}
interface PPackService {
  id?: number;
  serviceName?: string;
}
interface PPack {
  id?: number;
  nomOffre?: string;
  description?: string;
  prixGlobal?: number;
  etat?: string;
  dateDebut?: string;
  dateFin?: string;
}

@Component({
  selector: 'app-p-pack-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <button class="add-button" (click)="openAddModal()">+ Add Pack</button>
      <div class="pack-cards">
        <div class="pack-card" *ngFor="let pack of packs">
          <div class="pack-card-header">
            <span class="pack-title">{{ pack.nomOffre }}</span>
            <span class="pack-etat">{{ pack.etat }}</span>
          </div>
          <div class="pack-card-body card-body">
            <div><span class="label">Nom Offre:</span> <span class="value">{{ pack.nomOffre }}</span></div>
            <div><span class="label">Description:</span> <span class="value">{{ pack.description }}</span></div>
            <div><span class="label">Prix Global:</span> <span class="value">{{ pack.prixGlobal }}</span></div>
            <div><span class="label">Etat:</span> <span class="value">{{ pack.etat }}</span></div>
            <div><span class="label">Date Début:</span> <span class="value">{{ pack.dateDebut }}</span></div>
            <div><span class="label">Date Fin:</span> <span class="value">{{ pack.dateFin }}</span></div>
          </div>
          <div class="pack-card-actions actions">
            <button class="btn edit" (click)="openEditModal(pack)">Edit</button>
            <button class="btn delete" (click)="deletePack(pack.id)">Delete</button>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal" *ngIf="showModal">
        <div class="modal-content animate-modal">
          <h3>{{ editMode ? 'Edit Pack' : 'Add Pack' }}</h3>
          <form (ngSubmit)="savePack()">
            <label>Nom Offre:
              <input [(ngModel)]="currentPack.nomOffre" name="nomOffre" required [class.invalid]="formTouched && !currentPack.nomOffre" />
            </label>
            <label>Description:
              <input [(ngModel)]="currentPack.description" name="description" />
            </label>
            <label>Prix Global:
              <input type="number" [(ngModel)]="currentPack.prixGlobal" name="prixGlobal" />
            </label>
            <label>Etat:
              <input [(ngModel)]="currentPack.etat" name="etat" />
            </label>
            <label>Date Début:
              <input type="date" [(ngModel)]="currentPack.dateDebut" name="dateDebut" />
            </label>
            <label>Date Fin:
              <input type="date" [(ngModel)]="currentPack.dateFin" name="dateFin" />
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
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        min-height: 100vh;
        background: #f7f8fa;
        padding: 2rem 0;
      }
      .add-button {
        background: #e60000;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 0.5rem 1.2rem;
        font-size: 1rem;
        margin-bottom: 1rem;
        cursor: pointer;
        transition: background 0.2s;
      }
      .add-button:hover {
        background: #b30000;
      }
      .pack-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 1rem 0;
        justify-content: center;
      }
      .pack-card {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 12px #0002;
        padding: 1.2rem 1.5rem;
        min-width: 240px;
        max-width: 280px;
        flex: 1 1 240px;
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        margin-bottom: 1rem;
        transition: box-shadow 0.2s, transform 0.2s;
      }
      .pack-card:hover {
        box-shadow: 0 4px 18px #e6000033;
        transform: translateY(-2px) scale(1.03);
      }
      .card-body {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .label {
        font-weight: bold;
        color: #222;
        margin-right: 0.3rem;
      }
      .value {
        color: #444;
      }
      .actions {
        display: flex;
        gap: 0.7rem;
        margin-top: 0.5rem;
      }
      .btn {
        padding: 0.4rem 1.1rem;
        border-radius: 6px;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.2s;
      }
      .btn.edit {
        background: #e60000;
        color: #fff;
      }
      .btn.edit:hover {
        background: #b30000;
      }
      .btn.delete {
        background: #eee;
        color: #333;
      }
      .btn.delete:hover {
        background: #ccc;
      }
      .modal {
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: #0008;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .modal-content {
        background: #fff;
        padding: 2rem 2.5rem;
        border-radius: 12px;
        min-width: 340px;
        box-shadow: 0 4px 24px #e6000033;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        animation: modalIn 0.25s;
      }
      @keyframes modalIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
      }
      label {
        display: flex;
        flex-direction: column;
        font-weight: 500;
        margin-bottom: 0.2rem;
      }
      input, select {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 0.4rem 0.7rem;
        font-size: 1rem;
        margin-top: 0.2rem;
        background: #fafafa;
        transition: border 0.2s;
      }
      input:focus, select:focus {
        border-color: #e60000;
        outline: none;
      }
      input.invalid {
        border: 1.5px solid #d9534f;
        background: #fff0f0;
      }
      .modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
      }
      .btn.save {
        background: #e60000;
        color: #fff;
      }
      .btn.save:disabled {
        background: #ccc;
        color: #fff;
        cursor: not-allowed;
      }
      .btn.cancel {
        background: #eee;
        color: #333;
      }
      .btn.cancel:hover {
        background: #ccc;
      }
      .error-msg {
        color: #e60000;
        margin-top: 0.5rem;
        font-size: 0.95rem;
        text-align: center;
      }
    </style>
  `
})
export class PPackCrudComponent implements OnInit {
  packs: PPack[] = [];
  produits: Produit[] = [];
  services: PPackService[] = [];
  showModal = false;
  editMode = false;
  currentPack: PPack = {};
  errorMsg = '';
  formTouched = false;
  selectedProduits: string[] = [];
  selectedServices: number[] = [];

  get isFormValid() {
    return this.currentPack.nomOffre && this.currentPack.nomOffre.trim().length > 0;
  }

  ngOnInit() {
    this.fetchPacks();
    this.fetchProduits();
    this.fetchServices();
  }

  fetchPacks() {
    const token = localStorage.getItem('token');
    fetch('/api/packs', {
      headers: { 'Authorization': token ? `Bearer ${token}` : '' }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch packs'))
      .then(data => this.packs = data)
      .catch(err => this.errorMsg = err);
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
    this.currentPack = {};
    this.selectedProduits = [];
    this.selectedServices = [];
    this.showModal = true;
    this.errorMsg = '';
    this.formTouched = false;
  }

  openEditModal(pack: any) {
    this.editMode = true;
    this.currentPack = { ...pack };
    this.selectedProduits = pack.produits ? pack.produits.map((p: Produit) => p.codeProduit) : [];
    this.selectedServices = pack.services ? pack.services.map((s: PPackService) => s.id) : [];
    this.showModal = true;
    this.errorMsg = '';
    this.formTouched = false;
  }

  closeModal() {
    this.showModal = false;
  }

  savePack() {
    this.formTouched = true;
    if (!this.isFormValid) {
      this.errorMsg = "Veuillez remplir le nom de l'offre.";
      return;
    }
    const token = localStorage.getItem('token');
    const packToSave = {
      ...this.currentPack,
      produits: this.produits.filter(p => this.selectedProduits.includes(p.codeProduit)),
      services: this.services.filter(s => s.id !== undefined && this.selectedServices.includes(s.id))
    };
    const url = this.editMode && this.currentPack.id ? `/api/packs/${this.currentPack.id}` : '/api/packs';
    const method = this.editMode && this.currentPack.id ? 'PUT' : 'POST';
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(packToSave)
    })
      .then(res => res.ok ? res.json() : res.text().then(text => Promise.reject(text)))
      .then(() => { this.fetchPacks(); this.closeModal(); })
      .catch(err => this.errorMsg = err);
  }

  deletePack(id?: number) {
    const token = localStorage.getItem('token');
    if (id && confirm('Delete this pack?')) {
      fetch(`/api/packs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token ? `Bearer ${token}` : '' }
      })
        .then(() => this.fetchPacks());
    }
  }
}
