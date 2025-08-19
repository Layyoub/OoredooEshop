import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Produit {
  codeProduit: string;
  desStorecash?: string;
}

interface PPack {
  nomOffre: string;
}

interface Centre {
  cdDist: string;
  codeFraisLiv?: number;
  designationCentre?: string;
  adresseCentre?: string;
  codePostalCentre?: string;
  villeCentre?: string;
  telCentre?: string;
  faxCentre?: string;
  emailCentre?: string;
  centrePilote?: string;
  plan?: any;
  gMaps?: string;
  actif?: string;
  produits?: Produit[];
  packs?: PPack[];
}

@Component({
  selector: 'app-centre-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Centre Management</h2>
      <button class="add-button" (click)="openAddModal()">+ Add Centre</button>
      <div class="centre-cards">
        <div class="centre-card" *ngFor="let centre of centres">
          <div class="centre-header">
            <span>{{ centre.designationCentre || centre.cdDist }}</span>
            <span class="small-text">{{ centre.villeCentre }}</span>
          </div>
          <div class="centre-body card-body">
            <div><span class="label">Email:</span> <span class="value">{{ centre.emailCentre }}</span></div>
            <div><span class="label">Téléphone:</span> <span class="value">{{ centre.telCentre }}</span></div>
            <div><span class="label">Actif:</span> <span class="value">{{ centre.actif }}</span></div>
            <div><span class="label">Produits:</span> <span class="value">{{ centre.produits?.length || 0 }}<span *ngIf="centre.produits?.length"> - {{ getProduitNames(centre) }}</span></span></div>
            <div><span class="label">Packs:</span> <span class="value">{{ centre.packs?.length || 0 }}<span *ngIf="centre.packs?.length"> - {{ getPackNames(centre) }}</span></span></div>
          </div>
          <div class="centre-actions actions">
            <button class="btn edit" (click)="openEditModal(centre)">Edit</button>
            <button class="btn delete" (click)="deleteCentre(centre.cdDist)">Delete</button>
          </div>
        </div>
      </div>

      <!-- Modal Form -->
      <div class="modal" *ngIf="showModal">
        <div class="modal-content">
          <h3>{{ editMode ? 'Edit Centre' : 'Add Centre' }}</h3>
          <form (ngSubmit)="saveCentre()">
            <label>Code Centre:
              <input [(ngModel)]="currentCentre.cdDist" name="cdDist" [readonly]="editMode" required [class.invalid]="formTouched && !currentCentre.cdDist" />
            </label>
            <label>Designation:
              <input [(ngModel)]="currentCentre.designationCentre" name="designationCentre" required [class.invalid]="formTouched && !currentCentre.designationCentre" />
            </label>
            <label>Adresse:
              <input [(ngModel)]="currentCentre.adresseCentre" name="adresseCentre" />
            </label>
            <label>Code Postal:
              <input [(ngModel)]="currentCentre.codePostalCentre" name="codePostalCentre" />
            </label>
            <label>Ville:
              <input [(ngModel)]="currentCentre.villeCentre" name="villeCentre" />
            </label>
            <label>Email:
              <input [(ngModel)]="currentCentre.emailCentre" name="emailCentre" type="email" />
            </label>
            <label>Téléphone:
              <input [(ngModel)]="currentCentre.telCentre" name="telCentre" />
            </label>
            <label>Centre Pilote:
              <select [(ngModel)]="currentCentre.centrePilote" name="centrePilote">
                <option value="O">Oui</option>
                <option value="N">Non</option>
              </select>
            </label>
            <label>Actif:
              <select [(ngModel)]="currentCentre.actif" name="actif">
                <option value="O">Oui</option>
                <option value="N">Non</option>
              </select>
            </label>
            <label>Google Maps (iframe or URL):
              <textarea [(ngModel)]="currentCentre.gMaps" name="gMaps"></textarea>
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
      .centre-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 1rem 0;
        justify-content: center;
      }
      .centre-card {
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
      .centre-card:hover {
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
        top: 0; left: 0;
        width: 100vw; height: 100vh;
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

      input.invalid {
        border: 1.5px solid #d9534f;
        background: #fff0f0;
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
    </style>
  `
})
export class CentreCrudComponent implements OnInit {
  centres: Centre[] = [];
  showModal = false;
  editMode = false;
  currentCentre: Centre = { cdDist: '' };
  errorMsg = '';
  formTouched = false;

  get isFormValid() {
    return this.currentCentre.cdDist && this.currentCentre.cdDist.trim().length > 0 &&
           this.currentCentre.designationCentre && this.currentCentre.designationCentre.trim().length > 0;
  }

  ngOnInit() {
    this.fetchCentres();
  }

  fetchCentres() {
    const token = localStorage.getItem('token');
    fetch('/api/centres', { headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch centres'))
      .then(data => this.centres = data)
      .catch(err => this.errorMsg = err);
  }

  openAddModal() {
    this.editMode = false;
    this.currentCentre = { cdDist: '' };
    this.showModal = true;
    this.errorMsg = '';
    this.formTouched = false;
  }

  openEditModal(centre: Centre) {
    this.editMode = true;
    this.currentCentre = { ...centre };
    this.showModal = true;
    this.errorMsg = '';
    this.formTouched = false;
  }

  closeModal() {
    this.showModal = false;
    this.errorMsg = '';
  }

  saveCentre() {
    this.formTouched = true;
    if (!this.isFormValid) {
      this.errorMsg = 'Veuillez remplir tous les champs obligatoires (Code Centre, Désignation).';
      return;
    }
    const url = this.editMode ? `/api/centres/${this.currentCentre.cdDist}` : '/api/centres';
    const method = this.editMode ? 'PUT' : 'POST';
    const token = localStorage.getItem('token');
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(this.currentCentre)
    })
      .then(res => res.ok ? res.json() : res.text().then(text => Promise.reject(text)))
      .then(() => { this.fetchCentres(); this.closeModal(); })
      .catch(err => this.errorMsg = err);
  }

  deleteCentre(cdDist: string) {
    const token = localStorage.getItem('token');
    if (confirm('Delete this centre?')) {
      fetch(`/api/centres/${cdDist}`, { method: 'DELETE', headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
        .then(res => res.ok ? this.fetchCentres() : Promise.reject('Failed to delete centre'))
        .catch(err => this.errorMsg = err);
    }
  }

  getProduitNames(centre: Centre): string {
    return centre.produits?.map(p => p.desStorecash || p.codeProduit).join(', ') || '';
  }
  getPackNames(centre: Centre): string {
    return centre.packs?.map(pk => pk.nomOffre).join(', ') || '';
  }
}
