package com.utp.tridentist.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "citas")
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cita")
    private Long id;

    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;

    @Column(name = "paciente_id", nullable = false)
    private Long pacienteId;

    @Column(name = "codigo_doctor")
    private Integer codigoDoctor;

    @Column(name = "codigo_paciente")
    private Integer codigoPaciente;

    @Column(name = "id_tratamiento")
    private Integer idTratamiento = 1;

    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;

    @Column(name = "fecha_hora_inicio")
    private LocalDateTime fechaHoraInicio;

    @Column(name = "fecha_hora_fin")
    private LocalDateTime fechaHoraFin;

    @Column(name = "motivo")
    private String motivo;

    @Column(name = "estado")
    private String estado = "PENDIENTE";

    public Cita() {
    }

    public Cita(Long id, Long doctorId, Long pacienteId, LocalDateTime fechaHoraInicio, LocalDateTime fechaHoraFin, String motivo, String estado) {
        this.id = id;
        this.doctorId = doctorId;
        this.pacienteId = pacienteId;
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHora = fechaHoraInicio;
        this.fechaHoraFin = fechaHoraFin;
        this.motivo = motivo;
        if (estado != null) {
            this.estado = estado;
        }
    }

    @PrePersist
    @PreUpdate
    protected void syncFields() {
        if (this.fechaHora == null && this.fechaHoraInicio != null) {
            this.fechaHora = this.fechaHoraInicio;
        }
        if (this.fechaHoraInicio == null && this.fechaHora != null) {
            this.fechaHoraInicio = this.fechaHora;
        }
        if (this.doctorId != null) {
            this.codigoDoctor = this.doctorId.intValue();
        } else if (this.codigoDoctor != null) {
            this.doctorId = this.codigoDoctor.longValue();
        } else {
            this.doctorId = 1L;
            this.codigoDoctor = 1;
        }
        if (this.pacienteId != null) {
            this.codigoPaciente = this.pacienteId.intValue();
        } else if (this.codigoPaciente != null) {
            this.pacienteId = this.codigoPaciente.longValue();
        } else {
            this.pacienteId = 1L;
            this.codigoPaciente = 1;
        }
        if (this.idTratamiento == null) {
            this.idTratamiento = 1;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdCita() {
        return id;
    }

    public void setIdCita(Long idCita) {
        this.id = idCita;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public Long getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Long pacienteId) {
        this.pacienteId = pacienteId;
    }

    public Integer getCodigoDoctor() {
        return codigoDoctor;
    }

    public void setCodigoDoctor(Integer codigoDoctor) {
        this.codigoDoctor = codigoDoctor;
    }

    public Integer getCodigoPaciente() {
        return codigoPaciente;
    }

    public void setCodigoPaciente(Integer codigoPaciente) {
        this.codigoPaciente = codigoPaciente;
    }

    public Integer getIdTratamiento() {
        return idTratamiento;
    }

    public void setIdTratamiento(Integer idTratamiento) {
        this.idTratamiento = idTratamiento;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public LocalDateTime getFechaHoraInicio() {
        return fechaHoraInicio;
    }

    public void setFechaHoraInicio(LocalDateTime fechaHoraInicio) {
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHora = fechaHoraInicio;
    }

    public LocalDateTime getFechaHoraFin() {
        return fechaHoraFin;
    }

    public void setFechaHoraFin(LocalDateTime fechaHoraFin) {
        this.fechaHoraFin = fechaHoraFin;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
