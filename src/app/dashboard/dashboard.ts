import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  entryPrice = signal<number | null>(null);
  slPrice = signal<number | null>(null);

  riskAmount = signal<number | null>(null);

  slPips = computed(() => {
    const entry = this.entryPrice();
    const sl = this.slPrice();
    if (entry !== null && sl !== null) {
      return Math.round(Math.abs(entry - sl) * 10000 * 10) / 10;
    }
    return 0;
  });



  lotSize = computed(() => {
    const risk = this.riskAmount();
    const sl = this.slPips();
    if (risk !== null && sl > 0) {
      const lot = risk / (sl * 10);
      return lot.toFixed(2);
    }
    return '0.00';
  });

  updateEntry(event: any) { this.entryPrice.set(event.target.value ? Number(event.target.value) : null); }
  updateSL(event: any) { this.slPrice.set(event.target.value ? Number(event.target.value) : null); }

  updateRisk(event: any) { this.riskAmount.set(event.target.value ? Number(event.target.value) : null); }
}
