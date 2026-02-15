function calculate() {
  const income = Number(document.getElementById("income").value);
  const activity = document.getElementById("activity").value;
  const parish = document.getElementById("parish").value;

  if (!income || income <= 0) {
    document.getElementById("results").innerHTML =
      "<p class='right-subtitle'>Introduce ingresos válidos.</p>";
    return;
  }

  // -----------------------------
  // IRPF ESPAÑA (simplificado)
  // -----------------------------
  let irpfSpain = 0;

  if (income <= 12450) irpfSpain = income * 0.19;
  else if (income <= 20200) irpfSpain = income * 0.24;
  else if (income <= 35200) irpfSpain = income * 0.30;
  else if (income <= 60000) irpfSpain = income * 0.37;
  else if (income <= 300000) irpfSpain = income * 0.45;
  else irpfSpain = income * 0.47;

  // -----------------------------
  // IRPF ANDORRA
  // -----------------------------
  let irpfAndorra = 0;

  if (income <= 24000) irpfAndorra = 0;
  else if (income <= 40000) irpfAndorra = (income - 24000) * 0.05;
  else irpfAndorra = (16000 * 0.05) + (income - 40000) * 0.10;

  // -----------------------------
  // CUOTAS AUTÓNOMOS / EMPRESA
  // -----------------------------
  let cuotaSpain = activity === "autonomo" ? 320 * 12 : income * 0.25;
  let cuotaAndorra = activity === "autonomo" ? 480 * 12 : income * 0.10;

  // -----------------------------
  // COSTE DE VIDA (aproximado)
  // -----------------------------
  const rentMap = {
    "andorra-la-vella": 1100,
    "escales-engordany": 1200,
    "la-massana": 1000,
    "ordino": 950,
    "sant-julia": 900,
    "encamp": 850,
    "canillo": 800
  };

  const rent = rentMap[parish] || 1000;

  const costSpain = 900 * 12;
  const costAndorra = rent * 12 + 350 * 12;

  // -----------------------------
  // RESULTADOS FINALES
  // -----------------------------
  const totalSpain = irpfSpain + cuotaSpain + costSpain;
  const totalAndorra = irpfAndorra + cuotaAndorra + costAndorra;

  const ahorro = totalSpain - totalAndorra;

  // -----------------------------
  // MOSTRAR RESULTADOS
  // -----------------------------
  document.getElementById("results").innerHTML = `
    <div class="table">

      <div class="table-header">
        <div>Concepto</div>
        <div>España</div>
        <div>Andorra</div>
      </div>

      <div class="table-row">
        <div class="table-label">IRPF</div>
        <div class="table-value">${irpfSpain.toFixed(0)} €</div>
        <div class="table-value">${irpfAndorra.toFixed(0)} €</div>
      </div>

      <div class="table-row">
        <div class="table-label">Cuotas</div>
        <div class="table-value">${cuotaSpain.toFixed(0)} €</div>
        <div class="table-value">${cuotaAndorra.toFixed(0)} €</div>
      </div>

      <div class="table-row">
        <div class="table-label">Coste de vida</div>
        <div class="table-value">${costSpain.toFixed(0)} €</div>
        <div class="table-value">${costAndorra.toFixed(0)} €</div>
      </div>

      <div class="table-row">
        <div class="table-label"><strong>Total anual</strong></div>
        <div class="table-value"><strong>${totalSpain.toFixed(0)} €</strong></div>
        <div class="table-value"><strong>${totalAndorra.toFixed(0)} €</strong></div>
      </div>

      <div class="table-row">
        <div class="table-label"><strong>Ahorro estimado</strong></div>
        <div class="table-value"></div>
        <div class="table-value">
          <span class="table-badge ${ahorro > 0 ? "good" : "bad"}">
            ${ahorro.toFixed(0)} €
          </span>
        </div>
      </div>

    </div>
  `;
}
