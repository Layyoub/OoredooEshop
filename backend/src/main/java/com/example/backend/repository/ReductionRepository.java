package com.example.backend.repository;

import com.example.backend.model.Reduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReductionRepository extends JpaRepository<Reduction, Integer> {
}
