import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { createPinia, setActivePinia, Pinia } from 'pinia'
import BlogPage from '@/pages/Blog/BlogPage.vue'
import blogDetail from '@/pages/blogDetail/blogDetail.vue'
import { useArticleStore } from '@/store/features/articleStore'


vi.mock('@/components/common/TheBanner.vue', () => ({
  default: {
    name: 'TheBanner',
    props: ['bannerImg', 'bannerTitle', 'bannerDescription'],
    template: `
      <div data-testid="banner" class="banner">
        <h1>{{ bannerTitle }}</h1>
        <p>{{ bannerDescription }}</p>
      </div>
    `
  }
}))

vi.mock('@/assets/images/banner-img-blog.png', () => ({
  default: 'banner-img-blog.png'
}))
vi.mock('@/assets/images/news.jpeg', () => ({
  default: 'news.jpeg'
}))
vi.mock('@/assets/images/404.png', () => ({
  default: '404.png'
}))

interface IArticle {
  id: string
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
}

const mockArticles: IArticle[] = [
  {
    id: '1',
    title: 'Understanding Vue 3 Composition API',
    description: 'A comprehensive guide to Vue 3 Composition API and its benefits.',
    url: 'https://example.com/vue3-composition',
    urlToImage: 'https://example.com/vue3.jpg',
    publishedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'JavaScript Testing Best Practices',
    description: 'Learn the best practices for testing JavaScript applications.',
    url: 'https://example.com/js-testing',
    urlToImage: 'https://example.com/js-testing.jpg',
    publishedAt: '2024-01-16T11:30:00Z'
  },
  {
    id: '3',
    title: 'TypeScript Advanced Types',
    description: 'Deep dive into TypeScript advanced type features.',
    url: 'https://example.com/ts-advanced',
    urlToImage: null, 
    publishedAt: '2024-01-17T14:15:00Z'
  },
  {
    id: '4',
    title: 'Web Performance Optimization',
    description: 'Techniques to improve your web application performance.',
    url: 'https://example.com/web-performance',
    urlToImage: 'https://example.com/performance.jpg',
    publishedAt: '2024-01-18T09:45:00Z'
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox',
    description: 'When to use CSS Grid vs Flexbox for your layouts.',
    url: 'https://example.com/css-grid-flexbox',
    urlToImage: 'https://example.com/css-layout.jpg',
    publishedAt: '2024-01-19T16:20:00Z'
  }
]


function createTestRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: { template: '<div>Home</div>' }
      },
      {
        path: '/blog',
        name: 'Blog',
        component: BlogPage
      },
      {
        path: '/blog/:id',
        name: 'BlogDetail',
        component: blogDetail
      }
    ]
  })
}

