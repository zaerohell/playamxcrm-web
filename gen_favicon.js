// gen_favicon.js — generates apple-touch-icon.png using canvas
// Run: node gen_favicon.js
const { createCanvas } = require('canvas');
const fs = require('fs');

const W = 180, H = 180, R = 38;

function rrect(ctx, x1, y1, x2, y2, r) {
  ctx.beginPath();
  ctx.moveTo(x1+r, y1);
  ctx.lineTo(x2-r, y1); ctx.arcTo(x2, y1, x2, y1+r, r);
  ctx.lineTo(x2, y2-r); ctx.arcTo(x2, y2, x2-r, y2, r);
  ctx.lineTo(x1+r, y2); ctx.arcTo(x1, y2, x1, y2-r, r);
  ctx.lineTo(x1, y1+r); ctx.arcTo(x1, y1, x1+r, y1, r);
  ctx.closePath();
}

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Clear transparent
ctx.clearRect(0, 0, W, H);

// Clip to rounded rect
rrect(ctx, 0, 0, W, H, R);
ctx.clip();

// Deep background
const bgGrad = ctx.createLinearGradient(0, 0, W, H);
bgGrad.addColorStop(0, '#12082a');
bgGrad.addColorStop(1, '#05050f');
ctx.fillStyle = bgGrad;
ctx.fillRect(0, 0, W, H);

// Purple orb top-left
const g1 = ctx.createRadialGradient(20, 20, 0, 20, 20, 110);
g1.addColorStop(0, 'rgba(85,20,180,0.75)');
g1.addColorStop(1, 'rgba(5,5,15,0)');
ctx.fillStyle = g1;
ctx.fillRect(0, 0, W, H);

// Blue orb bottom-right
const g2 = ctx.createRadialGradient(W-20, H-20, 0, W-20, H-20, 95);
g2.addColorStop(0, 'rgba(30,80,220,0.60)');
g2.addColorStop(1, 'rgba(5,5,15,0)');
ctx.fillStyle = g2;
ctx.fillRect(0, 0, W, H);

// Glass inset card
rrect(ctx, 10, 10, W-10, H-10, 26);
ctx.fillStyle = 'rgba(255,255,255,0.07)';
ctx.fill();
rrect(ctx, 10, 10, W-10, H-10, 26);
ctx.strokeStyle = 'rgba(255,255,255,0.22)';
ctx.lineWidth = 1;
ctx.stroke();

// Specular top line
const specGrad = ctx.createLinearGradient(30, 0, W-30, 0);
specGrad.addColorStop(0, 'rgba(255,255,255,0)');
specGrad.addColorStop(0.35, 'rgba(255,255,255,0.60)');
specGrad.addColorStop(0.65, 'rgba(255,255,255,0.60)');
specGrad.addColorStop(1, 'rgba(255,255,255,0)');
ctx.beginPath(); ctx.rect(30, 10, W-60, 1.5);
ctx.fillStyle = specGrad; ctx.fill();

// MX glow
const gMX = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, 52);
gMX.addColorStop(0, 'rgba(78,124,246,0.40)');
gMX.addColorStop(1, 'rgba(78,124,246,0)');
ctx.fillStyle = gMX;
ctx.fillRect(0, 0, W, H);

// "PLAYA" label — small top
ctx.font = '500 19px "Helvetica Neue", sans-serif';
ctx.textAlign = 'center';
ctx.letterSpacing = '2px';
ctx.fillStyle = 'rgba(255,255,255,0.58)';
ctx.fillText('PLAYA', W/2, 62);

// "MX" — large hero center
ctx.font = 'bold 76px "Helvetica Neue", sans-serif';
ctx.fillStyle = '#4e7cf6';
ctx.fillText('MX', W/2, 126);

// "CRM" label — small bottom
ctx.font = '500 19px "Helvetica Neue", sans-serif';
ctx.fillStyle = 'rgba(255,255,255,0.58)';
ctx.fillText('CRM', W/2, 154);

// Save
const out = fs.createWriteStream(__dirname + '/apple-touch-icon.png');
canvas.createPNGStream().pipe(out);
out.on('finish', () => console.log('✅ apple-touch-icon.png saved (180x180)'));
