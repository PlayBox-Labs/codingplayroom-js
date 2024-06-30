
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    'https://xyzcompany.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbGJ1Z2Z1cGt3bGFnamFxcXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3NDMwMTksImV4cCI6MjAzMDMxOTAxOX0.1I08Iybx-MvbrnoCN0kHdvqUrsrngDS04siykrDRYYM')