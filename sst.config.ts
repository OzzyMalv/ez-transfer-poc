import type { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(input) {
    return {
      name: "",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        buildCommand: "npx @opennextjs/aws@3.2.2 build",
        runtime: "nodejs20.x",
        warm: 20,
        memorySize: "3008 MB",
        customDomain: "",
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
