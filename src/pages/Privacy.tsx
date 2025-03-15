
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {translate('privacy.title')}
              </h1>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead">{translate('privacy.lastUpdated')}: 01/06/2023</p>
                
                <h2 className="mt-8 mb-4">{translate('privacy.introTitle')}</h2>
                <p className="mb-6">{translate('privacy.introText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('privacy.dataCollectionTitle')}</h2>
                <p className="mb-6">{translate('privacy.dataCollectionText')}</p>
                <ul className="list-disc pl-8 mb-6">
                  <li className="mb-2">{translate('privacy.dataPoint1')}</li>
                  <li className="mb-2">{translate('privacy.dataPoint2')}</li>
                  <li className="mb-2">{translate('privacy.dataPoint3')}</li>
                  <li className="mb-2">{translate('privacy.dataPoint4')}</li>
                  <li className="mb-2">{translate('privacy.dataPoint5')}</li>
                </ul>
                
                <h2 className="mt-8 mb-4">{translate('privacy.dataUseTitle')}</h2>
                <p className="mb-6">{translate('privacy.dataUseText')}</p>
                <ul className="list-disc pl-8 mb-6">
                  <li className="mb-2">{translate('privacy.usePoint1')}</li>
                  <li className="mb-2">{translate('privacy.usePoint2')}</li>
                  <li className="mb-2">{translate('privacy.usePoint3')}</li>
                  <li className="mb-2">{translate('privacy.usePoint4')}</li>
                </ul>
                
                <h2 className="mt-8 mb-4">{translate('privacy.cookiesTitle')}</h2>
                <p className="mb-6">{translate('privacy.cookiesText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('privacy.securityTitle')}</h2>
                <p className="mb-6">{translate('privacy.securityText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('privacy.thirdPartiesTitle')}</h2>
                <p className="mb-6">{translate('privacy.thirdPartiesText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('privacy.rightsTitle')}</h2>
                <p className="mb-6">{translate('privacy.rightsText')}</p>
                <ul className="list-disc pl-8 mb-6">
                  <li className="mb-2">{translate('privacy.rightPoint1')}</li>
                  <li className="mb-2">{translate('privacy.rightPoint2')}</li>
                  <li className="mb-2">{translate('privacy.rightPoint3')}</li>
                  <li className="mb-2">{translate('privacy.rightPoint4')}</li>
                  <li className="mb-2">{translate('privacy.rightPoint5')}</li>
                </ul>
                
                <h2 className="mt-8 mb-4">{translate('privacy.changesTitle')}</h2>
                <p className="mb-6">{translate('privacy.changesText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('privacy.contactTitle')}</h2>
                <p className="mb-6">{translate('privacy.contactText')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
