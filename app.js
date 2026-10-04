// MacroCount - Logica Applicativa (app.js)

// Database esteso di alimenti standard (valori riferiti a 100g di alimento edibile)
const STANDARD_FOODS = [
  // --- CARNI E VOLATILI ---
  { id: 'pollo_petto', name: 'Petto di Pollo', protein: 23.0, carbs: 0.0, fat: 1.0, gi: 0, diets: [], allergens: [] },
  { id: 'tacchino_fesa', name: 'Fesa di Tacchino', protein: 24.0, carbs: 0.0, fat: 1.2, gi: 0, diets: [], allergens: [] },
  { id: 'manzo_filetto', name: 'Filetto di Manzo', protein: 20.5, carbs: 0.0, fat: 5.0, gi: 0, diets: [], allergens: [] },
  { id: 'manzo_magra', name: 'Carne di Manzo Macinata Magra', protein: 26.0, carbs: 0.0, fat: 10.0, gi: 0, diets: [], allergens: [] },
  { id: 'bresaola', name: 'Bresaola della Valtellina', protein: 32.0, carbs: 0.5, fat: 2.0, gi: 0, diets: [], allergens: [] },
  { id: 'prosciutto_crudo', name: 'Prosciutto Crudo Sgrassato', protein: 28.0, carbs: 0.0, fat: 3.0, gi: 0, diets: [], allergens: [] },
  { id: 'prosciutto_cotto', name: 'Prosciutto Cotto Scelto', protein: 19.0, carbs: 0.5, fat: 11.0, gi: 0, diets: [], allergens: [] },

  // --- PESCE E CROSTACEI ---
  { id: 'salmone', name: 'Salmone Fresco', protein: 20.0, carbs: 0.0, fat: 13.0, gi: 0, diets: [], allergens: ['pesce'] },
  { id: 'tonno_nat', name: 'Tonno al Naturale sgocciolato', protein: 25.0, carbs: 0.0, fat: 1.0, gi: 0, diets: [], allergens: ['pesce'] },
  { id: 'merluzzo', name: 'Merluzzo (Nasello)', protein: 17.0, carbs: 0.0, fat: 0.3, gi: 0, diets: [], allergens: ['pesce'] },
  { id: 'branzino', name: 'Branzino (Spigola)', protein: 19.0, carbs: 0.0, fat: 2.5, gi: 0, diets: [], allergens: ['pesce'] },
  { id: 'gamberi', name: 'Gamberi freschi', protein: 20.0, carbs: 0.8, fat: 0.9, gi: 0, diets: [], allergens: ['pesce'] },

  // --- UOVA ---
  { id: 'uova', name: 'Uovo Intero', protein: 12.6, carbs: 0.6, fat: 10.6, gi: 0, diets: ['vegetariano'], allergens: ['uova'] },

  // --- LATTICINI ED ALTERNATIVE ---
  { id: 'yogurt_greco', name: 'Yogurt Greco 0% grassi', protein: 10.3, carbs: 3.6, fat: 0.0, gi: 15, diets: ['vegetariano'], allergens: ['lattosio'] },
  { id: 'parmigiano', name: 'Parmigiano Reggiano DOP', protein: 32.4, carbs: 0.0, fat: 29.7, gi: 0, diets: ['vegetariano'], allergens: ['lattosio'] },
  { id: 'latte_intero', name: 'Latte Intero', protein: 3.3, carbs: 4.8, fat: 3.6, gi: 30, diets: ['vegetariano'], allergens: ['lattosio'] },
  { id: 'ricotta_vaccina', name: 'Ricotta Vaccina', protein: 8.8, carbs: 3.5, fat: 10.9, gi: 30, diets: ['vegetariano'], allergens: ['lattosio'] },
  { id: 'mozzarella_bufala', name: 'Mozzarella di Bufala', protein: 13.0, carbs: 1.0, fat: 24.0, gi: 0, diets: ['vegetariano'], allergens: ['lattosio'] },
  { id: 'fiocchi_latte', name: 'Fiocchi di Latte', protein: 11.0, carbs: 3.4, fat: 4.3, gi: 30, diets: ['vegetariano'], allergens: ['lattosio'] },
  { id: 'burro', name: 'Burro classico', protein: 0.8, carbs: 0.1, fat: 81.1, gi: 0, diets: ['vegetariano'], allergens: ['lattosio'] },
  
  // --- LEGUMI E DERIVATI ---
  { id: 'tofu', name: 'Tofu Naturale', protein: 8.0, carbs: 1.9, fat: 4.8, gi: 15, diets: ['vegetariano', 'vegano'], allergens: ['soia'] },
  { id: 'tempeh', name: 'Tempeh di Soia', protein: 19.0, carbs: 9.0, fat: 11.0, gi: 15, diets: ['vegetariano', 'vegano'], allergens: ['soia'] },
  { id: 'seitan', name: 'Seitan al Naturale', protein: 25.0, carbs: 4.0, fat: 1.5, gi: 30, diets: ['vegetariano', 'vegano'], allergens: ['glutine'] },
  { id: 'ceci', name: 'Ceci Cotti lessati', protein: 8.9, carbs: 27.4, fat: 2.6, gi: 28, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'lenticchie', name: 'Lenticchie Cotte lessate', protein: 9.0, carbs: 20.1, fat: 0.4, gi: 32, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'fagioli_cannellini', name: 'Fagioli Cannellini lessati', protein: 6.0, carbs: 16.0, fat: 0.5, gi: 35, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'piselli', name: 'Piselli lessati', protein: 5.0, carbs: 14.0, fat: 0.5, gi: 48, diets: ['vegetariano', 'vegano'], allergens: [] },

  // --- CEREALI, TUBERI E DERIVATI ---
  { id: 'riso_basmati', name: 'Riso Basmati', protein: 2.7, carbs: 28.0, fat: 0.4, gi: 50, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'pasta_semola', name: 'Pasta di Semola', protein: 12.0, carbs: 73.0, fat: 1.5, gi: 60, diets: ['vegetariano', 'vegano'], allergens: ['glutine'] },
  { id: 'pasta_integrale', name: 'Pasta Integrale', protein: 12.5, carbs: 65.0, fat: 1.5, gi: 50, diets: ['vegetariano', 'vegano'], allergens: ['glutine'] },
  { id: 'pane_bianco', name: 'Pane Bianco', protein: 8.0, carbs: 49.0, fat: 1.5, gi: 75, diets: ['vegetariano', 'vegano'], allergens: ['glutine'] },
  { id: 'pane_segale', name: 'Pane di Segale', protein: 8.5, carbs: 46.0, fat: 1.8, gi: 50, diets: ['vegetariano', 'vegano'], allergens: ['glutine'] },
  { id: 'fette_integrali', name: 'Fette Biscottate Integrali', protein: 11.5, carbs: 72.0, fat: 5.0, gi: 65, diets: ['vegetariano', 'vegano'], allergens: ['glutine'] },
  { id: 'corn_flakes', name: 'Corn Flakes', protein: 7.0, carbs: 84.0, fat: 0.9, gi: 80, diets: ['vegetariano', 'vegano'], allergens: ['glutine'] },
  { id: 'patate_bollite', name: 'Patate Bollite', protein: 1.8, carbs: 17.0, fat: 0.1, gi: 70, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'patate_dolci', name: 'Patate Dolci', protein: 1.6, carbs: 20.0, fat: 0.1, gi: 50, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'quinoa', name: 'Quinoa', protein: 4.4, carbs: 21.3, fat: 1.9, gi: 53, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'avena', name: 'Fiocchi d\'Avena', protein: 13.5, carbs: 68.7, fat: 7.0, gi: 55, diets: ['vegetariano', 'vegano'], allergens: ['glutine'] },

  // --- FRUTTE ---
  { id: 'mela', name: 'Mela', protein: 0.3, carbs: 13.8, fat: 0.2, gi: 38, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'banana', name: 'Banana', protein: 1.1, carbs: 22.8, fat: 0.3, gi: 50, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'mirtilli', name: 'Mirtilli Freschi', protein: 0.7, carbs: 14.5, fat: 0.3, gi: 53, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'fragole', name: 'Fragole Fresche', protein: 0.67, carbs: 7.7, fat: 0.3, gi: 25, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'arancia', name: 'Arancia', protein: 0.9, carbs: 11.8, fat: 0.1, gi: 40, diets: ['vegetariano', 'vegano'], allergens: [] },

  // --- VERDURE ---
  { id: 'broccoli', name: 'Broccoli Cotti', protein: 2.8, carbs: 7.0, fat: 0.4, gi: 15, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'lattuga', name: 'Lattuga', protein: 1.4, carbs: 2.9, fat: 0.2, gi: 15, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'spinaci', name: 'Spinaci Cotti', protein: 3.0, carbs: 3.8, fat: 0.3, gi: 15, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'zucchine', name: 'Zucchine Cotte', protein: 1.2, carbs: 3.1, fat: 0.2, gi: 15, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'pomodoro', name: 'Pomodoro rosso', protein: 0.9, carbs: 3.9, fat: 0.2, gi: 30, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'carote', name: 'Carote crude', protein: 0.9, carbs: 9.6, fat: 0.2, gi: 47, diets: ['vegetariano', 'vegano'], allergens: [] },

  // --- FRUTTA A GUSCIO E SEMI ---
  { id: 'mandorle', name: 'Mandorle', protein: 21.2, carbs: 21.7, fat: 49.9, gi: 15, diets: ['vegetariano', 'vegano'], allergens: ['frutta_guscio'] },
  { id: 'noci', name: 'Noci', protein: 15.2, carbs: 13.7, fat: 65.2, gi: 15, diets: ['vegetariano', 'vegano'], allergens: ['frutta_guscio'] },
  { id: 'pistacchi', name: 'Pistacchi', protein: 20.0, carbs: 27.0, fat: 45.0, gi: 15, diets: ['vegetariano', 'vegano'], allergens: ['frutta_guscio'] },
  { id: 'anacardi', name: 'Anacardi', protein: 18.2, carbs: 30.2, fat: 43.8, gi: 25, diets: ['vegetariano', 'vegano'], allergens: ['frutta_guscio'] },
  { id: 'semi_zucca', name: 'Semi di Zucca', protein: 30.0, carbs: 10.0, fat: 49.0, gi: 25, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'semi_chia', name: 'Semi di Chia', protein: 16.5, carbs: 42.0, fat: 30.7, gi: 15, diets: ['vegetariano', 'vegano'], allergens: [] },

  // --- GRASSI, OLI E CONDIMENTI ---
  { id: 'olio_oliva', name: 'Olio Extravergine d\'Oliva', protein: 0.0, carbs: 0.0, fat: 99.9, gi: 0, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'avocado', name: 'Avocado', protein: 2.0, carbs: 8.5, fat: 14.7, gi: 10, diets: ['vegetariano', 'vegano'], allergens: [] },
  { id: 'burro_arachidi', name: 'Burro d\'Arachidi', protein: 25.0, carbs: 20.0, fat: 50.0, gi: 40, diets: ['vegetariano', 'vegano'], allergens: ['frutta_guscio'] },

  // --- BEVANDE VEGETALI ---
  { id: 'latte_soia', name: 'Bevanda di Soia (senza zucchero)', protein: 3.3, carbs: 2.0, fat: 1.8, gi: 30, diets: ['vegetariano', 'vegano'], allergens: ['soia'] },
  { id: 'latte_mandorla', name: 'Bevanda di Mandorla (senza zucchero)', protein: 0.5, carbs: 0.2, fat: 1.2, gi: 20, diets: ['vegetariano', 'vegano'], allergens: ['frutta_guscio'] },

  // --- ALIMENTI DI SERVIZIO / CHEAT ---
  { id: 'merendina', name: 'Merendina farcita al cioccolato', protein: 5.0, carbs: 55.0, fat: 18.0, gi: 85, diets: ['vegetariano'], allergens: ['glutine', 'lattosio', 'uova'] },
  { id: 'patatine', name: 'Patatine fritte in busta', protein: 6.0, carbs: 50.0, fat: 35.0, gi: 80, diets: ['vegetariano', 'vegano'], allergens: [] }
];

