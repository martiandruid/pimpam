document.addEventListener('DOMContentLoaded', () => {
  const selectCirugia = document.getElementById('select-cirugia');
  const checklistContainer = document.getElementById('checklist-container');
  const itemsList = document.getElementById('items-list');

  let db = [];

  // Cargar datos desde el JSON local
  fetch('./intervenciones.json')
    .then(res => res.json())
    .then(data => {
      db = data.cirugias;
      poblarSelector();
    })
    .catch(err => console.error('Error al cargar la base de datos:', err));

  function poblarSelector() {
    db.forEach(cirugia => {
      const option = document.createElement('option');
      option.value = cirugia.id;
      option.textContent = cirugia.nombre;
      selectCirugia.appendChild(option);
    });
  }

  selectCirugia.addEventListener('change', (e) => {
    const idSeleccionado = e.target.value;
    const cirugiaData = db.find(c => c.id === idSeleccionado);

    if (!cirugiaData) {
      checklistContainer.classList.add('hidden');
      return;
    }

    renderChecklist(cirugiaData.items);
    checklistContainer.classList.remove('hidden');
  });

  function renderChecklist(items) {
    itemsList.innerHTML = '';

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'bg-slate-800 p-4 rounded-xl border border-slate-700 transition-all';

      card.innerHTML = `
        <div class="flex items-start justify-between gap-4">
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" data-id="${item.id}" class="item-checkbox w-5 h-5 text-sky-500 rounded bg-slate-900 border-slate-600 focus:ring-sky-500" checked>
            <span class="text-slate-200 font-medium">${item.criterio}</span>
          </label>
          <span id="badge-${item.id}" class="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Completado</span>
        </div>
        <div id="causas-${item.id}" class="mt-4 pt-3 border-t border-slate-700/60 hidden">
          <p class="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">Causas probables de no consecución (según GPC):</p>
          <ul class="list-disc list-inside text-sm text-slate-300 space-y-1">
            ${item.causas_no_cumplimiento.map(causa => `<li>${causa}</li>`).join('')}
          </ul>
        </div>
      `;

      itemsList.appendChild(card);

      const checkbox = card.querySelector(`.item-checkbox`);
      const badge = card.querySelector(`#badge-${item.id}`);
      const causasDiv = card.querySelector(`#causas-${item.id}`);

      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          badge.textContent = 'Completado';
          badge.className = 'text-xs font-semibold px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800';
          causasDiv.classList.add('hidden');
        } else {
          badge.textContent = 'No Conseguió Objetivo';
          badge.className = 'text-xs font-semibold px-2.5 py-1 rounded bg-rose-950 text-rose-400 border border-rose-800';
          causasDiv.classList.remove('hidden');
        }
      });
    });
  }
});
