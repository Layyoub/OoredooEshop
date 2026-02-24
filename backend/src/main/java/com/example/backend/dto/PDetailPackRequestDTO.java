package com.example.backend.dto;
import java.util.List;

public class PDetailPackRequestDTO {
    public Long packId;
    public List<String> produitIds;
    public List<Long> serviceIds;
    public String description;
    public Long numOrd;
    public String codProd;
    public String datMaj;
    public String desProd;
    public Integer tmCode;
    public String pattern;
}
