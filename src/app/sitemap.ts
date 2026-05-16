import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://inetztech.com';

  const routes = [
    '',
    '/about',
    '/apply',
    '/blog',
    '/contact',
    '/dashboard',
    '/login',
    '/programs',
    '/register',
    '/privacy',
    '/terms',
    '/refund',
    '/help',
    '/internships/mern-stack-chennai',
    '/internships/python-chennai',
    '/internships/java-chennai',
    '/internships/ai-ml-chennai',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
