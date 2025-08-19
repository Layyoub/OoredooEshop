import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Produit {
  codeProduit: string;
  desStorecash?: string;
  referenceProduit?: string;
  slogan?: string;
  description?: string;
  pvTtc?: number;
  pvHt?: number;
  txTva?: number;
  etat?: number;
  ordre?: number;
  pointsMerci?: string;
  sommeNote?: number;
  nombreVote?: number;
  dateSortie?: string;
  valeurTag?: number;
  flagDomicile?: string;
  flagCds?: string;
  verifStock?: string;
  pointsMerciMin?: string;
  message?: string;
  prixMoisTtc?: number;
  flagReservation?: string;
  livraisonGratuit?: string;
  flagAfficherReserv?: number;
  formulaireInfo?: string;
  flagPayOnDelivery?: string;
  centres?: Centre[];
}

interface Centre {
  cdDist: string;
  designationCentre?: string;
  villeCentre?: string;
}

@Component({
  selector: 'app-produit-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <button class="add-button" (click)="openAddModal()">+ Add Produit</button>
      <div class="produit-cards">
        <div class="produit-card" *ngFor="let produit of produits">
          <div class="produit-card-header">
            <span class="produit-title">{{ produit.desStorecash || produit.codeProduit }}</span>
            <span class="produit-ref">{{ produit.referenceProduit }}</span>
          </div>
          <div class="produit-card-body card-body">
            <div><span class="label">Code Produit:</span> <span class="value">{{ produit.codeProduit }}</span></div>
            <div><span class="label">Designation:</span> <span class="value">{{ produit.desStorecash }}</span></div>
            <div><span class="label">Slogan:</span> <span class="value">{{ produit.slogan }}</span></div>
            <div><span class="label">Prix TTC:</span> <span class="value">{{ produit.pvTtc }} TND</span></div>
            <div><span class="label">Centres:</span> <span class="value">{{ produit.centres?.length || 0 }}<span *ngIf="produit.centres?.length"> - {{ getCentreNames(produit) }}</span></span></div>
          </div>
          <div class="produit-card-actions actions">
            <button class="btn edit" (click)="openEditModal(produit)">Edit</button>
            <button class="btn delete" (click)="deleteProduit(produit.codeProduit)">Delete</button>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal" *ngIf="showModal">
        <div class="modal-content">
          <h3>{{ editMode ? 'Edit Produit' : 'Add Produit' }}</h3>
          <form (ngSubmit)="saveProduit()">
            <label>
              Code Produit:
              <input [(ngModel)]="currentProduit.codeProduit" name="codeProduit" [readonly]="editMode" required />
            </label>
            <label>
              Designation:
              <input [(ngModel)]="currentProduit.desStorecash" name="desStorecash" />
            </label>
            <label>
              Reference:
              <input [(ngModel)]="currentProduit.referenceProduit" name="referenceProduit" />
            </label>
            <label>
              Slogan:
              <input [(ngModel)]="currentProduit.slogan" name="slogan" />
            </label>
            <label>
              Prix TTC:
              <input type="number" [(ngModel)]="currentProduit.pvTtc" name="pvTtc" />
            </label>
            <label>
              Centres:
              <select multiple [(ngModel)]="selectedCentres" name="centres">
                <option *ngFor="let centre of centres" [value]="centre.cdDist">
                  {{ centre.designationCentre || centre.cdDist }} ({{ centre.villeCentre }})
                </option>
              </select>
            </label>
            <div class="modal-actions">
              <button type="submit" class="btn save">Save</button>
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

      h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
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

      .produit-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 1rem 0;
        justify-content: center;
      }

      .produit-card {
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

      .produit-card:hover {
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
        background: #fff;
        padding: 2rem;
        border-radius: 10px;
        width: 90%;
        max-width: 500px;
        text-align: left;
      }

      form label {
        display: block;
        margin-bottom: 0.8rem;
        font-weight: 500;
      }

      form input, form select {
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.3rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }

      .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;
      }

      .btn.save {
        background-color: #28a745;
        color: #fff;
      }

      .btn.cancel {
        background-color: #6c757d;
        color: #fff;
      }

      .error-msg {
        color: red;
        margin-top: 1rem;
      }

      @media (max-width: 600px) {
        .produit-cards {
          flex-direction: column;
          align-items: center;
        }
      }
    </style>
  `
})
export class ProduitCrudComponent implements OnInit {
  produits: Produit[] = [];
  centres: Centre[] = [];
  showModal = false;
  editMode = false;
  currentProduit: Produit = this.getEmptyProduit();
  selectedCentres: string[] = [];
  errorMsg: string = '';

  ngOnInit(): void {
    this.fetchProduits();
    this.fetchCentres();
  }

  fetchCentres() {
    const token = localStorage.getItem('token');
    fetch('/api/centres', { headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
      .then(res => res.json())
      .then(data => this.centres = data);
  }

  getEmptyProduit(): Produit {
    return {
      codeProduit: '',
      desStorecash: '',
      referenceProduit: '',
      slogan: '',
      pvTtc: undefined,
      centres: []
    };
  }

  openAddModal() {
    this.editMode = false;
    this.currentProduit = this.getEmptyProduit();
    this.selectedCentres = [];
    this.errorMsg = '';
    this.showModal = true;
  }

  openEditModal(produit: any) {
    this.editMode = true;
    this.currentProduit = { ...produit };
    this.selectedCentres = (produit.centres || []).map((c: Centre) => c.cdDist);
    this.errorMsg = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.errorMsg = '';
  }

  saveProduit() {
    if (!this.currentProduit.codeProduit) {
      this.errorMsg = 'Code Produit is required.';
      return;
    }
    const token = localStorage.getItem('token');
    // Send only cdDist for each centre (minimal entity for backend mapping)
    this.currentProduit.centres = this.selectedCentres.map(cdDist => ({ cdDist }));
    const produitToSave = {
      ...this.currentProduit,
      centres: this.currentProduit.centres
    };
    const url = this.editMode ? `/api/produits/${this.currentProduit.codeProduit}` : '/api/produits';
    const method = this.editMode ? 'PUT' : 'POST';
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(produitToSave)
    })
      .then(res => {
        if (!res.ok) return res.text().then(text => { throw new Error(text || 'Failed to save produit'); });
        return res.json();
      })
      .then(() => { this.fetchProduits(); this.closeModal(); })
      .catch(err => { this.errorMsg = err.message; });
  }

  fetchProduits() {
    const token = localStorage.getItem('token');
    fetch('/api/produits', { headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch produits: ' + res.status);
        // Only try to parse JSON if there is content
        return res.text().then(text => text ? JSON.parse(text) : []);
      })
      .then(data => this.produits = data)
      .catch(err => { this.errorMsg = err.message; });
  }

  deleteProduit(codeProduit: string) {
    const token = localStorage.getItem('token');
    fetch(`/api/produits/${codeProduit}`, { method: 'DELETE', headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
      .then(() => this.fetchProduits());
  }

  getCentreNames(produit: Produit): string {
    return produit.centres?.map(c => c.designationCentre || c.cdDist).join(', ') || '';
  }
}
