import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { FormState } from '../types';

export const generateExcel = async (submissions: FormState[]) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Suivi des Projets', {
    views: [{ showGridLines: true }]
  });

  // Base styling
  const headerFont = { name: 'Arial', size: 10, bold: true };
  const cellFont = { name: 'Arial', size: 10 };
  const borderThin: Partial<ExcelJS.Borders> = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  };
  const bgGray: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA6A6A6' } };
  const bgLightGray: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };

  // Set up header info
  sheet.getCell('A2').value = 'Premier Ministre';
  sheet.getCell('A3').value = 'Agence Algérienne de Promotion de l\'Investissement';

  // Title
  sheet.mergeCells('A5:X5');
  const titleCell = sheet.getCell('A5');
  titleCell.value = 'Formulaire de suivi de l\'état d\'avancement des projets inscrits auprès de l\'AAPI';
  titleCell.font = { size: 14, bold: true };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

  // Columns definition (Total 29 columns from A to AC)
  // Let's define the hierarchical headers:
  // Row 6: Main Sections (Part 1, Part 2...)
  // Row 7: Sub Sections (1. Attestation, 2. Coordonnées...)
  // Row 8: Columns (Numéro d'enregistrement, Adresse e-mail...)

  const headers = [
    // PART I
    { section: 'PARTIE I — PRISE DE CONTACT ET SUIVI DE LA MOBILISATION DU PROMOTEUR', group: '1. Attestation d\'enregistrement', col: 'Numéro d\'enregistrement', key: 'attestationNumero' },
    { section: 'PARTIE I — PRISE DE CONTACT ET SUIVI DE LA MOBILISATION DU PROMOTEUR', group: '2. Coordonnées du responsable du projet', col: 'Adresse e-mail', key: 'responsableEmail' },
    { section: 'PARTIE I — PRISE DE CONTACT ET SUIVI DE LA MOBILISATION DU PROMOTEUR', group: '2. Coordonnées du responsable du projet', col: 'Numéro de téléphone', key: 'responsableTelephone' },
    { section: 'PARTIE I — PRISE DE CONTACT ET SUIVI DE LA MOBILISATION DU PROMOTEUR', group: '3. Contact du promoteur', col: '3.1. Prise du contact', key: 'contactEtabli' },
    { section: 'PARTIE I — PRISE DE CONTACT ET SUIVI DE LA MOBILISATION DU PROMOTEUR', group: '3. Contact du promoteur', col: '3.2. Information du promoteur', key: 'informationPromoteur' },
    { section: 'PARTIE I — PRISE DE CONTACT ET SUIVI DE LA MOBILISATION DU PROMOTEUR', group: '3. Contact du promoteur', col: '3.3. Sinon : Raison de non contact', key: 'raisonNonContact' },
    
    // PART II
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '4. SUIVI DE LA PRÉSENTATION DU PROMOTEUR AU GUD', col: '4.1. Présentation au GUD', key: 'presentationGUD' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '4. SUIVI DE LA PRÉSENTATION DU PROMOTEUR AU GUD', col: '4.2. Proposition d\'un autre rendez-vous', key: 'autreRendezVous' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '4. SUIVI DE LA PRÉSENTATION DU PROMOTEUR AU GUD', col: 'Oui → Date prévue', key: 'autreRendezVousDate' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '4. SUIVI DE LA PRÉSENTATION DU PROMOTEUR AU GUD', col: '4.3. Motif de non-présentation', key: 'motifNonPresentation' },
    
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '5. CONDITIONS DE RÉALISATION', col: 'Crédit bancaire', key: 'necessiteCredit' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '5. CONDITIONS DE RÉALISATION', col: 'État du crédit', key: 'etatCredit' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '5. CONDITIONS DE RÉALISATION', col: 'Foncier nécessaire', key: 'necessiteFoncier' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '5. CONDITIONS DE RÉALISATION', col: 'Type du foncier', key: 'typeFoncier' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '5. CONDITIONS DE RÉALISATION', col: 'État des démarches (foncier)', key: 'etatDemarchesFoncieres' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '5. CONDITIONS DE RÉALISATION', col: 'Permis de construire', key: 'necessitePermis' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '5. CONDITIONS DE RÉALISATION', col: 'État permis', key: 'etatPermis' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '5. CONDITIONS DE RÉALISATION', col: 'PPI', key: 'necessitePPI' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '5. CONDITIONS DE RÉALISATION', col: 'État PPI', key: 'etatPPI' },

    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '6. ÉTAT D\'AVANCEMENT DU PROJET', col: 'État actuel', key: 'etatProjet' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '6. ÉTAT D\'AVANCEMENT DU PROJET', col: 'Taux avancement (%)', key: 'tauxAvancementPhysique' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '6. ÉTAT D\'AVANCEMENT DU PROJET', col: 'Mise en exploitation', key: 'miseEnExploitation' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '6. ÉTAT D\'AVANCEMENT DU PROJET', col: 'Difficulté principale', key: 'difficultePrincipale' },
    
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '7. TYPES DE SOUTIEN SUPPLÉMENTAIRE', col: 'Soutien(s) demandé(s)', key: 'typesSoutien' },
    
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '8. SUIVI DU TRAITEMENT', col: 'Action engagée', key: 'actionEngagee' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '8. SUIVI DU TRAITEMENT', col: 'Partie intervenante', key: 'partieIntervenante' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '8. SUIVI DU TRAITEMENT', col: 'État du traitement', key: 'etatTraitement' },
    { section: 'PARTIE II — ÉTAT D\'AVANCEMENT ET DIAGNOSTIC DU PROJET', group: '8. SUIVI DU TRAITEMENT', col: 'Résultat', key: 'resultatTraitement' },
  ];

  // Set widths
  sheet.columns = headers.map(() => ({ width: 20 }));

  // Helper mapping columns to index (1-based)
  const getCol = (idx: number) => sheet.getColumn(idx + 1).letter;

  // Render Row 6: Sections
  const row6 = sheet.getRow(6);
  let startCol = 1;
  while (startCol <= headers.length) {
    const section = headers[startCol - 1].section;
    let endCol = startCol;
    while (endCol < headers.length && headers[endCol].section === section) {
      endCol++;
    }
    const cell = row6.getCell(startCol);
    cell.value = section;
    cell.font = { ...headerFont, color: { argb: 'FFFFFFFF' } };
    cell.fill = bgGray;
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    sheet.mergeCells(`${getCol(startCol - 1)}6:${getCol(endCol - 1)}6`);
    startCol = endCol + 1;
  }
  row6.height = 25;

  // Render Row 7: Groups
  const row7 = sheet.getRow(7);
  startCol = 1;
  while (startCol <= headers.length) {
    const group = headers[startCol - 1].group;
    let endCol = startCol;
    while (endCol < headers.length && headers[endCol].group === group) {
      endCol++;
    }
    const cell = row7.getCell(startCol);
    cell.value = group;
    cell.font = headerFont;
    cell.fill = bgLightGray;
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    if (endCol > startCol) {
      sheet.mergeCells(`${getCol(startCol - 1)}7:${getCol(endCol - 1)}7`);
    }
    startCol = endCol + 1;
  }
  row7.height = 20;

  // Render Row 8: Columns
  const row8 = sheet.getRow(8);
  headers.forEach((h, i) => {
    const cell = row8.getCell(i + 1);
    cell.value = h.col;
    cell.font = headerFont;
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = borderThin;
  });
  row8.height = 30;

  // Apply borders to row 6 and 7 as well
  for (let c = 1; c <= headers.length; c++) {
    row6.getCell(c).border = borderThin;
    row7.getCell(c).border = borderThin;
  }

  // Populate data
  submissions.forEach((sub, rowIdx) => {
    const row = sheet.getRow(9 + rowIdx);
    headers.forEach((h, colIdx) => {
      const cell = row.getCell(colIdx + 1);
      
      let val = sub[h.key as keyof FormState] as string | string[];
      if (Array.isArray(val)) val = val.join(', ');
      
      // Enums format
      if (typeof val === 'string') {
         val = val.replace(/_/g, ' ');
      }
      
      cell.value = val || '-';
      cell.font = cellFont;
      cell.alignment = { vertical: 'middle', wrapText: true };
      cell.border = borderThin;
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), 'Suivi_Projets_AAPI.xlsx');
};
