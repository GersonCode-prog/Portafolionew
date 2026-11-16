# ⚔️ Gerson Quest — Portafolio estilo RPG

Portafolio personal de **Gerson Batún**, Ingeniero en Sistemas, con estilo de menú de RPG/anime.
Hecho con [Astro](https://astro.build).

🌐 **Sitio:** https://gersoncode-prog.github.io/Portafolionew/

## ✨ Características

- Pantalla de título con pétalos de sakura y "PRESS START"
- Ventana de estado de personaje: nivel, HP/MP/XP y stats de habilidades
- Caja de diálogo estilo novela visual
- Logros desbloqueados
- **Misiones automáticas desde GitHub**: cada repositorio público se convierte en una misión
  con rango (S/A/B/C), elemento (lenguaje) y su README como registro
- Efectos de sonido 8-bit opcionales
- Transiciones suaves entre páginas

## 🎮 Comandos

| Comando           | Acción                                                  |
| :---------------- | :------------------------------------------------------ |
| `npm install`     | Instala las dependencias                                |
| `npm run dev`     | Servidor local en `http://localhost:4321/Portafolionew/` |
| `npm run build`   | Compila el sitio en `./dist/`                           |
| `npm run preview` | Muestra el sitio compilado                              |

## 🛠️ Personalizar

Todos los datos del personaje (nivel, stats, logros, diálogo) están en `src/config.ts`.

## 🚀 Publicación

Se publica solo en GitHub Pages con GitHub Actions (`.github/workflows/deploy.yml`):
cada vez que se sube un cambio a `main` y todos los días a las 6:00 a. m. (hora de Guatemala),
para traer los repositorios nuevos.
