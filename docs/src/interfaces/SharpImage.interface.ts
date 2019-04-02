export interface ChildImageSharp {
  id: string;
  childImageSharp: {
    fixed: {
      src: string;
      srcSet: string;
    };

    fluid: {
      src: string;
      srcSet: string;
    };
  };
}
