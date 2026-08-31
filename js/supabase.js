```javascript
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

import "./config.js";

const { SUPABASE_URL, SUPABASE_ANON_KEY } =
  window.APROVAQUEST_CONFIG;

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
```
