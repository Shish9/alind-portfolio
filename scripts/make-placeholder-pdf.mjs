// Generates a minimal valid one-page PDF used as the Download CV placeholder.
// Replace public/Alind_Salahaldin_CV.pdf with the real CV before going live.
import { writeFileSync, mkdirSync } from "node:fs";

const lines = [
  ["Helvetica-Bold", 20, 72, 740, "Alind Salahaldin"],
  ["Helvetica", 12, 72, 716, "Civil Engineering Graduate / Site Engineer"],
  ["Helvetica", 11, 72, 688, "Kurdistan-Iraq, Dohuk  |  (+964) 7503233221  |  alend3233@gmail.com"],
  ["Helvetica-Oblique", 10, 72, 650, "Placeholder file - replace with the full CV PDF."],
];

let content = "";
for (const [font, size, x, y, text] of lines) {
  const f = font === "Helvetica-Bold" ? "F2" : font === "Helvetica-Oblique" ? "F3" : "F1";
  content += `BT /${f} ${size} Tf ${x} ${y} Td (${text.replace(/[()\\]/g, "\\$&")}) Tj ET\n`;
}

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>",
  `<< /Length ${content.length} >>\nstream\n${content}endstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xref = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const o of offsets) pdf += `${String(o).padStart(10, "0")} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

mkdirSync("public", { recursive: true });
writeFileSync("public/Alind_Salahaldin_CV.pdf", pdf, "binary");
console.log("public/Alind_Salahaldin_CV.pdf written:", pdf.length, "bytes");
