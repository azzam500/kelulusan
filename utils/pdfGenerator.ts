import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { Student, GraduationStatus } from '../types';

export const generateSKL = async (student: Student) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const width = doc.internal.pageSize.getWidth();
  
  // -- Header --
  // Logo Placeholder (Using a circle for now as we don't have a local asset)
  doc.setFillColor(22, 101, 52); // sman-800
  doc.circle(25, 25, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text("LOGO", 21, 26);

  doc.setTextColor(0, 0, 0);
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text("PEMERINTAH PROVINSI JAWA TIMUR", width / 2, 20, { align: 'center' });
  doc.text("DINAS PENDIDIKAN", width / 2, 26, { align: 'center' });
  doc.setFontSize(16);
  doc.text("SMA NEGERI 1 PADANGAN", width / 2, 33, { align: 'center' });
  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text("Jl. Dr. Soetomo No. 2, Padangan, Bojonegoro, Jawa Timur", width / 2, 39, { align: 'center' });
  doc.setLineWidth(0.5);
  doc.line(20, 44, width - 20, 44);
  doc.setLineWidth(0.2);
  doc.line(20, 45, width - 20, 45);

  // -- Title --
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text("SURAT KETERANGAN LULUS", width / 2, 55, { align: 'center' });
  doc.setFontSize(11);
  doc.text("TAHUN PELAJARAN 2023/2024", width / 2, 60, { align: 'center' });

  // -- Body Content --
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  let yPos = 75;
  const leftMargin = 25;
  const labelWidth = 50;

  doc.text("Yang bertanda tangan di bawah ini Kepala SMA Negeri 1 Padangan menerangkan bahwa:", leftMargin, yPos);
  yPos += 10;

  const addRow = (label: string, value: string) => {
    doc.text(label, leftMargin, yPos);
    doc.text(":", leftMargin + labelWidth, yPos);
    doc.text(value, leftMargin + labelWidth + 5, yPos);
    yPos += 7;
  };

  addRow("Nama Peserta Didik", student.name.toUpperCase());
  addRow("Tempat, Tanggal Lahir", `${student.birthPlace}, ${new Date(student.birthDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`);
  addRow("NISN", student.nisn);
  addRow("Nomor Peserta Ujian", student.examNumber);
  addRow("Kelas", student.className);

  yPos += 5;
  doc.text("Dinyatakan:", leftMargin, yPos);
  yPos += 10;
  
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.text(student.status === GraduationStatus.PASS ? "LULUS" : "TIDAK LULUS", width / 2, yPos, { align: 'center' });
  
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  yPos += 12;
  doc.text("dengan nilai rata-rata sebagai berikut:", leftMargin, yPos);

  // -- Grades Table --
  yPos += 5;
  const col1 = leftMargin + 10;
  const col2 = width - leftMargin - 30;
  
  // Table Header
  doc.setDrawColor(0);
  doc.setFillColor(240, 240, 240);
  doc.rect(leftMargin, yPos, width - (leftMargin * 2), 8, 'FD');
  doc.setFont("times", "bold");
  doc.text("Mata Pelajaran", col1, yPos + 6);
  doc.text("Nilai", col2, yPos + 6);
  
  yPos += 8;
  doc.setFont("times", "normal");
  
  student.grades.forEach((g, index) => {
    // Row background stripes
    if (index % 2 !== 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(leftMargin, yPos, width - (leftMargin * 2), 7, 'F');
    }
    doc.rect(leftMargin, yPos, width - (leftMargin * 2), 7, 'S'); // Border
    doc.text(g.subject, col1, yPos + 5);
    doc.text(g.score.toString(), col2 + 2, yPos + 5); // align a bit
    yPos += 7;
  });

  // -- Footer / Signature --
  yPos += 15;
  const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  
  const rightColX = width - 70;
  doc.text(`Padangan, ${dateStr}`, rightColX, yPos);
  yPos += 6;
  doc.text("Kepala Sekolah,", rightColX, yPos);
  
  yPos += 25;
  doc.setFont("times", "bold");
  doc.text("Drs. H. NAMA KEPALA SEKOLAH, M.Pd.", rightColX, yPos);
  yPos += 5;
  doc.setFont("times", "normal");
  doc.text("NIP. 19700101 200001 1 001", rightColX, yPos);

  // -- QR Code --
  // Generate QR
  try {
    const qrData = `SMAN1PDG:${student.nisn}:${student.status}`;
    const qrDataUrl = await QRCode.toDataURL(qrData);
    doc.addImage(qrDataUrl, 'PNG', 25, yPos - 35, 30, 30);
    doc.setFontSize(8);
    doc.text("Scan untuk validasi", 25, yPos - 3, {align: 'left'});
  } catch (err) {
    console.error("QR Generation Error", err);
  }

  // Save
  doc.save(`SKL_${student.name.replace(/\s+/g, '_')}.pdf`);
};