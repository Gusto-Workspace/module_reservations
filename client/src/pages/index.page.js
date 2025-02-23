import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// I18N
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function HomePage(props) {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    if (router.pathname === "/" || router.pathname === "/fr") {
      window.location.replace("https://www.modjoy-studio.com/food");
    } else {
      setRedirecting(false);
    }
  }, [router.pathname]);

  if (redirecting) {
    return null; // Empêche le rendu de la page
  }

  let title;
  let description;

  switch (i18n.language) {
    case "en":
      title = "";
      description = "";
      break;
    default:
      title = "";
      description = "";
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div>Hello World</div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index"])),
    },
  };
}
