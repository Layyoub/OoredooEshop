package com.example.backend.controller;

import com.example.backend.model.PPackService;
import com.example.backend.repository.PPackServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pack-services")
public class PPackServiceController {
    @Autowired
    private PPackServiceRepository pPackServiceRepository;

    @GetMapping
    public List<PPackService> getAll() {
        return pPackServiceRepository.findAll();
    }

    @GetMapping("/{id}")
    public PPackService getById(@PathVariable Long id) {
        return pPackServiceRepository.findById(id).orElse(null);
    }

    @PostMapping
    public PPackService create(@RequestBody PPackService packService) {
        return pPackServiceRepository.save(packService);
    }

    @PutMapping("/{id}")
    public PPackService update(@PathVariable Long id, @RequestBody PPackService packService) {
        packService.setId(id);
        return pPackServiceRepository.save(packService);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        pPackServiceRepository.deleteById(id);
    }
}
