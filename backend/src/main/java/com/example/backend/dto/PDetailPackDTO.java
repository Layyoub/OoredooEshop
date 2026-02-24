package com.example.backend.dto;

import java.util.List;

public class PDetailPackDTO {
    private Long id;
    private Long packId;
    private String description;
    private List<String> produitIds;
    private List<Long> serviceIds;

    // extra fields to display metadata consistently for grouped details
    private Long numOrd;
    private String datMaj; // ISO date string
    private String desProd;
    private Integer tmCode;
    private String pattern;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPackId() { return packId; }
    public void setPackId(Long packId) { this.packId = packId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getProduitIds() { return produitIds; }
    public void setProduitIds(List<String> produitIds) { this.produitIds = produitIds; }

    public List<Long> getServiceIds() { return serviceIds; }
    public void setServiceIds(List<Long> serviceIds) { this.serviceIds = serviceIds; }

    public Long getNumOrd() { return numOrd; }
    public void setNumOrd(Long numOrd) { this.numOrd = numOrd; }

    public String getDatMaj() { return datMaj; }
    public void setDatMaj(String datMaj) { this.datMaj = datMaj; }

    public String getDesProd() { return desProd; }
    public void setDesProd(String desProd) { this.desProd = desProd; }

    public Integer getTmCode() { return tmCode; }
    public void setTmCode(Integer tmCode) { this.tmCode = tmCode; }

    public String getPattern() { return pattern; }
    public void setPattern(String pattern) { this.pattern = pattern; }
}
