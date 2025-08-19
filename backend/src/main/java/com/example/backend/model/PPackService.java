package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "P_PACK_SERVICE")
public class PPackService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NUM_ORD")
    private Long numOrd;

    @Column(name = "DAT_CREA")
    private LocalDateTime datCrea;

    @Column(name = "DAT_MAJ")
    private LocalDateTime datMaj;

    @Column(name = "DESCRIPTION", length = 255)
    private String description;

    @Column(name = "ETAT", length = 255)
    private String etat;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // Getters and setters omitted for brevity
}
