<template>
    <div>
        <h1>网站地图</h1>
        <ul>
            <li v-for="page in siteMapData" :key="page.name">
                <router-link :to="page.url">{{ page.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            siteMapData: [
                { name: '首页', url: '/' },
                { name: '关于我们', url: '/about' },
                { name: '服务', url: '/services' },
                // 添加更多页面...
            ],
        };
    },
};
</script>
