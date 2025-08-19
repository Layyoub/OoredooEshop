package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "P_PACK_CENTRE")
public class PPackCentre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "COD_CENT", length = 255)
    private String codCent;

    @Column(name = "ETAT", length = 255)
    private String etat;

    @Column(name = "ID_PPACK", insertable = false, updatable = false)
    private Long idPPack;

    @ManyToOne
    @JoinColumn(name = "ID_PPACK")
    private PPack pack;

    @ManyToOne
    @JoinColumn(name = "COD_CENT", referencedColumnName = "CD_DIST", insertable = false, updatable = false)
    private Centre centre;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public PPack getPack() { return pack; }
    public void setPack(PPack pack) { this.pack = pack; }
    public Centre getCentre() { return centre; }
    public void setCentre(Centre centre) { this.centre = centre; }
}
