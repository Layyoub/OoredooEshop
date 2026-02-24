package com.example.backend.dto;

import java.time.LocalDate;

public class ReductionBulkRequestDTO {
    private String cleReduction;
    private Integer montantReduction;
    private Integer montantMinCommande;
    private Integer etat;
    private LocalDate creationDate;
    private Integer joursValidity;
    private LocalDate dateDebut;
    private LocalDate dateFi;
    private int numberOfVouchers;

    // Getters and setters
    public String getCleReduction() { return cleReduction; }
    public void setCleReduction(String cleReduction) { this.cleReduction = cleReduction; }
    public Integer getMontantReduction() { return montantReduction; }
    public void setMontantReduction(Integer montantReduction) { this.montantReduction = montantReduction; }
    public Integer getMontantMinCommande() { return montantMinCommande; }
    public void setMontantMinCommande(Integer montantMinCommande) { this.montantMinCommande = montantMinCommande; }
    public Integer getEtat() { return etat; }
    public void setEtat(Integer etat) { this.etat = etat; }
    public LocalDate getCreationDate() { return creationDate; }
    public void setCreationDate(LocalDate creationDate) { this.creationDate = creationDate; }
    public Integer getJoursValidity() { return joursValidity; }
    public void setJoursValidity(Integer joursValidity) { this.joursValidity = joursValidity; }
    public LocalDate getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDate dateDebut) { this.dateDebut = dateDebut; }
    public LocalDate getDateFi() { return dateFi; }
    public void setDateFi(LocalDate dateFi) { this.dateFi = dateFi; }
    public int getNumberOfVouchers() { return numberOfVouchers; }
    public void setNumberOfVouchers(int numberOfVouchers) { this.numberOfVouchers = numberOfVouchers; }
}