describe('Blog Integration Tests', () => {
  let pinia: Pinia
  let router: Router
  let articleStore: any

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    router = createTestRouter()
    articleStore = useArticleStore()
    
    articleStore.fetchArticles = vi.fn().mockResolvedValue(mockArticles)
    articleStore.articles = mockArticles
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Navigation Flow: Blog List → Blog Detail', () => {
    it('should navigate from blog list to blog detail when clicking on an article', async () => {
      articleStore.articles = mockArticles

      await router.push('/blog')
      await router.isReady()

      const blogWrapper = mount(BlogPage, {
        global: {
          plugins: [pinia, router]
        }
      })

      await blogWrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(blogWrapper.findAll('.blogs-section-card')).toHaveLength(5)
      expect(blogWrapper.text()).toContain('Understanding Vue 3 Composition API')

      blogWrapper.unmount()

      await router.push('/blog/1')
      await router.isReady()

      const detailWrapper = mount(blogDetail, {
        global: {
          plugins: [pinia, router]
        }
      })

      await detailWrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 10))

      const article = articleStore.articles.find((a: IArticle) => a.id === '1')
      expect(article).toBeDefined()
      expect(article?.title).toBe('Understanding Vue 3 Composition API')

      const articleSection = detailWrapper.find('.blog-detail-section')
      const notFoundBanner = detailWrapper.find('[data-testid="banner"]')

      if (articleSection.exists()) {
        expect(detailWrapper.text()).toContain('Understanding Vue 3 Composition API')
        expect(detailWrapper.text()).toContain('A comprehensive guide to Vue 3 Composition API and its benefits.')
      } else if (notFoundBanner.exists() && notFoundBanner.text().includes('404')) {
        expect(detailWrapper.text()).toContain('Understanding Vue 3 Composition API')
      }

      detailWrapper.unmount()
    })

    it('should handle URL encoding/decoding correctly', async () => {
      const articleWithSpecialChars = {
        id: 'special-chars-&-symbols',
        title: 'Article with Special Characters & Symbols',
        description: 'Testing URL encoding/decoding',
        url: 'https://example.com/special',
        urlToImage: 'https://example.com/special.jpg',
        publishedAt: '2024-01-20T10:00:00Z'
      }

      articleStore.articles = [articleWithSpecialChars]

      const encodedId = encodeURIComponent(articleWithSpecialChars.id)
      await router.push(`/blog/${encodedId}`)

      const detailWrapper = mount(blogDetail, {
        global: {
          plugins: [pinia, router]
        }
      })

      await detailWrapper.vm.$nextTick()

      expect(detailWrapper.text()).toContain('Article with Special Characters & Symbols')
      
      detailWrapper.unmount()
    })
  })

  describe('Data Consistency Between Components', () => {
    it('should maintain consistent article data across components', async () => {
      const blogWrapper = mount(BlogPage, {
        global: {
          plugins: [pinia, router]
        }
      })

      await router.push('/blog/2')
      const detailWrapper = mount(blogDetail, {
        global: {
          plugins: [pinia, router]
        }
      })

      await Promise.all([
        blogWrapper.vm.$nextTick(),
        detailWrapper.vm.$nextTick()
      ])

      const blogArticleTitles = blogWrapper.findAll('.blogs-section-card-title')
      const detailTitle = detailWrapper.find('.blog-detail-section-info-title')

      expect(blogArticleTitles.some(title => 
        title.text() === 'JavaScript Testing Best Practices'
      )).toBe(true)
      expect(detailTitle.text()).toBe('JavaScript Testing Best Practices')

      blogWrapper.unmount()
      detailWrapper.unmount()
    })
  })

  describe('Performance and Loading States', () => {
    it('should handle loading states properly during navigation', async () => {
      articleStore.fetchArticles = vi.fn().mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(mockArticles), 100))
      )
      articleStore.articles = []

      const blogWrapper = mount(BlogPage, {
        global: {
          plugins: [pinia, router]
        }
      })

      expect(blogWrapper.text()).toContain('Yüklənir...')

      await new Promise(resolve => setTimeout(resolve, 150))
      await blogWrapper.vm.$nextTick()

      expect(blogWrapper.text()).not.toContain('Yüklənir...')
      expect(articleStore.fetchArticles).toHaveBeenCalledOnce()

      blogWrapper.unmount()
    })

    it('should not fetch articles multiple times unnecessarily', async () => {
      const fetchSpy = vi.fn().mockResolvedValue(mockArticles)
      articleStore.fetchArticles = fetchSpy
      articleStore.articles = mockArticles 

      const blogWrapper = mount(BlogPage, {
        global: {
          plugins: [pinia, router]
        }
      })

      await blogWrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(fetchSpy).not.toHaveBeenCalled()

      blogWrapper.unmount()

      const detailWrapper = mount(blogDetail, {
        global: {
          plugins: [pinia, router]
        }
      })

      await detailWrapper.vm.$nextTick()

      expect(fetchSpy).not.toHaveBeenCalled()

      detailWrapper.unmount()
    })
  })
})