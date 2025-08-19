package com.example.backend.controller;

import com.example.backend.dto.CentreDTO;
import com.example.backend.model.Centre;
import com.example.backend.repository.CentreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/centres")
public class CentreController {
    @Autowired
    private CentreRepository centreRepository;

    @GetMapping
    public List<CentreDTO> getAll() {
        return centreRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    private CentreDTO toDto(com.example.backend.model.Centre c) {
        CentreDTO dto = new CentreDTO();
        dto.cdDist = c.getCdDist();
        dto.designationCentre = c.getDesignationCentre();
        dto.villeCentre = c.getVilleCentre();
        return dto;
    }

    @GetMapping("/{id}")
    public Centre getById(@PathVariable String id) {
        return centreRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Centre create(@RequestBody Centre centre) {
        return centreRepository.save(centre);
    }

    @PutMapping("/{id}")
    public Centre update(@PathVariable String id, @RequestBody Centre centre) {
        centre.setCdDist(id);
        return centreRepository.save(centre);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        centreRepository.deleteById(id);
    }
}
