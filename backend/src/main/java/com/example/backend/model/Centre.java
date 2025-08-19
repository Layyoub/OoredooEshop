package com.example.backend.model;

import jakarta.persistence.*;
import java.sql.Blob;

@Entity
@Table(name = "CENTRE")
public class Centre {
    @Id
    @Column(name = "CD_DIST", length = 4)
    private String cdDist;

    @Column(name = "CODE_FRAIS_LIV")
    private Integer codeFraisLiv;

    @Column(name = "DESIGNATION_CENTRE", length = 100)
    private String designationCentre;

    @Column(name = "ADRESSE_CENTRE", length = 100)
    private String adresseCentre;

    @Column(name = "CODE_POSTAL_CENTRE", length = 10)
    private String codePostalCentre;

    @Column(name = "VILLE_CENTRE", length = 300)
    private String villeCentre;

    @Column(name = "TEL_CENTRE", length = 20)
    private String telCentre;

    @Column(name = "FAX_CENTRE", length = 20)
    private String faxCentre;

    @Column(name = "EMAIL_CENTRE", length = 50)
    private String emailCentre;

    @Column(name = "CENTRE_PILOTE", length = 1)
    private String centrePilote = "N";

    @Lob
    @Column(name = "PLAN")
    private Blob plan;

    @Lob
    @Column(name = "G_MAPS")
    private String gMaps;

    @Column(name = "ACTIF", length = 1)
    private String actif = "O";

    @ManyToMany(mappedBy = "centres")
    private java.util.Set<Produit> produits = new java.util.HashSet<>();

    public String getCdDist() { return cdDist; }
    public void setCdDist(String cdDist) { this.cdDist = cdDist; }

    public java.util.Set<Produit> getProduits() { return produits; }
    public void setProduits(java.util.Set<Produit> produits) { this.produits = produits; }

    public String getDesignationCentre() { return designationCentre; }
    public String getVilleCentre() { return villeCentre; }

    // Other getters and setters omitted for brevity
}
