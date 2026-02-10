import { MetadataRoute } from 'next'
import { APP_NAME, APP_DESCRIPTION } from '@/lib/utils/constants'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: APP_NAME,
        short_name: 'Little Gems',
        description: APP_DESCRIPTION,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ef4444', // Brand Red
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
