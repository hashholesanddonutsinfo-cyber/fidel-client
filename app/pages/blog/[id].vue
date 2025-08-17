<template>
  <div>
    <Head v-if="post">
      <title>{{ post.title }} | Fidels Blog</title>
      <meta name="description" :content="post.excerpt" />
      <meta name="keywords" :content="post.hashtags.join(', ') || 'Fidels, blog, cannabis, story'" />

      <meta property="og:title" :content="post.title" />
      <meta property="og:description" :content="post.excerpt" />
      <meta property="og:image" :content="post.images && post.images.length > 0 ? post.images[0] : 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg'" />
      <meta property="og:type" content="article" />
      <meta property="og:url" :content="`https://fidelshashhole.ai/blog/${post._id}/${post.slug}`" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" :content="post.title" />
      <meta name="twitter:description" :content="post.excerpt" />
      <meta name="twitter:image" :content="post.images && post.images.length > 0 ? post.images[0] : 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg'" />

      <link rel="canonical" :href="`https://fidelshashhole.ai/blog/${post._id}/${post.slug}`" />
    </Head>

    <div class="min-h-screen flex flex-col bg-white">
      <AppNavigation />
      <Loader v-if="loading" />
      <div v-else-if="!post" class="container mx-auto px-4 text-center text-gray-500 py-16">
        <h2 class="text-2xl font-bold">Blog Post Not Found</h2>
        <p>The blog post you are looking for does not exist.</p>
      </div>

      <div v-else class="flex flex-col">
        <div class="container mx-auto px-4 py-4 flex justify-end">
          <button @click="toggleLayout" class="bg-gray-100 text-gray-700 p-3 rounded-full shadow-md flex items-center space-x-2 hover:bg-gray-200 transition-colors">
            <i :class="isStretchedLayout ? 'pi pi-align-justify' : 'pi pi-arrows-h'"></i>
            <span class="hidden sm:inline">{{ isStretchedLayout ? 'Switch to Modern' : 'Switch to Stretched' }}</span>
          </button>
        </div>

        <div v-if="isStretchedLayout">
          <div class="w-full">
            <img :src="(post.images && post.images.length > 0) ? post.images[0] : 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg'"
              :alt="post.title"
              class="w-full max-h-[500px] object-cover" />
          </div>

          <div class="container mx-auto px-4 py-6">
            <article>
              <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
              <div class="flex items-center text-gray-500 text-sm mb-6">
                <span class="mr-4">By {{ post.author }}</span>
                <span>On {{ formatDate(post.createdAt) }}</span>
              </div>

              <div class="prose max-w-none" v-html="post.content"></div>

              <div v-if="post.hashtags && post.hashtags.length > 0" class="mt-8">
                <div class="text-lg font-semibold mb-2">Tags:</div>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="tag in post.hashtags"
                    :key="tag"
                    :to="`/tags/${encodeURIComponent(tag.replace('#', ''))}`"
                    class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full hover:bg-green-200 transition-colors"
                  >
                    #{{ tag }}
                  </NuxtLink>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-gray-200">
                <div class="text-lg font-semibold mb-3">Share this blog post:</div>
                <div class="flex items-center space-x-4">
                  <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`"
                    target="_blank"
                    class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full transition-transform hover:scale-110">
                    <i class="pi pi-facebook text-xl"></i>
                  </a>
                  <a :href="`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`"
                    target="_blank"
                    class="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full transition-transform hover:scale-110">
                    <i class="pi pi-twitter text-xl"></i>
                  </a>
                  <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`"
                    target="_blank"
                    class="flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-full transition-transform hover:scale-110">
                    <i class="pi pi-linkedin text-xl"></i>
                  </a>
                  <a :href="`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`"
                    target="_blank"
                    class="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full transition-transform hover:scale-110">
                    <i class="pi pi-whatsapp text-xl"></i>
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div class="container mx-auto px-4 py-8 mt-8">
            <aside class="w-full">
              <div class="bg-gray-100 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-4">Related Blogs</h3>
                <div v-if="relatedPosts.length === 0" class="text-center text-gray-500">
                  No related blogs found.
                </div>
                <div v-else class="flex flex-col space-y-4">
                  <NuxtLink
                    v-for="relatedPost in relatedPosts"
                    :key="relatedPost._id"
                    :to="`/blog/${relatedPost._id}`"
                    class="relative flex bg-white rounded-xl shadow-md p-3 transition hover:scale-105 hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <img :src="(relatedPost.images && relatedPost.images.length > 0) ? relatedPost.images[0] : 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg'"
                      :alt="relatedPost.title"
                      class="w-20 h-20 object-cover rounded-lg mr-4" />
                    <div class="flex-1">
                      <h4 class="font-bold text-sm mb-1 line-clamp-2">{{ relatedPost.title }}</h4>
                      <div class="text-xs text-gray-500">By {{ relatedPost.author }}</div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div v-else class="container mx-auto px-4 py-6">
          <div class="flex flex-col lg:flex-row gap-8">
            <article class="flex-1">
              <img :src="(post.images && post.images.length > 0) ? post.images[0] : 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg'"
                :alt="post.title"
                class="w-full max-h-96 object-cover rounded-xl mb-6" />

              <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
              <div class="flex items-center text-gray-500 text-sm mb-6">
                <span class="mr-4">By {{ post.author }}</span>
                <span>On {{ formatDate(post.createdAt) }}</span>
              </div>

              <div class="prose max-w-none" v-html="post.content"></div>

              <div v-if="post.hashtags && post.hashtags.length > 0" class="mt-8">
                <div class="text-lg font-semibold mb-2">Tags:</div>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="tag in post.hashtags"
                    :key="tag"
                    :to="`/tags/${encodeURIComponent(tag.replace('#', ''))}`"
                    class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full hover:bg-green-200 transition-colors"
                  >
                    #{{ tag }}
                  </NuxtLink>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-gray-200">
                <div class="text-lg font-semibold mb-3">Share this blog post:</div>
                <div class="flex items-center space-x-4">
                  <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`"
                    target="_blank"
                    class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full transition-transform hover:scale-110">
                    <i class="pi pi-facebook text-xl"></i>
                  </a>
                  <a :href="`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`"
                    target="_blank"
                    class="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full transition-transform hover:scale-110">
                    <i class="pi pi-twitter text-xl"></i>
                  </a>
                  <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`"
                    target="_blank"
                    class="flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-full transition-transform hover:scale-110">
                    <i class="pi pi-linkedin text-xl"></i>
                  </a>
                  <a :href="`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`"
                    target="_blank"
                    class="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full transition-transform hover:scale-110">
                    <i class="pi pi-whatsapp text-xl"></i>
                  </a>
                </div>
              </div>
            </article>

            <aside class="w-full lg:w-1/3">
              <div class="bg-gray-100 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-4">Related Blogs</h3>
                <div v-if="relatedPosts.length === 0" class="text-center text-gray-500">
                  No related blogs found.
                </div>
                <div v-else class="flex flex-col space-y-4">
                  <NuxtLink
                    v-for="relatedPost in relatedPosts"
                    :key="relatedPost._id"
                    :to="`/blog/${relatedPost._id}`"
                    class="relative flex bg-white rounded-xl shadow-md p-3 transition hover:scale-105 hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <img :src="(relatedPost.images && relatedPost.images.length > 0) ? relatedPost.images[0] : 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg'"
                      :alt="relatedPost.title"
                      class="w-20 h-20 object-cover rounded-lg mr-4" />
                    <div class="flex-1">
                      <h4 class="font-bold text-sm mb-1 line-clamp-2">{{ relatedPost.title }}</h4>
                      <div class="text-xs text-gray-500">By {{ relatedPost.author }}</div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useHead } from '#imports';
