import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Footer() {
  const {siteConfig} = useDocusaurusContext();

  const {footer} = siteConfig;
  if (!footer) {
    return null;
  }
  const {copyright, links = [], logo = {}} = footer;

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': footer.style === 'dark',
      })}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
      }}>
      {/* Decorative elements */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at bottom left, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      
      <div className="container">
        <div className="row">
          {links.map((linkItem, i) => (
            <div key={i} className="col footer__col">
              {linkItem.title && (
                <h3 className="footer__title">{linkItem.title}</h3>
              )}
              <ul className="footer__items">
                {linkItem.items.map((item, j) => (
                  <li key={j} className="footer__item">
                    {item.html ? (
                      <div
                        className="footer__link-item"
                        dangerouslySetInnerHTML={{
                          __html: item.html,
                        }}
                      />
                    ) : (
                      <Link
                        className="footer__link-item"
                        {...item}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {(logo || copyright) && (
            <div className="col footer__col">
              {logo && logo.src && (
                <div className="footer__logo">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              )}
              {copyright && (
                <div 
                  className="footer__copyright"
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginTop: '1rem',
                    fontSize: '0.875rem',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: copyright,
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;