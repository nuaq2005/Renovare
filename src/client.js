import { createClient } from '@supabase/supabase-js'


const URL = 'https://hmwffqfdsbuaxcbajuxx.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhtd2ZmcWZkc2J1YXhjYmFqdXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzczNDQsImV4cCI6MjA0NjMxMzM0NH0.YtGYXUQlGB1Uu_LFFZ13JLzHhS3Fwv33OmDYI67MoGw';

export const supabase = createClient(URL, API_KEY);