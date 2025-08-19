package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "P_DETAIL_PACK")
public class PDetailPack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NUM_ORD")
    private Long numOrd;

    @Column(name = "COD_PROD", length = 255)
    private String codProd;

    @Column(name = "DAT_MAJ")
    private LocalDateTime datMaj;

    @Column(name = "DES_PROD", length = 255)
    private String desProd;

    @Column(name = "TMCODE")
    private Integer tmCode;

    @Column(name = "PATTERN", length = 300)
    private String pattern;

    @ManyToOne
    @JoinColumn(name = "ID_PACK")
    private PPack pack;

    @ManyToOne
    @JoinColumn(name = "COD_PROD", referencedColumnName = "CODE_PRODUIT", insertable = false, updatable = false)
    private Produit produit;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getNumOrd() { return numOrd; }
    public void setNumOrd(Long numOrd) { this.numOrd = numOrd; }

    public String getCodProd() { return codProd; }
    public void setCodProd(String codProd) { this.codProd = codProd; }

    public LocalDateTime getDatMaj() { return datMaj; }
    public void setDatMaj(LocalDateTime datMaj) { this.datMaj = datMaj; }

    public String getDesProd() { return desProd; }
    public void setDesProd(String desProd) { this.desProd = desProd; }

    public Integer getTmCode() { return tmCode; }
    public void setTmCode(Integer tmCode) { this.tmCode = tmCode; }

    public String getPattern() { return pattern; }
    public void setPattern(String pattern) { this.pattern = pattern; }

    public PPack getPack() { return pack; }
    public void setPack(PPack pack) { this.pack = pack; }
    public Produit getProduit() { return produit; }
    public void setProduit(Produit produit) { this.produit = produit; }
}
