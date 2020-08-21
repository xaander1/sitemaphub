<template>
	<sui-container text-align="center">
		<div class="ui icon small input focus fluid olive">
			<input class="prompt olive" @keyup.enter="getSitemap" v-model="sitemapUrl" type="text" placeholder="Enter Sitemap URL...">
			<i class="inverted circular sitemap link icon olive" v-on:click="getSitemap"></i>
		</div>
		{{res}}
	</sui-container>
</template>
<script>
	import axios from 'axios'
	import cheerio from 'cheerio'
	export default {
		data(){
			return {
				sitemapUrl:"https://www.chekiprice.co.ke/sitemap.xml",
				res:""
			}
		},
		methods : {
			getSitemap(){
				axios.get(this.sitemapUrl, {
					"Content-Type": "application/xml; charset=utf-8"
				})
				.then(response => {
					const $ = cheerio.load(response.data)
					const sitemapUrls= [];

					$('url loc').each(function(i) {
						sitemapUrls[i] = $(this).text();
					});
					//replace
					let newSitemapUrls = sitemapUrls.map(url=>{
						return (url.replace('https://www.chekiprice.co.ke/','').replace('generalstores/','').replace('electronics/','').replace('allstores/','').replace('supermarkets/','').replace('appliances/','').replace('fashion/','').replace('custom/','').replace('terms-of-use','').replace('privacy-policy','').split('+').join(' '))
					}).filter(item=>item)
				})
			}
		}

	}
</script>