export type ServicosApiCampo =
  | { nome: string; identificador: string; tipo: "texto"; valor: string }
  | { nome: string; identificador: string; tipo: "botao"; valor: { texto: string; link: string } }
  | {
      nome: string;
      identificador: string;
      tipo: "repetidor";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valor: any[];
    };

export type ServicosApiSecao = {
  id: number;
  nome: string;
  ordem: number;
  campos: ServicosApiCampo[];
};

export type ServicosApiResponse = {
  success: boolean;
  data: {
    id: number;
    titulo: string;
    slug: string;
    status: string;
    campos: ServicosApiCampo[];
    secoes: ServicosApiSecao[];
  };
  message: string;
};

export type ServicosContent = {
  banner: { titulo: string; descricao: string };
  categories: { title: string; items: { title: string; desc: string }[] }[];
  cta: { titulo: string; descricao: string; botao: { texto: string; link: string } | null };
};

function getSecao(secoes: ServicosApiSecao[], nome: string) {
  return secoes.find((s) => s.nome.toLowerCase() === nome.toLowerCase()) ?? null;
}

function getCampoTexto(campos: ServicosApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "texto") as
    | Extract<ServicosApiCampo, { tipo: "texto" }>
    | undefined;
  return c?.valor ?? "";
}

function getCampoBotao(campos: ServicosApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "botao") as
    | Extract<ServicosApiCampo, { tipo: "botao" }>
    | undefined;
  return c?.valor ?? null;
}

function getCampoRepetidor(campos: ServicosApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "repetidor") as
    | Extract<ServicosApiCampo, { tipo: "repetidor" }>
    | undefined;
  return c?.valor ?? [];
}

function firstTexto(campos: ServicosApiCampo[]) {
  const c = campos.find((x) => x.tipo === "texto") as Extract<ServicosApiCampo, { tipo: "texto" }> | undefined;
  return c?.valor ?? "";
}

function firstRepetidor(campos: ServicosApiCampo[]) {
  const c = campos.find((x) => x.tipo === "repetidor") as Extract<ServicosApiCampo, { tipo: "repetidor" }> | undefined;
  return c?.valor ?? [];
}

export function normalizeServicosContent(api: ServicosApiResponse): ServicosContent {
  const secoes = api.data.secoes ?? [];

  const banner = getSecao(secoes, "Banner");
  const cta = getSecao(secoes, "CTA");

  const categories = secoes
    .filter((s) => !["banner", "cta"].includes(s.nome.toLowerCase()))
    .sort((a, b) => a.ordem - b.ordem)
    .map((s) => {
      const items = firstRepetidor(s.campos).map((x) => ({
        title: String(x.titulo ?? ""),
        desc: String(x.descricao ?? ""),
      }));
      return { title: firstTexto(s.campos), items };
    })
    .filter((c) => c.title && c.items.length);

  return {
    banner: {
      titulo: getCampoTexto(banner?.campos ?? [], "titulo"),
      descricao: getCampoTexto(banner?.campos ?? [], "descricao"),
    },
    categories,
    cta: {
      titulo: getCampoTexto(cta?.campos ?? [], "titulo-5"),
      descricao: getCampoTexto(cta?.campos ?? [], "descricao-1"),
      botao: getCampoBotao(cta?.campos ?? [], "botao"),
    },
  };
}

export async function fetchServicosPage(): Promise<ServicosApiResponse> {
  const base = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_CMS_BASE_URL ?? "";
  const url = `${base}/admin/api/pages/servicos`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Erro ao carregar Serviços: ${res.status}`);
  return (await res.json()) as ServicosApiResponse;
}

