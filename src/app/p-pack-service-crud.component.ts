import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PPackService {
  id?: number;
  name?: string; // changed from serviceName
  description?: string;
  actif?: string;
}

@Component({
  selector: 'app-p-pack-service-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <button class="add-button" (click)="openAddModal()">+ Add Service</button>
      <div class="service-cards">
        <div class="service-card" *ngFor="let service of services">
          <div class="service-header">
            <span>{{ service.name }}</span>
            <span class="small-text">{{ service.actif }}</span>
          </div>
          <div class="service-body">
            <div><b>ID:</b> {{ service.id }}</div>
            <div><b>Service Name:</b> {{ service.name }}</div>
            <div><b>Description:</b> {{ service.description }}</div>
            <div><b>Actif:</b> {{ service.actif }}</div>
          </div>
          <div class="service-actions">
            <button (click)="openEditModal(service)" class="btn edit">Edit</button>
            <button (click)="deleteService(service.id)" class="btn delete">Delete</button>
          </div>
        </div>
      </div>
      <!-- Modal Form -->
      <div class="modal" *ngIf="showModal">
        <div class="modal-content">
          <h3>{{ editMode ? 'Edit Service' : 'Add Service' }}</h3>
          <form (ngSubmit)="saveService()">
            <label>Service Name:
              <input [(ngModel)]="currentService.name" name="name" required [class.invalid]="formTouched && !currentService.name" />
            </label>
            <label>Description:
              <input [(ngModel)]="currentService.description" name="description" />
            </label>
            <label>Actif:
              <select [(ngModel)]="currentService.actif" name="actif">
                <option value="O">Oui</option>
                <option value="N">Non</option>
              </select>
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
      .container { max-width: 960px; margin: 2rem auto; padding: 1rem; text-align: center; }
      .add-button { margin-bottom: 1.5rem; background-color: #1e90ff; color: white; padding: 0.5rem 1rem; border-radius: 4px; border: none; cursor: pointer; }
      .service-cards { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
      .service-card { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0002; padding: 1rem; width: 260px; }
      .service-header { font-weight: bold; display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
      .small-text { font-size: 0.9rem; color: #666; }
      .service-body { text-align: left; margin-bottom: 0.5rem; }
      .service-actions { display: flex; justify-content: space-between; }
      .btn { padding: 0.4rem 0.8rem; border-radius: 4px; border: none; cursor: pointer; }
      .edit { background-color: #f0ad4e; color: white; }
      .delete { background-color: #d9534f; color: white; }
      .modal { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
      .modal-content { background: white; padding: 2rem; border-radius: 8px; width: 90%; max-width: 500px; text-align: left; }
      form label { display: block; margin-bottom: 1rem; }
      input, textarea, select { width: 100%; padding: 0.5rem; margin-top: 0.3rem; border: 1px solid #ccc; border-radius: 4px; }
      .modal-actions { margin-top: 1rem; display: flex; justify-content: flex-end; gap: 1rem; }
      .save { background-color: #28a745; color: white; }
      .cancel { background-color: #6c757d; color: white; }
      .error-msg { color: red; margin-top: 1rem; }
      input.invalid { border: 1.5px solid #d9534f; background: #fff0f0; }
    </style>
  `
})
export class PPackServiceCrudComponent implements OnInit {
  services: PPackService[] = [];
  showModal = false;
  editMode = false;
  currentService: PPackService = {};
  errorMsg = '';
  formTouched = false;

  get isFormValid() {
    return this.currentService.name && this.currentService.name.trim().length > 0;
  }

  ngOnInit() {
    this.fetchServices();
  }

  fetchServices() {
    const token = localStorage.getItem('token');
    fetch('/api/pack-services', { headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch services'))
      .then(data => this.services = data)
      .catch(err => this.errorMsg = err);
  }

  openAddModal() {
    this.editMode = false;
    this.currentService = {};
    this.showModal = true;
    this.errorMsg = '';
    this.formTouched = false;
  }

  openEditModal(service: PPackService) {
    this.editMode = true;
    this.currentService = { ...service };
    this.showModal = true;
    this.errorMsg = '';
    this.formTouched = false;
  }

  closeModal() {
    this.showModal = false;
    this.errorMsg = '';
  }

  saveService() {
    this.formTouched = true;
    if (!this.isFormValid) {
      this.errorMsg = 'Service Name is required.';
      return;
    }
    const url = this.editMode && this.currentService.id ? `/api/pack-services/${this.currentService.id}` : '/api/pack-services';
    const method = this.editMode && this.currentService.id ? 'PUT' : 'POST';
    const token = localStorage.getItem('token');
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(this.currentService)
    })
      .then(res => res.ok ? res.json() : res.text().then(text => Promise.reject(text)))
      .then(() => { this.fetchServices(); this.closeModal(); })
      .catch(err => this.errorMsg = err);
  }

  deleteService(id?: number) {
    const token = localStorage.getItem('token');
    if (id && confirm('Delete this service?')) {
      fetch(`/api/pack-services/${id}`, { method: 'DELETE', headers: { 'Authorization': token ? `Bearer ${token}` : '' } })
        .then(() => this.fetchServices());
    }
  }
}
