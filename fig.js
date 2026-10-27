FIGS.push({
  id: 'outdoor',
  name: 'Outdoor Brasil',
  hint: 'Clique no painel ou → para o próximo indicador · ← volta · espaço liga/desliga',
  aria: 'Outdoor isométrico exibindo indicadores econômicos, sociais e ambientais do Brasil. Use as setas para trocar o indicador e espaço para ligar e desligar.',
  mount(stage, api) {
    const K = api.iso.frame([[0,0,0],[340,0,0],[0,220,0],[340,220,0],[170,95,250]]);
    const { TOP, FRONT, box } = K;

    const DATA = [
      { sec: 'econômico', short: 'dólar',        name: 'Dólar (PTAX venda)',       value: 'R$ 5,5007',    meta: 'último conhecido: 26/10/2026 · Banco Central' },
      { sec: 'econômico', short: 'selic',        name: 'Taxa Selic (meta)',        value: '13,75% a.a.',  meta: 'meta atual · Banco Central' },
      { sec: 'econômico', short: 'ipca',         name: 'IPCA · 12 meses',          value: '4,58%',        meta: '12 meses até set/2026 · IBGE via BCB' },
      { sec: 'econômico', short: 'desemprego',   name: 'Desemprego (PNAD)',        value: '5,3%',         meta: 'trimestre móvel · jul–ago 2026 · IBGE' },
      { sec: 'econômico', short: 'pib',          name: 'PIB · crescimento',        value: '1,9%',         meta: 'acum. 4 trimestres · 2º tri 2026 · IBGE' },
      { sec: 'econômico', short: 'dívida',       name: 'Dívida bruta do governo',  value: '82,9% do PIB', meta: 'ago/2026 · Banco Central' },
      { sec: 'social',    short: 'população',    name: 'População estimada',       value: '214,2 mi',     meta: '1º de julho de 2026 · IBGE' },
      { sec: 'social',    short: 'alfabetização',name: 'Alfabetização (15+)',      value: '95,1%',        meta: 'analfabetismo 4,9% · 2025 · IBGE' },
      { sec: 'social',    short: 'idhm',         name: 'IDHM',                     value: '0,805',        meta: 'muito alto desenvolvimento · 2024 · PNUD/IBGE' },
      { sec: 'social',    short: 'pobreza',      name: 'Pobreza',                  value: '23,1%',        meta: 'extrema pobreza 3,5% · 2024 · IBGE' },
      { sec: 'social',    short: 'gini',         name: 'Índice de Gini',           value: '0,504',        meta: '2024 · menor da série recente · IBGE' },
      { sec: 'social',    short: 'expectativa',  name: 'Expectativa de vida',      value: '76,6 anos',    meta: 'dados recentes · IBGE' },
      { sec: 'ambiental', short: 'amazônia',     name: 'Desmatamento · Amazônia',  value: '3.335 km²',    meta: 'ago/25–jul/26 · menor da série · INPE Prodes' },
    ];

    // ---- cena ----
    let svg = box(0, 0, 0, 340, 220, 10, 14);
    svg += `<g transform="${TOP(0, 0, 10)}"><rect class="detail" x="10" y="10" width="320" height="200" rx="10"/></g>`;

    // postes
    svg += box(120, 96, 10, 16, 14, 96, 2);
    svg += box(204, 96, 10, 16, 14, 96, 2);

    // passarela de manutenção
    svg += box(55, 88, 106, 230, 36, 8, 2);
    svg += `<g transform="${FRONT(55, 124, 114)}">${api.iso.slits(6, 224, 10, 1.5, 6.5)}</g>`;

    // painel do outdoor (pressável)
    svg += `<g class="press" id="od-panel">`;
    svg += box(45, 94, 114, 250, 12, 122, 3);
    svg += `<g transform="${FRONT(45, 106, 236)}">`;
    svg += `<rect id="od-glass" class="glass" x="10" y="10" width="230" height="90" rx="4"/>`;
    svg += `<clipPath id="od-clip"><rect x="10" y="10" width="230" height="90" rx="4"/></clipPath>`;
    svg += `<g id="od-content" clip-path="url(#od-clip)">`;
    svg += `<text id="od-sec" class="scr-accent" x="18" y="27" font-size="8" letter-spacing="1.5"></text>`;
    svg += `<circle id="od-led" class="led" cx="230" cy="24" r="3.5"/>`;
    svg += `<text id="od-val" class="scr" x="125" y="64" font-size="27" font-weight="700" text-anchor="middle"></text>`;
    svg += `<text id="od-name" class="scr" x="125" y="81" font-size="9.5" text-anchor="middle"></text>`;
    svg += `<text id="od-meta" class="scr" x="125" y="93" font-size="7" opacity="0.75" text-anchor="middle"></text>`;
    svg += `</g>`;
    svg += `<text class="label" x="12" y="114" font-size="7" letter-spacing="2">BRASIL · AO VIVO</text>`;
    DATA.forEach((d, i) => { svg += `<circle class="led od-dot" cx="${118 + i * 9.5}" cy="111" r="2.2"/>`; });
    svg += `</g>`;
    svg += `</g>`;

    // fachos de luz dos refletores, sobre a face do painel
    svg += `<g id="od-beams"><g transform="${FRONT(45, 106, 236)}">`;
    svg += `<polygon class="halo" filter="url(#bloom)" points="52,-6 80,-6 100,66 32,66"/>`;
    svg += `<polygon class="halo" filter="url(#bloom)" points="170,-6 198,-6 218,66 150,66"/>`;
    svg += `</g></g>`;

    // refletores no topo
    svg += box(97, 95, 236, 28, 10, 10, 2);
    svg += `<g transform="${FRONT(97, 105, 246)}"><rect class="face led od-lampglass" x="4" y="2" width="20" height="6" rx="1"/></g>`;
    svg += box(215, 95, 236, 28, 10, 10, 2);
    svg += `<g transform="${FRONT(215, 105, 246)}"><rect class="face led od-lampglass" x="4" y="2" width="20" height="6" rx="1"/></g>`;

    stage.setAttribute('viewBox', K.viewBox);
    stage.innerHTML = svg;

    const $ = s => stage.querySelector(s);
    const els = {
      glass: $('#od-glass'), sec: $('#od-sec'), led: $('#od-led'),
      val: $('#od-val'), name: $('#od-name'), meta: $('#od-meta'),
      content: $('#od-content'), panel: $('#od-panel'),
    };
    const dots = [...stage.querySelectorAll('.od-dot')];
    const beams = [...stage.querySelectorAll('#od-beams .halo')];
    const lamps = [...stage.querySelectorAll('.od-lampglass')];

    const st = { on: false, idx: 0 };
    let alive = true;

    function render() {
      const it = DATA[st.idx];
      els.sec.textContent = (it.sec + (it.live ? ' · ao vivo' : '')).toUpperCase();
      els.val.textContent = it.value;
      els.name.textContent = it.name;
      els.meta.textContent = it.meta;
      els.glass.classList.toggle('hot', st.on);
      els.content.style.opacity = st.on ? 1 : 0;
      els.led.classList.toggle('hot', st.on && !!it.live);
      beams.forEach(b => b.classList.toggle('hot', st.on));
      lamps.forEach(l => l.classList.toggle('hot', st.on));
      dots.forEach((d, i) => d.classList.toggle('hot', st.on && i === st.idx));
      api.power(st.on);
      api.readout(st.on ? `${st.idx + 1}/${DATA.length} · ${it.short}${it.live ? ' · ao vivo' : ''}` : 'desligado · espaço liga');
    }

    const step = d => { st.idx = (st.idx + d + DATA.length) % DATA.length; render(); };
    const toggle = () => { st.on = !st.on; render(); };

    els.panel.addEventListener('click', () => {
      api.flash(els.panel);
      if (st.on) step(1); else toggle();
    });

    // rotação automática do outdoor
    api.every(6000, () => { if (st.on) step(1); });

    // dados ao vivo (Banco Central · SGS)
    const LIVE = [
      [0, 1,     v => 'R$ ' + (+v).toFixed(4).replace('.', ',')],
      [1, 432,   v => (+v).toFixed(2).replace('.', ',') + '% a.a.'],
      [2, 13522, v => (+v).toFixed(2).replace('.', ',') + '%'],
    ];
    LIVE.forEach(([i, code, fmt]) => {
      fetch(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.${code}/dados/ultimos/1?formato=json`)
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(d => {
          if (!alive) return;
          DATA[i].value = fmt(d[0].valor);
          DATA[i].meta = 'ref. ' + d[0].data + ' · Banco Central (SGS ' + code + ')';
          DATA[i].live = true;
          if (st.idx === i) render();
        })
        .catch(() => {});
    });

    toggle(); // abre ligado

    return {
      key(e) {
        if (e.key === ' ' || e.key === 'Enter') { toggle(); return true; }
        if (e.key === 'ArrowRight') { step(1); return true; }
        if (e.key === 'ArrowLeft') { step(-1); return true; }
        return false;
      },
      unmount() { alive = false; },
      demo() {
        api.after(300, () => { if (!st.on) toggle(); });
        api.after(1400, () => step(1));
        api.after(2500, () => step(1));
      },
    };
  },
});
