/* In-app User Guide — one entry per page (key = file name without .html). */
window.VC_HELP = {
  'index': { t: 'Viro Calculator — quick guide',
    w: 'A set of lab calculators for serology, molecular work, virology and everyday lab maths. Everything works without login.',
    s: ['Pick a calculator from the cards (or use the search box to find one by name).', 'On a phone use the bottom bar; “Tools” opens the full list. On a computer use the sidebar.', 'Open any calculator and tap the ? Help button for a short guide to that page.', 'Sign in (top right) only if you want your department data — Dengue plate ODs, RealStar history and custom master mix protocols — to sync across devices.'],
    k: ['Install the app from your browser menu (Add to Home screen) to use it like a normal app.', 'Calculators never need login; only the synced items do.', 'Only people in your own department can see synced data.'] },

  'dengue-elisa': { t: 'Dengue ELISA (IgM / NS1)',
    w: 'Enter plate ODs and get Negative / Equivocal / Positive for each well, with QC checks.',
    s: ['Choose the test: Dengue IgM or Dengue NS1 Ag.', 'Enter the control ODs (and the calibration factor for IgM when your kit lot needs it).', 'Type sample ODs well by well. Tab / Enter moves in plate order A1–H1, then A2–H2… You can also paste a column of ODs.', 'Press Calculate Results to see one-word results for every sample.', 'Press Print Report for a compact black-and-white sheet (up to 96 samples on one page).', 'Use Reset plate to clear all ODs before the next run.'],
    k: ['Results are one word only (Negative / Equivocal / Positive) to save paper.', 'ODs sync inside your department if you are signed in.'] },

  'chik-igm-elisa': { t: 'Chikungunya IgM ELISA (InBios)',
    w: 'Calculates the Immune Status Ratio (ISR) for samples and checks the plate controls.',
    s: ['Open “Run details & lot-specific limits” and enter kit lot, date and the limits from your kit insert.', 'Enter duplicate ODs for the plate controls (NC, PC, CC).', 'Enter patient sample ODs. Press Tab to jump to the next OD; the sample names stay Sample 1, 2, 3…', 'Check the QC messages: PC/NC ratio must be at least 5.0 and the controls must be within limits.', 'Read the ISR result per sample (Negative / Equivocal / Positive).', 'Use “+ Add 5 more samples” for longer runs, Print report for a B&W sheet, Clear plate to start again.'],
    k: ['If QC fails the run should not be reported.', 'Data stays on this device only — it is not synced.'] },

  'wash-buffer': { t: 'Wash Buffer Preparation',
    w: 'Works out how much wash buffer you need for the plate and how much concentrate and water to mix.',
    s: ['Enter the number of wells to wash.', 'Enter the volume per well per wash (µL).', 'Choose the wash type, washes per cycle and number of cycles (or number of single washes).', 'Choose the wash buffer dilution (for example 1:20) or a custom 1:N.', 'Add an extra % for priming and dead volume.', 'Read the total buffer, concentrate to take and water to add.'],
    k: ['“1:N” means 1 part concentrate + (N−1) parts water.', 'Add a bit more than the minimum for washer priming.'] },

  'diagnostic-2x2': { t: 'Sensitivity / Specificity (2×2 table)',
    w: 'Compares a new test with a reference test and gives accuracy measures with 95 % confidence intervals.',
    s: ['Enter the four counts: true positive, false positive, false negative, true negative.', 'Read sensitivity, specificity, PPV, NPV, accuracy and likelihood ratios.', 'Check Cohen’s kappa for agreement and McNemar’s test when comparing paired results.', 'Copy the results to paste into a report.'],
    k: ['PPV and NPV depend on prevalence in your sample group.', 'Kappa ≥ 0.8 is usually read as very good agreement.'] },

  'pooling-dorfman': { t: 'Sample Pooling (Dorfman)',
    w: 'Finds the best pool size and shows how many tests you save when many samples are expected to be negative.',
    s: ['Enter the expected prevalence (%).', 'Enter the number of samples you have.', 'Read the best pool size, expected number of reactions and the saving compared with testing one by one.', 'Check the table of pool sizes to compare options.'],
    k: ['Pooling works best at low prevalence (below about 10–15 %).', 'Very large pools can lose sensitivity because of dilution — confirm with your validated method.'] },

  'generic-elisa': { t: 'Generic ELISA',
    w: 'A flexible ELISA calculator: pick the formula your kit uses and get results for a 96-well plate.',
    s: ['Enter a kit name and choose how many NC, PC and calibrator wells your kit uses.', 'Pick the formula: cut-off from NC, PC or calibrator (S/CO), or an index method — Sample/Calibrator ratio, Scaled index ×10, Blank-corrected ratio, or S/P.', 'Enter the formula number (k) and the equivocal zone (%).', 'Type a blank OD if your kit needs blank subtraction — it is subtracted from every well.', 'Enter control ODs and then sample ODs in plate order (A1–H1, A2–H2…). Pasting a column also works.', 'Read Negative / Equivocal / Positive for each sample and print the compact list.', 'Save the settings as a kit to reuse next time.'],
    k: ['For index methods the S/CO column shows the equivalent ratio to the cut-off OD.', 'Saved kits stay on this device.'] },

  'realstar-vl': { t: 'RealStar® Viral Load',
    w: 'Converts the PCR result (IU/µL or copies/µL) to IU/mL or copies/mL using your extraction method.',
    s: ['Choose the extraction method preset (sample input and elution volume).', 'Tick “Keep volumes same for all runs” if every sample uses the same volumes.', 'Enter the PCR result.', 'Read the viral load per mL and the log₁₀ value; press Copy Result.', 'Press Next Sample to enter the next one.', 'Use “Manage Extraction Methods” to add your own presets.'],
    k: ['The last 10 samples are kept in Recent Runs and sync inside your department when signed in.', 'Check that the result unit matches the kit insert.'] },

  'custom-vl': { t: 'Custom Viral Load',
    w: 'Build your own viral load method (Ct + standard curve, copies/µL → copies/mL, or copies → IU) and reuse it.',
    s: ['Press + New to create a method and give it a name.', 'Choose the method type.', 'Add the constants from your kit insert (slope, intercept, volumes, conversion factor…).', 'Choose the result unit and, if needed, a “< LoD” rule.', 'Enter your inputs for each sample in the Samples table.', 'Copy the results or print a B&W sheet.'],
    k: ['Use Duplicate to make a variation of an existing method.', 'Always check a new method against a known example first.'] },

  'custom-mastermix': { t: 'Custom Master Mix',
    w: 'Your own master mix recipes: volumes for any number of reactions, plus a printable 2-page PCR worksheet.',
    s: ['Calculate: choose a test, enter the number of reactions. The table shows what to pipette (with extra %).', 'Edit / add tests: + New test, enter your name, PCR type (real-time or conventional), targets with reporter dye / quencher, and passive reference.', 'Enter total volume, template volume and each reagent. Water (NFW) is calculated automatically and hidden when it is zero. Use ✕ to remove a default reagent you do not use.', 'Need different mixes with the same cycling (for example one per target)? Press + Add master mix and keep “Same as the first master mix”. For nested PCR add a mix with “Different (own cycling)”.', 'Enter the cycling steps: temperature in °C, time in sec or min, cycles. Tick Merge to join the cycles cell with the step above.', 'Plate layout: choose controls (NTC, PC, IQC, standards), spacing between samples, and paste sample numbers from Excel with Ctrl+V.', 'Enter CT values for each target if you want them printed.', 'Press Print worksheet: page 1 = plate grid, page 2 = master mix, cycling and dye.'],
    k: ['Tests sync inside your department; plate data and CT values stay on this device.', 'Print on A4 landscape with default margins.', 'The wells you type for a control override the automatic position.'] },

  'reagent-duration': { t: 'Reagent Duration',
    w: 'Tells you how long a kit will last, or how much to order for a number of days.',
    s: ['Enter reactions in stock (or ordered).', 'Enter runs per day, working days per week, controls per run and average samples per run.', 'Add replicates and an extra % for repeats / failed runs.', 'Optionally enter the fewest and most samples per run to see best and worst cases.', 'Read how many days / weeks the stock will last.', 'Use “How much to order” with the number of days you want it to last (and kit size if you know it).'],
    k: ['Use realistic extra % — repeats are easy to forget.'] },

  'altona-am16-order': { t: 'AM16 Kit Order',
    w: 'Calculates what to order for the Altona AM16 assays.',
    s: ['Enter total samples required and assays per sample.', 'Enter average and maximum samples per run and PCR controls per assay per run.', 'Add a safety margin (%).', 'Read the order list and use Copy order list or Print.', 'Open “Consumption per run” to change the kit defaults, or Reset to defaults.'],
    k: ['Check the reactions per Master A / B tube against your current kit insert.'] },

  'altona-mastermix': { t: 'Master Mix Prep (Altona)',
    w: 'Volumes of Master A and Master B for a number of reactions.',
    s: ['Enter total reactions (samples + controls).', 'Check Master A and Master B per reaction (µL).', 'Read the volume of each master and the total volume (A + B).'],
    k: ['Always include the controls in the reaction count.'] },

  'pcr-tm': { t: 'PCR Amplicon & Tm',
    w: 'Primer melting temperature, GC %, amplicon properties and a suggested annealing temperature.',
    s: ['Paste your forward and reverse primer sequences (5′→3′).', 'Enter salt / Mg²⁺ / primer concentrations if they differ from the defaults.', 'Optionally enter the amplicon length.', 'Read Tm, GC %, length and the suggested annealing temperature.'],
    k: ['Aim for primers with Tm within about 2 °C of each other.', 'Tm uses the nearest-neighbour method; real conditions may need small adjustment.'] },

  'qpcr-tools': { t: 'qPCR Tools',
    w: 'Standard curve, PCR efficiency and unit / log conversions in one place.',
    s: ['Ct → copies: build a curve from your standards (or enter slope and intercept) and add unknown Ct values.', 'Optionally convert to copies/mL of the original sample using sample input and elution volume.', 'Slope ⇄ Efficiency: enter a slope to get efficiency (or the reverse).', 'Copies ⇄ IU & log reduction: convert copies/mL ↔ IU/mL and calculate log₁₀ change between two values.'],
    k: ['Good efficiency is about 90–110 % (slope near −3.3).', 'Use mean Ct of replicates for standards.'] },

  'viral-titer': { t: 'Viral Titer',
    w: 'TCID₅₀ end-point (Reed–Muench and Spearman–Kärber) and plaque assay PFU/mL.',
    s: ['TCID₅₀: enter first dilution, dilution factor, replicate wells and inoculum volume.', 'For each dilution row enter the wells showing CPE.', 'Read TCID₅₀/mL for both methods and the dose–response chart.', 'Plaque assay: enter inoculum volume, dilution and plaques counted for each plate.', 'Use only plates in the countable range for PFU/mL.'],
    k: ['Add or remove dilution rows as needed (✕ removes a row).'] },

  'xeno-mir-mle': { t: 'Xenomonitoring MIR / MLE',
    w: 'Estimates infection in mosquito pools: Minimum Infection Rate and Maximum Likelihood Estimate with 95 % CI.',
    s: ['Choose Summary mode (totals) or Batch mode (pool-by-pool).', 'Enter number of pools, positive pools and total vectors (or pool sizes in batch mode).', 'Read MIR and MLE per 1,000 vectors with confidence intervals.', 'Copy or print the result.'],
    k: ['MLE is better when pool sizes vary or many pools are positive.', 'MIR can under-estimate if pools are large.'] },

  'moi-calc': { t: 'MOI Calculator',
    w: 'How much virus stock to add for a target multiplicity of infection.',
    s: ['Enter cells per vessel and the number of vessels (or work out cells from cell density and volume).', 'Choose the target MOI (0.01 – 10, or type your own).', 'Enter the virus stock titer and its unit.', 'Read the virus volume per vessel and in total.', 'Optionally see the expected infection outcome and volumes for other MOIs.'],
    k: ['Titer units must match what you actually measured (PFU/mL, TCID₅₀/mL…).'] },

  'neubauer-calc': { t: 'Neubauer & Splitting',
    w: 'Cell concentration from a hemocytometer count, and how to dilute or seed flasks.',
    s: ['Step 1: enter total cells counted, number of squares counted and the dilution factor (for example trypan blue).', 'Read cells/mL and use it for Step 2.', 'Step 2: enter current concentration, desired concentration and target volume.', 'Read how much cell suspension and medium to mix.'],
    k: ['Count at least 100 cells for a reliable number.'] },

  'dilution-calc': { t: 'Dilution & Serial',
    w: 'C₁V₁ = C₂V₂ solver and a serial dilution builder.',
    s: ['C₁V₁ = C₂V₂: choose what to solve for, fill the other three values and units.', 'Serial dilution: choose dilution factor (1:2, 1:10 or custom), number of tubes and volume per tube.', 'Optionally enter a starting concentration.', 'Read the table of what goes in each tube; copy it if needed.'],
    k: ['Tick the “keep full volume” option if you want extra in every tube.'] },

  'rcf-calc': { t: 'Centrifuge RPM ⇄ RCF',
    w: 'Converts RPM to ×g and back using the rotor radius.',
    s: ['Enter the rotor radius and unit (or choose a saved rotor).', 'Enter RPM to get ×g, or enter ×g to get RPM.', 'Use the quick reference table for common ×g values.', 'Save your rotors under “Manage saved rotors”.'],
    k: ['Use the radius to the bottom of the tube for a safe estimate.'] },

  'unit-converter': { t: 'Unit Converter',
    w: 'Ten categories of units, including lab concentrations with molecular weight.',
    s: ['Slide the category cards left / right and tap one (length, volume, concentration, temperature…).', 'Type a value in From and choose its unit inside the box.', 'The To value updates instantly; change the To unit as needed.', 'Press ⇅ to swap From and To.', 'For molar ↔ mass concentration enter the molecular weight when asked.', 'The Common conversions table shows all units; tap a row to copy it.'],
    k: ['Your last choices are remembered on this device.'] },

  'sci-calc': { t: 'Scientific Calculator',
    w: 'A normal calculator with scientific functions.',
    s: ['Type or tap an expression and press = (Enter also works).', 'Use DEG / RAD for trigonometry.', 'Use ( ), ^, √, log, ln, π and e as needed.', 'Use ANS to reuse the last result and the history to look back.'],
    k: ['You can use the keyboard for all numbers and operators.'] },

  'fumigation-calc': { t: 'Room Fumigation',
    w: 'Room volume in cubic feet for fumigation calculations.',
    s: ['Enter length, breadth and height in feet.', 'Read the volume in cubic feet.', 'Use the volume to prepare the fumigant as per your SOP.'],
    k: ['Always follow your biosafety SOP for quantities and safety time.'] }
};
