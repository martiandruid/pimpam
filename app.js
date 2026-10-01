document.addEventListener('DOMContentLoaded', () => {
  const selectCirugia = document.getElementById('select-cirugia');
  const checklistContainer = document.getElementById('checklist-container');
  const itemsList = document.getElementById('items-list');

  const db = [
    {
      "id": "manguito_rotador_fase1",
      "nombre": "Reparación de Manguito Rotador (Semanas 0 - 6)",
      "items": [
        {
          "id": "flexion_pasiva_90",
          "criterio": "Alcanzar 90° de flexión pasiva sin dolor agudo punzante",
          "causas_no_cumplimiento": [
            "Rigidez capsular o capsulitis adhesiva secundaria a inmovilización rígida.",
            "Apresamiento subacromial por edema persistente en la bursa.",
            "Baja adherencia del paciente al protocolo de ejercicios pasivos en domicilio.",
            "Espasmo muscular antálgico de la musculatura periescapular y pectoral mayor."
          ]
        },
        {
          "id": "rotacion_externa_20",
          "criterio": "Alcanzar al menos 20° de rotación externa pasiva",
          "causas_no_cumplimiento": [
            "Excesiva tensión estructural de la sutura quirúrgica (reparación a tensión).",
            "Contractura o acortamiento del músculo subescapular.",
            "Temor o falta de tolerancia del paciente a la movilización pasiva."
          ]
        },
        {
          "id": "eva_reposo_3",
          "criterio": "Nivel de dolor EVA < 3/10 en reposo nocturno",
          "causas_no_cumplimiento": [
            "Proceso inflamatorio agudo persistente en el lecho quirúrgico.",
            "Uso inadecuado del cabestrillo o falta de soporte mediante almohadas al dormir.",
            "Tensión o tracción sobre los anclajes de la sutura al intentar movimientos activos tempranos."
          ]
        }
      ]
    },
    {
      "id": "manguito_rotador_fase2",
      "nombre": "Reparación de Manguito Rotador (Semanas 6 - 12)",
      "items": [
        {
          "id": "flexion_activa_120",
          "criterio": "Alcanzar 120° de flexión activa con buen ritmo escapulotorácico",
          "causas_no_cumplimiento": [
            "Inhibición artrogénica del supraespinoso/deltoides por dolor persistente.",
            "Discinesia escapular (falta de activación del trapecio inferior y serrato anterior).",
            "Atrofia muscular e infiltración grasa previa al procedimiento quirúrgico."
          ]
        },
        {
          "id": "control_escapular",
          "criterio": "Ausencia de báscula o campaneo escapular compensatorio al elevar el brazo",
          "causas_no_cumplimiento": [
            "Debilidad severa o retraso en la reclutación del serrato anterior.",
            "Dominancia compensatoria y sobrecarga del trapecio superior.",
            "Falta de reeducación propioceptiva e integración neuromuscular."
          ]
        }
      ]
    },
    {
      "id": "lca_fase1",
      "nombre": "Reconstrucción de LCA (Semanas 0 - 4)",
      "items": [
        {
          "id": "extension_completa",
          "criterio": "Extensión completa pasiva y activa de rodilla (0° respecto al lado sano)",
          "causas_no_cumplimiento": [
            "Bloqueo mecánico por edema intraarticular / derrame grave (hemartros).",
            "Síndrome de Cyclops (proliferación de tejido fibroso en el injerto).",
            "Uso prolongado de almohadas bajo el hueco poplíteo durante el reposo.",
            "Inhibición del cuádriceps que impide el bloqueo activo terminal."
          ]
        },
        {
          "id": "flexion_90",
          "criterio": "Alcanzar 90° de flexión activa de rodilla en la semana 2",
          "causas_no_cumplimiento": [
            "Adherencias en el rincón femororrotuliano o retináculos.",
            "Restricción quirúrgica adicional por sutura meniscal asociada.",
            "Derrame articular a tensión que limita el espacio capsular."
          ]
        },
        {
          "id": "activacion_vmo",
          "criterio": "Capacidad de realizar elevación de pierna recta (SLR) sin rezago extensor",
          "causas_no_cumplimiento": [
            "Inhibición Muscular Artrogénica (AMI) del vasto medial interno del cuádriceps.",
            "Dolor fémoro-patelar agudo durante la contracción isométrica.",
            "Derrame articular superior a 15-20 ml que desactiva el cuádriceps."
          ]
        }
      ]
    },
    {
      "id": "sutura_meniscal",
      "nombre": "Sutura o Reparación Meniscal (Semanas 0 - 6)",
      "items": [
        {
          "id": "carga_parcial_autorizada",
          "criterio": "Carga parcial estricta con muletas según prescripción quirúrgica",
          "causas_no_cumplimiento": [
            "Mala comprensión o falta de instrucción en el uso de bastones ingleses.",
            "Falta de tolerancia al apoyo por dolor focal en la línea articular.",
            "Inestabilidad percibida o fallo articular en la puesta en carga."
          ]
        },
        {
          "id": "flexion_limitada_90",
          "criterio": "Flexión limitada a máximo 90° para proteger la sutura meniscal",
          "causas_no_cumplimiento": [
            "Incumplimiento por parte del paciente (forzar flexión en hiperflexión/en cuclillas).",
            "Falta de tope mecánico en la ortesis articulada de rodilla (donjoy)."
          ]
        }
      ]
    },
    {
      "id": "osteosintesis_tobillo",
      "nombre": "Osteosíntesis de Tobillo / Fractura Bimaleolar (Semanas 2 - 8)",
      "items": [
        {
          "id": "dorsiflexion_neutra",
          "criterio": "Alcanzar posición neutra (0°) de dorsiflexión de tobillo",
          "causas_no_cumplimiento": [
            "Acortamiento adaptativo y rigidez del complejo sóleo-gemelos por la férula/yeso.",
            "Deslizamiento anterior limitado del astrágalo sobre la mortaja tibioperonea.",
            "Edema maleolar e induración de tejidos blandos periarticulares."
          ]
        },
        {
          "id": "movilidad_dedos_pie",
          "criterio": "Flexoextensión completa de los dedos del pie sin dolor ni parestesias",
          "causas_no_cumplimiento": [
            "Atrapamiento o irritación quirúrgica del nervio tibial o peroneo.",
            "Edema distal grave por falta de declive/elevación de la extremidad.",
            "Adherencias en los tendones flexores/extensores largos de los dedos."
          ]
        }
      ]
    },
    {
      "id": "tendon_aquiles_quirurgico",
      "nombre": "Reparación Quirúrgica del Tendón de Aquiles (Semanas 2 - 8)",
      "items": [
        {
          "id": "dorsiflexion_neutra_semana6",
          "criterio": "Alcanzar 0° de dorsiflexión en tobillo (posición neutra) a la semana 6",
          "causas_no_cumplimiento": [
            "Elongación excesiva de la sutura por carga o estiramiento prematuro.",
            "Adherencia del complejo tendinoso al tejido cutáneo y paratendón.",
            "Espasmo o acortamiento adaptativo defensivo del complejo sóleo-gemelar."
          ]
        },
        {
          "id": "carga_total_boot",
          "criterio": "Tolerancia a la carga total con ortesis Walker sin alzas (Semana 6-8)",
          "causas_no_cumplimiento": [
            "Cicatrización deficiente por hipoxia hística focal en la zona avascular del tendón.",
            "Sensibilización neuropática periférica secundaria a afectación/irritación del nervio sural.",
            "Kinesiofobia o déficit grave en la propiocepción plantar."
          ]
        },
        {
          "id": "ausencia_elongacion_gastrocnemios",
          "criterio": "Ausencia de alargamiento anormal del tendón (Test de Thompson negativo)",
          "causas_no_cumplimiento": [
            "Fallo estructural parcial de las suturas tendinosas por movilización agresiva.",
            "Incumplimiento del paciente en el uso nocturno de la ortesis en equino."
          ]
        }
      ]
    },
    {
      "id": "artroplastia_cadera_directa",
      "nombre": "Artroplastia Total de Cadera - Abordaje Anterior Directo (Semanas 0 - 6)",
      "items": [
        {
          "id": "marcha_sin_claudicacion",
          "criterio": "Patrón de marcha sin cojera de Trendelenburg",
          "causas_no_cumplimiento": [
            "Inhibición artrogénica o paresia temporal por tracción del nervio glúteo superior.",
            "Inhibición del glúteo medio debida al hematoma postquirúrgico periarticular.",
            "Dismetría estructural o funcional no compensada por la prótesis."
          ]
        },
        {
          "id": "extension_hiperextension_cadera",
          "criterio": "Alcanzar 0° a 10° de extensión neutra sin molestias anteriores",
          "causas_no_cumplimiento": [
            "Tensión e inflamación reactiva del músculo tensor de la fascia lata o psoas ilíaco.",
            "Neurapraxia del nervio cutáneo femoral lateral (disestesia en muslo anterior).",
            "Contractura en flexión previa a la cirugía no resuelta."
          ]
        },
        {
          "id": "ausencia_luxacion_posicional",
          "criterio": "Estabilidad articular en extensión + rotación externa combinada",
          "causas_no_cumplimiento": [
            "Fallo en el posicionamiento del componente acetabular (offset inadecuado).",
            "Insuficiencia de la cápsula articular anterior o tejidos blandos."
          ]
        }
      ]
    },
    {
      "id": "radio_distal_placa",
      "nombre": "Osteosíntesis de Radio Distal con Placa Volar (Semanas 2 - 6)",
      "items": [
        {
          "id": "flexoextension_muneca_40",
          "criterio": "Alcanzar 40° de flexión y 40° de extensión activa a la semana 4",
          "causas_no_cumplimiento": [
            "Tenosinovitis reactiva o conflicto mecánico del flexor largo/extensores.",
            "Síndrome Doloroso Regional Complejo (SDRC Tipo I) de inicio temprano.",
            "Rigidez de la articulación radiocubital distal (ARCD)."
          ]
        },
        {
          "id": "pronosupinacion_50",
          "criterio": "Alcanzar 50° de pronación y 50° de supinación completas sin bloqueo",
          "causas_no_cumplimiento": [
            "Retracción o acortamiento del fibrocartílago triangular (CFT).",
            "Edema indurado en el compartimento antebraquial y membrana interósea.",
            "Prominencia distal del material de osteosíntesis (tornillos largos)."
          ]
        },
        {
          "id": "prension_digital_sin_parestesias",
          "criterio": "Cierre completo del puño sin adormecimiento en territorio mediano",
          "causas_no_cumplimiento": [
            "Compresión secundaria del nervio mediano por edema en el canal carpiano.",
            "Adherencia del tendón Flexor Pollicis Longus (FPL) a la placa volar."
          ]
        }
      ]
    },
    {
      "id": "tunel_carpiano_abierto",
      "nombre": "Liberación Abierta del Túnel Carpiano (Semanas 1 - 4)",
      "items": [
        {
          "id": "oposicion_pulgar_completa",
          "criterio": "Oposición completa del pulgar (Test de Kapandji >= 8)",
          "causas_no_cumplimiento": [
            "Atrofia o inhibición motora tenar por denervación previa prolongada.",
            "Dolor de pilar ('Pillar Pain') sobre el retináculo flexor cortado.",
            "Cicatriz hipertrófica sensible sobre la eminencia tenar."
          ]
        },
        {
          "id": "ausencia_parestesia_nocturna",
          "criterio": "Resolución completa del adormecimiento y parestesias nocturnas",
          "causas_no_cumplimiento": [
            "Liberación incompleta del retináculo flexor en su extremo distal.",
            "Doble atrapamiento neuropático ('Double Crush Syndrome') cervical.",
            "Isquemia de larga evolución del nervio mediano con daño axónico residual."
          ]
        }
      ]
    }
  ];

  poblarSelector();

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
