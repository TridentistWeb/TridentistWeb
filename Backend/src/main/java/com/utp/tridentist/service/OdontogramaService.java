package com.utp.tridentist.service;

import com.utp.tridentist.model.OdontogramaRegistro;
import com.utp.tridentist.repository.OdontogramaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class OdontogramaService {

    @Autowired
    private OdontogramaRepository odontogramaRepository;

    public List<OdontogramaRegistro> getOdontogramaByPaciente(Long pacienteId) {
        return odontogramaRepository.findByPacienteIdOrderByActualizadoEnDesc(pacienteId);
    }

    @Transactional
    public List<OdontogramaRegistro> guardarOdontograma(Long pacienteId, List<OdontogramaRegistro> registros, Long doctorId) {
        for (OdontogramaRegistro reg : registros) {
            reg.setPacienteId(pacienteId);
            if (doctorId != null) {
                reg.setDoctorId(doctorId);
            }
            if (reg.getFechaRegistro() == null) {
                reg.setFechaRegistro(LocalDate.now());
            }

            Optional<OdontogramaRegistro> existenteOpt = odontogramaRepository.findByPacienteIdAndNumeroDienteAndCara(
                    pacienteId, reg.getNumeroDiente(), reg.getCara()
            );

            if (existenteOpt.isPresent()) {
                OdontogramaRegistro existente = existenteOpt.get();
                existente.setCondicion(reg.getCondicion());
                existente.setNotas(reg.getNotas());
                existente.setDoctorId(reg.getDoctorId());
                existente.setFechaRegistro(reg.getFechaRegistro());
                odontogramaRepository.save(existente);
            } else {
                odontogramaRepository.save(reg);
            }
        }
        return getOdontogramaByPaciente(pacienteId);
    }

    @Transactional
    public void limpiarOdontograma(Long pacienteId) {
        odontogramaRepository.deleteByPacienteId(pacienteId);
    }
}
