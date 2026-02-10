import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/utils/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_CONFIG.domain}`

    const routes = [
        '',
        '/about/story',
        '/about/mission',
        '/about/team',
        '/admissions/process',
        '/admissions/requirements',
        '/admissions/fees',
        '/programs/curriculum',
        '/programs/grades',
        '/programs/activities',
        '/news',
        '/contact',
        '/apply',
        '/privacy',
        '/terms',
    ]

    return routes.map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'yearly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
    }))
}
