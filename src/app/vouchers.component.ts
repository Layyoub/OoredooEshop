import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vouchers-container">
      <div class="vouchers-header">
        <h1>Vouchers</h1>
        <p>Create and manage discount vouchers for your customers</p>
      </div>
      
      <div class="vouchers-form">
        <div class="form-row">
          <div class="form-group">
            <label for="baseCode">Base Code</label>
            <input 
              type="text" 
              id="baseCode" 
              [(ngModel)]="voucher.baseCode" 
              placeholder="Enter base code"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="amount">Amount</label>
            <div class="input-with-icon">
              <span class="currency-symbol">€</span>
              <input 
                type="number" 
                id="amount" 
                [(ngModel)]="voucher.amount" 
                placeholder="0.00"
                class="form-input"
                step="0.01"
                min="0"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="minOrder">Min Order</label>
            <div class="input-with-icon">
              <span class="currency-symbol">€</span>
              <input 
                type="number" 
                id="minOrder" 
                [(ngModel)]="voucher.minOrder" 
                placeholder="0.00"
                class="form-input"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" [(ngModel)]="voucher.status" class="form-select">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="validFrom">Valid From</label>
            <div class="date-input">
              <input 
                type="date" 
                id="validFrom" 
                [(ngModel)]="voucher.validFrom" 
                class="form-input"
              />
              <i class="calendar-icon">📅</i>
            </div>
          </div>
          
          <div class="form-group">
            <label for="validTo">Valid To</label>
            <div class="date-input">
              <input 
                type="date" 
                id="validTo" 
                [(ngModel)]="voucher.validTo" 
                class="form-input"
              />
              <i class="calendar-icon">📅</i>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="validityDays">Validity (days)</label>
            <input 
              type="number" 
              id="validityDays" 
              [(ngModel)]="voucher.validityDays" 
              placeholder="30"
              class="form-input"
              min="1"
            />
          </div>
          
          <div class="form-group">
            <label for="numberOfVouchers">Number of Vouchers</label>
            <input 
              type="number" 
              id="numberOfVouchers" 
              [(ngModel)]="voucher.numberOfVouchers" 
              placeholder="1"
              class="form-input"
              min="1"
            />
          </div>
          
          <div class="form-group">
            <label>&nbsp;</label>
            <button class="create-btn" (click)="createVouchers()">
              <i class="btn-icon">✨</i>
              Create Vouchers
            </button>
          </div>
        </div>
      </div>
      
      <div class="vouchers-info">
        <div class="info-card">
          <h3>Voucher Summary</h3>
          <div class="summary-grid">
            <div class="summary-item">
              <span class="summary-label">Total Value:</span>
              <span class="summary-value">€{{ (voucher.amount * voucher.numberOfVouchers).toFixed(2) }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Valid Period:</span>
              <span class="summary-value">{{ voucher.validityDays }} days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vouchers-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      min-height: 100vh;
    }
    
    .vouchers-header {
      text-align: center;
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    .vouchers-header h1 {
      color: #1e293b;
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .vouchers-header p {
      color: #64748b;
      font-size: 1.1rem;
      margin: 0;
    }
    
    .vouchers-form {
      background: white;
      padding: 2.5rem;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      margin-bottom: 2rem;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .form-row:last-child {
      margin-bottom: 0;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }
    
    .form-input, .form-select {
      padding: 0.875rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s ease;
      background: #fafafa;
    }
    
    .form-input:focus, .form-select:focus {
      outline: none;
      border-color: #3b82f6;
      background: white;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .input-with-icon {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .currency-symbol {
      position: absolute;
      left: 1rem;
      color: #6b7280;
      font-weight: 500;
      z-index: 1;
    }
    
    .input-with-icon .form-input {
      padding-left: 2.5rem;
    }
    
    .date-input {
      position: relative;
    }
    
    .calendar-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2rem;
      pointer-events: none;
      color: #6b7280;
    }
    
    .create-btn {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }
    
    .create-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }
    
    .btn-icon {
      font-size: 1.2rem;
    }
    
    .vouchers-info {
      display: flex;
      justify-content: center;
    }
    
    .info-card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      text-align: center;
      min-width: 400px;
    }
    
    .info-card h3 {
      color: #1e293b;
      margin: 0 0 1.5rem 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .summary-grid {
      display: grid;
      gap: 1rem;
    }
    
    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    
    .summary-label {
      color: #64748b;
      font-weight: 500;
    }
    
    .summary-value {
      color: #1e293b;
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    @media (max-width: 768px) {
      .vouchers-container {
        padding: 1rem;
      }
      
      .form-row {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .vouchers-form {
        padding: 1.5rem;
      }
      
      .info-card {
        min-width: auto;
        width: 100%;
      }
    }
  `]
})
export class VouchersComponent {
  voucher = {
    baseCode: '',
    amount: 0,
    minOrder: 0,
    status: 'active',
    validFrom: '',
    validTo: '',
    validityDays: 30,
    numberOfVouchers: 1
  };

  createVouchers() {
    console.log('Creating vouchers:', this.voucher);
    // Add your voucher creation logic here
  }
} 