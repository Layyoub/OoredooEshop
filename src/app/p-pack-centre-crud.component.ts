import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PPackCentre {
  id?: number;
  idPPack?: number;
  codCent?: string;
  etat?: string;
  packName?: string;
  centreName?: string;
  description?: string;
}

interface Pack {
  id: number;
  nomOffre: string;
}

interface Centre {
  cdDist: string;
  designationCentre?: string;
}

@Component({
  selector: 'app-p-pack-centre-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      
      <div class="add-btn-row">
        <button class="add-button" (click)="openAddModal()">+ Add P_PACK_CENTRE</button>
      </div>
      <div class="ppack-centre-cards">
        <div class="ppack-centre-card" *ngFor="let item of items">
          <div class="card-body">
            <div><span class="label">Pack:</span> <span class="value">{{ item.packName }}</span></div>
            <div><span class="label">Centre:</span> <span class="value">{{ item.centreName }}</span></div>
            <div><span class="label">Description:</span> <span class="value">{{ item.description }}</span></div>
          </div>
          <div class="actions">
            <button class="btn edit" (click)="openEditModal(item)">Edit</button>
            <button class="btn delete" (click)="deleteItem(item.id)">Delete</button>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal" *ngIf="showModal">
        <div class="modal-content">
          <h3>{{ editMode ? 'Edit' : 'Add' }} P_PACK_CENTRE</h3>
          <form (ngSubmit)="saveItem()" class="modal-form">
            <label>Pack:
              <select [(ngModel)]="currentItem.idPPack" name="idPPack" required>
                <option *ngFor="let pack of packs" [value]="pack.id">{{ pack.nomOffre }}</option>
              </select>
            </label>
            <label>Centre:
              <select [(ngModel)]="currentItem.codCent" name="codCent" required>
                <option *ngFor="let centre of centres" [value]="centre.cdDist">{{ centre.designationCentre || centre.cdDist }}</option>
              </select>
            </label>
            <label>Description:
              <input [(ngModel)]="currentItem.etat" name="etat" />
            </label>
            <div class="modal-actions">
              <button type="submit" class="btn save" [disabled]="!isFormValid">Save</button>
              <button type="button" class="btn cancel" (click)="closeModal()">Cancel</button>
            </div>
          </form>
          <div class="error-msg" *ngIf="errorMsg">{{ errorMsg }}</div>
        </div>
      </div>
      <style>
        .ppack-centre-cards { display: flex; flex-wrap: wrap; gap: 1rem; margin: 1rem 0; justify-content: center; }
        .ppack-centre-card {
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
        .ppack-centre-card:hover {
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
        .modal { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #0008; display: flex; align-items: center; justify-content: center; }
        .modal-content { background: #fff; padding: 2rem; border-radius: 12px; min-width: 340px; box-shadow: 0 4px 24px #e6000033; }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        label {
          display: flex;
          flex-direction: column;
          font-weight: 500;
        }
        input, select {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 0.4rem 0.7rem;
          font-size: 1rem;
          margin-top: 0.2rem;
          background: #fafafa;
          width: 100%;
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
        .add-btn-row {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-bottom: 1rem;
        }
      </style>
    </div>
  `
})
export class PPackCentreCrudComponent implements OnInit {
  items: PPackCentre[] = [];
  packs: Pack[] = [];
  centres: Centre[] = [];
  showModal = false;
  editMode = false;
  currentItem: PPackCentre = {};
  errorMsg = '';
  formTouched = false;

  get isFormValid() {
    return this.currentItem.idPPack && this.currentItem.codCent;
  }

  ngOnInit() {
    this.fetchItems();
    this.fetchPacks();
    this.fetchCentres();
  }

  fetchItems() {
    const token = localStorage.getItem('token');
    fetch('/api/pack-centres', {
      headers: { 'Authorization': token ? `Bearer ${token}` : '' }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch'))
      .then(data => this.items = data)
      .catch(err => this.errorMsg = err);
  }

  fetchPacks() {
    const token = localStorage.getItem('token');
    fetch('/api/packs', {
      headers: { 'Authorization': token ? `Bearer ${token}` : '' }
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => this.packs = data);
  }

  fetchCentres() {
    const token = localStorage.getItem('token');
    fetch('/api/centres', {
      headers: { 'Authorization': token ? `Bearer ${token}` : '' }
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => this.centres = data);
  }

  openAddModal() {
    this.editMode = false;
    this.currentItem = {};
    this.showModal = true;
    this.errorMsg = '';
    this.formTouched = false;
  }

  openEditModal(item: PPackCentre) {
    this.editMode = true;
    this.currentItem = { ...item };
    this.showModal = true;
    this.errorMsg = '';
    this.formTouched = false;
  }

  closeModal() {
    this.showModal = false;
    this.errorMsg = '';
  }

  saveItem() {
    this.formTouched = true;
    if (!this.isFormValid) {
      this.errorMsg = 'Pack and Centre are required.';
      return;
    }
    const url = this.editMode && this.currentItem.id ? `/api/pack-centres/${this.currentItem.id}` : '/api/pack-centres';
    const method = this.editMode && this.currentItem.id ? 'PUT' : 'POST';
    const token = localStorage.getItem('token');
    // Only send the required fields for backend
    const payload = {
      idPPack: this.currentItem.idPPack,
      codCent: this.currentItem.codCent,
      etat: this.currentItem.etat
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
      .then(() => { this.fetchItems(); this.closeModal(); })
      .catch(err => this.errorMsg = err);
  }

  deleteItem(id?: number) {
    const token = localStorage.getItem('token');
    if (id && confirm('Delete this item?')) {
      fetch(`/api/pack-centres/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token ? `Bearer ${token}` : '' }
      })
        .then(() => this.fetchItems());
    }
  }

  getPackName(id: number | undefined): string {
    const pack = this.packs.find(p => p.id === id);
    return pack ? pack.nomOffre : (id ? id.toString() : '');
  }
  getCentreName(id: string | undefined): string {
    const centre = this.centres.find(c => c.cdDist === id);
    return centre ? (centre.designationCentre || centre.cdDist) : (id ? id : '');
  }
}
