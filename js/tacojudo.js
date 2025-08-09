
// Evita ejecutar el mismo script más de una vez (por inclusión doble)
if (!window.__tacojudo_initialized) {
  window.__tacojudo_initialized = true;

  document.addEventListener("DOMContentLoaded", () => {
    const promos = [
      "Lunes: Pizza familiar + 2 bebidas = S/. 35.00",
      "Martes: 2x1 en Quesadillas - Paga una, llévate dos",
      "Miércoles: Burger + Papas + Bebida = S/. 19.90",
      "Jueves: 20% OFF en todos los tacos",
      "Viernes: Combo familiar para 4 personas = S/. 55.00",
      "Fin de Semana: Delivery gratis en toda la ciudad"
    ];

    let currentPromoIndex = 0;
    const promoCarousel = document.getElementById('promo-carousel');

    // Si no existe el contenedor, no continuar y avisar en consola
    if (!promoCarousel) {
      console.warn('Elemento #promo-carousel no encontrado en el DOM.');
      return;
    }

    // Mostrar la promo inicial ya al cargar
    promoCarousel.innerHTML = `<p class="animate-slide-in">${promos[currentPromoIndex]}</p>`;

    // Función que rota promociones
    function rotatePromos() {
      currentPromoIndex = (currentPromoIndex + 1) % promos.length;
      // Comprobar de nuevo por seguridad (por si el elemento fue removido)
      if (promoCarousel) {
        promoCarousel.innerHTML = `<p class="animate-slide-in">${promos[currentPromoIndex]}</p>`;
      }
    }

    // Arrancar rotador (guarda el id si quieres cancelar más tarde)
    const promoIntervalId = setInterval(rotatePromos, 3000);

    // IntersectionObserver — con fallback simple
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            // opcional: dejar de observar si solo quieres animar una vez
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
      });
    } else {
      // Fallback si no hay IntersectionObserver: aplicar la clase directamente
      document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-fade-in-up');
      });
    }

    // Opcional: exportar para depuración
    window.__tacojudo = {
      promos,
      getCurrentIndex: () => currentPromoIndex,
      stop: () => clearInterval(promoIntervalId)
    };
  });
}
