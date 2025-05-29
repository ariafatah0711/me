// import React, { useState, useEffect, useRef } from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import styled from 'styled-components';
// import { srConfig } from '@config';
// import sr from '@utils/sr';
// import { Icon, IconCert } from '@components/icons';
// import { usePrefersReducedMotion } from '@hooks';

// const StyledCertificatesSection = styled.section`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 80px 20px;

//   h2 {
//     font-size: clamp(24px, 5vw, var(--fz-heading));
//     margin-bottom: 20px;
//     text-align: center;
//   }

//   .certs-grid {
//     ${({ theme }) => theme.mixins.resetList};
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//     gap: 30px;
//     margin-top: 40px;
//     width: 100%;
//     max-width: 1200px;
//   }

//   .more-button {
//     ${({ theme }) => theme.mixins.button};
//     margin: 60px auto 0;
//     padding: 12px 24px;
//     font-size: var(--fz-sm);
//     background-color: var(--green);
//     color: var(--lightest-navy);
//     border-radius: var(--border-radius);
//     transition: var(--transition);

//     &:hover {
//       background-color: var(--lightest-navy);
//       color: var(--green);
//       border: 1px solid var(--green);
//     }
//   }
// `;

// const StyledCertificate = styled.li`
//   position: relative;
//   transition: var(--transition);
//   height: 100%;

//   .cert-inner {
//     ${({ theme }) => theme.mixins.boxShadow};
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     height: 100%;
//     padding: 1.5rem;
//     border-radius: var(--border-radius);
//     background-color: var(--navy);
//     transition: var(--transition);

//     &:hover {
//       transform: translateY(-5px);
//       background-color: var(--light-navy);
//     }
//   }

//   .cert-header {
//     margin-bottom: 1rem;
//     .title {
//       padding: 0 10px;
//       font-size: var(--fz-lg);
//       font-weight: bold;
//       color: var(--lightest-slate);
//     }
//     .issuer {
//       font-size: var(--fz-sm);
//       color: var(--slate);
//     }
//   }

//   .cert-description {
//     font-size: var(--fz-sm);
//     color: var(--light-slate);
//     margin-bottom: 1rem;
//   }

//   .cert-tech-list {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px;
//     font-size: var(--fz-xxs);
//     color: var(--green);
//     margin-top: 1rem;
//   }

//   .cert-logo {
//       float: left;
//       svg {
//         width: 25px;
//         height: 25px;
//       }
//     }
//   }

//   .cert-link {
//     position: absolute;
//     bottom: 12px;
//     right: 12px;

//     a {
//       ${({ theme }) => theme.mixins.flexCenter};
//       padding: 6px;

//       svg {
//         width: 20px;
//         height: 20px;
//         color: var(--green);
//       }
//     }
//   }
// `;

// const Certificates = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       certificates: allMarkdownRemark(
//         filter: {
//           fileAbsolutePath: { regex: "/content/certificates/" }
//           frontmatter: { showInCertificates: { ne: false } }
//         }
//         sort: { fields: [frontmatter___date], order: DESC }
//       ) {
//         edges {
//           node {
//             frontmatter {
//               title
//               issuer
//               certificateUrl
//               certificatePreview {
//                 publicURL
//               }
//               tech
//             }
//             html
//           }
//         }
//       }
//     }
//   `);

//   const [showMore, setShowMore] = useState(false);
//   const revealTitle = useRef(null);
//   const revealCerts = useRef([]);
//   const prefersReducedMotion = usePrefersReducedMotion();

//   useEffect(() => {
//     if (prefersReducedMotion) return;
//     sr.reveal(revealTitle.current, srConfig());
//     revealCerts.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
//   }, []);

//   const GRID_LIMIT = 6;
//   const certs = data.certificates.edges.filter(({ node }) => node);
//   const certsToShow = showMore ? certs : certs.slice(0, GRID_LIMIT);

//   return (
//     <StyledCertificatesSection>
//       <h2 ref={revealTitle}>My Certificates</h2>
//       <ul className="certs-grid">
//         <TransitionGroup component={null}>
//           {certsToShow.map(({ node }, i) => {
//             const { title, issuer, certificateUrl, certificatePreview, tech } = node.frontmatter;
//             return (
//               <CSSTransition key={i} classNames="fadeup" timeout={300} exit={false}>
//                 <StyledCertificate ref={el => (revealCerts.current[i] = el)}>
//                   <div className="cert-inner">
//                     <div className="cert-header">
//                       <div class="cert-logo">
//                         <IconCert />
//                       </div>
//                       <div className="title">{title}</div>
//                       {/* <div className="issuer">{issuer}</div> */}
//                     </div>
//                     {/* <div
//                       className="cert-description"
//                       dangerouslySetInnerHTML={{ __html: node.html }}
//                     /> */}
//                     {/* {tech && (
//                       <ul className="cert-tech-list">
//                         {tech.map((t, idx) => (
//                           <li key={idx}>{t}</li>
//                         ))}
//                       </ul>
//                     )} */}
//                     {certificatePreview && (
//                       <div className="cert-preview" style={{ marginBottom: '1rem' }}>
//                         {/* <img
//                           src={certificatePreview}
//                           alt={`Preview of ${title}`}
//                           style={{ width: '100%', borderRadius: '5px' }}
//                         /> */}
//                         <a
//                           href={certificatePreview}
//                           className="cert-btn"
//                           target="_blank"
//                           rel="noreferrer">
//                           {/* <span>View Certificate</span> */}
//                           <Icon name="External" />
//                         </a>
//                       </div>
//                     )}

