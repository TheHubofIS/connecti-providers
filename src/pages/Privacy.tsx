
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {translate('privacy.title')}
              </h1>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead">{translate('privacy.lastUpdated')}: 01/06/2023</p>
                
                <h2>{translate('privacy.introTitle')}</h2>
                <p>{translate('privacy.introText')}</p>
                
                <h2>{translate('privacy.dataCollectionTitle')}</h2>
                <p>{translate('privacy.dataCollectionText')}</p>
                <ul>
                  <li>{translate('privacy.dataPoint1')}</li>
                  <li>{translate('privacy.dataPoint2')}</li>
                  <li>{translate('privacy.dataPoint3')}</li>
                  <li>{translate('privacy.dataPoint4')}</li>
                  <li>{translate('privacy.dataPoint5')}</li>
                </ul>
                
                <h2>{translate('privacy.dataUseTitle')}</h2>
                <p>{translate('privacy.dataUseText')}</p>
                <ul>
                  <li>{translate('privacy.usePoint1')}</li>
                  <li>{translate('privacy.usePoint2')}</li>
                  <li>{translate('privacy.usePoint3')}</li>
                  <li>{translate('privacy.usePoint4')}</li>
                </ul>
                
                <h2>{translate('privacy.cookiesTitle')}</h2>
                <p>{translate('privacy.cookiesText')}</p>
                
                <h2>{translate('privacy.securityTitle')}</h2>
                <p>{translate('privacy.securityText')}</p>
                
                <h2>{translate('privacy.thirdPartiesTitle')}</h2>
                <p>{translate('privacy.thirdPartiesText')}</p>
                
                <h2>{translate('privacy.rightsTitle')}</h2>
                <p>{translate('privacy.rightsText')}</p>
                <ul>
                  <li>{translate('privacy.rightPoint1')}</li>
                  <li>{translate('privacy.rightPoint2')}</li>
                  <li>{translate('privacy.rightPoint3')}</li>
                  <li>{translate('privacy.rightPoint4')}</li>
                  <li>{translate('privacy.rightPoint5')}</li>
                </ul>
                
                <h2>{translate('privacy.changesTitle')}</h2>
                <p>{translate('privacy.changesText')}</p>
                
                <h2>{translate('privacy.contactTitle')}</h2>
                <p>{translate('privacy.contactText')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Privacy;
