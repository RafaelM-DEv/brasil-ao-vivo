# Brasil Ao Vivo · Indicadores no Outdoor

Site com um **outdoor digital em uma cidade à noite** como plano de fundo: os indicadores do Brasil passam no telão (valor grande girando a cada 5 s + letreiro correndo embaixo), e abaixo do hero ficam os cards legíveis com todos os dados e fontes.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | **O site.** Hero em tela cheia com a foto da cidade + telão animado, e os cards abaixo. |
| `assets/periferia-outdoor.jpg` | **Imagem de fundo atual** (1792×1008): periferia de capital brasileira ao entardecer, gerada com Grok Imagine. |
| `assets/cidade-outdoor.jpg` | Fundo alternativo (metrópole à noite). Para usar, troque o `src` da imagem e as % do `.telao` (left 32,53% · top 36,36% · width 36,05% · height 34,67%). |
| `indicadores-brasil.html` | O HTML original em cards, mantido como referência. |
| `fig.js`, `fig-preview.js`, `outdoor-brasil.html`, `preview-indicador.html` | Versão anterior em iso-glow (descartada, mantida por histórico — pode apagar). |

## Como funciona o telão

- O conteúdo é posicionado por porcentagens sobre a tela preta da foto (medida por pixel: left 33,71%, top 15,67%, width 34,10%, height 29,46%). O contêiner `.cena` mantém a proporção 1792:1008 e cobre a viewport, então o alinhamento não quebra ao redimensionar.
- Indicador principal troca a cada 5 s com animação de deslize; letreiro inferior corre em loop com todos os indicadores.
- Relógio de São Paulo e selo **AO VIVO** (verde, dado da API) / **ÚLT. DADO** (amarelo, última divulgação).
- Tamanhos de fonte em unidades de container query (`cqh`/`cqw`), escalam junto com o telão.

## Dados

- **Ao vivo** (fetch na abertura): Dólar PTAX (SGS 1), Selic meta (SGS 432), IPCA 12 meses (SGS 13522) — API pública `api.bcb.gov.br`. Com falha de rede/CORS, caem nos últimos valores conhecidos.
- **Última divulgação oficial**: desemprego, PIB, dívida bruta, população, alfabetização, IDHM, pobreza, Gini, expectativa de vida (IBGE/PNUD/BCB) e desmatamento Prodes (INPE).

## Rodar

Abrir `index.html` direto no navegador já funciona. Para servir localmente:

```
python -m http.server 8734
# http://localhost:8734
```
