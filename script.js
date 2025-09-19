const descriptions = {
  "en-US": "Welcome to Express Delivery Services. Track your packages in real-time and enjoy our fast and reliable service across the USA.",
  "en-UK": "Welcome to Express Delivery Services. Track your parcels in real-time and enjoy our fast and reliable service across the United Kingdom.",
  "es": "Bienvenido a Express Delivery Services. Rastrea tus paquetes en tiempo real y disfruta de nuestro servicio rápido y confiable.",
  "fr": "Bienvenue chez Express Delivery Services. Suivez vos colis en temps réel et profitez de notre service rapide et fiable.",
  "pt": "Bem-vindo à Express Delivery Services. Acompanhe suas encomendas em tempo real e desfrute do nosso serviço rápido e confiável."
};

const openHoursTable = {
  "en-US": ["Friday: Open 24 hours", "Saturday: Open 24 hours", "Sunday: Open 24 hours", "Monday: Open 24 hours", "Tuesday: Open 24 hours", "Wednesday: Open 24 hours", "Thursday: Open 24 hours"],
  "en-UK": ["Friday: Open 24 hours", "Saturday: Open 24 hours", "Sunday: Open 24 hours", "Monday: Open 24 hours", "Tuesday: Open 24 hours", "Wednesday: Open 24 hours", "Thursday: Open 24 hours"],
  "es": ["Viernes: Abierto 24 horas", "Sábado: Abierto 24 horas", "Domingo: Abierto 24 horas", "Lunes: Abierto 24 horas", "Martes: Abierto 24 horas", "Miércoles: Abierto 24 horas", "Jueves: Abierto 24 horas"],
  "fr": ["Vendredi: Ouvert 24h", "Samedi: Ouvert 24h", "Dimanche: Ouvert 24h", "Lundi: Ouvert 24h", "Mardi: Ouvert 24h", "Mercredi: Ouvert 24h", "Jeudi: Ouvert 24h"],
  "pt": ["Sexta: Aberto 24 horas", "Sábado: Aberto 24 horas", "Domingo: Aberto 24 horas", "Segunda: Aberto 24 horas", "Terça: Aberto 24 horas", "Quarta: Aberto 24 horas", "Quinta: Aberto 24 horas"]
};

document.getElementById('languages').addEventListener('change', function() {
  const lang = this.value;
  
  // Update Description
  document.getElementById('description').innerText = descriptions[lang];

  // Update Open Hours Table
  const table = document.querySelector('#scroll-container table');
  table.innerHTML = '';
  openHoursTable[lang].forEach(hour => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.innerHTML = hour.includes("Open 24") ? `<span class="open-hour">${hour}</span>` : hour;
    row.appendChild(cell);
    table.appendChild(row);
  });
});
