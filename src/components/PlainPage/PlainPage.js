import React, {useState, Suspense} from 'react';
import FooterNav from '../FooterNav';

const PlainPage = ({
  Content,
  contentsURL,
  prevPage,
  nextPage
}) => {
  const [helpVisible, setHelpVisible] = useState(false);
  return (
    <div className="slide-container without-visualization">
      <section>
        <div>
          <p>
            <button className={helpVisible ? 'is-active': ''} onClick={() => setHelpVisible(!helpVisible)}>
              Comment modifier cette page ?
            </button>
          </p>
          <ol className={`edit-help ${helpVisible ? 'is-active' : ''}`}>
            <li>
              Préalablement se logger dans github si le répertoire est privé
            </li>
            <li>
              Se rendre sur <a target="blank" href={contentsURL}>cette page du répertoire github</a>
            </li>
            <li>
              Cliquer sur le crayon en haut à droite des contenus (il affiche "edit" au survol)
            </li>
            <li>
              Faire les modifications puis cliquer sur "Commit changes" en bas de la page
            </li>
            <li>
              Attendre 2 minutes puis recharger la page pour voir la version à jour de la page
            </li>
          </ol>
        </div>
        <Suspense fallback={<div>Chargement</div>}>
          <Content />
        </Suspense>
        <FooterNav prevPage={prevPage} nextPage={nextPage} />
      </section>
      <aside>
      </aside>
  </div>
  )
}

export default PlainPage;