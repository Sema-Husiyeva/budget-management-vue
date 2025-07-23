<template>
    <section class="blog-detail-section" v-if="article">
    <the-banner
      :bannerTitle="article.title"
      :bannerDescription="article.description"
      :bannerImg="article.urlToImage || newsImg"
      class="blog-detail-section-banner"
    />

    <div class="blog-detail-section-info">
      <h1 class="blog-detail-section-info-title">{{ article.title }}</h1>
      <img
        :src="article.urlToImage || newsImg"
        :alt="article.title"
        @error="onImgError"
        class="blog-detail-section-info-img"
      />
      <h2 class="blog-detail-section-info-desc">{{ article.description }}</h2>
      <p class="blog-detail-section-info-text">Lorem ipsum dolor sit amet...</p>


      <div class="blog-detail-section-info-next-articles">
        <h3 class="blog-detail-section-info-next-articles-title">What to read next</h3>
        <div class="blog-detail-section-info-next-articles-cards">
          <div
            v-for="item in nextArticles"
            :key="item.id"
            class="blog-detail-section-info-next-articles-card"
          >
            <router-link :to="`/blog/${encodeURIComponent(item.id)}`">
              <img
                :src="item.urlToImage || newsImg"
                @error="onImgError"
                :alt="item.title"
                class="blog-detail-section-info-next-articles-card-img"
              />
            </router-link>
            <p class="blog-detail-section-info-next-articles-card-date">
              {{ new Date(item.publishedAt).toLocaleDateString('az-AZ') }}
            </p>
            <h3 class="blog-detail-section-info-next-articles-card-title">{{ item.title }}</h3>
            <p class="blog-detail-section-info-next-articles-card-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <the-banner
    v-else
    bannerTitle="404 Error"
    bannerDescription="Page Not Found"
    :bannerImg="notFoundImg"
  />
</template>


<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/store/features/articleStore'
import newsImg from '@/assets/images/news.jpeg'
import notFoundImg from '@/assets/images/404.png'


const route = useRoute()
const articleStore = useArticleStore()

const id = computed(() => decodeURIComponent(route.params.id as string))

const article = computed(() =>
  articleStore.articles.find((a) => a.id === id.value)
)

const nextArticles = computed(() => {
  const others = articleStore.articles.filter((a) => a.id !== id.value)
  return shuffleArray(others).slice(0, 3)
})


function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

function onImgError(e: Event) {
  const target = e.target as HTMLImageElement
  target.onerror = null
  target.src = newsImg
}

onMounted(() => {
  if (!articleStore.articles.length) {
    articleStore.fetchArticles()
  }
})


</script>


<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.blog-detail-section {
    &-banner {
        ::v-deep img {
            width: 500px;
            height: 350px;
            border-radius: 10px;
        }
        ::v-deep h1 {
            width: 650px;
            font-size: 3rem
        }
    }
    &-info {
        @include flex(center, flex-start, 30px, column);
        padding: 50px 100px;
        background-color: $main-bg-color;

        &-title {
            color: $first-font-color;
            font-size: 3rem;
        }
        &-img {
            width: 1240px;
        }
        &-desc {
            font-size: 1.6rem;
            color: $first-font-color;
        }
        &-text {
            color: $third-font-color;
            font-size: 1.2rem;
            font-weight: 300;
        }

        &-next-articles {
            padding: 40px 0;
            &-title {
                font-size: 2rem;
                color: $second-font-color;
                margin-bottom: 40px
            }
            &-cards {
                @include flex(flex-start, flex-start, 50px);
            }
            &-card {
                width: 30%;
                @include flex(center, flex-start, 10px, column);
                &-img {
                    width: 100%;
                    height: 240px;
                    object-fit: cover;
                    border-radius: 10px;
                }
                &-date {
                    color: $second-font-color;
                }
                &-title {
                    color: $first-font-color;
                }
                &-desc {
                    color: $third-font-color;
                }
            }
        }
    }
}

</style>