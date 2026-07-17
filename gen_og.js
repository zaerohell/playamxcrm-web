const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// ── Background: deep space ────────────────────────────────────────────────
ctx.fillStyle = '#05050F';
ctx.fillRect(0, 0, W, H);

// Purple orb — top left
const g1 = ctx.createRadialGradient(-60, -50, 0, -60, -50, 560);
g1.addColorStop(0,   'rgba(85,25,195,0.80)');
g1.addColorStop(0.5, 'rgba(60,15,160,0.35)');
g1.addColorStop(1,   'rgba(5,5,15,0)');
ctx.fillStyle = g1;
ctx.fillRect(0, 0, W, H);

// Blue orb — bottom right
const g2 = ctx.createRadialGradient(W+60, H+40, 0, W+60, H+40, 500);
g2.addColorStop(0,   'rgba(0,55,210,0.65)');
g2.addColorStop(0.5, 'rgba(0,40,160,0.25)');
g2.addColorStop(1,   'rgba(5,5,15,0)');
ctx.fillStyle = g2;
ctx.fillRect(0, 0, W, H);

// Teal center
const g3 = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, 300);
g3.addColorStop(0,   'rgba(0,150,150,0.20)');
g3.addColorStop(1,   'rgba(5,5,15,0)');
ctx.fillStyle = g3;
ctx.fillRect(0, 0, W, H);

// Accent blue orb — right center
const g4 = ctx.createRadialGradient(840, 160, 0, 840, 160, 220);
g4.addColorStop(0,   'rgba(78,124,246,0.30)');
g4.addColorStop(1,   'rgba(5,5,15,0)');
ctx.fillStyle = g4;
ctx.fillRect(0, 0, W, H);

// Grid
ctx.strokeStyle = 'rgba(255,255,255,0.04)';
ctx.lineWidth = 1;
for (let x = 0; x <= W; x += 80) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
}
for (let y = 0; y <= H; y += 80) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
}

// ── Glass card ────────────────────────────────────────────────────────────
const pad = 44, R = 24;
function rrect(x1, y1, x2, y2, r) {
  ctx.beginPath();
  ctx.moveTo(x1+r, y1);
  ctx.lineTo(x2-r, y1); ctx.arcTo(x2, y1, x2, y1+r, r);
  ctx.lineTo(x2, y2-r); ctx.arcTo(x2, y2, x2-r, y2, r);
  ctx.lineTo(x1+r, y2); ctx.arcTo(x1, y2, x1, y2-r, r);
  ctx.lineTo(x1, y1+r); ctx.arcTo(x1, y1, x1+r, y1, r);
  ctx.closePath();
}

// Card fill
rrect(pad, pad, W-pad, H-pad, R);
ctx.fillStyle = 'rgba(255,255,255,0.08)';
ctx.fill();
// Card border
rrect(pad, pad, W-pad, H-pad, R);
ctx.strokeStyle = 'rgba(255,255,255,0.20)';
ctx.lineWidth = 1;
ctx.stroke();

// Top specular line
const specGrad = ctx.createLinearGradient(pad+50, 0, W-pad-50, 0);
specGrad.addColorStop(0,   'rgba(255,255,255,0)');
specGrad.addColorStop(0.3, 'rgba(255,255,255,0.55)');
specGrad.addColorStop(0.7, 'rgba(255,255,255,0.55)');
specGrad.addColorStop(1,   'rgba(255,255,255,0)');
ctx.beginPath();
ctx.rect(pad+50, pad, W-pad*2-100, 1.5);
ctx.fillStyle = specGrad;
ctx.fill();

// Top inner glow
const innerGlow = ctx.createLinearGradient(0, pad, 0, pad+60);
innerGlow.addColorStop(0,   'rgba(255,255,255,0.07)');
innerGlow.addColorStop(1,   'rgba(255,255,255,0)');
rrect(pad+1, pad+1, W-pad-1, pad+60, R-1);
ctx.fillStyle = innerGlow;
ctx.fill();

// ── Left accent bar (gradient) ────────────────────────────────────────────
const barGrad = ctx.createLinearGradient(0, pad+50, 0, H-pad-50);
barGrad.addColorStop(0,   'rgba(78,124,246,0)');
barGrad.addColorStop(0.3, 'rgba(78,124,246,0.85)');
barGrad.addColorStop(0.7, 'rgba(78,124,246,0.85)');
barGrad.addColorStop(1,   'rgba(78,124,246,0)');
ctx.beginPath();
ctx.rect(pad+13, pad+50, 4, H-pad*2-100);
ctx.fillStyle = barGrad;
ctx.fill();

// ── Typography ────────────────────────────────────────────────────────────
const lx = pad + 44;

