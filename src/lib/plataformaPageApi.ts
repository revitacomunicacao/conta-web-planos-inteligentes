export type PlataformaApiCampo =
  | { nome: string; identificador: string; tipo: "texto"; valor: string }
  | { nome: string; identificador: string; tipo: "botao"; valor: { texto: string; link: string } }
  | {
      nome: string;
      identificador: string;
      tipo: "repetidor";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valor: any[];
    };

export type PlataformaApiSecao = {
  id: number;
  nome: string;
  ordem: number;
  campos: PlataformaApiCampo[];
};

export type PlataformaApiResponse = {
  success: boolean;
  data: {
    id: number;
    titulo: string;
    slug: string;
    status: string;
    campos: PlataformaApiCampo[];
    secoes: PlataformaApiSecao[];
  };
  message: string;
};

export type PlataformaContent = {
  banner: {
    card: string;
    titulo: string;
    descricao: string;
    botao: { texto: string; link: string } | null;
    cards: { titulo: string; descricao: string }[];
  };
  funcionalidades: {
    titulo: string;
    descricao: string;
    items: { titulo: string; descricao: string; iconKey: string | null; highlights: string[] }[];
  };
  cta: {
    titulo: string;
    descricao: string;
    botao: { texto: string; link: string } | null;
  };
};

function getSecao(secoes: PlataformaApiSecao[], nome: string) {
  return secoes.find((s) => s.nome.toLowerCase() === nome.toLowerCase()) ?? null;
}

function getCampoTexto(campos: PlataformaApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "texto") as
    | Extract<PlataformaApiCampo, { tipo: "texto" }>
    | undefined;
  return c?.valor ?? "";
}

function getCampoBotao(campos: PlataformaApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "botao") as
    | Extract<PlataformaApiCampo, { tipo: "botao" }>
    | undefined;
  return c?.valor ?? null;
}

function getCampoRepetidor(campos: PlataformaApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "repetidor") as
    | Extract<PlataformaApiCampo, { tipo: "repetidor" }>
    | undefined;
  return c?.valor ?? [];
}

export function normalizePlataformaContent(api: PlataformaApiResponse): PlataformaContent {
  const secoes = api.data.secoes ?? [];
  const banner = getSecao(secoes, "Banner");
  const funcionalidades = getSecao(secoes, "Funcionalidades");
  const cta = getSecao(secoes, "CTA");

  const bannerCards = getCampoRepetidor(banner?.campos ?? [], "cards").map((x) => ({
    titulo: String(x.titulo ?? ""),
    descricao: String(x.descricao ?? ""),
  }));

  const funcItems = getCampoRepetidor(funcionalidades?.campos ?? [], "funcionalidades").map((x) => {
    const highlights = ["item-1", "item-2", "item-3", "item-4"]
      .map((k) => (x[k] ? String(x[k]) : ""))
      .filter(Boolean);
    return {
      titulo: String(x.titulo ?? ""),
      descricao: String(x.descricao ?? ""),
      iconKey: (x.icones?.iconKey ?? null) as string | null,
      highlights,
    };
  });

  return {
    banner: {
      card: getCampoTexto(banner?.campos ?? [], "card"),
      titulo: getCampoTexto(banner?.campos ?? [], "titulo"),
      descricao: getCampoTexto(banner?.campos ?? [], "descricao"),
      botao: getCampoBotao(banner?.campos ?? [], "botao"),
      cards: bannerCards,
    },
    funcionalidades: {
      titulo: getCampoTexto(funcionalidades?.campos ?? [], "titulo-1"),
      descricao: getCampoTexto(funcionalidades?.campos ?? [], "descricao-1"),
      items: funcItems,
    },
    cta: {
      titulo: getCampoTexto(cta?.campos ?? [], "titulo-2"),
      descricao: getCampoTexto(cta?.campos ?? [], "descricao-2"),
      botao: getCampoBotao(cta?.campos ?? [], "botao-1"),
    },
  };
}

export async function fetchPlataformaPage(): Promise<PlataformaApiResponse> {
  const base = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_CMS_BASE_URL ?? "";
  const url = `${base}/admin/api/pages/plataforma`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Erro ao carregar Plataforma: ${res.status}`);
  return (await res.json()) as PlataformaApiResponse;
}

