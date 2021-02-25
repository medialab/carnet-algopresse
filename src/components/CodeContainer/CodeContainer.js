import React, {useState} from 'react';

const CodeContainer = ({
  code
}) => {
  const [codeIsVisible, setCodeIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = e => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }
  return (
    <div className="CodeContainer">
      <pre className={codeIsVisible ? 'is-active': ''}>
        <code>
          {code}
        </code>
      </pre>
      <div className="copy-container">
      <button
          onClick={() => setCodeIsVisible(!codeIsVisible)}
        >
          {codeIsVisible ? 'Cacher le code de la vue' : 'Voir le code de la vue'}
        </button>
        <button
          className={copied ? 'is-active': ''}
          onClick={handleCopy}
        >
          {copied ? 'Copié dans le presse-papier !' : 'Copier le code de la vue'}
        </button>
      </div>
      
      
    </div>
  )
}

export default CodeContainer;