//                     {certificateUrl && (
//                       <div className="cert-link">
//                         <a
//                           href={certificateUrl}
//                           className="cert-btn"
//                           target="_blank"
//                           rel="noreferrer">
//                           {/* <span>View Certificate</span> */}
//                           <Icon name="External" />
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 </StyledCertificate>
//               </CSSTransition>
//             );
//           })}
//         </TransitionGroup>
//       </ul>
//       {certs.length > GRID_LIMIT && (
//         <button className="more-button" onClick={() => setShowMore(!showMore)}>
//           Show {showMore ? 'Less' : 'More'}
//         </button>
//       )}
//     </StyledCertificatesSection>
//   );
// };

// export default Certificates;

import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon, IconCert } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledCertificatesSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
    margin-bottom: 20px;
    text-align: center;
  }

  .certs-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 40px;
    width: 100%;
    max-width: 1200px;
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 60px auto 0;
    padding: 12px 24px;
    font-size: var(--fz-sm);
    background-color: var(--green);
    color: var(--lightest-navy);
    border-radius: var(--border-radius);
    transition: var(--transition);

    &:hover {
      background-color: var(--lightest-navy);
      color: var(--green);
      border: 1px solid var(--green);
    }
  }
`;

const StyledCertificate = styled.li`
  position: relative;
  transition: var(--transition);
  height: 100%;

  .cert-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1.5rem;
    border-radius: var(--border-radius);
    background-color: var(--navy);
    transition: var(--transition);

    &:hover {
      transform: translateY(-5px);
      background-color: var(--light-navy);
    }
  }

  .cert-header {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;

    .icon {
      flex-shrink: 0;
      width: 40px; // ukuran icon
      height: 40px;
    }

    .title {
      display: flex;
      flex-direction: column;
      width: 100%;

      .main-title {
        font-size: var(--fz-lg);
        font-weight: bold;
        color: var(--lightest-slate);
      }

      .description {
        font-size: var(--fz-sm);
        color: var(--light-slate);
        line-height: 1.4;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%; // batasi panjangnya
      }
    }
  }

  .cert-link {
    position: absolute;
    bottom: 12px;
    right: 12px;

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 6px;

      svg {
        width: 20px;
        height: 20px;
        color: var(--green);
      }
    }
  }
`;

const StyledModal = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {
    position: relative;
    background: var(--navy);
    border-radius: var(--border-radius);
    width: 90%;
    max-width: 800px;
    height: 80vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    color: var(--green);
    font-weight: bold;
    font-size: var(--fz-lg);
    margin-bottom: 10px;
  }

  .modal-body {
    flex: 1;
    overflow: hidden;

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  .close-button {
    background: none;
    border: none;
    color: var(--green);
    font-size: 24px;
    cursor: pointer;
  }
`;

const Certificates = () => {
  const data = useStaticQuery(graphql`
    query {
      certificates: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/certificates/" }
          frontmatter: { showInCertificates: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              description
              issuer
              certificateUrl
              certificatePreview {
                publicURL
              }
              tech
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPDF, setModalPDF] = useState(null);

  const revealTitle = useRef(null);
  const revealCerts = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    sr.reveal(revealTitle.current, srConfig());
    revealCerts.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const certs = data.certificates.edges.filter(({ node }) => node);
  const certsToShow = showMore ? certs : certs.slice(0, GRID_LIMIT);

  const openModal = url => {
    setModalPDF(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalPDF(null);
  };

  return (
    <StyledCertificatesSection>
      <h2 ref={revealTitle}>My Certificates</h2>
      <ul className="certs-grid">
        <TransitionGroup component={null}>
          {certsToShow.map(({ node }, i) => {
            const { title, certificateUrl, certificatePreview, description } = node.frontmatter;
            const previewUrl = certificatePreview?.publicURL;

            return (
              <CSSTransition key={i} classNames="fadeup" timeout={300} exit={false}>
                <StyledCertificate
                  ref={el => (revealCerts.current[i] = el)}
                  onClick={() => previewUrl && openModal(previewUrl)}
                  className={previewUrl ? 'clickable' : ''}>
                  <div className="cert-inner">
                    <div className="cert-header">
                      {/* <img className="icon" src={TechIcon} alt="certificate icon" /> */}

                      <div className="title">
                        <span className="main-title">{title}</span>
                        <span className="description">{description}</span>
                      </div>
                    </div>

                    {certificateUrl && (
                      <div className="cert-link">
                        <a
                          href={certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={e => e.stopPropagation()} // biar gak trigger modal
                        >
                          <Icon name="External" />
                        </a>
                      </div>
                    )}
                  </div>
                </StyledCertificate>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ul>

      {certs.length > GRID_LIMIT && (
        <button className="more-button" onClick={() => setShowMore(!showMore)}>
          Show {showMore ? 'Less' : 'More'}
        </button>
      )}

      {modalOpen && modalPDF && (
        <StyledModal onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span>Certificate Preview</span>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <iframe src={modalPDF} title="Certificate PDF Preview" />
            </div>
          </div>
        </StyledModal>
      )}
    </StyledCertificatesSection>
  );
};

export default Certificates;