// Stato dell'applicazione
let state = {
  customFoods: [],
  activeTab: 'calculator', // 'calculator' | 'database'
  
  // Parametri di calcolo
  targetGrams: 15,
  primaryMacro: 'protein', // 'protein' | 'carbs' | 'fat'
  
  // Filtri secondari (limiti massimi in grammi nella porzione calcolata)
  secondaryFilters: {
    protein: { active: false, max: 20 },
    carbs: { active: false, max: 20 },
    fat: { active: false, max: 20 }
  },
  
  // Filtri intolleranze e regimi alimentari
  selectedAllergens: [], // list of allergens to exclude
  selectedDiet: 'any', // 'any' | 'vegetarian' | 'vegan'
  
  // Ordinamento della lista risultati (Kcal predefinito, crescente)
  sortBy: 'calories', // 'calories' | 'weight'
  sortDirection: 'asc', // 'asc' | 'desc'

  // Ricerca nel database
  dbSearchQuery: ''
};

// Carica alimenti personalizzati dal localStorage
function loadCustomFoods() {
  const saved = localStorage.getItem('macrocount_custom_foods');
  if (saved) {
    try {
      state.customFoods = JSON.parse(saved);
    } catch (e) {
      console.error("Errore nel caricare i cibi personalizzati dal localStorage:", e);
      state.customFoods = [];
    }
  }
}

