import { ChildImageSharp } from './SharpImage.interface';

export interface PostQueryData {
  pageContext: {
    next: {
      frontmatter: {
        path: string;
        title: string;
        subtitle?: string;
        date: string;
        image?: ChildImageSharp;
      };
    };
    frontmatter: {
      path: string;
      title: string;
      subtitle?: string;
      date: string;
      image?: ChildImageSharp;
    };
  };
}
