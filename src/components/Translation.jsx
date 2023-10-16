import React, { useEffect, useState } from "react";
import jsPDF from "jspdf"; // Import library jsPDF untuk membuat PDF
import logo from "../assets/logo.png";

export default function Translation({ doStuff, setInput, result }) {
  const [autoTypedResult, setAutoTypedResult] = useState("");

  useEffect(() => {
    if (result.length > 0) {
      autoTypeResult(result);
    }
  }, [result]);

  const autoTypeResult = (text) => {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        setAutoTypedResult((prevResult) => prevResult + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  // Fungsi untuk mengekspor teks menjadi PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("times", "roman"); // Set font family menjadi Times New Roman
    doc.setFontSize(12); // Set ukuran font menjadi 12px

    const pageWidth = doc.internal.pageSize.getWidth(); // Lebar halaman PDF (default A4)

    // Membagi teks ke dalam array yang sesuai dengan lebar halaman PDF (A4 dalam contoh ini)
    const splitText = doc.splitTextToSize(autoTypedResult, pageWidth - 20);

    let yPos = 10; // Posisi awal y (vertikal) untuk teks
    splitText.forEach((text, index) => {
      // Cek apakah teks melebihi lebar kertas, jika ya, tambahkan halaman baru dan reset posisi y
      if (yPos > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPos = 10;
      }

      doc.text(10, yPos, text); // Tambahkan teks di posisi yang sesuai
      yPos += 12; // Naikkan posisi y untuk baris berikutnya (sesuai ukuran font)
    });
    doc.save("chatGPT katalis.pdf"); // Simpan file PDF dengan nama "hasil_auto_typed.pdf"
  };

  return (
    <div>
      <img className="logo-image" src={logo} alt="logo CV Katalis Indonesia" />
      <h1 className="heading">ChatGPT CV Katalis Indonesia</h1>
      <textarea
        className="text-area"
        cols={30}
        rows={5}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Masukkan teks kesini"
      ></textarea>
      <button className="action-btn" onClick={doStuff}>
        Proses Sekarang
      </button>
      <button className="action-btn" onClick={exportToPDF}>
        Export ke PDF
      </button>
      <h3 className="result-text">{autoTypedResult || ""}</h3>
    </div>
  );
}