// Salva alimenti personalizzati nel localStorage
function saveCustomFoods() {
  localStorage.setItem('macrocount_custom_foods', JSON.stringify(state.customFoods));
}

// Ottieni la lista combinata di alimenti (standard + personalizzati)
function getAllFoods() {
  return [...STANDARD_FOODS, ...state.customFoods];
}

// Calcola l'Indice Glicemico (stringa leggibile e classe CSS)
function getGiInfo(gi) {
  if (gi === 0 || gi === null || gi === undefined) {
    return { label: 'Basso/Assente', class: 'gi-low' };
  }
  if (gi <= 55) {
    return { label: `Basso (${gi})`, class: 'gi-low' };
  } else if (gi <= 69) {
    return { label: `Medio (${gi})`, class: 'gi-med' };
  } else {
    return { label: `Alto (${gi})`, class: 'gi-high' };
  }
}

// Converte la chiave del macro in etichetta leggibile
function getMacroLabel(macro) {
  const labels = {
    protein: 'Proteine',
    carbs: 'Carboidrati',
    fat: 'Grassi'
  };
  return labels[macro] || macro;
}

// Calcola la lista dei risultati in base allo stato attuale
function calculateResults() {
  const allFoods = getAllFoods();
  const target = parseFloat(state.targetGrams);
  const primary = state.primaryMacro;
  
  if (isNaN(target) || target <= 0) {
    return [];
  }

  let candidates = [];

  for (const food of allFoods) {
    const primaryPer100 = food[primary];
    
    // Se l'alimento non contiene il macro principale, non può soddisfare la richiesta
    if (primaryPer100 <= 0) continue;

    // Calcola il peso della porzione in grammi per ottenere la quantità richiesta di macro principale
    // Porzione = (Target / MacroPer100g) * 100
    const portionWeight = (target / primaryPer100) * 100;

    // Calcola i valori degli altri macro in questa porzione
    const proteinInPortion = (food.protein * portionWeight) / 100;
    const carbsInPortion = (food.carbs * portionWeight) / 100;
    const fatInPortion = (food.fat * portionWeight) / 100;

    // 1. Filtro Regime Alimentare
    if (state.selectedDiet === 'vegetarian') {
      if (!food.diets.includes('vegetariano') && !food.diets.includes('vegano')) continue;
    } else if (state.selectedDiet === 'vegan') {
      if (!food.diets.includes('vegano')) continue;
    }

    // 2. Filtro Intolleranze (Allergeni da ESCLUDERE)
    let hasAllergen = false;
    for (const allergen of state.selectedAllergens) {
      if (food.allergens.includes(allergen)) {
        hasAllergen = true;
        break;
      }
    }
    if (hasAllergen) continue;

    // 3. Filtri Secondari (Limiti massimi nella porzione)
    let failSecondary = false;
    const portionMacros = {
      protein: proteinInPortion,
      carbs: carbsInPortion,
      fat: fatInPortion
    };

    for (const [macro, filter] of Object.entries(state.secondaryFilters)) {
      if (macro === primary) continue; // Salta il macro principale
      if (filter.active) {
        if (portionMacros[macro] > filter.max) {
          failSecondary = true;
          break;
        }
      }
    }
    if (failSecondary) continue;

    // Aggiungi ai candidati validi
    candidates.push({
      food: food,
      portionWeight: portionWeight,
      macros: portionMacros,
      calories: (proteinInPortion * 4) + (carbsInPortion * 4) + (fatInPortion * 9)
    });
  }

  // Ordinamento dei candidati
  candidates.sort((a, b) => {
    let valA = state.sortBy === 'calories' ? a.calories : a.portionWeight;
    let valB = state.sortBy === 'calories' ? b.calories : b.portionWeight;
    
    if (valA === valB) {
      // Sotto-ordinamento per porzione crescente in caso di Kcal identiche
      return a.portionWeight - b.portionWeight;
    }
    
    let diff = valA - valB;
    return state.sortDirection === 'asc' ? diff : -diff;
  });

  // Mostra esattamente i primi 10 risultati
  return candidates.slice(0, 10);
}

