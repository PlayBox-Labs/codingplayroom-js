
import { createClient } from '@supabase/supabase-js';
import config from '../config.json';

const supabase = createClient(config.supabase_url, config.supabase_key);

export default supabase
        