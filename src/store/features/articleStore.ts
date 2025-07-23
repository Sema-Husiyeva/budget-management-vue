import { defineStore } from 'pinia'
import { ref } from 'vue'

interface IArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

export const useArticleStore = defineStore('article', () => {
  const articles = ref<IArticle[]>([])

  const fetchArticles = async () => {
    try {
      const res = await fetch(
        'https://newsapi.org/v2/everything?' +
          new URLSearchParams({
            q: 'budget OR finance OR saving money',
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: '48'
          }),
        {
          headers: {
            'X-Api-Key': 'fd913d6b55b34d5e8b2f5ea455097b30'
          }
        }
      )

      const data = await res.json()
      console.log('Fetched articles:', data.articles)

      articles.value = data.articles.map((item: any) => ({
        id: `${item.title.toLowerCase().replace(/\s+/g, '-')}-${item.publishedAt}`,
        title: item.title,
        description: item.description,
        url: item.url,
        urlToImage: item.urlToImage,
        publishedAt: item.publishedAt
      }))
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  }


  return {
    articles,
    fetchArticles,
  }
})