// Inizializza gli elementi DOM e assegna i listener
document.addEventListener('DOMContentLoaded', () => {
  loadCustomFoods();
  
  // Elementi Tab/Navigazione
  const tabCalcBtn = document.getElementById('tab-calc-btn');
  const tabDbBtn = document.getElementById('tab-db-btn');
  const viewCalc = document.getElementById('view-calculator');
  const viewDb = document.getElementById('view-database');
  
  // Cambio scheda
  tabCalcBtn.addEventListener('click', () => {
    state.activeTab = 'calculator';
    tabCalcBtn.classList.add('active');
    tabDbBtn.classList.remove('active');
    viewCalc.classList.remove('hidden');
    viewDb.classList.add('hidden');
    renderCalculator();
  });

  tabDbBtn.addEventListener('click', () => {
    state.activeTab = 'database';
    tabDbBtn.classList.add('active');
    tabCalcBtn.classList.remove('active');
    viewCalc.classList.add('hidden');
    viewDb.classList.remove('hidden');
    renderDatabase();
  });

  // Calcolatore - Input principali
  const targetGramsInput = document.getElementById('target-grams');
  const primaryMacroSelect = document.getElementById('primary-macro');
  const sortBySelect = document.getElementById('sort-by-select');
  const sortDirectionBtn = document.getElementById('sort-direction-btn');
  
  targetGramsInput.addEventListener('input', (e) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val) || val <= 0) val = 0;
    state.targetGrams = val;
    renderCalculator();
  });

  primaryMacroSelect.addEventListener('change', (e) => {
    state.primaryMacro = e.target.value;
    updateSecondaryFilterControls();
    renderCalculator();
  });

  if (sortBySelect) {
    sortBySelect.value = state.sortBy;
    sortBySelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCalculator();
    });
  }

  if (sortDirectionBtn) {
    sortDirectionBtn.innerHTML = state.sortDirection === 'asc' ? 'Crescente ↑' : 'Decrescente ↓';
    sortDirectionBtn.addEventListener('click', () => {
      state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      sortDirectionBtn.innerHTML = state.sortDirection === 'asc' ? 'Crescente ↑' : 'Decrescente ↓';
      renderCalculator();
    });
  }

  // Inizializza i filtri secondari nel DOM
  setupSecondaryFilterListeners();

  // Inizializza i filtri di intolleranza e regimi alimentari
  setupFilterListeners();

  // Gestione Alimento Personalizzato (Modale)
  setupCustomFoodModal();

  // Database Search
  const dbSearchInput = document.getElementById('db-search-input');
  dbSearchInput.addEventListener('input', (e) => {
    state.dbSearchQuery = e.target.value.toLowerCase();
    renderDatabase();
  });

  // Primo rendering
  updateSecondaryFilterControls();
  renderCalculator();
});

