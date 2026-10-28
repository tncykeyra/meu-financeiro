-- Apply ONLY to the new Meu Financeiro Supabase project.
create table if not exists public.finance_data (
 user_id uuid primary key references auth.users(id) on delete cascade,
 data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object'),
 updated_at timestamptz not null default now()
);
alter table public.finance_data enable row level security;
revoke all on public.finance_data from anon;
grant select, insert, update, delete on public.finance_data to authenticated;
create policy "Owner reads own finance" on public.finance_data for select to authenticated using ((select auth.uid()) = user_id);
create policy "Owner inserts own finance" on public.finance_data for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Owner updates own finance" on public.finance_data for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Owner deletes own finance" on public.finance_data for delete to authenticated using ((select auth.uid()) = user_id);
