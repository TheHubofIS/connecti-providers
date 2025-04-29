
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Article = {
  id: string;
  title: string;
  content: string[];
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
};

// Données simulées des articles de blog avec contenu complet
const blogArticlesData: Record<string, Article> = {
  "expatriation-guide": {
    id: "expatriation-guide",
    title: "Guide complet d'expatriation: ce qu'il faut savoir avant de partir",
    excerpt: "Découvrez tous les aspects essentiels à considérer avant de vous expatrier, des démarches administratives à l'intégration culturelle.",
    content: [
      "L'expatriation représente une aventure extraordinaire, mais elle nécessite une préparation minutieuse pour éviter les désagréments. Ce guide a pour objectif de vous accompagner dans cette transition importante de votre vie.",
      "Avant de faire vos valises, plusieurs démarches administratives sont à prévoir. La première concerne votre visa et votre permis de travail. Selon votre destination, les procédures peuvent varier considérablement en termes de délais et de complexité. Il est recommandé de vous renseigner auprès du consulat ou de l'ambassade du pays concerné au moins six mois avant votre départ.",
      "La question de la protection sociale est également primordiale. Vous devrez déterminer si vous restez affilié au système français ou si vous adhérez au système local. Cette décision aura des implications sur votre couverture santé, votre retraite et vos allocations familiales. Dans certains cas, une assurance privée internationale peut être nécessaire pour compléter votre couverture.",
      "Sur le plan fiscal, le changement de résidence fiscale doit être soigneusement planifié. Selon votre situation, vous pourriez être soumis à une double imposition ou bénéficier de conventions fiscales entre la France et votre pays d'accueil. Consulter un expert-comptable spécialisé dans la fiscalité internationale est souvent un investissement judicieux.",
      "L'aspect financier de votre expatriation mérite également attention. Ouvrir un compte bancaire local, organiser des transferts d'argent internationaux à moindre coût, et comprendre les fluctuations de change sont des éléments qui faciliteront votre installation.",
      "Au-delà des aspects administratifs, l'intégration culturelle représente un défi majeur. Apprendre la langue locale, même à un niveau basique, facilitera grandement votre quotidien et vous ouvrira des portes. Se renseigner sur les codes culturels, les coutumes et l'étiquette locale vous évitera des faux pas et accélérera votre intégration.",
      "Enfin, maintenir des liens avec la France tout en construisant votre nouvelle vie est un équilibre à trouver. Les associations d'expatriés français, les événements culturels organisés par les alliances françaises ou les consulats, ainsi que les plateformes en ligne dédiées aux expatriés sont autant de ressources pour vous sentir soutenu dans votre aventure.",
      "N'oubliez pas que l'expatriation est un processus d'adaptation qui prend du temps. Soyez patient avec vous-même et ouvert aux nouvelles expériences. Cette période de transition, bien que parfois déstabilisante, sera riche en apprentissages personnels et professionnels."
    ],
    date: "15 mai 2023",
    author: "Marie Dubois",
    category: "Expatriation",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    tags: ["Expatriation", "Démarches administratives", "Intégration culturelle", "Fiscalité internationale", "Visa"]
  },
  "remote-work-trends": {
    id: "remote-work-trends",
    title: "Tendances du travail à distance en 2023 pour les expatriés",
    excerpt: "Analyse des dernières évolutions du travail à distance et leur impact sur la communauté des expatriés français à l'international.",
    content: [
      "La pandémie de COVID-19 a profondément transformé notre rapport au travail, avec l'adoption massive du télétravail. En 2023, cette tendance continue d'évoluer, offrant de nouvelles perspectives pour les expatriés français à travers le monde.",
      "Le premier constat est la normalisation du travail hybride. De nombreuses entreprises internationales adoptent désormais un modèle mixte, combinant présence au bureau et travail à distance. Cette flexibilité représente une opportunité sans précédent pour les expatriés, qui peuvent maintenir un lien professionnel avec la France tout en vivant à l'étranger.",
      "On observe également l'émergence du concept de 'nomadisme digital professionnel'. Au-delà du simple freelancing, des postes traditionnellement sédentaires dans des grandes entreprises deviennent accessibles à distance. Certains pays comme le Portugal, l'Estonie ou les Émirats arabes unis ont même créé des visas spécifiques pour attirer ces travailleurs à distance, offrant ainsi de nouvelles options de mobilité internationale.",
      "Sur le plan technologique, les outils collaboratifs continuent d'évoluer pour faciliter le travail d'équipes distribuées géographiquement. Au-delà de la visioconférence, des solutions de réalité augmentée et d'espaces de travail virtuels commencent à créer de nouvelles formes d'interaction professionnelle, réduisant la distance ressentie par les équipes internationales.",
      "Pour les expatriés français, cette évolution s'accompagne de défis spécifiques. La gestion des fuseaux horaires reste une problématique centrale, particulièrement pour ceux travaillant avec des équipes en France. Des pratiques émergent pour créer des 'plages de collaboration' communes tout en préservant l'équilibre entre vie professionnelle et personnelle.",
      "Sur le plan juridique, le cadre se précise progressivement. Des questions comme le droit applicable au contrat de travail, la protection sociale ou la fiscalité des travailleurs à distance internationaux font l'objet d'évolutions réglementaires dans de nombreux pays. Les entreprises développent également des politiques internes plus structurées pour encadrer ces nouvelles formes de mobilité.",
      "Enfin, l'aspect culturel du travail à distance international mérite une attention particulière. Maintenir un sentiment d'appartenance à l'entreprise, comprendre les nuances culturelles dans la communication à distance, et construire une relation de confiance sans interactions physiques régulières sont des compétences désormais essentielles pour les expatriés en télétravail.",
      "Pour tirer parti de ces évolutions, les expatriés français doivent développer une forte autonomie, des compétences accrues en communication interculturelle, et une capacité à établir clairement les limites entre vie professionnelle et personnelle dans un contexte où les frontières s'estompent."
    ],
    date: "28 avril 2023",
    author: "Thomas Martin",
    category: "Travail",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    tags: ["Télétravail", "Nomadisme digital", "Management interculturel", "Technologie collaborative", "Équilibre vie pro-perso"]
  },
  "tax-optimization": {
    id: "tax-optimization",
    title: "Optimisation fiscale pour les français à l'étranger",
    excerpt: "Les stratégies les plus efficaces pour gérer votre fiscalité en tant qu'expatrié français, tout en restant conforme aux réglementations.",
    content: [
      "La gestion fiscale représente un enjeu majeur pour tout expatrié français. Entre la nécessité de respecter les obligations légales et l'opportunité d'optimiser sa situation, il est essentiel de comprendre les mécanismes en jeu pour prendre des décisions éclairées.",
      "Le premier principe à saisir est celui de la résidence fiscale. Selon la législation française, vous êtes considéré comme résident fiscal si vous maintenez en France votre foyer ou votre lieu de séjour principal (plus de 183 jours par an), si vous exercez en France une activité professionnelle principale, ou si vous y avez le centre de vos intérêts économiques. Rompre sa résidence fiscale française nécessite donc de respecter ces critères.",
      "Une fois la résidence fiscale établie à l'étranger, vous serez soumis principalement à la fiscalité locale. Cependant, la France conserve le droit d'imposer certains revenus de source française. C'est ici qu'interviennent les conventions fiscales bilatérales, qui déterminent quel pays peut imposer quels types de revenus et qui préviennent la double imposition.",
      "Pour les revenus immobiliers situés en France, par exemple, la convention fiscale attribue généralement le droit d'imposition à la France. Toutefois, ces revenus seront souvent pris en compte dans votre pays de résidence pour déterminer votre taux d'imposition global, avec un crédit d'impôt correspondant à l'impôt français déjà payé.",
      "Les plus-values immobilières réalisées en France restent généralement imposables en France, même pour les non-résidents, mais souvent à des taux différents. Pour les plus-values mobilières (actions, parts sociales), la situation varie selon les conventions fiscales.",
      "Concernant les placements financiers, les expatriés peuvent bénéficier d'avantages spécifiques. L'assurance-vie, par exemple, conserve ses atouts fiscaux même pour les non-résidents, notamment en matière de transmission. Les contrats luxembourgeois offrent souvent une flexibilité et une sécurité juridique appréciées des expatriés.",
      "La planification successorale mérite une attention particulière, car le droit successoral français peut continuer à s'appliquer à certains biens, même pour un expatrié. Une stratégie patrimoniale globale, prenant en compte les spécificités des deux pays concernés, est souvent nécessaire.",
      "Enfin, rester en conformité avec les obligations déclaratives reste primordial. Même en tant que non-résident, vous devez déclarer vos revenus de source française. De plus, les dispositifs d'échange automatique d'informations fiscales entre pays rendent la transparence plus nécessaire que jamais."
    ],
    date: "10 avril 2023",
    author: "Sophie Petit",
    category: "Finance",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    tags: ["Fiscalité internationale", "Résidence fiscale", "Conventions fiscales", "Patrimoine", "Déclaration"]
  },
  "healthcare-abroad": {
    id: "healthcare-abroad",
    title: "Accès aux soins médicaux à l'étranger : guide pratique",
    excerpt: "Comment naviguer dans les différents systèmes de santé à l'international et maintenir un suivi médical de qualité.",
    content: [
      "L'accès aux soins de santé constitue une préoccupation majeure pour les Français expatriés. La qualité des infrastructures médicales, les différences de pratiques et la prise en charge financière des soins varient considérablement d'un pays à l'autre.",
      "Avant même votre départ, plusieurs démarches s'imposent. La première consiste à effectuer un bilan médical complet et à mettre à jour vos vaccinations. C'est également le moment idéal pour constituer une trousse médicale de base et obtenir des ordonnances pour vos traitements de longue durée, idéalement avec les noms des molécules (et non des marques) pour faciliter leur obtention à l'étranger.",
      "Concernant la couverture santé, plusieurs options s'offrent à vous. Si vous êtes détaché par une entreprise française, vous continuez généralement à bénéficier de la sécurité sociale française. Pour les autres statuts d'expatriation, vous pouvez soit adhérer au système local (selon le pays), soit souscrire à la Caisse des Français à l'Étranger (CFE), soit opter pour une assurance santé internationale privée. Ces options peuvent d'ailleurs être combinées pour une couverture optimale.",
      "L'assurance santé internationale présente plusieurs avantages : elle offre généralement une couverture mondiale, permet d'être soigné dans le réseau médical privé souvent plus adapté aux standards européens, et simplifie les démarches administratives avec des systèmes de tiers-payant. En revanche, son coût est significatif et augmente avec l'âge.",
      "Une fois sur place, identifier un médecin francophone ou anglophone de confiance devrait être une priorité. Les consulats, ambassades et associations d'expatriés peuvent vous orienter vers des praticiens recommandés. Dans certains pays, des hôpitaux internationaux offrent des services spécifiquement adaptés aux expatriés.",
      "Pour les maladies chroniques nécessitant un suivi régulier, une coordination entre votre médecin en France et votre médecin local est souhaitable. La télémédecine, en plein essor, facilite ce suivi à distance et permet de consulter des spécialistes français sans nécessiter un voyage.",
      "En cas d'hospitalisation programmée, vérifiez préalablement les conditions de prise en charge avec votre assurance. Pour les urgences, ayez toujours sur vous les coordonnées de votre assureur et les numéros d'urgence locaux. Dans certains pays, l'avance des frais médicaux peut représenter des sommes considérables.",
      "Enfin, n'oubliez pas que le retour en France pour des soins spécifiques reste une option, particulièrement pour des interventions complexes ou des traitements de longue durée. Dans ce cas, anticipez les démarches administratives pour garantir votre prise en charge."
    ],
    date: "22 mars 2023",
    author: "Dr. Philippe Blanc",
    category: "Santé",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    tags: ["Santé internationale", "Assurance expatriation", "Système de santé", "Télémédecine", "Hospitalisation"]
  },
  "legal-challenges": {
    id: "legal-challenges",
    title: "Les défis juridiques des entrepreneurs français à l'international",
    excerpt: "Analyse des principales problématiques légales rencontrées par les entrepreneurs français qui développent leur activité à l'étranger.",
    content: [
      "Développer son entreprise à l'international représente une opportunité de croissance significative, mais s'accompagne de défis juridiques complexes. Pour les entrepreneurs français, naviguer entre différents systèmes légaux nécessite à la fois vigilance et expertise.",
      "Le choix de la structure juridique constitue la première décision stratégique. Entre filiale, succursale, bureau de représentation ou simple partenariat commercial, chaque option présente des avantages et contraintes spécifiques en termes de responsabilité, fiscalité et gouvernance. Cette décision doit s'appuyer sur une analyse approfondie des objectifs commerciaux et du contexte local.",
      "La protection de la propriété intellectuelle représente un enjeu majeur, particulièrement dans certaines régions où les pratiques de contrefaçon sont courantes. L'enregistrement préalable des marques, brevets et droits d'auteur dans chaque territoire visé est essentiel. Attention toutefois aux différences significatives entre systèmes juridiques : ce qui est protégeable en France peut ne pas l'être ailleurs.",
      "Les relations contractuelles internationales nécessitent une attention particulière. La rédaction de contrats adaptés au contexte local tout en préservant vos intérêts est primordiale. Il est recommandé de définir clairement le droit applicable et les mécanismes de résolution des litiges, en privilégiant l'arbitrage international pour éviter les juridictions locales parfois imprévisibles.",
      "La conformité réglementaire varie considérablement selon les secteurs et les pays. Au-delà des réglementations spécifiques à votre activité, certaines législations extraterritoriales, comme le RGPD européen ou le FCPA américain, peuvent s'appliquer à vos opérations internationales et imposer des obligations strictes.",
      "La gestion des ressources humaines à l'international présente également des défis juridiques spécifiques. Les contrats de travail, les conditions de détachement ou d'expatriation, les obligations sociales et les pratiques managériales doivent s'adapter aux législations locales, parfois très protectrices des employés.",
      "Sur le plan fiscal, la prévention de la double imposition et l'optimisation fiscale légale reposent sur une bonne compréhension des conventions fiscales et des mécanismes de crédit d'impôt. Attention également aux règles de prix de transfert qui encadrent strictement les transactions entre entités d'un même groupe.",
      "Enfin, la stratégie de sortie ou de transmission de l'entreprise doit être anticipée, car les mécanismes juridiques et fiscaux varient considérablement selon les juridictions. Une planification précoce permet d'optimiser ces opérations dans un cadre international."
    ],
    date: "5 mars 2023",
    author: "Maître Jean Legrand",
    category: "Juridique",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    tags: ["Droit international", "Propriété intellectuelle", "Contrats internationaux", "Fiscalité", "Conformité"]
  },
  "cost-benefits": {
    id: "cost-benefits",
    title: "Coût-bénéfice des services professionnels pour expatriés",
    excerpt: "Pourquoi investir dans des services professionnels adaptés peut faire économiser du temps et de l'argent aux expatriés sur le long terme.",
    content: [
      "L'expatriation s'accompagne d'une multitude de démarches et de décisions dont les implications peuvent être significatives. Face à cette complexité, le recours à des services professionnels spécialisés peut sembler représenter un coût supplémentaire, mais constitue souvent un investissement judicieux sur le long terme.",
      "Dans le domaine fiscal, par exemple, faire appel à un expert-comptable spécialisé en fiscalité internationale permet d'éviter des erreurs coûteuses. Une déclaration incorrecte peut entraîner des pénalités substantielles, voire des redressements fiscaux dans plusieurs pays simultanément. Au-delà de la conformité, ces professionnels peuvent identifier des optimisations légitimes, générant des économies souvent supérieures à leurs honoraires.",
      "Sur le plan juridique, l'accompagnement par un avocat lors de transactions immobilières ou de la création d'entreprise à l'étranger sécurise ces opérations majeures. La méconnaissance des subtilités légales locales peut conduire à des situations juridiquement complexes et financièrement préjudiciables. Une heure de consultation préventive vaut mieux que des mois de procédure corrective.",
      "Pour la gestion patrimoniale, un conseiller spécialisé dans les situations internationales peut élaborer une stratégie cohérente entre plusieurs pays. L'articulation entre régimes matrimoniaux, fiscalité et succession dans un contexte international présente des opportunités mais aussi des risques qu'une expertise pointue permet de maîtriser.",
      "Les services d'assistance à l'installation (relocation) permettent de gagner un temps précieux et d'éviter les faux pas culturels ou administratifs. Trouver un logement adapté, comprendre le système éducatif local pour ses enfants, ou simplement accomplir les démarches d'installation dans une langue étrangère sont autant de défis que ces professionnels facilitent.",
      "En matière de santé, adhérer à une assurance internationale adaptée peut sembler onéreux, mais offre une sécurité inestimable en cas de problème médical sérieux. Les frais médicaux à l'étranger, particulièrement dans le secteur privé, peuvent atteindre des sommes astronomiques que seule une couverture adéquate permet d'absorber.",
      "Pour les entrepreneurs, l'accompagnement par des experts du développement international permet d'accélérer significativement l'implantation commerciale. Leur connaissance du marché local, des réseaux d'affaires et des pratiques commerciales spécifiques raccourcit le temps nécessaire pour atteindre la rentabilité.",
      "En conclusion, les services professionnels pour expatriés doivent être considérés comme des investissements stratégiques plutôt que comme des dépenses. Leur valeur réside dans la prévention des risques, l'optimisation des opportunités et la libération de temps et d'énergie pour se concentrer sur l'essentiel : réussir son projet d'expatriation."
    ],
    date: "18 février 2023",
    author: "Claire Dupont",
    category: "Business",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    tags: ["Services professionnels", "Optimisation fiscale", "Conseil juridique", "Assistance expatriation", "Analyse coût-bénéfice"]
  }
};

