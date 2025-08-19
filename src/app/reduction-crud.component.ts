import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reduction } from './reduction.model';

@Component({
  selector: 'app-reduction-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Vouchers</h2>
      <form (ngSubmit)="createBulk()" #voucherForm="ngForm" class="voucher-form">
        <label>Base Code:
          <input name="cleReduction" [(ngModel)]="form.cleReduction" required />
        </label>
        <label>Amount:
          <input type="number" name="montantReduction" [(ngModel)]="form.montantReduction" required />
        </label>
        <label>Min Order:
          <input type="number" name="montantMinCommande" [(ngModel)]="form.montantMinCommande" required />
        </label>
        <label>Status:
          <select name="etat" [(ngModel)]="form.etat" required>
            <option [ngValue]="1">Active</option>
            <option [ngValue]="0">Inactive</option>
          </select>
        </label>
        <label>Valid From:
          <input type="date" name="dateDebut" [(ngModel)]="form.dateDebut" />
        </label>
        <label>Valid To:
          <input type="date" name="dateFi" [(ngModel)]="form.dateFi" />
        </label>
        <label>Validity (days):
          <input type="number" name="joursValidity" [(ngModel)]="form.joursValidity" />
        </label>
        <label>Number of Vouchers:
          <input type="number" name="numberOfVouchers" [(ngModel)]="form.numberOfVouchers" min="1" required />
        </label>
        <button type="submit" [disabled]="!voucherForm.form.valid">Create Vouchers</button>
      </form>
      <hr />
      <div class="voucher-cards">
        <div class="voucher-card" *ngFor="let v of vouchers">
          <div class="voucher-code">{{ v.cleReduction }}</div>
          <div class="voucher-info">
            <div><strong>Amount:</strong> {{ v.montantReduction }}</div>
            <div><strong>Min Order:</strong> {{ v.montantMinCommande }}</div>
            <div><strong>Status:</strong> {{ v.etat === 1 ? 'Active' : 'Inactive' }}</div>
            <div><strong>Created:</strong> {{ v.creationDate }}</div>
            <div><strong>Valid From:</strong> {{ v.dateDebut }}</div>
            <div><strong>Valid To:</strong> {{ v.dateFi }}</div>
          </div>
        </div>
      </div>
      <!-- Optionally keep the table for reference or remove it -->
      <!--
      <table class="voucher-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Amount</th>
            <th>Min Order</th>
            <th>Status</th>
            <th>Created</th>
            <th>Valid From</th>
            <th>Valid To</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let v of vouchers">
            <td>{{ v.cleReduction }}</td>
            <td>{{ v.montantReduction }}</td>
            <td>{{ v.montantMinCommande }}</td>
            <td>{{ v.etat === 1 ? 'Active' : 'Inactive' }}</td>
            <td>{{ v.creationDate }}</td>
            <td>{{ v.dateDebut }}</td>
            <td>{{ v.dateFi }}</td>
          </tr>
        </tbody>
      </table>
      -->
    </div>
  `,
  styles: `
    .container { padding: 2rem; }
    h2 { margin-bottom: 1.5rem; }
    .voucher-form { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; }
    .voucher-form label { display: flex; flex-direction: column; min-width: 180px; }
    .voucher-cards { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-top: 2rem; }
    .voucher-card {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      padding: 1.2rem 1.5rem;
      min-width: 220px;
      max-width: 260px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 1rem;
      border: 1px solid #e0e0e0;
    }
    .voucher-code {
      font-size: 1.3rem;
      font-weight: bold;
      color: #d32f2f;
      margin-bottom: 0.7rem;
      letter-spacing: 1px;
    }
    .voucher-info > div { margin-bottom: 0.3rem; }
    .voucher-table { width: 100%; border-collapse: collapse; }
    .voucher-table th, .voucher-table td { border: 1px solid #ddd; padding: 0.5rem 1rem; }
    .voucher-table th { background: #f7f8fa; }
  `
})
export class ReductionCrudComponent implements OnInit {
  vouchers: Reduction[] = [];
  form: any = { etat: 1, numberOfVouchers: 1 };
  ngOnInit() {
    this.fetchVouchers();
  }
  fetchVouchers() {
    const token = localStorage.getItem('token');
    fetch('/api/reductions', {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch vouchers: ' + res.status);
        return res.json();
      })
      .then(data => this.vouchers = data)
      .catch(err => alert(err));
  }
  createBulk() {
    // Ensure date fields are either valid ISO strings or null
    const payload = { ...this.form };
    payload.dateDebut = payload.dateDebut ? payload.dateDebut : null;
    payload.dateFi = payload.dateFi ? payload.dateFi : null;
    payload.creationDate = payload.creationDate ? payload.creationDate : null;
    // Do NOT send Authorization header for bulk endpoint
    fetch('/api/reductions/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create vouchers: ' + res.status);
        return res.json();
      })
      .then(() => { this.fetchVouchers(); this.form = { etat: 1, numberOfVouchers: 1 }; })
      .catch(err => alert(err));
  }
}
