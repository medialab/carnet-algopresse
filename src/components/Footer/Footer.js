import React, {useContext/*, useMemo, Suspense*/} from 'react';
import cx from 'classnames';
import { LanguageContext } from '../../contexts';

import Fr from '!babel-loader!mdx-loader!../../contents/fr/footer.mdx';
import En from '!babel-loader!mdx-loader!../../contents/en/footer.mdx';

const Footer = ({inBottom}) => {
  const {lang} = useContext(LanguageContext);
  // const Content = useMemo(() => {
  //   return  React.lazy(() => import(`!babel-loader!mdx-loader!../../contents/${lang}/footer.mdx`));
  // }, [lang])
  return (
    <footer className={cx("Footer", {'in-bottom': inBottom})}>
      {
        lang === 'fr' ? <Fr /> : <En />
      }
      {/* <Suspense fallback={() => <div>{lang === 'fr' ? 'Chargement' : 'Loading'}</div>}>
        <Content />
      </Suspense> */}
    </footer>
  )
}

export default Footer;