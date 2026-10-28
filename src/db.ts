import {createClient} from '@supabase/supabase-js';
import project from '../supabase/project.json';
const env=(import.meta as unknown as {env:Record<string,string>}).env;
const url=env.VITE_SUPABASE_URL||project.url;
const key=env.VITE_SUPABASE_PUBLISHABLE_KEY||project.publishableKey;
export const supabase=url&&key?createClient(url,key):null;
