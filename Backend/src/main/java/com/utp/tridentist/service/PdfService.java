package com.utp.tridentist.service;

import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.utp.tridentist.model.Boleta;
import com.utp.tridentist.model.DetalleBoleta;
import com.utp.tridentist.repository.BoletaRepository;
import com.utp.tridentist.repository.DetalleBoletaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;

@Service
public class PdfService {

    @Autowired
    private BoletaRepository boletaRepository;

    @Autowired
    private DetalleBoletaRepository detalleBoletaRepository;

    public byte[] generarBoletaPdf(Integer numeroBoleta) {
        Optional<Boleta> boletaOpt = boletaRepository.findById(numeroBoleta);
        if (!boletaOpt.isPresent()) {
            throw new RuntimeException("Boleta no encontrada");
        }

        Boleta boleta = boletaOpt.get();
        
        // Mapeado con la consulta automática de Spring Data JPA
        List<DetalleBoleta> detalles = detalleBoletaRepository.findByBoletaNumeroBoleta(numeroBoleta);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, baos);

        document.open();
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);

        Paragraph title = new Paragraph("CLÍNICA DENTAL TRIDENTIST - BOLETA ELECTRÓNICA", fontTitle);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);

        Font fontNormal = FontFactory.getFont(FontFactory.HELVETICA);
        fontNormal.setSize(12);

        document.add(new Paragraph(" "));
        document.add(new Paragraph("Boleta N°: " + boleta.getNumeroBoleta(), fontNormal));
        document.add(new Paragraph("Fecha: " + boleta.getFechaEmision().toString(), fontNormal));
        
        // CORRECCIÓN FINAL: Navega por Paciente y obtiene su 'codigo' (según tu SQL)
        document.add(new Paragraph("Paciente Código: " + boleta.getPaciente().getCodigo(), fontNormal));
        document.add(new Paragraph(" "));

        document.add(new Paragraph("Detalles de Tratamiento:", FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
        document.add(new Paragraph("--------------------------------------------------"));
        for (DetalleBoleta detalle : detalles) {
            
            // CORRECCIÓN FINAL: Navega por Tratamiento y obtiene su 'idTratamiento' (id_tratamiento del SQL)
            String linea = "Tratamiento ID: " + detalle.getTratamiento().getIdTratamiento() + 
                           " | Cantidad: " + detalle.getCantidad() + 
                           " | P.U: S/ " + detalle.getPrecioUnitario() + 
                           " | Subtotal: S/ " + (detalle.getCantidad() * detalle.getPrecioUnitario().doubleValue());
            document.add(new Paragraph(linea, fontNormal));
        }
        document.add(new Paragraph("--------------------------------------------------"));
        
        Font fontTotal = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTotal.setSize(14);
        document.add(new Paragraph("TOTAL: S/ " + boleta.getTotal(), fontTotal));

        document.close();
        return baos.toByteArray();
    }
}