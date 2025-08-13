<script setup>
  import { onMounted, ref } from 'vue';

  import BlogPost from './components/BlogPost.vue';
  import PaginatedPost from './components/PaginatedPost.vue';
import Loading from './components/Loading.vue';

  const posts = ref([])

  const isLoading = ref(false)

  const perPage = 10
  const start = ref(0)
  const end = ref(perPage)

  const favorite = ref('')

  const changeFavorite = (title) => { favorite.value=title }

  const next = () => {
    start.value+=perPage;
    end.value+=perPage;
  }

  const prev = () => {
    start.value-=perPage;
    end.value-=perPage;
  }

  onMounted(async()=>{
    isLoading.value = true
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json()
      posts.value = data
    } catch (error) {
      console.log(error);
    }
    setTimeout(()=>{
      isLoading.value = false
    }, 300)
  })

  // fetch('https://jsonplaceholder.typicode.com/posts')
  // .then(res=>res.json())
  // .then(data => posts.value=data)
  // .finally(()=>isLoading.value=false)
</script>

<template>
  <Loading v-if="isLoading"/>
  <div class="container" v-else>
    <h1>App</h1>
    <h2>My Favorite post is: {{ favorite }}</h2>
    <PaginatedPost @next="next" @prev="prev" :start="start" :end="end" :length="posts.length"/>
    <BlogPost
      v-for="post in posts.slice(start, end)"
      :title="post.title"
      :id="post.id"
      :body="post.body"
      :key="post.id"
      @changeFavorite="changeFavorite"
    >
    </BlogPost>
  </div>
</template>
