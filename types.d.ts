declare module "anchor-pki/auto-cert/integrations/next" {
  import type { NextConfig } from "next";

  interface AutoCertOptions {
    enabledEnv?: string;
  }

  function autoCert(
    options: AutoCertOptions,
  ): (config: NextConfig) => NextConfig;

  export default autoCert;
}