// Imposta ascoltatori per i filtri di intolleranze e regimi alimentari
function setupFilterListeners() {
  // Regimi alimentari
  const dietButtons = document.querySelectorAll('.diet-btn');
  dietButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dietButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedDiet = btn.dataset.diet;
      renderCalculator();
    });
  });

  // Intolleranze (checkboxes)
  const allergenCheckboxes = document.querySelectorAll('.allergen-checkbox');
  allergenCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const allergen = cb.value;
      if (cb.checked) {
        if (!state.selectedAllergens.includes(allergen)) {
          state.selectedAllergens.push(allergen);
        }
      } else {
        state.selectedAllergens = state.selectedAllergens.filter(a => a !== allergen);
      }
      renderCalculator();
    });
  });
}

// Imposta ascoltatori per i filtri secondari dei macro
function setupSecondaryFilterListeners() {
  const macros = ['protein', 'carbs', 'fat'];
  
  macros.forEach(macro => {
    const cb = document.getElementById(`filter-${macro}-enable`);
    const valInput = document.getElementById(`filter-${macro}-val`);
    const slider = document.getElementById(`filter-${macro}-slider`);
    const sliderVal = document.getElementById(`filter-${macro}-slider-val`);

    if (cb && valInput && slider) {
      cb.addEventListener('change', () => {
        state.secondaryFilters[macro].active = cb.checked;
        valInput.disabled = !cb.checked;
        slider.disabled = !cb.checked;
        renderCalculator();
      });

      const updateValue = (val) => {
        let numeric = parseFloat(val);
        if (isNaN(numeric) || numeric < 0) numeric = 0;
        state.secondaryFilters[macro].max = numeric;
        valInput.value = numeric;
        slider.value = numeric;
        sliderVal.innerText = numeric + 'g';
        renderCalculator();
      };

      valInput.addEventListener('input', (e) => updateValue(e.target.value));
      slider.addEventListener('input', (e) => updateValue(e.target.value));
    }
  });
}

