// ============================================================
//  CONFIGURACIÓN DEL PERSONAJE — cambia aquí tus datos
// ============================================================

export const USUARIO_GITHUB = 'GersonCode-prog';

export const jugador = {
  nombre: 'Gerson Batún',
  nombreJapones: 'ゲルソン',          // "Gerson" en katakana
  clase: 'Ingeniero en Sistemas',
  nivel: 26,
  xp: 78,                             // % de la barra de experiencia
  gremio: 'Gerencia de RRHH · SAT Guatemala',
  titulo: 'Domador de SQL Server',
};

// Stats (0 a 100)
export const habilidades = [
  { nombre: 'ColdFusion', valor: 95, color: 'oro' },
  { nombre: 'SQL Server', valor: 90, color: 'cian' },
  { nombre: 'JavaScript', valor: 80, color: 'oro' },
  { nombre: 'PHP', valor: 75, color: 'rosa' },
  { nombre: 'jQuery', valor: 80, color: 'cian' },
  { nombre: 'HTML y CSS', valor: 85, color: 'rosa' },
];

// Logros desbloqueados
export const logros = [
  { icono: '🎓', nombre: 'Ingeniero en Sistemas', detalle: 'Completó la carrera universitaria.' },
  { icono: '🗄️', nombre: 'Migración Legendaria', detalle: 'Sobrevivió a SQL Server 2008 → 2022.' },
  { icono: '⚔️', nombre: 'Cazador de Bugs', detalle: 'Derrotó errores de caché en producción.' },
  { icono: '🎮', nombre: 'Creador de Mundos', detalle: 'Publicó juegos de navegador y en Roblox.' },
  { icono: '☕', nombre: 'Café Infinito', detalle: 'HP restaurado con cafeína.' },
  { icono: '🔒', nombre: '???', detalle: 'Logro secreto. Sigue jugando.', bloqueado: true },
];

// Diálogo de la pantalla de inicio (tipo novela visual)
export const dialogo = [
  '¡Bienvenido, viajero! Soy Gerson, desarrollador web de Guatemala.',
  'Construyo sistemas de Recursos Humanos con ColdFusion, SQL Server y PHP.',
  'Fuera del trabajo creo juegos, veo anime y sigo subiendo de nivel.',
  'Revisa mis misiones o invítame a tu party. ¡La aventura apenas comienza!',
];
