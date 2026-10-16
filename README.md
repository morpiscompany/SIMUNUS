# SIMUNUS

Frontend de estudos. O painel administrativo é mantido separadamente para uso local e não integra este repositório.

Aplicação: `Simunus/index.html`. Execute com um servidor HTTP estático na raiz do
checkout e abra `/Simunus/index.html` (por exemplo, a extensão Live Preview do
VS Code). Abrir como `file://` não reproduz o ambiente de autenticação do site.

A configuração do navegador contém a URL do projeto e uma chave pública Supabase do tipo `sb_publishable_`. O campo `anonKey` conserva o nome usado pelo cliente, mas seu valor é uma chave publishable, não uma chave secreta. Nunca use credenciais privilegiadas no navegador. O contato de suporte foi omitido desta distribuição pública.

Não inclua backups, relatórios internos, dados pessoais, tokens ou exportações do banco nos commits. O `.gitignore` não remove arquivos já rastreados nem segredos do histórico.

O SDK Supabase usa versão fixa 2.117.3 e verificação SRI. CSP limita scripts; estilos inline são mantidos por compatibilidade. Proteção contra enquadramento depende de headers da hospedagem.

Este frontend estático não lê `.env`. A recuperação usa por padrão
`https://morpiscompany.github.io/SIMUNUS/Simunus/recovery.html`, inclusive em
testes locais. O modo de desenvolvimento exige configuração explícita e só
aceita destinos loopback; parâmetros da URL não ativam esse modo.

## Publicação

O workflow `.github/workflows/pages.yml` publica a branch `main` no GitHub Pages.
`node scripts/build-pages.cjs` gera `.site` em um checkout limpo usando uma lista
explícita de arquivos públicos. `node scripts/verify-pages.cjs` verifica sintaxe,
referências, padrões de segredos e conteúdo do artefato antes do upload.
O job de deploy é o único que recebe permissão de escrita em Pages e de OIDC.
O site fica em `https://morpiscompany.github.io/SIMUNUS/Simunus/`.

O artefato não inclui README, scripts de CI, admin, backups, relatórios,
dependências locais ou testes. A `.gitignore` é proteção complementar e não
remove arquivos do histórico. Migrações SQL não são ignoradas globalmente.
Não há Service Worker registrado pelo frontend.

Para desfazer uma publicação, use um commit de reversão e o mesmo workflow;
não use force push. Confirme o término do deploy e os arquivos servidos.

## Estado da auditoria

A auditoria é parcial. Testes de interface usam solicitações simuladas, sem
enviar e-mails ou alterar senhas reais. A integração completa com contas reais,
testes de autorização entre diferentes usuários, a revisão jurídica dos assets
e a auditoria completa do backend permanecem pendentes. Questões são obtidas
pelas APIs autorizadas; conteúdo entregue a um navegador pode ser inspecionado
pelo usuário e não é protegido por minificação ou `.gitignore`.
A publicação não aplica SQL nem altera Auth, SMTP, políticas ou dados Supabase.
As verificações de CI detectam padrões conhecidos, sem certificar ausência de
vulnerabilidades ou de segredos em qualquer formato.
