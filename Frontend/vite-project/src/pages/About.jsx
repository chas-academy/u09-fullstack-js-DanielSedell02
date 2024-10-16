import React, { lazy, Suspense, memo } from "react";
import { BoxReveal } from "../components/box-reveal";
import perfumeAboutImage from "../images/perfumeAbout.webp";
import grundareImage from "../images/grundare.webp";

const LetterPullupComponent = lazy(() => import("../components/letter-pullup"));

// eslint-disable-next-line react/display-name
const OptimizedImage = memo(
  ({ src, webpSrc, alt, className, loading = "lazy" }) => (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={src} type="image/jpeg" />
      <img src={src} alt={alt} className={className} loading={loading} />
    </picture>
  )
);

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        <Suspense fallback={<div>Laddar...</div>}>
          <LetterPullupComponent words="Om ScentSaving" />
        </Suspense>
      </h1>

      <div className="max-w-3xl mx-auto">
        <section className="mb-8">
          <OptimizedImage
            src={perfumeAboutImage}
            alt="Diverse collection of perfume bottles"
            className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
            loading="eager"
          />
          <p className="text-lg mb-4">
            Välkommen till ScentSaving - din destination för exklusiva dofter
            till överkomliga priser!
          </p>
        </section>

        <section className="mb-8">
          <BoxReveal>
            <h2 className="text-2xl font-semibold mb-4">Vår Historia</h2>
            <p className="mb-4">
              Idén till ScentSaving föddes ur en passion för parfymer och en
              insikt om en lucka på marknaden. Som parfymälskare hade jag länge
              drömt om att kunna prova exklusiva dofter utan att behöva betala
              fullpris för varje flaska. Samtidigt insåg jag att många har
              parfymer hemma som sällan används.
            </p>
            <p className="mb-4">
              Det var då jag fick idén: Varför inte skapa en plattform där
              parfymälskare kan köpa, sälja och byta partially använda
              lyxparfymer? Detta skulle inte bara göra det möjligt för fler att
              njuta av högkvalitativa dofter till en bråkdel av originalpriset,
              utan också minska överflödig konsumtion och främja en mer hållbar
              approach till skönhetsprodukter.
            </p>
          </BoxReveal>
        </section>

        <section className="mb-8">
          <BoxReveal>
            <OptimizedImage
              src={grundareImage}
              alt="Grundaren av ScentSaving"
              className="w-1/2 float-right ml-4 mb-4 rounded-lg shadow-md"
            />
            <h2 className="text-2xl font-semibold mb-4">Vår Mission</h2>
            <p className="mb-4">
              På ScentSaving tror vi att lyx ska vara tillgängligt för alla. Vår
              mission är att demokratisera världen av exklusiva parfymer genom
              att erbjuda en säker och pålitlig plattform för köp och
              försäljning av partially använda parfymer. Vi strävar efter att:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Göra lyxparfymer mer tillgängliga och överkomliga</li>
              <li>
                Minska avfall genom att ge nytt liv åt partially använda
                parfymer
              </li>
              <li>
                Skapa en community av parfymentusiaster som delar passion och
                kunskap
              </li>
              <li>
                Främja en mer hållbar och medveten konsumtion inom
                skönhetsindustrin
              </li>
            </ul>
          </BoxReveal>
        </section>

        <section>
          <BoxReveal>
            <h2 className="text-2xl font-semibold mb-4">Vår Garanti</h2>
            <p className="mb-4">
              Vi förstår att köp av begagnade parfymer kan väcka frågor om
              autenticitet och kvalitet. Därför har vi implementerat strikta
              rutiner för kvalitetskontroll och äkthetscertifiering. Varje
              parfym som säljs via vår plattform genomgår en noggrann inspektion
              för att säkerställa dess äkthet och skick.
            </p>
            <p>
              Med ScentSaving kan du tryggt utforska världen av lyxparfymer,
              hitta din signatur doft eller experimentera med nya noter - allt
              medan du sparar pengar och bidrar till en mer hållbar framtid.
            </p>
          </BoxReveal>
        </section>
      </div>
    </div>
  );
};

export default memo(About);