// Eyebrow
const ey_y = pad + 58;
ctx.beginPath();
ctx.rect(lx, ey_y+8, 26, 1);
ctx.fillStyle = 'rgba(78,124,246,0.65)';
ctx.fill();
ctx.font = '14px monospace';
ctx.fillStyle = 'rgba(78,124,246,0.80)';
ctx.fillText('CRM INMOBILIARIO  ·  RIVIERA MAYA', lx+36, ey_y+14);

// Logo: PlayaMXCRM
const ly = ey_y + 40;
ctx.font = 'bold 56px sans-serif';

ctx.fillStyle = 'rgba(255,255,255,0.94)';
ctx.fillText('Playa', lx, ly+46);
const pw = ctx.measureText('Playa').width;

ctx.fillStyle = 'rgba(78,124,246,1)';
ctx.fillText('MX', lx+pw, ly+46);
const mw = ctx.measureText('MX').width;

ctx.fillStyle = 'rgba(255,255,255,0.94)';
ctx.fillText('CRM', lx+pw+mw, ly+46);

// Tagline line 1
const ty1 = ly + 76;
ctx.font = 'bold 40px sans-serif';
ctx.fillStyle = 'rgba(255,255,255,0.88)';
ctx.fillText('Inteligencia para el', lx, ty1);

// Tagline line 2
const ty2 = ty1 + 52;
ctx.font = '300 40px sans-serif';
ctx.fillStyle = 'rgba(255,255,255,0.75)';
ctx.fillText('mercado', lx, ty2);
const mw2 = ctx.measureText('mercado').width;

ctx.font = 'bold italic 40px sans-serif';
ctx.fillStyle = 'rgba(78,124,246,0.95)';
ctx.fillText('inmobiliario.', lx + mw2 + 10, ty2);

// Sub
const sy = ty2 + 56;
ctx.font = '17px sans-serif';
ctx.fillStyle = 'rgba(255,255,255,0.45)';
ctx.fillText('Rentas · Ventas · Condominios · IA integrada', lx, sy);

// ── KPI glass cards (right side) ──────────────────────────────────────────
const kpis = [
  ['128', 'Inmuebles activos'],
  ['94%', 'Ocupación'],
  ['49',  'Módulos IA'],
];
const kx0 = W - pad - 268;
const ky0 = pad + 68;

kpis.forEach(([val, lbl], i) => {
  const kx = kx0, ky = ky0 + i * 88;
  const kw = 248, kh = 72;

  // Glass card
  rrect(kx, ky, kx+kw, ky+kh, 14);
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.fill();
  rrect(kx, ky, kx+kw, ky+kh, 14);
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Specular
  const sg = ctx.createLinearGradient(kx+18, 0, kx+kw-18, 0);
  sg.addColorStop(0, 'rgba(255,255,255,0)');
  sg.addColorStop(0.5, 'rgba(255,255,255,0.28)');
  sg.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath(); ctx.rect(kx+18, ky, kw-36, 1.5);
  ctx.fillStyle = sg; ctx.fill();

  // Dot
  ctx.beginPath();
  ctx.arc(kx+19, ky+28, 4, 0, Math.PI*2);
  ctx.fillStyle = 'rgba(78,124,246,0.85)';
  ctx.fill();

  // Value
  ctx.font = 'bold 28px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.fillText(val, kx+36, ky+36);

  // Label
  ctx.font = '12px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.fillText(lbl, kx+36, ky+58);
});

// ── Domain badge ──────────────────────────────────────────────────────────
const by = H - pad - 52;
const bdomain = 'playamxcrm.netlify.app';
ctx.font = '13px monospace';
const bw = ctx.measureText(bdomain).width + 28;

rrect(lx-4, by-4, lx+bw, by+24, 8);
ctx.fillStyle = 'rgba(78,124,246,0.12)';
ctx.fill();
rrect(lx-4, by-4, lx+bw, by+24, 8);
ctx.strokeStyle = 'rgba(78,124,246,0.40)';
ctx.lineWidth = 1;
ctx.stroke();

ctx.fillStyle = 'rgba(78,124,246,0.85)';
ctx.fillText(bdomain, lx+10, by+14);

// Live dot
const lv = lx + bw + 16;
ctx.beginPath();
ctx.arc(lv+4, by+10, 4, 0, Math.PI*2);
ctx.fillStyle = 'rgba(48,209,88,0.85)';
ctx.fill();
ctx.fillStyle = 'rgba(48,209,88,0.70)';
ctx.fillText('LIVE', lv+14, by+14);

// ── Save ──────────────────────────────────────────────────────────────────
const out = fs.createWriteStream(path.join(__dirname, 'og.png'));
canvas.createPNGStream().pipe(out);
out.on('finish', () => console.log('✅ og.png saved:', W+'x'+H));
