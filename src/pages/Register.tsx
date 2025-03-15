
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserRound, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Register = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-2xl font-bold text-primary">
              Connecti<span className="text-foreground">Pro</span>
            </h1>
          </Link>
          <h2 className="text-2xl font-bold mb-2">Créer un compte</h2>
          <p className="text-muted-foreground">
            Choisissez le type de compte que vous souhaitez créer
          </p>
        </div>

        <div className="space-y-6">
          <Link to="/inscription-client">
            <Card className="cursor-pointer hover:shadow-md transition-all border border-border/60">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <UserRound className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Je suis un client</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Je souhaite trouver des prestataires de services pour m'accompagner dans mon expatriation.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link to="/inscription-prestataire">
            <Card className="cursor-pointer hover:shadow-md transition-all border border-border/60">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Je suis un prestataire</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Je propose mes services aux expatriés et souhaite développer mon activité avec ConnectiPro.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Vous avez déjà un compte ?{" "}
            <Link to="/connexion" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
          <Link to="/">
            <Button variant="outline" size="sm" className="inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
