
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const providerRegistrationSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
  confirmPassword: z.string(),
  professionalTitle: z.string().min(2, { message: "Veuillez saisir votre titre professionnel" }),
  primaryCategory: z.string().min(1, { message: "Veuillez sélectionner une catégorie" }),
  briefDescription: z.string().min(20, { message: "La description doit contenir au moins 20 caractères" }),
  terms: z.boolean().refine(val => val, {
    message: "Vous devez accepter les conditions d'utilisation"
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

type ProviderRegistrationFormValues = z.infer<typeof providerRegistrationSchema>;

const categoryOptions = [
  { value: "consulting", label: "Consulting" },
  { value: "finance", label: "Finance" },
  { value: "legal", label: "Juridique" },
  { value: "marketing", label: "Marketing" },
  { value: "it", label: "Informatique" },
  { value: "hr", label: "Ressources Humaines" },
  { value: "translation", label: "Traduction" },
  { value: "accounting", label: "Comptabilité" },
  { value: "other", label: "Autre" },
];

export default function InscriptionPrestataire() {
  const { register, loading } = useAuth();

  const form = useForm<ProviderRegistrationFormValues>({
    resolver: zodResolver(providerRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      professionalTitle: "",
      primaryCategory: "",
      briefDescription: "",
      terms: false
    },
  });

  const onSubmit = async (data: ProviderRegistrationFormValues) => {
    await register(data.email, data.password, data.name, "provider");
    // In a real application, we would also store the additional fields in the database
  };

  return (
    <div className="container max-w-2xl mx-auto pt-24 pb-12 px-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Inscription Prestataire</CardTitle>
          <CardDescription>
            Créez votre compte professionnel pour proposer vos services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email professionnel</FormLabel>
                      <FormControl>
                        <Input placeholder="exemple@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer le mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="professionalTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre professionnel</FormLabel>
                      <FormControl>
                        <Input placeholder="Consultant en stratégie" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="primaryCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie principale</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="briefDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brève description de vos services</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez brièvement vos services et votre expérience professionnelle..." 
                        {...field} 
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription>
                      Cette description sera visible sur votre profil public.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        J'accepte les{" "}
                        <Link to="/terms" className="text-primary hover:underline">
                          conditions d'utilisation
                        </Link>
                        {" "}et les{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          politiques de confidentialité
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Créer mon compte prestataire
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-center">
            Vous avez déjà un compte?{" "}
            <Link to="/connexion" className="text-primary hover:underline">
              Se connecter
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
