package com.example.backend.controller;

import com.example.backend.dto.ReductionBulkRequestDTO;
import com.example.backend.dto.ReductionDTO;
import com.example.backend.model.Reduction;
import com.example.backend.repository.ReductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reductions")
public class ReductionController {
    @Autowired
    private ReductionRepository reductionRepository;

    @GetMapping
    public List<ReductionDTO> getAll() {
        return reductionRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @PostMapping
    public ReductionDTO create(@RequestBody ReductionDTO dto) {
        Reduction entity = toEntity(dto);
        return toDTO(reductionRepository.save(entity));
    }

    @PutMapping("/{id}")
    public ReductionDTO update(@PathVariable Integer id, @RequestBody ReductionDTO dto) {
        Reduction entity = toEntity(dto);
        entity.setCodeReduction(id);
        return toDTO(reductionRepository.save(entity));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        reductionRepository.deleteById(id);
    }

    @PostMapping("/bulk")
    public List<ReductionDTO> createBulk(@RequestBody ReductionBulkRequestDTO dto) {
        List<Reduction> reductions = new ArrayList<>();
        for (int i = 0; i < dto.getNumberOfVouchers(); i++) {
            Reduction r = new Reduction();
            // Ensure code is max 10 chars and unique per voucher
            String code = generateVoucherCode(dto.getCleReduction(), i);
            if (code.length() > 10) code = code.substring(0, 10);
            r.setCleReduction(code);
            r.setMontantReduction(dto.getMontantReduction());
            r.setMontantMinCommande(dto.getMontantMinCommande());
            r.setEtat(dto.getEtat());
            r.setCreationDate(dto.getCreationDate());
            r.setJoursValidity(dto.getJoursValidity());
            r.setDateDebut(dto.getDateDebut());
            r.setDateFi(dto.getDateFi());
            reductions.add(r);
        }
        List<Reduction> saved = reductionRepository.saveAll(reductions);
        return saved.stream().map(this::toDTO).collect(Collectors.toList());
    }

    private String generateVoucherCode(String base, int idx) {
        // base (up to 6 chars) + 4 random digits, always <= 10 chars
        String prefix = (base != null ? base : "VCHR");
        if (prefix.length() > 6) prefix = prefix.substring(0, 6);
        String random = String.format("%04d", new Random().nextInt(10000));
        String code = prefix + random;
        return code.length() > 10 ? code.substring(0, 10) : code;
    }

    private ReductionDTO toDTO(Reduction r) {
        ReductionDTO dto = new ReductionDTO();
        dto.setCodeReduction(r.getCodeReduction());
        dto.setCleReduction(r.getCleReduction());
        dto.setMontantReduction(r.getMontantReduction());
        dto.setMontantMinCommande(r.getMontantMinCommande());
        dto.setEtat(r.getEtat());
        dto.setCreationDate(r.getCreationDate());
        dto.setJoursValidity(r.getJoursValidity());
        dto.setDateDebut(r.getDateDebut());
        dto.setDateFi(r.getDateFi());
        return dto;
    }

    private Reduction toEntity(ReductionDTO dto) {
        Reduction r = new Reduction();
        r.setCodeReduction(dto.getCodeReduction());
        r.setCleReduction(dto.getCleReduction());
        r.setMontantReduction(dto.getMontantReduction());
        r.setMontantMinCommande(dto.getMontantMinCommande());
        r.setEtat(dto.getEtat());
        r.setCreationDate(dto.getCreationDate());
        r.setJoursValidity(dto.getJoursValidity());
        r.setDateDebut(dto.getDateDebut());
        r.setDateFi(dto.getDateFi());
        return r;
    }
}
