export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Bruno Amaral — Creative Director</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html { scrollbar-gutter: stable; background: #000; }
      body { font: 12px/1.5 system-ui, -apple-system, sans-serif; background: #000; color: #fff; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; overflow: hidden; }
      .overlay { position: fixed; inset: 0; display: grid; place-items: center; background: #000; }
      .title { margin: 0; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 400; }
      .status { position: fixed; right: 1.5rem; bottom: 1.5rem; margin: 0; color: rgba(255,255,255,.58); letter-spacing: .08em; text-transform: uppercase; }
      .actions { position: fixed; left: 1.5rem; bottom: 1.5rem; display: flex; gap: 0.75rem; }
      a, button { appearance: none; background: transparent; color: rgba(255,255,255,.72); border: 0; padding: 0; font: inherit; cursor: pointer; text-decoration: none; text-transform: uppercase; letter-spacing: .08em; }
    </style>
  </head>
  <body>
    <div class="overlay">
      <h1 class="title">Bruno Amaral — Creative Director</h1>
      <p class="status">Carregando</p>
      <div class="actions">
        <button onclick="location.reload()">Tentar novamente</button>
        <a href="/">Home</a>
      </div>
    </div>
  </body>
</html>`;
}
