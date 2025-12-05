const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const INPUT_FILE = path.join(__dirname, "grade.xlsx");
const OUTPUT_JSON = path.join(__dirname, "../app/data/ranking.json");
const OUTPUT_MAPPING = path.join(__dirname, "../ECHIPE_CODURI_SECRET.csv");

// Set pentru a memora codurile deja folosite în această rulare
const usedCodes = new Set();

function generateCode() {
     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
     let result = "CR-";
     for (let i = 0; i < 4; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
     }
     return result;
}

try {
     console.log(`📖 Caut fisierul aici: ${INPUT_FILE}`);

     if (!fs.existsSync(INPUT_FILE)) {
          throw new Error(
               `Fisierul NU a fost gasit! Verifica daca 'grade.xlsx' este in folderul: ${__dirname}`
          );
     }

     const workbook = xlsx.readFile(INPUT_FILE);
     const sheetName = workbook.SheetNames[0];
     const worksheet = workbook.Sheets[sheetName];
     const records = xlsx.utils.sheet_to_json(worksheet);

     const publicData = [];
     const mappingData = ["Nume Echipa,Cod Unic"];

     // Resetăm setul de coduri la fiecare rulare
     usedCodes.clear();

     records.forEach((row) => {
          const teamName = row["Full name"];
          if (!teamName) return;

          let code;

          // --- AICI ESTE LOGICA DE UNICITATE ---
          // Generăm un cod și verificăm dacă există deja în 'usedCodes'.
          // Dacă există, bucla 'do-while' îl generează din nou până găsește unul liber.
          do {
               code = generateCode();
          } while (usedCodes.has(code));

          // Adăugăm codul nou în lista celor folosite
          usedCodes.add(code);
          // -------------------------------------

          mappingData.push(`"${teamName}",${code}`);

          const parseScore = (val) => {
               if (typeof val === "number") return val;
               return parseFloat(val) || 0;
          };

          publicData.push({
               code: code,
               scores: {
                    imi: parseScore(row["IMI"]),
                    heits: parseScore(row["HEITS"]),
                    sabau: parseScore(row["SABAU"]),
                    ioan: parseScore(row["IOAN"]),
                    uniqa: parseScore(row["UNIQA"]),
                    training: parseScore(row["Traininguri"]),
               },
               total: parseScore(row["TOTAL"]),
          });
     });

     publicData.sort((a, b) => b.total - a.total);

     const dataDir = path.dirname(OUTPUT_JSON);
     if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

     fs.writeFileSync(OUTPUT_JSON, JSON.stringify(publicData, null, 2));
     console.log(`✅ Succes! Fisierul public: ${OUTPUT_JSON}`);

     fs.writeFileSync(OUTPUT_MAPPING, mappingData.join("\n"));
     console.log(`🔒 Succes! Fisierul secret: ${OUTPUT_MAPPING}`);
} catch (error) {
     console.error("❌ EROARE:");
     console.error(error.message);
}
