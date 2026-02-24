package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "REDUCTION")
public class Reduction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CODE_REDUCTION")
    private Integer codeReduction;

    @Column(name = "CLE_REDUCTION", length = 10)
    private String cleReduction;

    @Column(name = "MONTANT_REDUCTION", precision = 3)
    private Integer montantReduction;

    @Column(name = "MONTANT_MIN_COMMANDE", precision = 3)
    private Integer montantMinCommande;

    @Column(name = "ETAT")
    private Integer etat = 1;

    @Column(name = "CREATION_DATE")
    private LocalDate creationDate = LocalDate.now();

    @Column(name = "JOURS_VALIDITY")
    private Integer joursValidity;

    @Column(name = "DATE_DEBUT")
    private LocalDate dateDebut;

    @Column(name = "DATE_FI")
    private LocalDate dateFi;

    // Getters and setters
    public Integer getCodeReduction() { return codeReduction; }
    public void setCodeReduction(Integer codeReduction) { this.codeReduction = codeReduction; }
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
}
