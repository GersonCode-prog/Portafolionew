// Colores por "elemento" (lenguaje de programación)
const coloresLenguaje: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#663399',
  PHP: '#8892bf',
  ColdFusion: '#5ec4ff',
  Python: '#3572a5',
  Lua: '#5c6bf0',
  Luau: '#00a2ff',
  'C#': '#178600',
  Java: '#b07219',
  Astro: '#ff5d01',
  Dart: '#00b4ab',
  Vue: '#41b883',
  'Jupyter Notebook': '#da5b0b',
};

export const colorLenguaje = (lenguaje?: string | null) =>
  (lenguaje && coloresLenguaje[lenguaje]) || '#a9a8d6';

// Rango de la misión según estrellas + forks
export function rango(estrellas: number, forks: number) {
  const puntos = estrellas + forks * 2;
  if (puntos >= 20) return 'S';
  if (puntos >= 8) return 'A';
  if (puntos >= 2) return 'B';
  return 'C';
}

// "mi-repo_genial" -> "Mi Repo Genial"
export const nombreBonito = (nombre: string) =>
  nombre.replace(/[-_]+/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

export const fechaCorta = (fecha: Date) =>
  fecha.toLocaleDateString('es-GT', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

// Agrega el "base" del sitio a una ruta interna: ruta('/misiones') -> '/Portafolionew/misiones'
export const ruta = (camino: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${camino === '/' ? '/' : camino}`;
};
