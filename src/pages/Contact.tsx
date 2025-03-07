
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire à implémenter
    console.log("Formulaire soumis:", formData);
    alert("Votre message a été envoyé. Nous vous contacterons bientôt !");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">Contactez-nous</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                Nous sommes à votre écoute
              </h1>
              <p className="text-muted-foreground">
                Une question, une suggestion ou besoin d'aide ? Notre équipe est là pour vous accompagner.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="animate-fade-in delay-100">
                <div className="bg-white dark:bg-secondary/50 rounded-xl shadow-sm p-8 border border-border">
                  <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                        Nom complet <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full py-3 px-4 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all bg-transparent"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full py-3 px-4 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all bg-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                        Sujet <span className="text-primary">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full py-3 px-4 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all bg-transparent"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="question">Question générale</option>
                        <option value="support">Support client</option>
                        <option value="partnership">Partenariat</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full py-3 px-4 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all bg-transparent"
                        placeholder="Votre message"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center"
                    >
                      <span>Envoyer le message</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
              
              <div className="animate-fade-in delay-200">
                <div className="bg-white dark:bg-secondary/50 rounded-xl shadow-sm p-8 border border-border mb-8">
                  <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <a href="mailto:contact@connectipro.fr" className="text-primary hover:underline">
                          contact@connectipro.fr
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Téléphone</h3>
                        <a href="tel:+33123456789" className="text-primary hover:underline">
                          +33 1 23 45 67 89
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center mr-4">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Adresse</h3>
                        <p className="text-muted-foreground">
                          12 rue de la Paix<br />
                          75002 Paris<br />
                          France
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-secondary/50 rounded-xl shadow-sm p-8 border border-border">
                  <h2 className="text-2xl font-bold mb-6">Horaires d'ouverture</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span className="font-medium">9h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span className="font-medium">10h00 - 15h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span className="font-medium">Fermé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
