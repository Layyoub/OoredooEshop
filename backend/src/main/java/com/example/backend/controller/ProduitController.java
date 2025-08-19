package com.example.backend.controller;

import com.example.backend.dto.ProduitDTO;
import com.example.backend.dto.CentreDTO;
import com.example.backend.model.Centre;
import com.example.backend.model.Produit;
import com.example.backend.repository.ProduitRepository;
import com.example.backend.repository.CentreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produits")
public class ProduitController {
    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CentreRepository centreRepository;

    @GetMapping
    public List<ProduitDTO> getAll() {
        return produitRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Produit getById(@PathVariable String id) {
        return produitRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Produit create(@RequestBody Produit produit) {
        // Map incoming centres (with only cdDist) to full Centre entities
        if (produit.getCentres() != null && !produit.getCentres().isEmpty()) {
            java.util.Set<Centre> fullCentres = new java.util.HashSet<>();
            for (Centre c : produit.getCentres()) {
                if (c.getCdDist() != null) {
                    centreRepository.findById(c.getCdDist()).ifPresent(fullCentres::add);
                }
            }
            produit.setCentres(fullCentres);
        }
        return produitRepository.save(produit);
    }

    @PutMapping("/{id}")
    public Produit update(@PathVariable String id, @RequestBody Produit produit) {
        produit.setCodeProduit(id);
        // Map incoming centres (with only cdDist) to full Centre entities
        if (produit.getCentres() != null && !produit.getCentres().isEmpty()) {
            java.util.Set<Centre> fullCentres = new java.util.HashSet<>();
            for (Centre c : produit.getCentres()) {
                if (c.getCdDist() != null) {
                    centreRepository.findById(c.getCdDist()).ifPresent(fullCentres::add);
                }
            }
            produit.setCentres(fullCentres);
        }
        return produitRepository.save(produit);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        produitRepository.deleteById(id);
    }

    private ProduitDTO toDto(Produit produit) {
        ProduitDTO dto = new ProduitDTO();
        dto.codeProduit = produit.getCodeProduit();
        dto.desStorecash = produit.getDesStorecash();
        dto.referenceProduit = produit.getReferenceProduit();
        dto.slogan = produit.getSlogan();
        dto.pvTtc = produit.getPvTtc() != null ? produit.getPvTtc().doubleValue() : null;
        dto.centres = produit.getCentres() != null ? produit.getCentres().stream().map(this::toCentreDto).collect(Collectors.toList()) : java.util.Collections.emptyList();
        return dto;
    }
    private CentreDTO toCentreDto(Centre c) {
        CentreDTO dto = new CentreDTO();
        dto.cdDist = c.getCdDist();
        dto.designationCentre = c.getDesignationCentre();
        dto.villeCentre = c.getVilleCentre();
        return dto;
    }
}
