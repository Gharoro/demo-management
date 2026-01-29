import integrationsBg from "../assets/integrations-bg.svg";
import zoom from "../assets/zoom.svg";
import zendesk from "../assets/zendesk.svg";
import evernote from "../assets/evernote.svg";
import google from "../assets/google.svg";
import dropbox from "../assets/dropbox.svg";
import mailchimp from "../assets/mailchimp.svg";
import slack from "../assets/slack.svg";
import trello from "../assets/trello.svg";
import salesforce from "../assets/salesforce.svg";
import shopify from "../assets/shopify.svg";

function Integration() {
  const topRowLogos = [
    { src: zoom, alt: "Zoom" },
    { src: zendesk, alt: "Zendesk" },
    { src: evernote, alt: "Evernote" },
    { src: google, alt: "Google" },
    { src: dropbox, alt: "Dropbox" },
    { src: shopify, alt: "Shopify" },
  ];

  const bottomRowLogos = [
    { src: mailchimp, alt: "Mailchimp" },
    { src: slack, alt: "Slack" },
    { src: trello, alt: "Trello" },
    { src: salesforce, alt: "Salesforce" },
  ];

  return (
    <section className="py-16 relative">
      <div className="hidden lg:block">
        <img
          src={integrationsBg}
          alt="Integrations background"
          className="w-full h-auto"
        />

        <div className="absolute inset-0">
          <div className="max-w-6xl mx-auto px-6 h-full relative">
            <div className="absolute top-[30%] left-[5%] w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
              <img src={zoom} alt="Zoom" className="w-10 h-10" />
            </div>
            <div className="absolute top-[25%] left-[18%] w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
              <img src={zendesk} alt="Zendesk" className="w-10 h-10" />
            </div>
            <div className="absolute top-[20%] left-[32%] w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
              <img src={evernote} alt="Evernote" className="w-8 h-8" />
            </div>
            <div className="absolute top-[22%] left-[45%] w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
              <img src={google} alt="Google" className="w-10 h-10" />
            </div>
            <div className="absolute top-[20%] right-[25%] w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center">
              <img src={dropbox} alt="Dropbox" className="w-8 h-8" />
            </div>
            <div className="absolute top-[28%] right-[5%] w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
              <img src={shopify} alt="Shopify" className="w-10 h-10" />
            </div>

            <div className="absolute top-[42%] left-[10%] w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
              <img src={mailchimp} alt="Mailchimp" className="w-8 h-8" />
            </div>
            <div className="absolute top-[38%] left-[40%] w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center">
              <img src={slack} alt="Slack" className="w-8 h-8" />
            </div>
            <div className="absolute top-[35%] right-[30%] w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center">
              <img src={trello} alt="Trello" className="w-8 h-8" />
            </div>
            <div className="absolute top-[40%] right-[12%] w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
              <img src={salesforce} alt="Salesforce" className="w-10 h-10" />
            </div>

            <div className="absolute top-[15%] left-[8%] w-2 h-2 bg-gray-800 rounded-full" />
            <div className="absolute top-[18%] left-[25%] w-1 h-1 bg-gray-700 rounded-full" />
            <div className="absolute top-[12%] left-[50%] w-2 h-2 bg-gray-800 rounded-full" />
            <div className="absolute top-[16%] right-[20%] w-1 h-1 bg-gray-700 rounded-full" />
            <div className="absolute top-[10%] right-[8%] w-2 h-2 bg-gray-800 rounded-full" />
            <div className="absolute top-[35%] left-[3%] w-1 h-1 bg-gray-700 rounded-full" />
            <div className="absolute top-[32%] left-[28%] w-2 h-2 bg-gray-800 rounded-full" />
            <div className="absolute top-[28%] right-[35%] w-1 h-1 bg-gray-700 rounded-full" />
            <div className="absolute top-[45%] right-[3%] w-2 h-2 bg-gray-800 rounded-full" />
            <div className="absolute top-[48%] left-[22%] w-1 h-1 bg-gray-700 rounded-full" />
            <div className="absolute top-[50%] right-[22%] w-2 h-2 bg-gray-800 rounded-full" />
            <div className="absolute top-[25%] left-[60%] w-1 h-1 bg-gray-700 rounded-full" />

            <div className="absolute top-[55%] left-0 right-0 text-center px-6">
              <h2 className="text-text text-3xl md:text-4xl font-bold mb-4">
                Integrate Top Work Tools
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                Create smooth workflow across multiple channels to boost
                productivity and drive collaboration among teams. Enjoy
                real-time insights on workflow performance and identify
                bottlenecks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden bg-gray-50 px-6">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {topRowLogos.map((logo) => (
            <div
              key={logo.alt}
              className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center"
            >
              <img src={logo.src} alt={logo.alt} className="w-8 h-8" />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {bottomRowLogos.map((logo) => (
            <div
              key={logo.alt}
              className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center"
            >
              <img src={logo.src} alt={logo.alt} className="w-8 h-8" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-text text-2xl font-bold mb-4">
            Integrate Top Work Tools
          </h2>
          <p className="text-text-light">
            Create smooth workflow across multiple channels to boost
            productivity and drive collaboration among teams. Enjoy real-time
            insights on workflow performance and identify bottlenecks.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Integration;
