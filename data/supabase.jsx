import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jayupcoqrfgretiqolzg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpheXVwY29xcmZncmV0aXFvbHpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NDA1MzUsImV4cCI6MjA0MDQxNjUzNX0.ipMktTmwiV7RL7CHlRTy0Jvtu-d3zOyGzQ-uvAbqpCo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
