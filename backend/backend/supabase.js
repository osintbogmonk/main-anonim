const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  "https://euzmecqnozwwrjiaqggt.supabase.co",
  "sb_publishable_wQpw5zl350Zoj4AtkK5waA_s-I50Wbl"
);

module.exports = supabase;
