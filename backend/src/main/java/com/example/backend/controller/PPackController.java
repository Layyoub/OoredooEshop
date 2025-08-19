package com.example.backend.controller;

import com.example.backend.dto.PPackDTO;
import com.example.backend.dto.ProduitDTO;
import com.example.backend.dto.CentreDTO;
import com.example.backend.model.PDetailPack;
import com.example.backend.model.PPackCentre;
import com.example.backend.model.Produit;
import com.example.backend.model.Centre;
import com.example.backend.model.PPack;
import com.example.backend.repository.PPackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/packs")
public class PPackController {
    @Autowired
    private PPackRepository pPackRepository;

    @GetMapping
    public List<PPackDTO> getAll() {
        return pPackRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PPack getById(@PathVariable Long id) {
        return pPackRepository.findById(id).orElse(null);
    }

    @PostMapping
    public PPack create(@RequestBody PPack pack) {
        return pPackRepository.save(pack);
    }

    @PutMapping("/{id}")
    public PPack update(@PathVariable Long id, @RequestBody PPack pack) {
        pack.setId(id);
        return pPackRepository.save(pack);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        pPackRepository.deleteById(id);
    }

    private PPackDTO toDto(PPack pack) {
        PPackDTO dto = new PPackDTO();
        dto.id = pack.getId();
        dto.nomOffre = pack.getNomOffre();
        dto.description = pack.getDescription();
        dto.etat = pack.getEtat();
        dto.prixGlobal = pack.getPrixGlobal() != null ? pack.getPrixGlobal().doubleValue() : null;
        // Products in pack
        dto.produits = pack.getDetailPacks() != null ? pack.getDetailPacks().stream()
            .map(PDetailPack::getProduit)
            .filter(java.util.Objects::nonNull)
            .map(this::toProduitDto)
            .collect(Collectors.toList()) : java.util.Collections.emptyList();
        // Centres for pack
        dto.centres = pack.getPackCentres() != null ? pack.getPackCentres().stream()
            .map(PPackCentre::getCentre)
            .filter(java.util.Objects::nonNull)
            .map(this::toCentreDto)
            .collect(Collectors.toList()) : java.util.Collections.emptyList();
        return dto;
    }

    private ProduitDTO toProduitDto(Produit p) {
        ProduitDTO dto = new ProduitDTO();
        dto.codeProduit = p.getCodeProduit();
        dto.desStorecash = p.getDesStorecash();
        dto.referenceProduit = p.getReferenceProduit();
        dto.slogan = p.getSlogan();
        dto.pvTtc = p.getPvTtc() != null ? p.getPvTtc().doubleValue() : null;
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
