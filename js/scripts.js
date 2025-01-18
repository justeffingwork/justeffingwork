// Código de funcionamiento para en navbar

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

const observerOptions = {
    root: null, // Viewport de referencia
    threshold: 0.4 // Se activa al tener el 40% del viewport visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove("active"));

            const activeLink = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }

    });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// Esto soluciona algunos problemas del navbar

window.addEventListener("scroll", () => {
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4) {
            navLinks.forEach((link) => link.classList.remove("active"));

            const activeLink = document.querySelector(`.navbar a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });
});

// Código de funcionamiento para las tarjetas del portafolio

const tarjetas = document.querySelectorAll('.tarjetaPortafolio');

tarjetas.forEach(tarjeta => {
    const premio = tarjeta.getAttribute('data-premio') === 'true';
    const notificacion = tarjeta.querySelector('.notificacion');
    const contenidoOculto = tarjeta.querySelector('.contenidoOculto');
    const contenidoTarjeta = tarjeta.querySelector('.contenidoTarjeta');

    if (premio) {
        notificacion.style.display = 'flex';

        notificacion.addEventListener('click', () => {
            const isHidden = contenidoOculto.style.opacity === '1';

            if (isHidden) {
                contenidoOculto.style.transition = 'opacity 0.5s ease-in-out';
                contenidoTarjeta.style.transition = 'opacity 0.5s ease-in-out';

                contenidoOculto.style.opacity = '0';
                contenidoTarjeta.style.opacity = '0';

                setTimeout(() => {
                    contenidoOculto.style.display = 'none';
                    contenidoTarjeta.style.display = 'block';

                    setTimeout(() => {
                        contenidoTarjeta.style.opacity = '1';
                    }, 50);
                }, 500);
            } else {
                contenidoTarjeta.style.transition = 'opacity 0.5s ease-in-out';
                contenidoOculto.style.transition = 'opacity 0.5s ease-in-out';

                contenidoTarjeta.style.opacity = '0';
                contenidoOculto.style.opacity = '0';

                setTimeout(() => {
                    contenidoTarjeta.style.display = 'none';
                    contenidoOculto.style.display = 'block';

                    setTimeout(() => {
                        contenidoOculto.style.opacity = '1';
                    }, 50);
                }, 500);
            }
        });
    }
});