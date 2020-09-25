<template>
<v-app>
<v-app-bar app class="white">
<v-toolbar-title>
    <div style="width: 14%; height:55px; margin-left:79px;" >
    <v-img style="padding:2%;" src="@/assets/header-logo-img.png" />
    </div>

</v-toolbar-title>
<v-spacer></v-spacer>
<v-btn style="margin-right:79px;" class="primary" text href="https://orangeroomdigital.com/salesapp/public/">
<span>Dashboard (DEV)</span>
</v-btn>
</v-app-bar>

<v-main class="mt-5">
<Form/>
</v-main>
</v-app>
</template>

<script>
import Form from './components/Form';

export default {
    name: 'App',
    components: { Form },
    data: () => ({
    title:'Digital Account Opening Form',
    }),
};
</script>

<style>
.v-image__image{
    height: 94%;
}
</style>
