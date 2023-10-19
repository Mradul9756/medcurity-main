
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://rxzxfdcedubodddrdhbz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4enhmZGNlZHVib2RkZHJkaGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2MTY4NzUsImV4cCI6MTk5ODE5Mjg3NX0.kmx8rYrWlpnM_eBg1-W3Ke_8K3Ekm4dZeVgzPSTnAEE'

export const supabase = createClient(supabaseUrl, supabaseKey)

