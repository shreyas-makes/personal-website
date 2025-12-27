type OgMetaItem = {
  label: string;
  value: string;
};

type OgTemplateProps = {
  title: string;
  description: string;
  badge: string;
  meta: OgMetaItem[];
  backgroundImageUrl?: string;
  logoText?: string;
  siteText?: string;
  align?: 'left' | 'center';
  avatarUrl?: string;
};

const pickTitleSize = (title: string) => {
  if (title.length > 70) return '54px';
  if (title.length > 48) return '64px';
  return '72px';
};

export const clampText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '...';
};

export const createOgTemplate = ({
  title,
  description,
  badge,
  meta,
  backgroundImageUrl,
  logoText = 'SHREYAS PRAKASH',
  siteText = 'shreyasprakash.com',
  align = 'left',
  avatarUrl
}: OgTemplateProps) => {
  const isCentered = align === 'center';
  const baseFontFamily = 'Inter, system-ui, sans-serif';
  const safeText = (value: unknown) =>
    value === undefined || value === null ? '' : String(value);
  const backgroundLayer = backgroundImageUrl
    ? {
        type: 'img',
        props: {
          src: backgroundImageUrl,
          width: 1200,
          height: 630,
          style: {
            position: 'absolute',
            inset: 0,
            width: '1200px',
            height: '630px',
            objectFit: 'cover'
          }
        }
      }
    : undefined;
  const mainTextBlock = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
        maxWidth: isCentered ? '900px' : '760px',
        textAlign: isCentered ? 'center' : 'left'
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              fontFamily: baseFontFamily,
              fontSize: pickTitleSize(title),
              lineHeight: '1.05',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: '#f8fafc',
              textAlign: isCentered ? 'center' : 'left'
            },
            children: safeText(title)
          }
        },
        {
          type: 'div',
          props: {
            style: {
              fontFamily: baseFontFamily,
              fontSize: '24px',
              color: 'rgba(255,255,255,0.78)',
              lineHeight: '1.5',
              maxWidth: isCentered ? '740px' : '680px',
              textAlign: isCentered ? 'center' : 'left'
            },
            children: safeText(description)
          }
        }
      ]
    }
  };
  const avatarBlock = avatarUrl
    ? {
        type: 'div',
        props: {
          style: {
            width: '180px',
            height: '180px',
            borderRadius: '999px',
            border: '2px solid rgba(255,255,255,0.55)',
            padding: '6px',
            background: 'rgba(5,8,7,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          children: [
            {
              type: 'img',
              props: {
                src: avatarUrl,
                width: 168,
                height: 168,
                style: {
                  borderRadius: '999px',
                  objectFit: 'cover'
                }
              }
            }
          ]
        }
      }
    : undefined;
  const mainContentChildren = avatarBlock ? [mainTextBlock, avatarBlock] : [mainTextBlock];

  return {
    type: 'div',
    props: {
      style: {
        height: '630px',
        width: '1200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#050707',
        padding: '72px',
        fontFamily: baseFontFamily,
        position: 'relative',
        overflow: 'hidden'
      },
      children: [
        ...(backgroundLayer ? [backgroundLayer] : []),
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(3,6,5,0.2) 0%, rgba(4,7,6,0.55) 55%, rgba(2,4,3,0.85) 100%)'
            }
          }
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '-160px',
              right: '-120px',
              width: '520px',
              height: '520px',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)'
            }
          }
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: 0,
              top: '50%',
              width: '72px',
              height: '1px',
              background: 'rgba(255,255,255,0.7)'
            }
          }
        },
        {
          type: 'div',
          props: {
          style: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
              height: '100%'
            },
            children: [
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px'
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: '28px',
                              height: '28px',
                              border: '2px solid rgba(255,255,255,0.85)',
                              transform: 'rotate(45deg)'
                            }
                          }
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontFamily: baseFontFamily,
                              fontSize: '20px',
                              fontWeight: '700',
                              letterSpacing: '-0.04em',
                              color: '#f8fafc'
                            },
                            children: safeText(logoText)
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontFamily: baseFontFamily,
                        fontSize: '12px',
                        fontWeight: '700',
                        letterSpacing: '0.24em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.8)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        padding: '8px 18px',
                        borderRadius: '999px'
                      },
                      children: safeText(badge)
                    }
                  }
                ]
              }
            },
            {
              type: 'div',
              props: {
                style: {
                  maxWidth: '1040px',
                  display: 'flex',
                  flexDirection: isCentered ? 'column' : 'row',
                  alignItems: 'center',
                  justifyContent: isCentered ? 'center' : 'space-between',
                  gap: isCentered ? '22px' : '40px'
                },
                children: mainContentChildren
              }
            },
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: isCentered ? 'center' : 'space-between',
                  gap: isCentered ? '24px' : '0px'
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        gap: '36px'
                      },
                      children: meta.map(item => ({
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontFamily: baseFontFamily,
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  letterSpacing: '0.16em',
                                  textTransform: 'uppercase',
                                  color: 'rgba(255,255,255,0.65)'
                                },
                                children: safeText(item.label)
                              }
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontFamily: baseFontFamily,
                                  fontSize: '18px',
                                  fontWeight: '600',
                                  color: '#f8fafc'
                                },
                                children: safeText(item.value)
                              }
                            }
                          ]
                        }
                      }))
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontFamily: baseFontFamily,
                        fontSize: '14px',
                        fontWeight: '600',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.75)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        padding: '10px 16px',
                        borderRadius: '12px'
                      },
                      children: safeText(siteText)
                    }
                  }
                ]
              }
            }
          ]
        }
        }
      ]
    }
  };
};
