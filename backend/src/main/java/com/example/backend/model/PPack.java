package com.example.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "P_PACK")
public class PPack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "DAT_CREA")
    private LocalDateTime datCrea;

    @Column(name = "DAT_MAJ")
    private LocalDateTime datMaj;

    @Column(name = "DATE_DEBUT")
    private LocalDateTime dateDebut;

    @Column(name = "DATE_FIN")
    private LocalDateTime dateFin;

    @Column(name = "DESCRIPTION", length = 255)
    private String description;

    @Column(name = "ETAT", length = 255)
    private String etat;

    @Column(name = "PRIX_GLOBAL", precision = 10, scale = 3)
    private BigDecimal prixGlobal;

    @Column(name = "ID_CATEGORY")
    private Long idCategory;

    @Column(name = "MAIL_NUMBER_OBLIGATOIRE", length = 1)
    private String mailNumberObligatoire;

    @Column(name = "OFFRE_PACK", length = 20)
    private String offrePack;

    @Column(name = "CONTROLE_BLACKLIST", length = 255)
    private String controleBlacklist;

    @Column(name = "POOL_NAME", length = 20)
    private String poolName;

    @Column(name = "CONTEXT_BLACKLIST", length = 30)
    private String contextBlacklist;

    @Column(name = "CONNECTION_TYPE", length = 15)
    private String connectionType;

    @Column(name = "TYPE_OFFRE", length = 100)
    private String typeOffre;

    @Column(name = "NOM_OFFRE", length = 100)
    private String nomOffre;

    @Column(name = "DEBIT_PACK", length = 45)
    private String debitPack;

    @Column(name = "GRATUITE", length = 1)
    private String gratuite = "N";

    @Column(name = "IS_TT", length = 1)
    private String isTt = "N";

    @Column(name = "CHECK_ELIGIBILIY", length = 1)
    private String checkEligibiliy = "N";

    @Column(name = "MIGRATE_TO", length = 1)
    private String migrateTo = "N";

    @Column(name = "HIGH_TECH", length = 1)
    private String highTech = "N";

    @Column(name = "ENGAGEMENT", length = 3)
    private String engagement;

    @Column(name = "IS_BRIDGE", length = 1)
    private String isBridge = "N";

    @Column(name = "PACK_BRIDGE")
    private Long packBridge;

    @Column(name = "WITHOUT_SN", length = 1)
    private String withoutSn = "N";

    @OneToMany(mappedBy = "pack", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<PDetailPack> detailPacks = new java.util.ArrayList<>();

    @OneToMany(mappedBy = "pack", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<PPackCentre> packCentres = new java.util.ArrayList<>();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getDatCrea() { return datCrea; }
    public void setDatCrea(LocalDateTime datCrea) { this.datCrea = datCrea; }

    public LocalDateTime getDatMaj() { return datMaj; }
    public void setDatMaj(LocalDateTime datMaj) { this.datMaj = datMaj; }

    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }

    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getEtat() { return etat; }
    public void setEtat(String etat) { this.etat = etat; }

    public BigDecimal getPrixGlobal() { return prixGlobal; }
    public void setPrixGlobal(BigDecimal prixGlobal) { this.prixGlobal = prixGlobal; }

    public Long getIdCategory() { return idCategory; }
    public void setIdCategory(Long idCategory) { this.idCategory = idCategory; }

    public String getMailNumberObligatoire() { return mailNumberObligatoire; }
    public void setMailNumberObligatoire(String mailNumberObligatoire) { this.mailNumberObligatoire = mailNumberObligatoire; }

    public String getOffrePack() { return offrePack; }
    public void setOffrePack(String offrePack) { this.offrePack = offrePack; }

    public String getControleBlacklist() { return controleBlacklist; }
    public void setControleBlacklist(String controleBlacklist) { this.controleBlacklist = controleBlacklist; }

    public String getPoolName() { return poolName; }
    public void setPoolName(String poolName) { this.poolName = poolName; }

    public String getContextBlacklist() { return contextBlacklist; }
    public void setContextBlacklist(String contextBlacklist) { this.contextBlacklist = contextBlacklist; }

    public String getConnectionType() { return connectionType; }
    public void setConnectionType(String connectionType) { this.connectionType = connectionType; }

    public String getTypeOffre() { return typeOffre; }
    public void setTypeOffre(String typeOffre) { this.typeOffre = typeOffre; }

    public String getNomOffre() { return nomOffre; }
    public void setNomOffre(String nomOffre) { this.nomOffre = nomOffre; }

    public String getDebitPack() { return debitPack; }
    public void setDebitPack(String debitPack) { this.debitPack = debitPack; }

    public String getGratuite() { return gratuite; }
    public void setGratuite(String gratuite) { this.gratuite = gratuite; }

    public String getIsTt() { return isTt; }
    public void setIsTt(String isTt) { this.isTt = isTt; }

    public String getCheckEligibiliy() { return checkEligibiliy; }
    public void setCheckEligibiliy(String checkEligibiliy) { this.checkEligibiliy = checkEligibiliy; }

    public String getMigrateTo() { return migrateTo; }
    public void setMigrateTo(String migrateTo) { this.migrateTo = migrateTo; }

    public String getHighTech() { return highTech; }
    public void setHighTech(String highTech) { this.highTech = highTech; }

    public String getEngagement() { return engagement; }
    public void setEngagement(String engagement) { this.engagement = engagement; }

    public String getIsBridge() { return isBridge; }
    public void setIsBridge(String isBridge) { this.isBridge = isBridge; }

    public Long getPackBridge() { return packBridge; }
    public void setPackBridge(Long packBridge) { this.packBridge = packBridge; }

    public String getWithoutSn() { return withoutSn; }
    public void setWithoutSn(String withoutSn) { this.withoutSn = withoutSn; }

    public java.util.List<PDetailPack> getDetailPacks() { return detailPacks; }
    public void setDetailPacks(java.util.List<PDetailPack> detailPacks) { this.detailPacks = detailPacks; }
    public java.util.List<PPackCentre> getPackCentres() { return packCentres; }
    public void setPackCentres(java.util.List<PPackCentre> packCentres) { this.packCentres = packCentres; }
}
