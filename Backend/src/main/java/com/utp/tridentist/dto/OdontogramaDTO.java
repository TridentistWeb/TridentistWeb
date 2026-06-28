package com.utp.tridentist.dto;

import com.utp.tridentist.model.OdontogramaRegistro;
import java.util.List;

public class OdontogramaDTO {
    private Long pacienteId;
    private Boolean isPediatric;
    private List<OdontogramaRegistro> registros;

    public OdontogramaDTO() {
    }

    public OdontogramaDTO(Long pacienteId, Boolean isPediatric, List<OdontogramaRegistro> registros) {
        this.pacienteId = pacienteId;
        this.isPediatric = isPediatric;
        this.registros = registros;
    }

    public Long getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Long pacienteId) {
        this.pacienteId = pacienteId;
    }

    public Boolean getIsPediatric() {
        return isPediatric;
    }

    public void setIsPediatric(Boolean isPediatric) {
        this.isPediatric = isPediatric;
    }

    public List<OdontogramaRegistro> getRegistros() {
        return registros;
    }

    public void setRegistros(List<OdontogramaRegistro> registros) {
        this.registros = registros;
    }
}