// Disabilita/Nasconde il filtro secondario del macro attualmente selezionato come principale
function updateSecondaryFilterControls() {
  const primary = state.primaryMacro;
  const macros = ['protein', 'carbs', 'fat'];
  
  macros.forEach(macro => {
    const wrapper = document.getElementById(`sec-filter-wrapper-${macro}`);
    const cb = document.getElementById(`filter-${macro}-enable`);
    const valInput = document.getElementById(`filter-${macro}-val`);
    const slider = document.getElementById(`filter-${macro}-slider`);

    if (macro === primary) {
      if (wrapper) wrapper.style.display = 'none';
      if (cb) {
        cb.checked = false;
        state.secondaryFilters[macro].active = false;
      }
      if (valInput) valInput.disabled = true;
      if (slider) slider.disabled = true;
    } else {
      if (wrapper) wrapper.style.display = 'flex';
      if (cb) {
        valInput.disabled = !cb.checked;
        slider.disabled = !cb.checked;
      }
    }
  });
}

// Gestione Modale per Aggiungere Alimento Personalizzato
function setupCustomFoodModal() {
  const modal = document.getElementById('add-food-modal');
  const openBtn = document.getElementById('btn-open-add-modal');
  const closeBtn = document.getElementById('btn-close-modal');
  const form = document.getElementById('add-food-form');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('open');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      form.reset();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      form.reset();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('new-name').value.trim();
      const protein = parseFloat(document.getElementById('new-protein').value) || 0;
      const carbs = parseFloat(document.getElementById('new-carbs').value) || 0;
      const fat = parseFloat(document.getElementById('new-fat').value) || 0;
      const gi = parseInt(document.getElementById('new-gi').value) || 0;

      const diets = [];
      if (document.getElementById('new-diet-vegetarian').checked) diets.push('vegetariano');
      if (document.getElementById('new-diet-vegan').checked) diets.push('vegano');

      const allergens = [];
      const allergenIDs = ['glutine', 'lattosio', 'frutta_guscio', 'uova', 'soia', 'pesce'];
      allergenIDs.forEach(allergen => {
        if (document.getElementById(`new-allergen-${allergen}`).checked) {
          allergens.push(allergen);
        }
      });

      if (!name) {
        alert("Inserisci un nome valido per l'alimento.");
        return;
      }

      const newFood = {
        id: 'custom_' + Date.now(),
        name: name,
        protein: protein,
        carbs: carbs,
        fat: fat,
        gi: gi,
        diets: diets,
        allergens: allergens,
        isCustom: true
      };

      state.customFoods.push(newFood);
      saveCustomFoods();
      
      modal.classList.remove('open');
      form.reset();

      if (state.activeTab === 'database') {
        renderDatabase();
      } else {
        renderCalculator();
      }
    });
  }
}

