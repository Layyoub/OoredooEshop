package com.example.backend.controller;

import com.example.backend.model.PPackCentre;
import com.example.backend.repository.PPackCentreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pack-centres")
public class PPackCentreController {
    @Autowired
    private PPackCentreRepository pPackCentreRepository;

    @GetMapping
    public List<PPackCentre> getAll() {
        return pPackCentreRepository.findAll();
    }

    @GetMapping("/{id}")
    public PPackCentre getById(@PathVariable Long id) {
        return pPackCentreRepository.findById(id).orElse(null);
    }

    @PostMapping
    public PPackCentre create(@RequestBody PPackCentre packCentre) {
        return pPackCentreRepository.save(packCentre);
    }

    @PutMapping("/{id}")
    public PPackCentre update(@PathVariable Long id, @RequestBody PPackCentre packCentre) {
        packCentre.setId(id);
        return pPackCentreRepository.save(packCentre);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        pPackCentreRepository.deleteById(id);
    }
}