export default function BlogArticle() {
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { translate, language } = useLanguage();
  
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (articleId && blogArticlesData[articleId]) {
          setArticle(blogArticlesData[articleId]);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [articleId]);
  
  const handleSaveArticle = () => {
    toast({
      title: translate("blog.loginRequired"),
      description: translate("blog.loginToSave"),
    });
  };
  
  const handleShareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      }).catch(err => console.error('Error sharing', err));
    } else {
      toast({
        title: translate("blog.shareCopied"),
        description: translate("blog.linkCopied"),
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
            <div className="h-8 w-40 bg-card rounded"></div>
            <div className="h-8 w-3/4 bg-card rounded"></div>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-card rounded-full"></div>
              <div className="h-6 w-40 bg-card rounded"></div>
            </div>
            <div className="h-64 bg-card rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-card rounded w-full"></div>
              <div className="h-4 bg-card rounded w-5/6"></div>
              <div className="h-4 bg-card rounded w-4/5"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{translate("blog.articleNotFound")}</h1>
            <p className="text-muted-foreground mb-8">
              {translate("blog.articleNotFoundDesc")}
            </p>
            <Link to="/blog">
              <Button>{translate("blog.backToBlog")}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {translate("blog.backToBlog")}
          </Link>
          
          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{article.category}</span>
                </div>
              </div>
              
              <div className="h-[400px] w-full rounded-xl overflow-hidden mb-8">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex justify-between items-center mb-8 border-y border-border py-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={handleShareArticle} title={translate("blog.share")}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleSaveArticle} title={translate("blog.save")}>
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className="mb-6 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-12 border-t border-border pt-8">
              <h3 className="text-xl font-semibold mb-4">{translate("blog.aboutAuthor")}</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{article.author}</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {translate("blog.authorBio")}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
