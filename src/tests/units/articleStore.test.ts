import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useArticleStore } from '@/store/features/articleStore'; 


const mockFetch = vi.fn();
global.fetch = mockFetch;


describe('articleStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should fetche articles successfully', async () => {
    const mockArticles = [
      {
        title: 'About Budget',
        description: 'How to save money.',
        url: 'https://test.com',
        urlToImage: 'https://test.com/image.jpg',
        publishedAt: '2025-01-01T00:00:00Z'
      }
    ]

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ articles: mockArticles })
    }) as any

    const store = useArticleStore()
    await store.fetchArticles()

    expect(store.articles.length).toBe(1)
    expect(store.articles[0].title).toBe('About Budget')
    expect(store.articles[0].id).toContain('about-budget')
  });

  it('should handle empty articles response', async () => {
       mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ articles: [] })
      });

      const store = useArticleStore();
      await store.fetchArticles();

      expect(store.articles).toEqual([]);
    });

    it('should handle articles with missing optional fields', async () => {
      const incompleteArticleResponse = {
        articles: [
          {
            title: 'Incomplete Article',
            description: null,
            url: 'https://example.com/incomplete',
            urlToImage: null,
            publishedAt: '2025-01-18T09:00:00Z'
          }
        ]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(incompleteArticleResponse)
      });

      const store = useArticleStore();
      await store.fetchArticles();

      expect(store.articles[0]).toEqual({
        id: 'incomplete-article-2025-01-18T09:00:00Z',
        title: 'Incomplete Article',
        description: null,
        url: 'https://example.com/incomplete',
        urlToImage: null,
        publishedAt: '2025-01-18T09:00:00Z'
      });
    });
})