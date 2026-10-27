FIGS.push({
  id: 'dolar',
  name: 'Indicador · Dólar',
  hint: 'Clique no painel ou espaço · liga/desliga o outdoor',
  aria: 'Outdoor isométrico mostrando a cotação do dólar ao vivo. Clique no painel ou pressione espaço para ligar e desligar.',
  mount(stage, api) {
    const K = api.iso.frame([[0,0,0],[340,0,0],[0,220,0],[340,220,0],[170,95,250]]);
    const { TOP, FRONT, box } = K;

    const it = {
      sec: 'econômico',
      name: 'Dólar (PTAX venda)',
      value: 'R$ 5,5007',
      meta: 'último conhecido: 26/10/2026 · Banco Central',
      live: false,
    };

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
    svg += `<g class="press" id="dolar-panel">`;
    svg += box(45, 94, 114, 250, 12, 122, 3);
    svg += `<g transform="${FRONT(45, 106, 236)}">`;
    svg += `<rect id="dolar-glass" class="glass" x="10" y="10" width="230" height="90" rx="4"/>`;
    svg += `<clipPath id="dolar-clip"><rect x="10" y="10" width="230" height="90" rx="4"/></clipPath>`;
    svg += `<g id="dolar-content" clip-path="url(#dolar-clip)">`;
    svg += `<text id="dolar-sec" class="scr-accent" x="18" y="27" font-size="8" letter-spacing="1.5"></text>`;
    svg += `<circle id="dolar-led" class="led" cx="230" cy="24" r="3.5"/>`;
    svg += `<text id="dolar-val" class="scr" x="125" y="64" font-size="28" font-weight="700" text-anchor="middle"></text>`;
    svg += `<text id="dolar-name" class="scr" x="125" y="81" font-size="9.5" text-anchor="middle"></text>`;
    svg += `<text id="dolar-meta" class="scr" x="125" y="93" font-size="7" opacity="0.75" text-anchor="middle"></text>`;
    svg += `</g>`;
    svg += `<text class="label" x="12" y="114" font-size="7" letter-spacing="2">BRASIL · AO VIVO</text>`;
    svg += `</g>`;
    svg += `</g>`;

    // fachos de luz dos refletores, sobre a face do painel
    svg += `<g id="dolar-beams"><g transform="${FRONT(45, 106, 236)}">`;
    svg += `<polygon class="halo" filter="url(#bloom)" points="52,-6 80,-6 100,66 32,66"/>`;
    svg += `<polygon class="halo" filter="url(#bloom)" points="170,-6 198,-6 218,66 150,66"/>`;
    svg += `</g></g>`;

    // refletores no topo
    svg += box(97, 95, 236, 28, 10, 10, 2);
    svg += `<g transform="${FRONT(97, 105, 246)}"><rect class="face led dolar-lampglass" x="4" y="2" width="20" height="6" rx="1"/></g>`;
    svg += box(215, 95, 236, 28, 10, 10, 2);
    svg += `<g transform="${FRONT(215, 105, 246)}"><rect class="face led dolar-lampglass" x="4" y="2" width="20" height="6" rx="1"/></g>`;

    stage.setAttribute('viewBox', K.viewBox);
    stage.innerHTML = svg;

    const $ = s => stage.querySelector(s);
    const els = {
      glass: $('#dolar-glass'), sec: $('#dolar-sec'), led: $('#dolar-led'),
      val: $('#dolar-val'), name: $('#dolar-name'), meta: $('#dolar-meta'),
      content: $('#dolar-content'), panel: $('#dolar-panel'),
    };
    const beams = [...stage.querySelectorAll('#dolar-beams .halo')];
    const lamps = [...stage.querySelectorAll('.dolar-lampglass')];

    const st = { on: false };
    let alive = true;

    function render() {
      els.sec.textContent = (it.sec + (it.live ? ' · ao vivo' : '')).toUpperCase();
      els.val.textContent = it.value;
      els.name.textContent = it.name;
      els.meta.textContent = it.meta;
      els.glass.classList.toggle('hot', st.on);
      els.content.style.opacity = st.on ? 1 : 0;
      els.led.classList.toggle('hot', st.on && it.live);
      beams.forEach(b => b.classList.toggle('hot', st.on));
      lamps.forEach(l => l.classList.toggle('hot', st.on));
      api.power(st.on);
      api.readout(st.on ? (it.live ? 'dólar · ao vivo' : 'dólar · último conhecido') : 'desligado · espaço liga');
    }

    const toggle = () => { st.on = !st.on; render(); };
    els.panel.addEventListener('click', () => { api.flash(els.panel); toggle(); });

    // cotação ao vivo (Banco Central, SGS 1)
    fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados/ultimos/1?formato=json')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(d => {
        if (!alive) return;
        it.value = 'R$ ' + (+d[0].valor).toFixed(4).replace('.', ',');
        it.meta = 'ref. ' + d[0].data + ' · Banco Central (SGS 1)';
        it.live = true;
        render();
      })
      .catch(() => {});

    toggle(); // abre ligado

    return {
      key(e) { if (e.key === ' ' || e.key === 'Enter') { toggle(); return true; } return false; },
      unmount() { alive = false; },
      demo() { api.after(300, () => { if (!st.on) toggle(); }); },
    };
  },
});
