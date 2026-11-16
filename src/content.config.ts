import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { USUARIO_GITHUB, reposOcultos } from './config';

const API = process.env.GITHUB_API ?? 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN; // Opcional: sube el límite de 60 a 5000 consultas por hora

const cabeceras = (accept = 'application/vnd.github+json') => ({
  'User-Agent': 'portafolio-astro',
  Accept: accept,
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
});

// Convierte rutas relativas del README (imágenes, enlaces) en rutas completas de GitHub
function arreglarRutas(html: string, repo: string, rama: string) {
  const crudo = `https://raw.githubusercontent.com/${USUARIO_GITHUB}/${repo}/${rama}/`;
  const blob = `https://github.com/${USUARIO_GITHUB}/${repo}/blob/${rama}/`;
  return html
    .replace(/src="(?!https?:|data:|\/\/)\.?\/?([^"]+)"/g, `src="${crudo}$1"`)
    .replace(/href="(?!https?:|mailto:|#|\/\/)\.?\/?([^"]+)"/g, `href="${blob}$1"`);
}

// ---------- Perfil de GitHub ----------
const perfil = defineCollection({
  loader: async () => {
    try {
      const r = await fetch(`${API}/users/${USUARIO_GITHUB}`, { headers: cabeceras() });
      if (!r.ok) throw new Error(`GitHub respondió ${r.status}`);
      const u = await r.json();
      return [{
        id: 'yo',
        avatar: u.avatar_url,
        bio: u.bio ?? '',
        repos: u.public_repos,
        seguidores: u.followers,
        url: u.html_url,
      }];
    } catch (e) {
      console.warn(`⚠️  No se pudo cargar el perfil de GitHub: ${(e as Error).message}`);
      return [];
    }
  },
  schema: z.object({
    avatar: z.string(),
    bio: z.string(),
    repos: z.number(),
    seguidores: z.number(),
    url: z.string(),
  }),
});

// ---------- Repositorios = Misiones ----------
const misiones = defineCollection({
  loader: async () => {
    try {
      const r = await fetch(`${API}/users/${USUARIO_GITHUB}/repos?per_page=100&sort=updated`, { headers: cabeceras() });
      if (!r.ok) throw new Error(`GitHub respondió ${r.status}`);
      const repos: any[] = await r.json();

      const validos = repos.filter(
        (x) => !x.fork && !x.archived
          && x.name.toLowerCase() !== USUARIO_GITHUB.toLowerCase()
          && !reposOcultos.some((o) => o.toLowerCase() === x.name.toLowerCase()),
      );

      return Promise.all(validos.map(async (x) => {
        let readme = '';
        try {
          const rr = await fetch(`${API}/repos/${USUARIO_GITHUB}/${x.name}/readme`, {
            headers: cabeceras('application/vnd.github.html+json'),
          });
          if (rr.ok) readme = arreglarRutas(await rr.text(), x.name, x.default_branch);
        } catch {}

        return {
          id: x.name,
          nombre: x.name,
          descripcion: x.description ?? '',
          lenguaje: x.language ?? null,
          estrellas: x.stargazers_count,
          forks: x.forks_count,
          temas: x.topics ?? [],
          url: x.html_url,
          demo: x.homepage || null,
          creado: x.created_at,
          actualizado: x.pushed_at ?? x.updated_at,
          readme,
        };
      }));
    } catch (e) {
      console.warn(`⚠️  No se pudieron cargar los repos de GitHub: ${(e as Error).message}`);
      return [];
    }
  },
  schema: z.object({
    nombre: z.string(),
    descripcion: z.string(),
    lenguaje: z.string().nullable(),
    estrellas: z.number(),
    forks: z.number(),
    temas: z.array(z.string()),
    url: z.string(),
    demo: z.string().nullable(),
    creado: z.coerce.date(),
    actualizado: z.coerce.date(),
    readme: z.string(),
  }),
});

// ---------- Contribuciones (cuadro de actividad) ----------
const API_CONTRIBUCIONES = process.env.CONTRIB_API ?? 'https://github-contributions-api.jogruber.de';

const actividad = defineCollection({
  loader: async () => {
    try {
      const r = await fetch(`${API_CONTRIBUCIONES}/v4/${USUARIO_GITHUB}?y=last`);
      if (!r.ok) throw new Error(`respondió ${r.status}`);
      const datos = await r.json();
      return [{
        id: 'ultimo-anio',
        total: datos.total?.lastYear ?? 0,
        dias: datos.contributions.map((d: any) => ({ fecha: d.date, cantidad: d.count, nivel: d.level })),
      }];
    } catch (e) {
      console.warn(`⚠️  No se pudieron cargar las contribuciones: ${(e as Error).message}`);
      return [];
    }
  },
  schema: z.object({
    total: z.number(),
    dias: z.array(z.object({ fecha: z.string(), cantidad: z.number(), nivel: z.number() })),
  }),
});

export const collections = { perfil, misiones, actividad };