import AppFooter from '~/components/AppFooter.vue';
import AppNavigation from '~/components/AppNavigation.vue';
import Loader from '~/components/Loader.vue';

type BlogPost = {
  _id: string;
  title: string;
  author: string;
  createdAt: string;
  images?: string[];
  content: string;
  excerpt: string;
  hashtags: string[];
  slug: string;
};

const route = useRoute();
const loading = ref(true);
const post = ref<BlogPost | null>(null);
const allPosts = ref<BlogPost[]>([]);

const isStretchedLayout = ref(false);

const toggleLayout = () => {
  isStretchedLayout.value = !isStretchedLayout.value;
};

// A helper function to create a URL-friendly slug
const slugify = (str: string) => {
  return String(str)
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// A helper function to extract a plain text excerpt from HTML content
const extractExcerpt = (htmlContent: string) => {
  if (typeof document === 'undefined') return ''; // Handle SSR
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  const plainText = tempDiv.textContent || tempDiv.innerText || '';
  const wordLimit = 25;
  const words = plainText.split(/\s+/);
  return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
};

const fetchPostById = async (id: string) => {
  loading.value = true;
  try {
    const res = await fetch(`https://fidel-of6u.onrender.com/api/blogs/${id}`);
    const data = await res.json();
    if (data) {
      post.value = {
        ...data,
        excerpt: extractExcerpt(data.content),
        slug: slugify(data.title)
      };
    } else {
      post.value = null;
    }
  } catch (e) {
    console.error('Failed to fetch blog post:', e);
    post.value = null;
  }
};

const fetchAllBlogs = async () => {
  try {
    const res = await fetch('https://fidel-of6u.onrender.com/api/blogs');
    const data = await res.json();
    allPosts.value = Array.isArray(data) ? data.map((item: any) => ({
      ...item,
      excerpt: extractExcerpt(item.content),
      slug: slugify(item.title)
    })) : [];
  } catch (e) {
    console.error('Failed to fetch all blogs:', e);
  } finally {
    loading.value = false;
  }
};

// Computed property to find related blogs
const relatedPosts = computed(() => {
  if (!post.value || !allPosts.value.length || !post.value.hashtags || post.value.hashtags.length === 0) {
    return [];
  }

  // Find blogs with matching hashtags
  const matches = allPosts.value.filter(p =>
    p._id !== post.value?._id && // Exclude the current post
    p.hashtags.some(tag => post.value?.hashtags.includes(tag))
  );

  // Return up to 3 related posts
  return matches.slice(0, 3);
});

// Utility function to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Computed properties for sharing
const encodedUrl = computed(() => {
  if (post.value) {
    const fullUrl = `https://fidelshashhole.ai/blog/${post.value._id}/${post.value.slug}`;
    return encodeURIComponent(fullUrl);
  }
  return '';
});

const encodedTitle = computed(() => {
  if (post.value) {
    return encodeURIComponent(post.value.title);
  }
  return '';
});

// Watch for changes in the ID to re-fetch data
watch(() => route.params.id, async (newId) => {
  if (newId) {
    await fetchPostById(newId as string);
    await fetchAllBlogs();
  }
}, { immediate: true });

// Add the JSON-LD script using useHead()
useHead(() => {
  if (!post.value) {
    return {};
  }
  return {
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://fidelshashhole.ai/blog/${post.value._id}/${post.value.slug}`
          },
          "headline": post.value.title,
          "image": [
            post.value.images && post.value.images.length > 0 ? post.value.images[0] : 'https://fidelshashhole.aihttps://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg'
          ],
          "datePublished": post.value.createdAt,
          "dateModified": post.value.createdAt,
          "author": {
            "@type": "Person",
            "name": post.value.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Fidels Blog",
            "logo": {
              "@type": "ImageObject",
              "url": "https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg"
            }
          },
          "description": post.value.excerpt
        })
      }
    ]
  };
});
</script>

<style scoped>
.prose {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.prose :deep(h1), .prose :deep(h2), .prose :deep(h3), .prose :deep(h4) {
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.prose :deep(h1) {
  font-size: 1.5rem;
}
.prose :deep(h2) {
  font-size: 1.25rem;
}
.prose :deep(p) {
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.625;
}
.prose :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
  margin-bottom: 1rem;
}
.prose :deep(li) {
  margin-bottom: 0.5rem;
}

/* Original styles you provided */
.prose {
  font-family: Georgia, serif;
  font-size: 1.1rem;
  line-height: 1.7;
}
</style>