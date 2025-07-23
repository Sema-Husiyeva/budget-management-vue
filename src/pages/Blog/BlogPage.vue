<template>
    <the-banner :bannerImg="bannerImg" bannerTitle="Blog" bannerDescription="Discover insights, tips, and stories that inspire. Our blog brings you the latest updates and practical advice to manage your finances better. Learn from experts and real-life experiences. Stay informed, stay empowered."></the-banner>

    <div class="blogs-section">
      <div v-if="isLoading">Yüklənir...</div>
    <div
      v-else
      v-for="article in paginatedArticles"
      :key="article.id"
      @click="goToDetail(article.id)"
      class="blogs-section-card"
     
    >
      <router-link :to="`/blog/${article.id}`">
        <img
          class="blogs-section-card-img"
          :src="article.urlToImage || newsImg"
          :alt="article.title"
          @error="(e: any) => {const target = e.currentTarget as HTMLImageElement; target.onerror = null; target.src = newsImg;}"
        />
      </router-link>
      <p class="blogs-section-card-date">
        {{ new Date(article.publishedAt).toLocaleDateString('az-AZ') }}
      </p>
      <h3 class="blogs-section-card-title">{{ article.title }}</h3>
      <p class="blogs-section-card-desc">{{ article.description }}</p>
    </div>

    <div class="blogs-section-pagination">
      <button @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1">
        &lt;
      </button>
      <template v-for="(page, idx) in paginationItems" :key="`page-${idx}`">
        <span v-if="page === '...'">...</span>
        <button
          v-else
          :class="{ active: currentPage === page }"
          @click="handlePageChange(Number(page))"
        >
          {{ page }}
        </button>
      </template>
      <button @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages">
        &gt;
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import bannerImg from '@/assets/images/banner-img-blog.png';
import newsImg from '@/assets/images/news.jpeg';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useArticleStore } from '@/store/features/articleStore'

interface IArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const router = useRouter();
const articleStore = useArticleStore()
const articles = articleStore.articles
const currentPage = ref(1);
const articlesPerPage = 6;
const visibleCount = ref(6);
const isLoading = ref(true);

onMounted(async () => {
  if (!articleStore.articles.length) {
    await articleStore.fetchArticles()
  }
  isLoading.value = false
})

function goToDetail(id: string) {
  router.push({ name: 'BlogDetail', params: { id } })
}

const uniqueArticles = computed(() => {
  const seen = new Set();
  return articleStore.articles.filter((article: IArticle) => {
    const key = article.title + article.publishedAt;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
});

const totalPages = computed(() => Math.ceil(uniqueArticles.value.length / articlesPerPage));
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * articlesPerPage;
  return uniqueArticles.value.slice(start, start + articlesPerPage);
});

const visibleArticles = computed(() => uniqueArticles.value.slice(0, visibleCount.value));

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};


const getPaginationRange = (current: number, total: number): (number | string)[] => {
  const delta = 1;
  const range: (number | string)[] = [1];

  if (current - delta > 2) range.push('...');

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i);
  }

  if (current + delta < total - 1) range.push('...');
  if (total > 1) range.push(total);

  return range;
};

const paginationItems = computed(() => getPaginationRange(currentPage.value, totalPages.value));
</script>


<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.blogs-section {
    @include flex(center, center, 50px, row, wrap);
    padding: 50px 100px;
    background-color: $main-bg-color;

    &-card {
        @include flex(space-between, flex-start, 20px, column);
        width: 100%;
        max-width: 30%;
        overflow: hidden;
        min-height: 100%;
        height: 500px;
        &-img {
            width: 100%;
            height: 240px;
            object-fit: cover;
            border-radius: 10px;
            transition: all 0.2s;
            &:hover {
                transform: scale(1.2);
            }
        }
        &-date {
            color: $second-font-color;
            font-size: 14px;
        }
        &-title {
            color: $first-font-color;
        }
        &-desc {
            flex-grow: 1;
            color: $third-font-color;
        }

        &-link {
            margin-top: auto;
        }
       
    }

    &-pagination{
        @include flex(center, normal, 6px);
        margin-top: 24px;

        & button, & .dots {
            padding: 8px 12px;
            border: 1px solid #ccc;
            background-color: $white-color;
            color: $second-font-color;
            cursor: pointer;
            border-radius: 6px;
            min-width: 40px;
            transition: 0.3s;
            font-weight: 500;
        }

        & .dots {
            pointer-events: none;
            color: $second-font-color;
        }
        & button:hover:not(.active):not(:disabled) {
            background-color: #f1f1f1;
        }
        & button:disabled {
            opacity: 0.5;
            cursor: default;
        }   
        & button.active {
            border: 2px solid $main-color;
            color: $main-color;
            font-weight: bold;
        }
    }   
}
</style>