
import { ArrowRight, FileSearch, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { translate } = useLanguage();
  
  const steps = [
    {
      icon: <FileSearch className="h-6 w-6 text-primary" />,
      title: translate('howItWorks.step1.title'),
      description: translate('howItWorks.step1.description'),
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: translate('howItWorks.step2.title'),
      description: translate('howItWorks.step2.description'),
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: translate('howItWorks.step3.title'),
      description: translate('howItWorks.step3.description'),
    },
  ];

  return (
    <section className="py-16 bg-accent/30 dark:bg-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary">
            {translate('howItWorks.subtitle')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            {translate('howItWorks.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {translate('howItWorks.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-secondary border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold">
                  {translate('howItWorks.step')} {index + 1}
                </h3>
              </div>
              <h4 className="text-xl font-medium mb-3">{step.title}</h4>
              <p className="text-muted-foreground mb-4">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/comment-ca-marche"
            className="inline-flex items-center px-6 py-3 border border-primary/20 rounded-lg text-primary hover:bg-primary/5 transition-all"
          >
            <span>{translate('howItWorks.learnMore')}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
