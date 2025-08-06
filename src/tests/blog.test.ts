import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import BlogPage from '@/pages/Blog/BlogPage.vue'; 
import { useArticleStore } from '@/store/features/articleStore';


const mockPush = vi.fn();
const mockRouter = {
  push: mockPush
};

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter
}));



describe('BlogPage Component', () => {
  let wrapper: VueWrapper<any>;
  let articleStore: any;

  const mockArticles = [
    {
      id: 'article-1-2025-01-15T10:00:00Z',
      title: 'Budget Planning Tips',
      description: 'Learn how to plan your budget effectively',
      url: 'https://example.com/article1',
      urlToImage: 'https://example.com/image1.jpg',
      publishedAt: '2025-01-15T10:00:00Z'
    },
    {
      id: 'article-2-2025-01-14T08:30:00Z',
      title: 'Finance Management',
      description: 'Best practices for managing your finances',
      url: 'https://example.com/article2',
      urlToImage: 'https://example.com/image2.jpg',
      publishedAt: '2025-01-14T08:30:00Z'
    },
    {
      id: 'article-3-2025-01-13T12:00:00Z',
      title: 'Saving Money Strategies',
      description: 'Effective strategies to save money',
      url: 'https://example.com/article3',
      urlToImage: 'https://example.com/image3.jpg',
      publishedAt: '2025-01-13T12:00:00Z'
    },
    {
      id: 'article-4-2025-01-12T14:00:00Z',
      title: 'Investment Basics',
      description: 'Getting started with investments',
      url: 'https://example.com/article4',
      urlToImage: 'https://example.com/image4.jpg',
      publishedAt: '2025-01-12T14:00:00Z'
    },
    {
      id: 'article-5-2025-01-11T16:00:00Z',
      title: 'Debt Management',
      description: 'How to manage your debt effectively',
      url: 'https://example.com/article5',
      urlToImage: 'https://example.com/image5.jpg',
      publishedAt: '2025-01-11T16:00:00Z'
    },
    {
      id: 'article-6-2025-01-10T18:00:00Z',
      title: 'Emergency Fund',
      description: 'Building your emergency fund',
      url: 'https://example.com/article6',
      urlToImage: 'https://example.com/image6.jpg',
      publishedAt: '2025-01-10T18:00:00Z'
    },
    {
      id: 'article-7-2025-01-09T20:00:00Z',
      title: 'Tax Planning',
      description: 'Smart tax planning strategies',
      url: 'https://example.com/article7',
      urlToImage: 'https://example.com/image7.jpg',
      publishedAt: '2025-01-09T20:00:00Z'
    }
  ];

  beforeEach(() => {
    setActivePinia(createPinia());
    articleStore = useArticleStore();
    mockPush.mockClear();
  });

  const createComponent = (articles = mockArticles) => {
    articleStore.articles = articles;
    articleStore.fetchArticles = vi.fn();

    return mount(BlogPage);
  };

  describe('Component rendering', () => {
    it('should show loading message initially', async () => {
      wrapper = createComponent([]);
      
      expect(wrapper.text()).toContain('Yüklənir...');
    });

    it('should render articles after loading', async () => {
      wrapper = createComponent();
      
      await wrapper.vm.$nextTick();
      wrapper.vm.isLoading = false;
      await wrapper.vm.$nextTick();
      
      const articleCards = wrapper.findAll('.blogs-section-card');
      expect(articleCards).toHaveLength(6); 
    });

    it('should display article information correctly', async () => {
      wrapper = createComponent();
      wrapper.vm.isLoading = false;
      await wrapper.vm.$nextTick();
      
      const firstCard = wrapper.find('.blogs-section-card');
      expect(firstCard.find('.blogs-section-card-title').text()).toBe('Budget Planning Tips');
      expect(firstCard.find('.blogs-section-card-desc').text()).toBe('Learn how to plan your budget effectively');
    });


    it('should navigate to article detail when card is clicked', async () => {
      wrapper = createComponent();
      wrapper.vm.isLoading = false;
      await wrapper.vm.$nextTick();
      
      const firstCard = wrapper.find('.blogs-section-card');
      await firstCard.trigger('click');
      
      expect(mockPush).toHaveBeenCalledWith({ 
        name: 'BlogDetail', 
        params: { id: 'article-1-2025-01-15T10:00:00Z' } 
      });
    });
  });
});  