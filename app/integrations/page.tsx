import { getIntegrationStatus } from "@/lib/leads/providers";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IntegrationsPage() {
  const integrations = getIntegrationStatus();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect the providers that turn leadRX10 from a demo into a live lead-search product.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map((integration) => (
          <Card key={integration.key}>
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div>
                <CardTitle className="text-base">{integration.label}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {integration.purpose}
                </p>
              </div>
              <Badge variant={integration.configured ? "success" : "warning"}>
                {integration.configured ? "Configured" : "Needed"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {integration.envVars.map((envVar) => (
                  <code
                    key={envVar}
                    className="rounded-md bg-muted px-2.5 py-1.5 text-xs text-muted-foreground"
                  >
                    {envVar}
                  </code>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
