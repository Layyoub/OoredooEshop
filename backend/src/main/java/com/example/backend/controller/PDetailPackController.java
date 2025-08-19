package com.example.backend.controller;

import com.example.backend.model.PDetailPack;
import com.example.backend.repository.PDetailPackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detail-packs")
public class PDetailPackController {
    @Autowired
    private PDetailPackRepository pDetailPackRepository;

    @GetMapping
    public List<PDetailPack> getAll() {
        return pDetailPackRepository.findAll();
    }

    @GetMapping("/{id}")
    public PDetailPack getById(@PathVariable Long id) {
        return pDetailPackRepository.findById(id).orElse(null);
    }

    @PostMapping
    public PDetailPack create(@RequestBody PDetailPack detailPack) {
        return pDetailPackRepository.save(detailPack);
    }

    @PutMapping("/{id}")
    public PDetailPack update(@PathVariable Long id, @RequestBody PDetailPack detailPack) {
        detailPack.setId(id);
        return pDetailPackRepository.save(detailPack);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        pDetailPackRepository.deleteById(id);
    }
}
