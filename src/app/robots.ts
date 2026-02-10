import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/utils/constants'

export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_CONFIG.domain}`

    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/public/lgpa/'],
                disallow: [
                    '/admin/',
                    '/config/',
                    '/scripts/',
                    '/private/',
                    '/api/',
                    '/temp/',
                    '/drafts/',
                    '/*.php$',
                    '/*.sql$',
                    '/*.log$',
                ],
                // @ts-ignore - crawlDelay is not strictly typed in all Next.js versions but valid in robots.txt
                crawlDelay: 5,
            },
            {
                userAgent: ['GPTBot', 'CCBot'],
                disallow: ['/'],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    }
}
