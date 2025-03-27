import type { NextConfig } from "next";
import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
  enabledEnv: "development",
});

const nextConfig: NextConfig = {};

export default withAutoCert(nextConfig);
