package com.example.perfumeria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.perfumeria.models.Perfume;

public interface PerfumeRepository extends JpaRepository<Perfume, Long> {

}