// Rimuove un alimento personalizzato
window.removeCustomFood = function(id) {
  if (confirm("Sei sicuro di voler rimuovere questo alimento personalizzato?")) {
    state.customFoods = state.customFoods.filter(f => f.id !== id);
    saveCustomFoods();
    if (state.activeTab === 'database') {
      renderDatabase();
    } else {
      renderCalculator();
    }
  }
};

// Renderizza la scheda Calcolatore (lista a colonna singola)
function renderCalculator() {
  const resultsContainer = document.getElementById('results-list');
  const resultsCountSpan = document.getElementById('results-count');
  const sortDescText = document.querySelector('.results-title-group p');
  
  const results = calculateResults();
  resultsCountSpan.innerText = results.length;
  
  // Aggiorna testo descrizione ordinamento
  const sortMetricLabel = state.sortBy === 'calories' ? 'calorie (Kcal)' : 'grammatura della porzione';
  const sortDirLabel = state.sortDirection === 'asc' ? 'crescente' : 'decrescente';
  if (sortDescText) {
    sortDescText.innerHTML = `Mostrati i primi <span id="results-count" class="font-accent">10</span> alimenti ordinati per <strong>${sortMetricLabel}</strong> (${sortDirLabel})`;
  }

  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>Nessun alimento trovato</h3>
        <p>Prova a modificare la quantità richiesta, a cambiare il macro o a disattivare i filtri secondari.</p>
      </div>
    `;
    return;
  }

  let html = '';
  results.forEach(res => {
    const food = res.food;
    const giInfo = getGiInfo(food.gi);
    
    // Tag compatibilità diete
    let dietBadgeHtml = '';
    if (food.diets.includes('vegano')) {
      dietBadgeHtml = `<span class="badge diet-vegan">Vegano</span>`;
    } else if (food.diets.includes('vegetariano')) {
      dietBadgeHtml = `<span class="badge diet-vegetarian">Vegetariano</span>`;
    }

    // Allergeni presenti
    let allergenBadgeHtml = '';
    if (food.allergens.length > 0) {
      allergenBadgeHtml = food.allergens.map(a => `<span class="badge allergen-tag">${a.replace('_', ' ')}</span>`).join('');
    } else {
      allergenBadgeHtml = `<span class="badge safe-tag">Senza allergeni</span>`;
    }

    // Determina se è un uovo o simile per presentare le uova
    let portionLabel = `${res.portionWeight.toFixed(1)}g`;
    if (food.id === 'uova') {
      const eggsCount = res.portionWeight / 50; // un uovo medio pesa circa 50g
      portionLabel += ` (ca. ${eggsCount.toFixed(1)} uova)`;
    }

    html += `
      <div class="result-card">
        <!-- Colonna 1: Info e Tag dell'Alimento -->
        <div class="result-info-col">
          <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
            <h3 class="food-title">${food.name}</h3>
            ${food.isCustom ? '<span class="badge custom-tag">Pers.</span>' : ''}
          </div>
          <div class="tags-row">
            ${dietBadgeHtml}
            ${allergenBadgeHtml}
          </div>
        </div>
        
        <!-- Colonna 2: Porzione Calcolata (Grammi) -->
        <div class="result-portion-col">
          <span class="portion-weight">${portionLabel}</span>
          <span class="portion-desc">porzione richiesta</span>
        </div>

        <!-- Colonna 3: Contenuto Macronutrienti nella Porzione -->
        <div class="result-macros-col">
          <div class="macro-item ${state.primaryMacro === 'protein' ? 'primary-highlight' : ''}">
            <span class="macro-name">Prot</span>
            <span class="macro-val">${res.macros.protein.toFixed(1)}g</span>
          </div>
          <div class="macro-item ${state.primaryMacro === 'carbs' ? 'primary-highlight' : ''}">
            <span class="macro-name">Carb</span>
            <span class="macro-val">${res.macros.carbs.toFixed(1)}g</span>
          </div>
          <div class="macro-item ${state.primaryMacro === 'fat' ? 'primary-highlight' : ''}">
            <span class="macro-name">Gras</span>
            <span class="macro-val">${res.macros.fat.toFixed(1)}g</span>
          </div>
        </div>

        <!-- Colonna 4: Calorie e Indice Glicemico -->
        <div class="result-meta-col">
          <div class="footer-row" style="width: 100%; justify-content: flex-end;">
            <span class="footer-val font-accent" style="font-size: 1.15rem; font-weight: 700;">${Math.round(res.calories)} kcal</span>
          </div>
          <div class="footer-row" style="width: 100%; justify-content: flex-end;">
            <span class="badge ${giInfo.class}">IG: ${giInfo.label}</span>
          </div>
        </div>
      </div>
    `;
  });

  resultsContainer.innerHTML = html;
}

// Renderizza la scheda Database (Scorrimento e consultazione alimenti)
function renderDatabase() {
  const dbContainer = document.getElementById('db-foods-list');
  const allFoods = getAllFoods();
  
  const filtered = allFoods.filter(food => {
    return food.name.toLowerCase().includes(state.dbSearchQuery);
  });

  if (filtered.length === 0) {
    dbContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🥦</div>
        <h3>Nessun alimento corrisponde alla ricerca</h3>
        <p>Prova a scrivere in modo diverso o aggiungi un alimento personalizzato.</p>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(food => {
    const giInfo = getGiInfo(food.gi);

    let dietBadgeHtml = '';
    if (food.diets.includes('vegano')) {
      dietBadgeHtml = `<span class="badge diet-vegan">Vegano</span>`;
    } else if (food.diets.includes('vegetariano')) {
      dietBadgeHtml = `<span class="badge diet-vegetarian">Vegetariano</span>`;
    }

    let allergenBadgeHtml = '';
    if (food.allergens.length > 0) {
      allergenBadgeHtml = food.allergens.map(a => `<span class="badge allergen-tag">${a.replace('_', ' ')}</span>`).join('');
    }

    html += `
      <div class="db-food-row">
        <div class="db-food-main-info">
          <div class="db-food-name-row">
            <h4 class="db-food-name">${food.name}</h4>
            ${food.isCustom ? '<span class="badge custom-tag">Pers.</span>' : ''}
          </div>
          <div class="db-food-meta">
            <span class="badge ${giInfo.class}">IG: ${giInfo.label}</span>
            ${dietBadgeHtml}
            ${allergenBadgeHtml}
          </div>
        </div>

        <div class="db-food-macros">
          <div class="db-macro-col">
            <span class="db-macro-lbl">Prot</span>
            <span class="db-macro-val">${food.protein.toFixed(1)}g</span>
          </div>
          <div class="db-macro-col">
            <span class="db-macro-lbl">Carb</span>
            <span class="db-macro-val">${food.carbs.toFixed(1)}g</span>
          </div>
          <div class="db-macro-col">
            <span class="db-macro-lbl">Gras</span>
            <span class="db-macro-val">${food.fat.toFixed(1)}g</span>
          </div>
          <div class="db-macro-col kcal-col">
            <span class="db-macro-lbl">Kcal (100g)</span>
            <span class="db-macro-val font-accent">${Math.round((food.protein * 4) + (food.carbs * 4) + (food.fat * 9))}</span>
          </div>
        </div>

        <div class="db-food-actions">
          ${food.isCustom 
            ? `<button class="btn btn-danger btn-sm" onclick="removeCustomFood('${food.id}')">Elimina</button>`
            : '<span class="text-muted text-sm">Bloccato</span>'
          }
        </div>
      </div>
    `;
  });

  dbContainer.innerHTML = html;
}
