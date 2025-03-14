
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { HelpCircle, LifeBuoy, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Support = () => {
  const { translate } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      toast.success(translate('support.messageSent'));
      setFormSubmitted(true);
    }, 800);
  };
  
  return (
    <div className="min-h-screen">
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">{translate('support.subtitle')}</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                {translate('support.title')}
              </h1>
              <p className="text-muted-foreground">
                {translate('support.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in delay-100">
              <Card className="border border-border hover:shadow-md transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <HelpCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{translate('support.faqTitle')}</h3>
                    <p className="text-muted-foreground mb-4">{translate('support.faqDescription')}</p>
                    <Link to="/faq">
                      <Button variant="outline" className="hover:bg-primary/10">{translate('support.viewFAQ')}</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-border hover:shadow-md transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{translate('support.chatTitle')}</h3>
                    <p className="text-muted-foreground mb-4">{translate('support.chatDescription')}</p>
                    <Button variant="outline" className="hover:bg-primary/10">{translate('support.startChat')}</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-border hover:shadow-md transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{translate('support.callTitle')}</h3>
                    <p className="text-muted-foreground mb-4">{translate('support.callDescription')}</p>
                    <Button variant="outline" className="hover:bg-primary/10">{translate('support.contactUs')}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="max-w-2xl mx-auto animate-fade-in delay-200">
              <Card className="border border-border hover:shadow-md transition-all duration-300">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-xl mb-4">{translate('support.contactFormTitle')}</h3>
                  {formSubmitted ? (
                    <div className="text-center py-8">
                      <LifeBuoy className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h4 className="text-xl font-medium mb-2">{translate('support.thankYou')}</h4>
                      <p className="text-muted-foreground mb-4">{translate('support.responseTime')}</p>
                      <Button onClick={() => setFormSubmitted(false)} variant="outline">
                        {translate('support.newMessage')}
                      </Button>
                    </div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{translate('support.nameLabel')}</label>
                          <Input placeholder={translate('support.namePlaceholder')} required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{translate('support.emailLabel')}</label>
                          <Input placeholder={translate('support.emailPlaceholder')} type="email" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">{translate('support.subjectLabel')}</label>
                        <Input placeholder={translate('support.subjectPlaceholder')} required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">{translate('support.messageLabel')}</label>
                        <Textarea placeholder={translate('support.messagePlaceholder')} rows={5} required />
                      </div>
                      <Button type="submit" className="w-full hover:bg-primary/90 transition-colors">
                        {translate('support.sendMessage')}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Support;
