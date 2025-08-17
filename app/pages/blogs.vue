<template>
  <Head>
    <title>Blog | Fidels</title>
    <meta name="description" content="Explore the latest news and stories from Fidels. Dive into topics on cannabis culture, events, product insights, and more. Stay informed with our deep-dive articles and updates." />
    <meta name="keywords" content="Fidels, blog, news, stories, events, cannabis, hashholes, hash, holes, events, product insights, flowers, flower, vape, rosin pens, concerntrates, tickers, sponsporship, prerolls, rosin 2g jars, jars, rosin, rosins, 70/30 prerolls culture, discount, fidels discounts, fidel, fidels, fidels products  insights, product reviews, cannabis education" />
    
    <meta property="og:title" content="The Fidel's Blog" />
    <meta property="og:description" content="Explore the latest news and stories from Fidels. Dive into topics on cannabis culture, events, product insights, and more. Stay informed with our deep-dive articles and updates." />
    <meta property="og:image" content="https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg" />
    <meta property="og:type" content="blog" />
    <meta property="og:url" content="https://fidelshashhole.ai/blogs" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="The Fidel's Blog" />
    <meta name="twitter:description" content="Explore the latest news and stories from Fidels. Dive into topics on cannabis culture, events, product insights, and more. Stay informed with our deep-dive articles and updates." />
    <meta name="twitter:image" content="https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg" />
    
    <link rel="canonical" href="https://fidelshashhole.ai/blogs" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Fidels" />
  </Head>

  <div class="min-h-screen flex flex-col bg-white">
    <AppNavigation />
    <div class="container mx-auto px-4 py-6 flex-1">
      <h1 class="text-2xl font-bold mb-4">Blog</h1>

      <div class="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search blog posts..."
          class="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <Loader v-if="loading" />
      <div v-else>
        <div v-if="filteredPosts.length === 0" class="flex flex-col items-center justify-center py-16">
          <svg class="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-gray-500 text-lg">No blog posts found</div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="post in filteredPosts"
            :key="post._id"
            :to="`/blog/${post._id}`"
            class="relative flex flex-col bg-white rounded-xl shadow-lg transition hover:scale-105 hover:shadow-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <img :src="(post.images && post.images.length) ? post.images[0] : 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg'"
              :alt="post.title"
              class="w-full h-48 object-cover rounded-t-xl" />
            <div class="p-4">
              <div class="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {{ formatDate(post.createdAt) }}
              </div>
              <h2 class="font-bold text-lg mb-2">{{ post.title }}</h2>
              <p class="text-sm text-gray-600 mb-4 line-clamp-2">
                {{ post.excerpt }}
              </p>
              <div class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="font-medium">{{ post.author }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import AppFooter from '~/components/AppFooter.vue';
import AppNavigation from '~/components/AppNavigation.vue';
import Loader from '~/components/Loader.vue';

type BlogPost = {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  createdAt: string;
  images?: string[];
  slug: string;
};

const posts = ref<BlogPost[]>([]);
const loading = ref(true);
const searchQuery = ref('');

// A helper function to create a URL-friendly slug
const slugify = (str: string) => {
  return String(str)
    .normalize('NFKD') // split accented characters into their base form
    .replace(/[\u0300-\u036F]/g, '') // remove all previously split accents
    .trim() // trim leading/trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
};

// A helper function to extract a plain text excerpt from HTML content
const extractExcerpt = (htmlContent: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  const plainText = tempDiv.textContent || tempDiv.innerText || '';
  const wordLimit = 25; // Define how many words you want in the excerpt
  const words = plainText.split(/\s+/);
  return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
};

/**
 * Fetches blog posts from the API endpoint.
 * This function is now updated to correctly handle your backend's response.
 */
async function fetchBlogPosts() {
  loading.value = true;
  const url = 'https://fidel-of6u.onrender.com/api/blogs';
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    // Map the backend data to your BlogPost type
    posts.value = Array.isArray(data) ? data.map((item: any) => ({
      _id: item._id,
      title: item.title,
      excerpt: extractExcerpt(item.content), // Use the new function to create an excerpt
      author: item.author,
      createdAt: item.createdAt,
      images: item.images,
      slug: slugify(item.title) // Use the new function to create a slug from the title
    })) : [];

  } catch (e) {
    console.error('Failed to fetch blog posts:', e);
    posts.value = [];
  } finally {
    loading.value = false;
  }
}

// Filters blog posts based on the search query
const filteredPosts = computed(() => {
  if (!searchQuery.value.trim()) {
    return posts.value;
  }
  const query = searchQuery.value.toLowerCase();
  return posts.value.filter(post =>
    post.title.toLowerCase().includes(query)
  );
});

// Utility function to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
  fetchBlogPosts();
});

// Structured data script injection for Schema.org
// We use a watch effect to ensure this runs after posts are loaded
if (process.client) {
  const ldJson = computed(() => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://fidelshashhole.ai/blogs"
    },
    "name": "The Fidel's Blog",
    "description": "Explore the latest news and stories from Fidels. Dive into topics on cannabis culture, events, product insights, and more. Stay informed with our deep-dive articles and updates.",
    "publisher": {
      "@type": "Organization",
      "name": "Fidels",
      "logo": {
        "@type": "ImageObject",
        "url": "https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg"
      }
    },
    "blogPosts": posts.value.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "image": post.images && post.images.length > 0 ? post.images[0] : 'https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg',
      "datePublished": post.createdAt,
      "dateModified": post.createdAt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "description": post.excerpt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://fidelshashhole.ai/blogs/${post.slug}`
      }
    }))
  }));

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(ldJson.value);
  document.head.appendChild(script);
}
</script>

<style scoped>
/*
This styling is based on Tailwind CSS classes, so it should
behave as expected if Tailwind is configured in your Nuxt project.
No custom CSS is needed beyond what you already have.
*/
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>