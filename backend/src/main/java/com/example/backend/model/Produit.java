package com.example.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "PRODUIT")
public class Produit {
    @Id
    @Column(name = "CODE_PRODUIT", length = 7)
    private String codeProduit;

    @Column(name = "CODE_GAMME")
    private Integer codeGamme;

    @Column(name = "CODE_MARQUE")
    private Integer codeMarque;

    @Column(name = "DES_STORECASH", length = 255)
    private String desStorecash;

    @Column(name = "REFERENCE_PRODUIT", length = 255)
    private String referenceProduit;

    @Column(name = "SLOGAN", length = 255)
    private String slogan;

    @Column(name = "DESCRIPTION", length = 1500)
    private String description;

    @Column(name = "PV_TTC", precision = 10, scale = 3)
    private BigDecimal pvTtc;

    @Column(name = "PV_HT", precision = 10, scale = 3)
    private BigDecimal pvHt;

    @Column(name = "TX_TVA", precision = 10, scale = 3)
    private BigDecimal txTva;

    @Column(name = "ETAT")
    private Integer etat = 0;

    @Column(name = "ORDRE")
    private Integer ordre = 0;

    @Column(name = "POINTS_MERCI", length = 255)
    private String pointsMerci;

    @Column(name = "SOMME_NOTE")
    private Double sommeNote = 0.0;

    @Column(name = "NOMBRE_VOTE")
    private Integer nombreVote = 0;

    @Column(name = "DATE_SORTIE")
    private LocalDate dateSortie;

    @Column(name = "VALEUR_TAG")
    private Integer valeurTag = 0;

    @Column(name = "FLAG_DOMICILE", length = 1)
    private String flagDomicile = "1";

    @Column(name = "FLAG_CDS", length = 1)
    private String flagCds = "1";

    @Column(name = "VERIF_STOCK", length = 1)
    private String verifStock = "O";

    @Column(name = "POINTS_MERCI_MIN", length = 225)
    private String pointsMerciMin;

    @Column(name = "MESSAGE", length = 500)
    private String message;

    @Column(name = "PRIX_MOIS_TTC", precision = 10, scale = 2)
    private BigDecimal prixMoisTtc;

    @Column(name = "FLAG_RESERVATION", length = 1)
    private String flagReservation = "0";

    @Column(name = "LIVRAISON_GRATUIT", length = 1)
    private String livraisonGratuit = "0";

    @Column(name = "FLAG_AFFICHER_RESERV")
    private Integer flagAfficherReserv = 1;

    @Column(name = "FORMULAIRE_INFO", length = 1)
    private String formulaireInfo = "0";

    @Column(name = "FLAG_PAY_ON_DELIVERY", length = 1)
    private String flagPayOnDelivery = "0";

    @ManyToMany
    @JoinTable(
        name = "PRODUIT_CENTRE",
        joinColumns = @JoinColumn(name = "CODE_PRODUIT"),
        inverseJoinColumns = @JoinColumn(name = "CD_DIST")
    )
    private java.util.Set<Centre> centres = new java.util.HashSet<>();

    public String getCodeProduit() { return codeProduit; }
    public void setCodeProduit(String codeProduit) { this.codeProduit = codeProduit; }

    public Integer getCodeGamme() { return codeGamme; }
    public void setCodeGamme(Integer codeGamme) { this.codeGamme = codeGamme; }

    public Integer getCodeMarque() { return codeMarque; }
    public void setCodeMarque(Integer codeMarque) { this.codeMarque = codeMarque; }

    public String getDesStorecash() { return desStorecash; }
    public void setDesStorecash(String desStorecash) { this.desStorecash = desStorecash; }

    public String getReferenceProduit() { return referenceProduit; }
    public void setReferenceProduit(String referenceProduit) { this.referenceProduit = referenceProduit; }

    public String getSlogan() { return slogan; }
    public void setSlogan(String slogan) { this.slogan = slogan; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPvTtc() { return pvTtc; }
    public void setPvTtc(BigDecimal pvTtc) { this.pvTtc = pvTtc; }

    public BigDecimal getPvHt() { return pvHt; }
    public void setPvHt(BigDecimal pvHt) { this.pvHt = pvHt; }

    public BigDecimal getTxTva() { return txTva; }
    public void setTxTva(BigDecimal txTva) { this.txTva = txTva; }

    public Integer getEtat() { return etat; }
    public void setEtat(Integer etat) { this.etat = etat; }

    public Integer getOrdre() { return ordre; }
    public void setOrdre(Integer ordre) { this.ordre = ordre; }

    public String getPointsMerci() { return pointsMerci; }
    public void setPointsMerci(String pointsMerci) { this.pointsMerci = pointsMerci; }

    public Double getSommeNote() { return sommeNote; }
    public void setSommeNote(Double sommeNote) { this.sommeNote = sommeNote; }

    public Integer getNombreVote() { return nombreVote; }
    public void setNombreVote(Integer nombreVote) { this.nombreVote = nombreVote; }

    public LocalDate getDateSortie() { return dateSortie; }
    public void setDateSortie(LocalDate dateSortie) { this.dateSortie = dateSortie; }

    public Integer getValeurTag() { return valeurTag; }
    public void setValeurTag(Integer valeurTag) { this.valeurTag = valeurTag; }

    public String getFlagDomicile() { return flagDomicile; }
    public void setFlagDomicile(String flagDomicile) { this.flagDomicile = flagDomicile; }

    public String getFlagCds() { return flagCds; }
    public void setFlagCds(String flagCds) { this.flagCds = flagCds; }

    public String getVerifStock() { return verifStock; }
    public void setVerifStock(String verifStock) { this.verifStock = verifStock; }

    public String getPointsMerciMin() { return pointsMerciMin; }
    public void setPointsMerciMin(String pointsMerciMin) { this.pointsMerciMin = pointsMerciMin; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public BigDecimal getPrixMoisTtc() { return prixMoisTtc; }
    public void setPrixMoisTtc(BigDecimal prixMoisTtc) { this.prixMoisTtc = prixMoisTtc; }

    public String getFlagReservation() { return flagReservation; }
    public void setFlagReservation(String flagReservation) { this.flagReservation = flagReservation; }

    public String getLivraisonGratuit() { return livraisonGratuit; }
    public void setLivraisonGratuit(String livraisonGratuit) { this.livraisonGratuit = livraisonGratuit; }

    public Integer getFlagAfficherReserv() { return flagAfficherReserv; }
    public void setFlagAfficherReserv(Integer flagAfficherReserv) { this.flagAfficherReserv = flagAfficherReserv; }

    public String getFormulaireInfo() { return formulaireInfo; }
    public void setFormulaireInfo(String formulaireInfo) { this.formulaireInfo = formulaireInfo; }

    public String getFlagPayOnDelivery() { return flagPayOnDelivery; }
    public void setFlagPayOnDelivery(String flagPayOnDelivery) { this.flagPayOnDelivery = flagPayOnDelivery; }

    public java.util.Set<Centre> getCentres() { return centres; }
    public void setCentres(java.util.Set<Centre> centres) { this.centres = centres; }
}
