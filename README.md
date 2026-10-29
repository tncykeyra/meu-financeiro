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

## Versão 1.10 — mês financeiro e menu mobile

Meu calendário guarda por conta o dia inicial do período, fechamento e vencimento de referência, número do dia útil de recebimento, sábados e feriados informados. Exemplo: início dia 15, fechamento 14, vencimento 20. O período vai do dia 15 ao dia 14 seguinte e se aplica a filtros, gráficos, orçamento, fechamento e PDF. Dias 29–31 são ajustados em meses curtos. Mude o início apenas após reabrir todos os períodos fechados.

O calendário da fatura usa o mês de referência e fica separado do filtro de lançamentos. Não consulta Mercado Pago, não calcula juros/rendimentos e não ajusta vencimentos bancários automaticamente. Cartões podem guardar seu próprio dia de fechamento e vencimento. O menu do celular abre pela carteira, fecha por toque fora/Esc e contém conta, calendário, cores e instalação. Os botões de despesa e recebimento ficam acessíveis no resumo e na lista de lançamentos.

## Versão 1.11 — lançamento simples

Só o valor é obrigatório. Descrição opcional ganha o nome da categoria ao salvar em branco. Categoria sugerida por descrição/histórico é sempre editável. Data de hoje e status pago/recebido aparecem em botões compactos; parcelamento e detalhes são opcionais. O valor não é copiado dos atalhos recentes. Abertura e carregamento de conta usam uma animação abstrata de gráfico e carteira, sem atraso artificial nem cotação fictícia. Respeita a preferência de reduzir movimentos.

O botão flutuante Lançar na tela inicial abre o cadastro rápido. O preenchimento usa regras locais e o histórico da própria conta; não utiliza IA externa, não cria lançamentos sem confirmação e não inventa categorias quando faltam informações.

## Versão 1.12 — categoria visível e tour

O seletor Categoria fica sempre à vista no lançamento. Uma escolha manual prevalece sobre sugestões da descrição. Tour de quatro passos: lançar, categorizar, menu/calendário e resumo/PDF. Aparece no primeiro acesso por conta neste navegador, pode ser dispensado e reaberto em Como usar. A marca de conclusão é local e separada por ID de usuário; os registros financeiros continuam privados no Supabase. O tour não modifica os dados.

## Versão 1.13 — ícones de categoria

Categorias no lançamento aparecem como cartões com ícone, nome e seleção marcada. Seis opções iniciais e Ver todas para expandir. Ícones também na lista de categorias e nos lançamentos. Categorias personalizadas recebem um ícone por palavra-chave ou um símbolo neutro, mantendo sempre o nome legível.
