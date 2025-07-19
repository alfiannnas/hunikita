import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import logo from "../../../../public/logo-hunikita-99.svg"; // Ganti dengan logo hunikita jika ada

const Invoice = () => {
    const invoiceRef = useRef();
    const location = useLocation();
    const pengajuan = location.state?.pengajuan || {};

    useEffect(() => {
        if (invoiceRef.current) {
            html2pdf()
                .from(invoiceRef.current)
                .set({
                    margin: 0.5,
                    filename: `Invoice-${pengajuan.invoice_number || "Hunikita"}.pdf`,
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
                })
                .save();
        }
    }, [pengajuan]);

    return (
        <div
            ref={invoiceRef}
            style={{
                fontFamily: "Arial, sans-serif",
                background: "#f7f7f7",
                minHeight: "113vh",
                padding: "32px",
                color: "#222",
                maxWidth: 700,
                margin: "0 auto",
                borderRadius: 12,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                marginTop: "30px"
            }}
        >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
                <img src={logo} alt="Hunikita Logo" style={{ width: 60, marginRight: 16 }} />
                <div>
                    <h2 style={{ margin: 0, color: "#2563eb" }}>Hunikita</h2>
                    <span style={{ fontSize: 14, color: "#888" }}>Invoice Pembayaran Sewa Properti</span>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div style={{ fontWeight: "bold", fontSize: 18, color: "#2563eb" }}>INVOICE</div>
                    <div style={{ fontSize: 13, color: "#888" }}>
                        {new Date().toLocaleDateString("id-ID")}
                    </div>
                </div>
            </div>

            {/* Info Penyewa & Properti */}
            <div style={{ background: "#fff", borderRadius: 8, padding: 24, marginBottom: 24, border: "1px solid #e5e7eb" }}>
                <div style={{ marginBottom: 12 }}>
                    <b>No. Invoice:</b> {pengajuan.invoice_number || "-"}
                </div>
                <div style={{ display: "flex", gap: 32 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "bold", marginBottom: 4 }}>Penyewa</div>
                        <div>Nama: {pengajuan.user_name || "-"}</div>
                        <div>Email: {pengajuan.user_email || "-"}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "bold", marginBottom: 4 }}>Properti</div>
                        <div>Nama: {pengajuan.property_name || "-"}</div>
                        <div>Alamat: {pengajuan.address || "-"}</div>
                    </div>
                </div>
            </div>

            {/* Tabel Pembayaran */}
            <div style={{ background: "#fff", borderRadius: 8, padding: 24, border: "1px solid #e5e7eb" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
                    <thead>
                        <tr style={{ background: "#f1f5f9" }}>
                            <th style={{ padding: 8, border: "1px solid #e5e7eb" }}>Deskripsi</th>
                            <th style={{ padding: 8, border: "1px solid #e5e7eb" }}>Durasi</th>
                            <th style={{ padding: 8, border: "1px solid #e5e7eb" }}>Tanggal Masuk</th>
                            <th style={{ padding: 8, border: "1px solid #e5e7eb" }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: 8, border: "1px solid #e5e7eb" }}>
                                Sewa Properti {pengajuan.property_name || "-"}
                            </td>
                            <td style={{ padding: 8, border: "1px solid #e5e7eb", textAlign: "center" }}>
                                {pengajuan.durasi_sewa || "-"} bulan
                            </td>
                            <td style={{ padding: 8, border: "1px solid #e5e7eb", textAlign: "center" }}>
                                {pengajuan.tgl_masuk ? new Date(pengajuan.tgl_masuk).toLocaleDateString('id-ID') : "-"}
                            </td>
                            <td style={{ padding: 8, border: "1px solid #e5e7eb", textAlign: "right" }}>
                                Rp {pengajuan.total?.toLocaleString('id-ID') || "0"}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ textAlign: "right", fontWeight: "bold", fontSize: 18 }}>
                    Grand Total: <span style={{ color: "#16a34a" }}>Rp {pengajuan.total?.toLocaleString('id-ID') || "0"}</span>
                </div>
            </div>

            {/* Status & Footer */}
            <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ fontWeight: "bold", color: "#2563eb" }}>Status: {pengajuan.status || "-"}</div>
                    <div style={{ fontSize: 13, color: "#888" }}>
                        Dicetak pada: {new Date().toLocaleString("id-ID")}
                    </div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, color: "#888" }}>Hunikita</div>
                    <div style={{ fontSize: 13, color: "#888" }}>www.hunikita.com</div>
                </div>
            </div>
            <div style={{ marginTop: 248, textAlign: "center", color: "#888" }}>
                <i>Terima kasih telah menggunakan layanan Hunikita!</i>
            </div>
        </div>
    );
};

export default Invoice;
