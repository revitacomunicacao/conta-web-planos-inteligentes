export type SobreApiCampo =
  | { nome: string; identificador: string; tipo: "texto"; valor: string }
  | { nome: string; identificador: string; tipo: "botao"; valor: { texto: string; link: string } }
  | {
      nome: string;
      identificador: string;
      tipo: "repetidor";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valor: any[];
    };

export type SobreApiSecao = {
  id: number;
  nome: string;
  ordem: number;
  campos: SobreApiCampo[];
};

export type SobreApiResponse = {
  success: boolean;
  data: {
    id: number;
    titulo: string;
    slug: string;
    status: string;
    campos: SobreApiCampo[];
    secoes: SobreApiSecao[];
  };
  message: string;
};

export type SobreContent = {
  banner: { titulo: string; descricao: string };
  areas: { titulo: string; items: { titulo: string; iconKey: string | null }[] };
  cta: { titulo: string; descricao: string; botao: { texto: string; link: string } | null };
};

function getSecao(secoes: SobreApiSecao[], nome: string) {
  return secoes.find((s) => s.nome.toLowerCase() === nome.toLowerCase()) ?? null;
}

function getCampoTexto(campos: SobreApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "texto") as
    | Extract<SobreApiCampo, { tipo: "texto" }>
    | undefined;
  return c?.valor ?? "";
}

function getCampoBotao(campos: SobreApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "botao") as
    | Extract<SobreApiCampo, { tipo: "botao" }>
    | undefined;
  return c?.valor ?? null;
}

function getCampoRepetidor(campos: SobreApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "repetidor") as
    | Extract<SobreApiCampo, { tipo: "repetidor" }>
    | undefined;
  return c?.valor ?? [];
}

export function normalizeSobreContent(api: SobreApiResponse): SobreContent {
  const secoes = api.data.secoes ?? [];
  const banner = getSecao(secoes, "Banner");
  const areas =
    getSecao(secoes, "Áreas de Atuação") ?? getSecao(secoes, "Áreas de atuações") ?? getSecao(secoes, "Áreas de atuação");
  const cta = getSecao(secoes, "CTA");

  const areasItems = getCampoRepetidor(areas?.campos ?? [], "areas").map((x) => ({
    titulo: String(x.titulo ?? ""),
    iconKey: (x.icone?.iconKey ?? null) as string | null,
  }));

  return {
    banner: {
      titulo: getCampoTexto(banner?.campos ?? [], "titulo"),
      descricao: getCampoTexto(banner?.campos ?? [], "descricao"),
    },
    areas: {
      titulo: getCampoTexto(areas?.campos ?? [], "titulo-1"),
      items: areasItems,
    },
    cta: {
      titulo: getCampoTexto(cta?.campos ?? [], "titulo-2"),
      descricao: getCampoTexto(cta?.campos ?? [], "descricao-1"),
      botao: getCampoBotao(cta?.campos ?? [], "botao"),
    },
  };
}

export async function fetchSobrePage(): Promise<SobreApiResponse> {
  const base = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_CMS_BASE_URL ?? "";
  const url = `${base}/admin/api/pages/sobre`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Erro ao carregar Sobre: ${res.status}`);
  return (await res.json()) as SobreApiResponse;
}

