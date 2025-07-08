import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, d as decodeKey } from './chunks/astro/server_BHsjU8LN.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/sparrow/Desktop/sparrow-ai-tech/astro/","adapterName":"","routes":[{"file":"file:///home/sparrow/Desktop/sparrow-ai-tech/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/sparrow-ai-tech/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/sparrow/Desktop/sparrow-ai-tech/astro/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_DkjvRoTX.mjs","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/c4Diagram-6F6E4RAY.mjs":"_astro/c4Diagram-6F6E4RAY.D2u7HSo5.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/flowDiagram-PKI6S5ZS.mjs":"_astro/flowDiagram-PKI6S5ZS.C_GSdVEp.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/erDiagram-R3QVA2FD.mjs":"_astro/erDiagram-R3QVA2FD.MudOMfCx.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/gitGraphDiagram-GW3U2K7C.mjs":"_astro/gitGraphDiagram-GW3U2K7C.BQ0gUrw_.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-XT3IWWJI.mjs":"_astro/infoDiagram-XT3IWWJI.B2MuwxK9.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/quadrantDiagram-2OG54O6I.mjs":"_astro/quadrantDiagram-2OG54O6I.DiC2fDTa.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/requirementDiagram-SO3GGRV7.mjs":"_astro/requirementDiagram-SO3GGRV7.BfEXl3Zg.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/sequenceDiagram-ZIKVLSP4.mjs":"_astro/sequenceDiagram-ZIKVLSP4.ScoIMpua.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/classDiagram-BGRH5UQR.mjs":"_astro/classDiagram-BGRH5UQR.BhC5xOaZ.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/classDiagram-v2-O24JOBDK.mjs":"_astro/classDiagram-v2-O24JOBDK.BhC5xOaZ.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/stateDiagram-XX37X6EN.mjs":"_astro/stateDiagram-XX37X6EN.CR9uSdry.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/stateDiagram-v2-GD6S3NHB.mjs":"_astro/stateDiagram-v2-GD6S3NHB.CRYDiRs8.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/journeyDiagram-EWQZEKCU.mjs":"_astro/journeyDiagram-EWQZEKCU.PwRfwoFz.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/timeline-definition-RI47OAVP.mjs":"_astro/timeline-definition-RI47OAVP.725MSpRH.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/kanban-definition-ILFWEQ3N.mjs":"_astro/kanban-definition-ILFWEQ3N.6mnIDOWI.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/diagram-5UYTHUR4.mjs":"_astro/diagram-5UYTHUR4.FauUzaXF.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/diagram-ZTM2IBQH.mjs":"_astro/diagram-ZTM2IBQH.BervGgzZ.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/blockDiagram-PHRCVELO.mjs":"_astro/blockDiagram-PHRCVELO.ZgGkkhwh.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/katex/dist/katex.mjs":"_astro/katex.DsmCZfJr.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/dagre-FFZHY6LT.mjs":"_astro/dagre-FFZHY6LT.itNzuoES.js","@astrojs/react/client.js":"_astro/client.HNz4dZZJ.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/xychartDiagram-H2YORKM3.mjs":"_astro/xychartDiagram-H2YORKM3.51ZMMK28.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/pieDiagram-NIOCPIFQ.mjs":"_astro/pieDiagram-NIOCPIFQ.Bq39N41Y.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/mindmap-definition-CZNETY7S.mjs":"_astro/mindmap-definition-CZNETY7S.CqlutZsG.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/architectureDiagram-NQ2NVSRB.mjs":"_astro/architectureDiagram-NQ2NVSRB.CiHqGBUJ.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/sankeyDiagram-4UZDY2LN.mjs":"_astro/sankeyDiagram-4UZDY2LN.D1cpEPuN.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/diagram-3EMPZRKU.mjs":"_astro/diagram-3EMPZRKU.DhMdmuMh.js","/home/sparrow/Desktop/sparrow-ai-tech/node_modules/mermaid/dist/chunks/mermaid.core/ganttDiagram-EK5VF46D.mjs":"_astro/ganttDiagram-EK5VF46D.DzaSYr61.js","/home/sparrow/Desktop/sparrow-ai-tech/src/App.jsx":"_astro/App.DxZgom_4.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/sparrow-ai-tech/file:///home/sparrow/Desktop/sparrow-ai-tech/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"R3p6/puGCpvTutwCQFPXgOCLkjLgEJqIp7hUuA2G688=","experimentalEnvGetSecretEnabled":false});

export { manifest };
