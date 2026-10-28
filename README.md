# Meu Financeiro

Aplicativo React/TypeScript responsivo para despesas, receitas, parcelas, metas, orçamentos, gráficos e relatório A4 em PDF. Educador financeiro por regras baseadas nos registros. Sem API paga de inteligência artificial.

## Publicação independente

Endereço publicado: https://tncykeyra.github.io/meu-financeiro/

O GitHub Pages serve a pasta `docs` da branch `main`. O código-fonte fica na raiz. Não depende de sessão ou assinatura ChatGPT. O banco e o login são serviços Supabase separados, sujeitos às próprias condições e limites.

## Executar e atualizar

Instale Node.js 24 e pnpm 11. Execute `pnpm install --frozen-lockfile`, `pnpm test` e `pnpm build`. Para atualizar a publicação, substitua `docs` pelo conteúdo de `dist`, incluindo `.nojekyll`, e envie um commit.

## Dados e segurança

Apenas a URL e a chave publicável do Supabase são incluídas. A chave publicável identifica o app e não autoriza acesso aos dados de outras contas. A tabela finance_data usa RLS por auth.uid(). Nunca inclua service_role, senha do banco ou segredo OAuth no repositório.

O acesso aos registros exige login Google. Cada conta usa seu próprio user_id e as políticas RLS do banco. Registros locais antigos são preservados no navegador, mas não são mostrados nem transferidos automaticamente. Exporte backups regularmente. O aplicativo não importa backups. A interface pode abrir offline após o primeiro acesso; autenticação e dados financeiros exigem internet. O service worker guarda apenas arquivos estáticos do próprio aplicativo, nunca respostas do Supabase.

No Supabase, autorize https://tncykeyra.github.io/meu-financeiro/ como URL de redirecionamento. O callback Google permanece https://hjmwdjmfetlfwrfgrols.supabase.co/auth/v1/callback. Configure o Google Cloud e a audiência do login conforme as contas que utilizarão o app.

## Usabilidade

Lançamento com descrição, valor, categoria e data de hoje automática. Parcelamento e detalhes aparecem quando necessários. Layout adaptado a celulares. Fechamento mensal manual; relatório PDF baixável e compartilhável pelo usuário.

## Instalar no celular

Android: abra no Chrome e use Instalar no celular ou o menu do navegador. iPhone: Safari, Compartilhar, Adicionar à Tela de Início. Manifesto com ícones PNG 192 e 512, ícone maskable, apple-touch-icon e HTTPS. A instalação depende do suporte do navegador; não há publicação nas lojas.

## Cores e lançamentos rápidos

Cores do app permite editar 24 grupos de cores da interface, incluindo fundo, cartões, menu, cabeçalho, textos, bordas, entradas, saídas, botões, alertas e cinco cores de gráfico, com 24 amostras e seletor livre. A preferência é salva junto aos dados privados de cada conta. Não há botão de combinação verde/vermelho. Restaurar padrão repõe o tema inicial para prévia, antes de aplicar. Ao mudar a cor de entradas, saídas ou botões, o texto é ajustado para contraste e também pode ser personalizado. A interface avisa quando o contraste escolhido fica baixo. O tema completo é salvo na conta e reaplicado antes de mostrar o painel em novos acessos. Atalhos recentes preenchem somente descrição e categoria; confirme o valor. Salvar e registrar outro limpa o formulário e mantém o tipo de registro.
