package com.example.backend.dto;

import java.util.List;

public class PPackDTO {
    public Long id;
    public String nomOffre;
    public String description;
    public String etat;
    public Double prixGlobal;
    public List<ProduitDTO> produits;
    public List<CentreDTO> centres;
}
